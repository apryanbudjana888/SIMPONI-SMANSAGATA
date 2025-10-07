import React, { useState } from 'react';

// Icons
const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2.586l-3-3z" /></svg>);
const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>);
const UploadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>);

// Define all localStorage keys that need to be backed up.
// For now, it's just one, but this makes it easy to add more.
const LOCAL_STORAGE_KEYS = [
    'simpogulip_student_list',
    // 'simpogulip_kelas_list', // Example for future use
    // 'simpogulip_prestasi_list', // Example for future use
];

const BackupRestore: React.FC = () => {
    const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

    React.useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleBackup = () => {
        try {
            const backupData: { [key: string]: any } = {};
            
            LOCAL_STORAGE_KEYS.forEach(key => {
                const data = localStorage.getItem(key);
                if (data) {
                    backupData[key] = JSON.parse(data);
                }
            });

            if (Object.keys(backupData).length === 0) {
                setNotification({ type: 'error', message: 'Tidak ada data untuk di-backup.' });
                return;
            }

            const jsonString = JSON.stringify(backupData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            link.download = `simponi_backup_${timestamp}.json`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            setNotification({ type: 'success', message: 'Backup berhasil diunduh!' });
        } catch (error) {
            console.error("Backup failed:", error);
            setNotification({ type: 'error', message: 'Terjadi kesalahan saat membuat backup.' });
        }
    };

    const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const confirmRestore = window.confirm(
            'PERINGATAN: Aksi ini akan menimpa semua data yang ada saat ini. Apakah Anda yakin ingin melanjutkan?'
        );

        if (!confirmRestore) {
            event.target.value = ''; // Reset file input
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text !== 'string') {
                    throw new Error("File content is not readable text.");
                }
                const restoredData = JSON.parse(text);

                // Validate if the restored data contains expected keys
                const restoredKeys = Object.keys(restoredData);
                const hasValidKeys = restoredKeys.some(key => LOCAL_STORAGE_KEYS.includes(key));
                
                if (!hasValidKeys) {
                    throw new Error("File backup tidak valid atau tidak berisi data yang dikenali.");
                }

                Object.keys(restoredData).forEach(key => {
                    if (LOCAL_STORAGE_KEYS.includes(key)) {
                        localStorage.setItem(key, JSON.stringify(restoredData[key]));
                    }
                });
                
                setNotification({ type: 'success', message: 'Data berhasil direstore! Halaman akan dimuat ulang.' });
                
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            } catch (error: any) {
                console.error("Restore failed:", error);
                setNotification({ type: 'error', message: error.message || 'Gagal merestore data. Pastikan file backup valid.' });
            } finally {
                event.target.value = ''; // Reset file input regardless of outcome
            }
        };
        reader.readAsText(file);
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
                    <h2 className="text-3xl font-light text-gray-700">Backup & Restore</h2>
                    <h3 className="text-sm font-light text-gray-500">Manajemen Cadangan Data Aplikasi</h3>
                </div>
                <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md shadow-sm">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <HomeIcon />
                            <a href="#" className="hover:text-blue-500">Home</a>
                        </li>
                        <li className="mx-2">/</li>
                        <li>Backup & Restore</li>
                    </ol>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Backup Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-3 mb-4">Backup Data</h3>
                    <div className="text-center">
                        <p className="text-gray-600 mb-6">
                            Klik tombol di bawah untuk mengunduh file backup dari semua data aplikasi (termasuk data siswa). Simpan file ini di tempat yang aman.
                        </p>
                        <button
                            onClick={handleBackup}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center w-full md:w-auto mx-auto"
                        >
                            <DownloadIcon />
                            Backup Semua Data
                        </button>
                    </div>
                </div>

                {/* Restore Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-3 mb-4">Restore Data</h3>
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">
                            <strong className="text-red-600">Peringatan:</strong> Proses ini akan menimpa semua data yang ada saat ini dengan data dari file backup. Pastikan Anda memilih file yang benar.
                        </p>
                        <input
                            type="file"
                            id="restore-file"
                            className="hidden"
                            accept=".json"
                            onChange={handleRestore}
                        />
                        <label
                            htmlFor="restore-file"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center w-full md:w-auto mx-auto cursor-pointer"
                        >
                            <UploadIcon />
                            Pilih File Backup (.json)
                        </label>
                    </div>
                </div>
            </div>
            
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

export default BackupRestore;
