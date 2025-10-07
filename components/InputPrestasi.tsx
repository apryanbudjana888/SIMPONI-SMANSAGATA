import React, { useState, useEffect } from 'react';
import { Student, User, PointLog } from '../types';

const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2.586l-3-3z" /></svg>);

const LOCAL_STORAGE_KEY_SISWA = 'simpogulip_student_list';
const LOCAL_STORAGE_KEY_LOGS = 'simpogulip_point_logs';
const LOCAL_STORAGE_KEY_PRESTASI = 'simpogulip_prestasi_list';

interface PrestasiOption {
  id: number;
  name: string;
  points: number;
}

interface InputPrestasiProps {
    user: User;
}

const InputPrestasi: React.FC<InputPrestasiProps> = ({ user }) => {
    const [studentList, setStudentList] = useState<Student[]>([]);
    const [prestasiList, setPrestasiList] = useState<PrestasiOption[]>([]);
    const [uniqueClasses, setUniqueClasses] = useState<string[]>([]);
    const [classFilter, setClassFilter] = useState('all');
    const [studentSearch, setStudentSearch] = useState('');
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const [formData, setFormData] = useState({
        prestasiId: '',
        date: new Date().toISOString().slice(0, 10),
        keterangan: ''
    });
    const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

    useEffect(() => {
        try {
            const studentItems = window.localStorage.getItem(LOCAL_STORAGE_KEY_SISWA);
            if (studentItems) {
                const students: Student[] = JSON.parse(studentItems);
                setStudentList(students);
                const classes = Array.from(new Set(students.map(s => s.class))).sort((a, b) => 
                  a.localeCompare(b, undefined, { numeric: true })
                );
                setUniqueClasses(classes);
            }
            const prestasiItems = window.localStorage.getItem(LOCAL_STORAGE_KEY_PRESTASI);
            if (prestasiItems) {
                setPrestasiList(JSON.parse(prestasiItems));
            }
        } catch (error) {
            console.error("Could not load data from local storage", error);
            setNotification({type: 'error', message: 'Gagal memuat data awal.'});
        }
    }, []);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setStudentSearch(query);
        setSelectedStudent(null);

        if (query.length > 0) {
            const results = studentList
                .filter(student => classFilter === 'all' || student.class === classFilter)
                .filter(student =>
                    student.name.toLowerCase().includes(query.toLowerCase()) ||
                    student.id.toString().includes(query)
                ).slice(0, 10);
            setFilteredStudents(results);
            setIsDropdownOpen(true);
        } else {
            setFilteredStudents([]);
            setIsDropdownOpen(false);
        }
    };

    const handleSelectStudent = (student: Student) => {
        setSelectedStudent(student);
        setStudentSearch(`${student.name} (${student.id})`);
        setIsDropdownOpen(false);
    };
    
    const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedStudent) {
            setNotification({type: 'error', message: 'Silakan pilih siswa terlebih dahulu.'});
            return;
        }
        if (!formData.prestasiId) {
            setNotification({type: 'error', message: 'Silakan pilih jenis prestasi.'});
            return;
        }
        
        const selectedPrestasi = prestasiList.find(p => p.id === parseInt(formData.prestasiId));
        if (!selectedPrestasi) {
            setNotification({type: 'error', message: 'Jenis prestasi tidak valid.'});
            return;
        }

        try {
            // 1. Update student's points
            const updatedStudentList = studentList.map(student => {
                if (student.id === selectedStudent.id) {
                    return { ...student, points: student.points + selectedPrestasi.points };
                }
                return student;
            });
            window.localStorage.setItem(LOCAL_STORAGE_KEY_SISWA, JSON.stringify(updatedStudentList));
            setStudentList(updatedStudentList); // Update state locally

            // 2. Create and save log
            const logItems = window.localStorage.getItem(LOCAL_STORAGE_KEY_LOGS);
            const existingLogs: PointLog[] = logItems ? JSON.parse(logItems) : [];

            const newLog: PointLog = {
                id: Date.now(),
                studentId: selectedStudent.id,
                studentName: selectedStudent.name,
                studentClass: selectedStudent.class,
                type: 'prestasi',
                description: selectedPrestasi.name,
                points: selectedPrestasi.points,
                recordedBy: user.name, // Use logged-in user's name
                date: new Date(formData.date).toISOString(),
            };

            const updatedLogs = [newLog, ...existingLogs].slice(0, 50);
            window.localStorage.setItem(LOCAL_STORAGE_KEY_LOGS, JSON.stringify(updatedLogs));

            setNotification({type: 'success', message: `Prestasi berhasil ditambahkan untuk ${selectedStudent.name}!`});
            
            // Reset form
            setStudentSearch('');
            setSelectedStudent(null);
            setClassFilter('all');
            setFormData({
                prestasiId: '',
                date: new Date().toISOString().slice(0, 10),
                keterangan: ''
            });
        } catch (error) {
            console.error("Failed to save data:", error);
            setNotification({type: 'error', message: 'Gagal menyimpan data.'});
        }
    };

  return (
    <>
      {notification && (
        <div className={`fixed top-20 right-5 text-white py-3 px-5 rounded-lg shadow-xl z-50 animate-fade-in-down ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} role="alert">
          <p className="font-bold">{notification.type === 'success' ? 'Sukses!' : 'Error!'}</p>
          <p>{notification.message}</p>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-light text-gray-700">Input Prestasi</h2>
          <h3 className="text-sm font-light text-gray-500">Tambah Data Prestasi Siswa</h3>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md shadow-sm">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <HomeIcon />
                    <a href="#" className="hover:text-blue-500">Home</a>
                </li>
                <li className="mx-2">/</li>
                <li>Input Prestasi</li>
            </ol>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-3">Form Input Prestasi</h3>
          <div className="mt-6">
            <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="classFilter" className="text-sm font-bold text-gray-600 block">Filter Kelas</label>
                    <select
                        id="classFilter"
                        value={classFilter}
                        onChange={(e) => {
                            setClassFilter(e.target.value);
                            setStudentSearch('');
                            setSelectedStudent(null);
                            setIsDropdownOpen(false);
                        }}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Semua Kelas</option>
                        {uniqueClasses.map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                        ))}
                    </select>
                </div>
                <div className="relative">
                  <label htmlFor="studentSearch" className="text-sm font-bold text-gray-600 block">Cari Siswa (NISN / Nama)</label>
                  <input 
                    id="studentSearch" 
                    type="text" 
                    value={studentSearch}
                    onChange={handleSearchChange}
                    onFocus={() => { if (studentSearch) setIsDropdownOpen(true); }}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Ketik untuk mencari siswa..." 
                  />
                  {isDropdownOpen && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                          <li
                            key={student.id}
                            className="p-3 hover:bg-gray-100 cursor-pointer"
                            onMouseDown={() => handleSelectStudent(student)}
                          >
                            <p className="font-semibold">{student.name}</p>
                            <p className="text-sm text-gray-500">NISN: {student.id} | Kelas: {student.class}</p>
                          </li>
                        ))
                      ) : (
                        <li className="p-3 text-sm text-gray-500 text-center">Siswa tidak ditemukan.</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
              {selectedStudent && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm font-semibold text-blue-800">Siswa Terpilih:</p>
                    <p className="text-sm text-blue-700">{selectedStudent.name} - Kelas {selectedStudent.class} (Poin Saat Ini: {selectedStudent.points})</p>
                  </div>
              )}

              <div>
                <label htmlFor="prestasiId" className="text-sm font-bold text-gray-600 block">Jenis Prestasi</label>
                <select id="prestasiId" value={formData.prestasiId} onChange={handleFormChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Pilih Jenis Prestasi</option>
                    {prestasiList.map(prestasi => (
                      <option key={prestasi.id} value={prestasi.id}>
                        {prestasi.name} (+{prestasi.points} Poin)
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="text-sm font-bold text-gray-600 block">Tanggal</label>
                <input id="date" type="date" value={formData.date} onChange={handleFormChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label htmlFor="keterangan" className="text-sm font-bold text-gray-600 block">Keterangan (Opsional)</label>
                <textarea id="keterangan" value={formData.keterangan} onChange={handleFormChange} rows={4} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tambahkan detail jika diperlukan..."></textarea>
              </div>
              
              <div className="flex justify-end">
                 <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Simpan Prestasi</button>
              </div>
            </form>
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

export default InputPrestasi;