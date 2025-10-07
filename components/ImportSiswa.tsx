import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Student } from '../types';

// Icons
const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2.586l-3-3z" /></svg>);
const UploadCloudIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>);

const LOCAL_STORAGE_KEY = 'simpogulip_student_list';

interface ExtractedStudent {
    nis: string;
    nisn: string;
    nama: string;
    kelas: string;
}

interface ImportSiswaProps {
    onImportSuccess: () => void;
}


const ImportSiswa: React.FC<ImportSiswaProps> = ({ onImportSuccess }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [mimeType, setMimeType] = useState<string>('');
    const [extractedData, setExtractedData] = useState<ExtractedStudent[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

    React.useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                // remove the data:image/*;base64, prefix
                resolve(base64String.split(',')[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };
    
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setImagePreview(URL.createObjectURL(file));
            setMimeType(file.type);
            const base64 = await blobToBase64(file);
            setBase64Image(base64);
            setExtractedData([]);
        } else {
            setNotification({ type: 'error', message: 'Silakan pilih file gambar yang valid.' });
            handleCancel();
        }
    };

    const handleCancel = () => {
        setImagePreview(null);
        setBase64Image(null);
        setMimeType('');
        setExtractedData([]);
    };
    
    const handleImport = async () => {
        if (!base64Image) {
            setNotification({ type: 'error', message: 'Tidak ada gambar yang dipilih.' });
            return;
        }
        setIsLoading(true);
        setNotification(null);
        setExtractedData([]);
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const imagePart = {
                inlineData: {
                    mimeType: mimeType,
                    data: base64Image,
                },
            };

            const textPart = {
                text: "Dari gambar ini, ekstrak semua data siswa. Fokus pada kolom 'NO', 'NIS', 'NISN', 'NAMA', dan 'L/P'. Setiap baris mewakili satu siswa. Identifikasi nama kelas dari header tabel seperti 'KELAS X.E1', 'X.E2', dll. Gabungkan nama kelas ini ke setiap data siswa yang sesuai. Pastikan format output adalah JSON array. Setiap objek dalam array harus memiliki properti: 'nis' (string), 'nisn' (string), 'nama' (string), and 'kelas' (string). Abaikan baris yang bukan data siswa valid."
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [imagePart, textPart] },
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                nis: { type: Type.STRING },
                                nisn: { type: Type.STRING },
                                nama: { type: Type.STRING },
                                kelas: { type: Type.STRING },
                            },
                        },
                    },
                },
            });

            const jsonStr = response.text.trim();
            const data = JSON.parse(jsonStr);
            
            if (Array.isArray(data) && data.length > 0) {
                setExtractedData(data);
                setNotification({ type: 'success', message: `Berhasil mengekstrak ${data.length} data siswa. Silakan review di bawah.` });
            } else {
                 setNotification({ type: 'error', message: 'Tidak ada data siswa yang dapat diekstrak dari gambar. Coba gambar yang lebih jelas.' });
            }

        } catch (error) {
            console.error("Gemini API call failed:", error);
            setNotification({ type: 'error', message: 'Gagal menganalisis gambar. Pastikan gambar jelas dan coba lagi.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveData = () => {
        if (extractedData.length === 0) {
            setNotification({ type: 'error', message: 'Tidak ada data untuk disimpan.' });
            return;
        }
        
        try {
            const existingItems = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            const existingStudents: Student[] = existingItems ? JSON.parse(existingItems) : [];

            const newStudents: Student[] = extractedData.map(item => ({
                id: parseInt(item.nisn, 10), // Use NISN as the unique ID
                name: item.nama,
                class: item.kelas,
                points: 100, // Default starting points
                photo: '', // No photo on import
            }));

            // A simple merge: add new students to the list. 
            // A more robust solution might check for duplicates.
            const combinedStudents = [...existingStudents, ...newStudents];

            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(combinedStudents));
            setNotification({ type: 'success', message: 'Data siswa berhasil disimpan! Anda akan diarahkan ke halaman Data Siswa.' });

            setTimeout(() => {
                onImportSuccess();
            }, 2000);
            
        } catch (error) {
            console.error("Failed to save student data:", error);
            setNotification({ type: 'error', message: 'Gagal menyimpan data ke penyimpanan lokal.' });
        }
    };

    return (
        <>
            {notification && (
                <div 
                    className={`fixed top-20 right-5 text-white py-3 px-5 rounded-lg shadow-xl z-50 animate-fade-in-down ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} 
                    role="alert"
                >
                    <p className="font-bold">{notification.type === 'success' ? 'Sukses!' : 'Error!'}</p>
                    <p>{notification.message}</p>
                </div>
            )}
            
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-light text-gray-700">Import Data Siswa</h2>
                    <h3 className="text-sm font-light text-gray-500">Upload Gambar untuk Ekstraksi Data</h3>
                </div>
                <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md shadow-sm">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <HomeIcon />
                            <a href="#" className="hover:text-blue-500">Home</a>
                        </li>
                        <li className="mx-2">/</li>
                        <li>Import Data Siswa</li>
                    </ol>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-3 mb-4">Langkah 1: Upload Gambar</h3>
                {!imagePreview && (
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <UploadCloudIcon />
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                    <span>Upload file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                </label>
                                <p className="pl-1">atau drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF hingga 10MB</p>
                        </div>
                    </div>
                )}
                {imagePreview && (
                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-600 mb-2">Preview Gambar:</h4>
                        <img src={imagePreview} alt="Preview data siswa" className="max-w-full h-auto rounded-md shadow-md" />
                         <div className="mt-4 flex space-x-4">
                            <button onClick={handleImport} disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                                {isLoading ? 'Menganalisis...' : 'Ekstrak Data dari Gambar'}
                            </button>
                             <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Batal</button>
                        </div>
                    </div>
                )}
            </div>

            {isLoading && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow-lg text-center">
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className="mt-4 text-gray-600">Menganalisis gambar dan mengekstrak data siswa. Mohon tunggu...</p>
                </div>
            )}
            
            {extractedData.length > 0 && !isLoading && (
                 <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-3 mb-4">Langkah 2: Review dan Simpan Data</h3>
                    <p className="text-sm text-gray-600 mb-4">Data berikut telah diekstrak dari gambar. Periksa kembali sebelum menyimpan.</p>
                    <div className="overflow-x-auto max-h-96">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIS</th>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NISN</th>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {extractedData.map((student, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="py-4 px-6 text-sm text-gray-900">{student.nis}</td>
                                        <td className="py-4 px-6 text-sm text-gray-900">{student.nisn}</td>
                                        <td className="py-4 px-6 text-sm text-gray-500">{student.nama}</td>
                                        <td className="py-4 px-6 text-sm text-gray-500">{student.kelas}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     <div className="mt-6 flex justify-end">
                        <button onClick={handleSaveData} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Simpan ke Data Siswa
                        </button>
                    </div>
                 </div>
            )}
            
            <style>{`
              @keyframes fade-in-down {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in-down {
                animation: fade-in-down 0.3s ease-out forwards;
              }
            `}</style>
        </>
    );
};

export default ImportSiswa;
