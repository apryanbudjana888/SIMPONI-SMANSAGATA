import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import { StatCardColor, Student, PointLog } from '../types';

// Let TypeScript know that Recharts is available on the window object from the CDN
declare global {
  interface Window {
    Recharts: any;
  }
}

// Icon components
const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2.586l-3-3z" /></svg>);
const UsersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm-1.5 5.5a3 3 0 00-3 0V12a2 2 0 00-2 2v1a1 1 0 001 1h8a1 1 0 001-1v-1a2 2 0 00-2-2v-.5a3 3 0 00-3 0z" /><path d="M15.5 11.5a3 3 0 00-3 0V12a2 2 0 00-2 2v1a1 1 0 001 1h4a1 1 0 001-1v-1a2 2 0 00-2-2v-.5z" /></svg>);
const AdminIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>);
const LibraryIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 7v7a1 1 0 001 1h12a1 1 0 001-1V7a1 1 0 00-.504-.868l-7-4zM12 14H8v-2h4v2zm0-4H8V8h4v2z" clipRule="evenodd" /></svg>);
const ListIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>);
const BriefcaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zm-2 4h4V4a1 1 0 10-2 0v2z" clipRule="evenodd" /></svg>);
const ClockIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>);

// LocalStorage Keys
const KEYS = {
    SISWA: 'simpogulip_student_list',
    GURU: 'simpogulip_guru_list',
    KELAS: 'simpogulip_kelas_list',
    ADMIN: 'simpogulip_active_admin_ids',
    PRESTASI: 'simpogulip_prestasi_list',
    PELANGGARAN: 'simpogulip_pelanggaran_list',
    LOGS: 'simpogulip_point_logs',
};

// Updated colors for better theme consistency
const PIE_CHART_COLORS = ['#10B981', '#F43F5E']; // Tailwind emerald-500 and rose-500

interface DashboardData {
    stats: {
        totalSiswa: number;
        totalKelas: number;
        totalGuru: number;
        totalAdmin: number;
        jenisPrestasi: number;
        jenisPelanggaran: number;
    };
    studentDistribution: { name: string; students: number }[];
    achievementViolationComparison: { name: string; value: number }[];
    recentActivities: PointLog[];
}

const Dashboard: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const getArrayFromStorage = (key: string) => JSON.parse(localStorage.getItem(key) || '[]');
            
            const students: Student[] = getArrayFromStorage(KEYS.SISWA);
            const teachers = getArrayFromStorage(KEYS.GURU);
            const classes = getArrayFromStorage(KEYS.KELAS);
            const adminIds = getArrayFromStorage(KEYS.ADMIN);
            const achievements = getArrayFromStorage(KEYS.PRESTASI);
            const violations = getArrayFromStorage(KEYS.PELANGGARAN);
            const pointLogs: PointLog[] = getArrayFromStorage(KEYS.LOGS);

            // Calculate student distribution for Bar Chart
            const classCounts = students.reduce((acc: { [key: string]: number }, student) => {
                acc[student.class] = (acc[student.class] || 0) + 1;
                return acc;
            }, {});
            const studentDistribution = Object.entries(classCounts)
                .map(([name, count]) => ({ name, students: count }))
                .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

            setData({
                stats: {
                    totalSiswa: students.length,
                    totalKelas: classes.length > 0 ? classes.length : new Set(students.map(s => s.class)).size,
                    totalGuru: teachers.length,
                    totalAdmin: adminIds.length,
                    jenisPrestasi: achievements.length,
                    jenisPelanggaran: violations.length,
                },
                studentDistribution,
                achievementViolationComparison: [
                    { name: 'Jenis Prestasi', value: achievements.length },
                    { name: 'Jenis Pelanggaran', value: violations.length },
                ],
                recentActivities: pointLogs.slice(0, 7), // Get last 7 activities
            });

        } catch (error) {
            console.error("Failed to load dashboard data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Destructure components from the Recharts object on the window
    const { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } = window.Recharts || {};
    
    if (isLoading || !data) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-xl text-gray-500">Memuat data dashboard...</div>
            </div>
        );
    }
    
    const statCardsData = [
      { value: data.stats.totalSiswa, label: 'Total Siswa', color: StatCardColor.Green, icon: <UsersIcon /> },
      { value: data.stats.totalGuru, label: 'Total Guru & Staf', color: StatCardColor.Green, icon: <BriefcaseIcon /> },
      { value: data.stats.totalKelas, label: 'Total Kelas', color: StatCardColor.Green, icon: <LibraryIcon /> },
      { value: data.stats.totalAdmin, label: 'Admin Aktif', color: StatCardColor.Yellow, icon: <AdminIcon /> },
      { value: data.stats.jenisPrestasi, label: 'Jenis Prestasi', color: StatCardColor.Green, icon: <ListIcon /> },
      { value: data.stats.jenisPelanggaran, label: 'Jenis Pelanggaran', color: StatCardColor.Red, icon: <ListIcon /> },
    ];


    if (!window.Recharts) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-xl text-gray-500">Memuat komponen visualisasi...</div>
            </div>
        );
    }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
            <p className="mt-1 text-gray-600">Selamat Datang! Berikut adalah ringkasan sistem poin sekolah.</p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-2 rounded-lg shadow-sm flex items-center self-end sm:self-auto">
            <HomeIcon />
            <a href="#" className="hover:text-blue-500 ml-1">Home</a>
            <span className="mx-2">/</span>
            <span>Dashboard</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-8">
        {statCardsData.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 border-b pb-3 mb-4">Distribusi Siswa per Kelas</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.studentDistribution} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                        <Legend wrapperStyle={{ fontSize: '14px' }} />
                        <Bar dataKey="students" fill="#3b82f6" name="Jumlah Siswa" barSize={30} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 border-b pb-3 mb-4">Perbandingan Jenis Prestasi vs. Pelanggaran</h3>
                 <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data.achievementViolationComparison}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={110}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {data.achievementViolationComparison.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '0.5rem' }}/>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
        
        {/* Right Column: Recent Activities */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-3 mb-4">Aktivitas Terbaru</h3>
            <div className="relative pl-4">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                {data.recentActivities.length > 0 ? (
                    data.recentActivities.map((log) => {
                        const isPrestasi = log.type === 'prestasi';
                        return (
                         <div key={log.id} className="relative mb-6">
                            {/* Timeline Dot */}
                            <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full -translate-x-1/2 -ml-0.5 ${isPrestasi ? 'bg-emerald-500 border-white border-2' : 'bg-red-500 border-white border-2'}`}></div>
                            
                            <div className="ml-6">
                                <div className="flex items-start space-x-3">
                                    <div className="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0 border-2 border-gray-200">
                                        <span className="text-white font-bold text-base">{log.studentName.charAt(0)}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-800 leading-tight">
                                            <span className="font-bold">{log.studentName}</span>
                                            <span className={isPrestasi ? 'text-green-600' : 'text-red-600'}>
                                                {` (${isPrestasi ? '+' : ''}${log.points} poin) `}
                                            </span>
                                            <span className="text-gray-600">
                                                untuk {log.description.toLowerCase()}.
                                            </span>
                                        </p>
                                        <div className="text-xs text-gray-500 flex items-center mt-1">
                                            <ClockIcon />
                                            <span>{new Date(log.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })} oleh {log.recordedBy}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>
                       );
                    })
                ) : (
                   <p className="text-center text-gray-500 py-4">Belum ada aktivitas tercatat.</p>
                )}
            </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
