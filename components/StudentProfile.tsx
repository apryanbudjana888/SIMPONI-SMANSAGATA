import React from 'react';
import { Student, AchievementLog, ViolationLog } from '../types';

const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2.586l-3-3z" /></svg>);

// Mock data for demonstration
const mockAchievements: AchievementLog[] = [
    { id: 1, date: '2024-03-15', description: 'Juara 1 Lomba Cerdas Cermat Tingkat Sekolah', points: 25 },
    { id: 2, date: '2024-04-22', description: 'Mewakili Sekolah di Olimpiade Sains Nasional', points: 15 },
];

const mockViolations: ViolationLog[] = [
    { id: 1, date: '2024-02-10', description: 'Terlambat masuk sekolah', points: -2 },
    { id: 2, date: '2024-03-05', description: 'Seragam tidak lengkap (tidak memakai dasi)', points: -5 },
    { id: 3, date: '2024-05-01', description: 'Terlambat masuk sekolah', points: -2 },
    { id: 4, date: '2024-05-19', description: 'Menggunakan HP saat KBM tanpa izin guru', points: -10 },
];

interface StudentProfileProps {
    student: Student;
    onBack: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student, onBack }) => {
    // Calculate total achievement and violation points from mock data
    const totalAchievementPoints = mockAchievements.reduce((sum, item) => sum + item.points, 0);
    const totalViolationPoints = mockViolations.reduce((sum, item) => sum + item.points, 0);
    const finalPoints = 100 + totalAchievementPoints + totalViolationPoints; // Assuming starting points are 100 for this demo

    const getPointClass = (points: number) => {
        if (points >= 100) return 'text-green-600';
        if (points < 75) return 'text-red-600';
        return 'text-yellow-600';
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-light text-gray-700">Profil Siswa</h2>
                    <h3 className="text-sm font-light text-gray-500">Detail Informasi Siswa</h3>
                </div>
                <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md shadow-sm">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <HomeIcon />
                            <a href="#" className="hover:text-blue-500">Home</a>
                        </li>
                        <li className="mx-2">/</li>
                        <li className="text-gray-400">Data Siswa</li>
                        <li className="mx-2">/</li>
                        <li>Profil Siswa</li>
                    </ol>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Profile Card & Back Button */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        {student.photo ? (
                            <img src={student.photo} alt="Student Avatar" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200 object-cover" />
                        ) : (
                            <div className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200 bg-gray-400 flex items-center justify-center">
                                <span className="text-6xl text-white font-bold">{student.name.charAt(0)}</span>
                            </div>
                        )}
                        <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                        <p className="text-sm text-gray-500">NISN: {student.id}</p>
                        <p className="text-sm text-gray-500">Kelas: {student.class}</p>
                    </div>

                     <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h4 className="text-lg font-semibold text-gray-600 mb-2">Total Poin Saat Ini</h4>
                        <p className={`text-6xl font-bold ${getPointClass(finalPoints)}`}>{finalPoints}</p>
                    </div>
                    
                    <button 
                        onClick={onBack} 
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                    >
                        Kembali ke Daftar Siswa
                    </button>
                </div>

                {/* Right Column: History Tables */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h4 className="text-xl font-semibold text-gray-700 border-b pb-3 mb-4">Riwayat Prestasi</h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Keterangan</th>
                                        <th className="py-2 px-4 text-center text-xs font-medium text-gray-500 uppercase">Poin</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockAchievements.length > 0 ? mockAchievements.map(item => (
                                        <tr key={item.id}>
                                            <td className="py-3 px-4 text-sm text-gray-500 whitespace-nowrap">{item.date}</td>
                                            <td className="py-3 px-4 text-sm text-gray-800">{item.description}</td>
                                            <td className="py-3 px-4 text-sm text-green-600 font-semibold text-center whitespace-nowrap">+{item.points}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={3} className="text-center py-4 text-gray-500">Tidak ada riwayat prestasi.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h4 className="text-xl font-semibold text-gray-700 border-b pb-3 mb-4">Riwayat Pelanggaran</h4>
                         <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Keterangan</th>
                                        <th className="py-2 px-4 text-center text-xs font-medium text-gray-500 uppercase">Poin</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockViolations.length > 0 ? mockViolations.map(item => (
                                        <tr key={item.id}>
                                            <td className="py-3 px-4 text-sm text-gray-500 whitespace-nowrap">{item.date}</td>
                                            <td className="py-3 px-4 text-sm text-gray-800">{item.description}</td>
                                            <td className="py-3 px-4 text-sm text-red-600 font-semibold text-center whitespace-nowrap">{item.points}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={3} className="text-center py-4 text-gray-500">Tidak ada riwayat pelanggaran.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentProfile;