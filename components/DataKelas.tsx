import React, { useState, useEffect, useMemo } from 'react';
import { Guru } from '../types'; // Import the Guru type

const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2.586l-3-3z" /></svg>);
const PlusIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>);
const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>);
const DeleteIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>);
const UploadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>);
const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>);

const LOCAL_STORAGE_KEY_KELAS = 'simpogulip_kelas_list';
const LOCAL_STORAGE_KEY_GURU = 'simpogulip_guru_list';


interface Kelas {
    id: number;
    name: string;
    teacher: string;
}

const placeholderKelas: Kelas[] = [
  { id: 1, name: 'X.E1', teacher: 'Albadri Duja S.L' },
  { id: 2, name: 'X.E2', teacher: 'Alfiatun Nuraini' },
  { id: 3, name: 'X.E3', teacher: 'Wely Silfia' },
  { id: 4, name: 'X.E4', teacher: 'Sri Lestari' },
  { id: 5, name: 'X.E5', teacher: 'Ade Aulia Sukma' },
  { id: 6, name: 'XI.F1', teacher: 'Marlinawati' },
  { id: 7, name: 'XI.F2', teacher: 'Ernawati' },
  { id: 8, name: 'XI.F3', teacher: 'Ely Tsulust' },
  { id: 9, name: 'XI.F4', teacher: 'Rosmalia' },
  { id: 10, name: 'XII.F5', teacher: 'Nurmawati' },
  { id: 11, name: 'XII.F6', teacher: 'Nanik Rofiah' },
  { id: 12, name: 'XII.F7', teacher: 'Lulut Ermasari' },
  { id: 13, name: 'XII.F8', teacher: 'Ismi Deshayati' },
  { id: 14, name: 'XII.F9', teacher: 'Citra Hardina' },
];

const placeholderGurus: Guru[] = [
  { id: 1, name: 'Sasmadi', position: 'Kepala Sekolah', username: 'gulip1' },
  { id: 2, name: 'Hary Soebagio', position: 'Guru Mapel', username: 'gulip2' },
  { id: 3, name: 'Rosmalia', position: 'Guru Mapel', username: 'gulip3' },
  { id: 4, name: 'Wiwin Sumiati', position: 'Waka. Kurikulum', username: 'gulip4' },
  { id: 5, name: 'Rachmat Priyono', position: 'Guru Mapel', username: 'gulip5' },
];

const DataKelas: React.FC = () => {
    const [kelasList, setKelasList] = useState<Kelas[]>(() => {
      try {
        const items = window.localStorage.getItem(LOCAL_STORAGE_KEY_KELAS);
        return items ? JSON.parse(items) : placeholderKelas;
      } catch (error) {
        console.error("Could not load class data", error);
        return placeholderKelas;
      }
    });

    useEffect(() => {
      try {
        window.localStorage.setItem(LOCAL_STORAGE_KEY_KELAS, JSON.stringify(kelasList));
      } catch (error) {
        console.error("Could not save class data", error);
      }
    }, [kelasList]);


    const [teacherList, setTeacherList] = useState<Guru[]>([]); // State for teachers
    const [showForm, setShowForm] = useState(false);
    const [editingKelas, setEditingKelas] = useState<Kelas | null>(null);
    const [formData, setFormData] = useState({ id: 0, name: '', teacher: '' });
    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [kelasToDelete, setKelasToDelete] = useState<Kelas | null>(null);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        // Load teachers for the dropdown
        try {
            const items = window.localStorage.getItem(LOCAL_STORAGE_KEY_GURU);
            setTeacherList(items ? JSON.parse(items) : placeholderGurus);
        } catch (error) {
            console.error("Could not load teachers data", error);
            setTeacherList(placeholderGurus); // Fallback on error
        }
    }, []);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);
    
    const availableTeachers = useMemo(() => {
        const assignedTeachers = kelasList.map(k => k.teacher);
        
        // Filter out teachers who are already assigned
        let unassignedTeachers = teacherList.filter(t => !assignedTeachers.includes(t.name));

        // If we are editing a class, add its current teacher back to the list
        if (editingKelas) {
            const currentTeacher = teacherList.find(t => t.name === editingKelas.teacher);
            if (currentTeacher && !unassignedTeachers.some(t => t.id === currentTeacher.id)) {
                unassignedTeachers.push(currentTeacher);
            }
        }
        
        // Sort the final list by name
        return unassignedTeachers.sort((a, b) => a.name.localeCompare(b.name));
    }, [teacherList, kelasList, editingKelas]);


    const handleAddNew = () => {
        setEditingKelas(null);
        setFormData({ id: 0, name: '', teacher: '' });
        setShowForm(true);
    };

    const handleEdit = (kelas: Kelas) => {
        setEditingKelas(kelas);
        setFormData(kelas);
        setShowForm(true);
    };

    const handleDelete = (kelas: Kelas) => {
        setKelasToDelete(kelas);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (kelasToDelete) {
            setKelasList(kelasList.filter(k => k.id !== kelasToDelete.id));
            setNotification(`Kelas "${kelasToDelete.name}" berhasil dihapus.`);
            setIsDeleteModalOpen(false);
            setKelasToDelete(null);
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setKelasToDelete(null);
    };
    
    const handleCancel = () => {
        setShowForm(false);
        setEditingKelas(null);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingKelas) {
            setKelasList(kelasList.map(k => k.id === editingKelas.id ? formData : k));
            setNotification('Data kelas berhasil diperbarui!');
        } else {
            setKelasList([...kelasList, { ...formData, id: Date.now() }]);
            setNotification('Kelas baru berhasil ditambahkan!');
        }
        setShowForm(false);
        setEditingKelas(null);
    };

    const handleDownloadTemplate = () => {
        const csvHeader = "Nama Kelas,Wali Kelas\n";
        const csvExampleRows = [
            "X-A,Nama Wali Kelas A",
            "XI IPA 1,Nama Wali Kelas B",
            "XII IPS 2,Nama Wali Kelas C",
        ].join("\n");

        const csvContent = csvHeader + csvExampleRows;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "template_import_kelas.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        setNotification('Template berhasil diunduh!');
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const importedKelas: Kelas[] = [
              { id: 901, name: 'X-1', teacher: 'Guru Baru A' },
              { id: 902, name: 'X-2', teacher: 'Guru Baru B' },
              { id: 903, name: 'XI-IPS-3', teacher: 'Guru Baru C' },
              { id: 904, name: 'XII-BHS', teacher: 'Guru Baru D' },
            ];
            setKelasList(importedKelas);
            setNotification('Data kelas berhasil diimpor dan diperbarui secara keseluruhan!');
            event.target.value = '';
        }
    };

  return (
    <>
      {notification && (
        <div className="fixed top-20 right-5 bg-green-500 text-white py-3 px-5 rounded-lg shadow-xl z-50 animate-fade-in-down" role="alert">
          <p className="font-bold">Sukses!</p>
          <p>{notification}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h2 className="text-3xl font-light text-gray-700">Data Kelas</h2>
          <h3 className="text-sm font-light text-gray-500">Informasi Kelas</h3>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md shadow-sm self-end sm:self-auto">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <HomeIcon />
                    <a href="#" className="hover:text-blue-500">Home</a>
                </li>
                <li className="mx-2">/</li>
                <li>Data Kelas</li>
            </ol>
        </div>
      </div>
      
      {showForm && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-3">
              {editingKelas ? 'Edit Kelas' : 'Tambah Kelas Baru'}
            </h3>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-sm font-bold text-gray-600 block">Nama Kelas</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleFormChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                 <div>
                  <label htmlFor="teacher" className="text-sm font-bold text-gray-600 block">Wali Kelas</label>
                  <select 
                    id="teacher" 
                    name="teacher" 
                    value={formData.teacher} 
                    onChange={handleFormChange} 
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
                    required
                  >
                    <option value="" disabled>Pilih Wali Kelas</option>
                    {availableTeachers.map(guru => (
                        <option key={guru.id} value={guru.name}>{guru.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Batal</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{editingKelas ? 'Update' : 'Simpan'}</button>
              </div>
            </form>
        </div>
      )}

      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b-2 border-gray-200 pb-3">
             <h3 className="text-xl font-semibold text-gray-700">Daftar Kelas</h3>
             <div className="flex flex-wrap items-center justify-center gap-2">
                <input type="file" id="import-file" className="hidden" accept=".csv" onChange={handleFileUpload} />
                <label htmlFor="import-file" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded flex items-center cursor-pointer">
                    <UploadIcon />
                    Import Data
                </label>
                <button onClick={handleDownloadTemplate} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    <DownloadIcon />
                    Download Template
                </button>
                <button onClick={handleAddNew} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    <PlusIcon />
                    Tambah Data Kelas
                </button>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kelas</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wali Kelas</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {kelasList.map((kelas, index) => (
                  <tr key={kelas.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{kelas.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{kelas.teacher}</td>
                     <td className="py-4 px-6 text-sm flex space-x-2">
                        <button onClick={() => handleEdit(kelas)} className="text-blue-600 hover:text-blue-900" aria-label={`Edit ${kelas.name}`}><EditIcon /></button>
                        <button onClick={() => handleDelete(kelas)} className="text-red-600 hover:text-red-900" aria-label={`Delete ${kelas.name}`}><DeleteIcon /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && kelasToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <h3 id="delete-modal-title" className="text-xl font-bold text-gray-800">Konfirmasi Hapus</h3>
                <p className="mt-4 text-gray-600">
                    Apakah Anda yakin ingin menghapus kelas <span className="font-semibold">{kelasToDelete.name}</span>?
                    <br />
                    Aksi ini tidak dapat dibatalkan.
                </p>
                <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={cancelDelete} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                        Batal
                    </button>
                    <button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Hapus
                    </button>
                </div>
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
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default DataKelas;
