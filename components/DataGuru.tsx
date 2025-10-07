import React, { useState, useEffect } from 'react';
import { Guru } from '../types';

const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2.586l-3-3z" /></svg>);
const PlusIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>);
const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>);
const DeleteIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>);

const placeholderGurus: Guru[] = [
  { id: 1, name: 'Sasmadi', position: 'Admin', username: 'gulip1', password: 'smansagata', gender: 'male' },
  { id: 2, name: 'Hary Soebagio', position: 'Guru Mapel', username: 'gulip2', password: 'smansagata', gender: 'male' },
  { id: 3, name: 'Rosmalia', position: 'Guru Mapel', username: 'gulip3', password: 'smansagata', gender: 'female' },
  { id: 4, name: 'Wiwin Sumiati', position: 'Admin', username: 'gulip4', password: 'smansagata', gender: 'female' },
  { id: 5, name: 'Rachmat Priyono', position: 'Guru Mapel', username: 'gulip5', password: 'smansagata', gender: 'male' },
  { id: 6, name: 'Lestari Handayani', position: 'Guru Mapel', username: 'gulip6', password: 'smansagata', gender: 'female' },
  { id: 7, name: 'Marlinawati', position: 'Guru Mapel', username: 'gulip7', password: 'smansagata', gender: 'female' },
  { id: 8, name: 'Meily Rosmayanti', position: 'Admin', username: 'gulip8', password: 'smansagata', gender: 'female' },
  { id: 9, name: 'Lulut Ermasari', position: 'Guru Mapel', username: 'gulip9', password: 'smansagata', gender: 'female' },
  { id: 10, name: 'Ernawati', position: 'Guru Mapel', username: 'gulip10', password: 'smansagata', gender: 'female' },
  { id: 11, name: 'Harry Prasetio Nugroho', position: 'Guru Mapel', username: 'gulip11', password: 'smansagata', gender: 'male' },
  { id: 12, name: 'Hendricus Yuli Fitriyanto', position: 'Admin', username: 'gulip12', password: 'smansagata', gender: 'male' },
  { id: 13, name: 'Koko Kurniawan', position: 'Admin', username: 'gulip13', password: 'smansagata', gender: 'male' },
  { id: 14, name: 'Asih Triyanti', position: 'Admin', username: 'gulip14', password: 'smansagata', gender: 'female' },
  { id: 15, name: 'Ely Tsulust', position: 'Guru Mapel', username: 'gulip15', password: 'smansagata', gender: 'female' },
  { id: 16, name: 'Ismiatun', position: 'Guru BK', username: 'gulip16', password: 'smansagata', gender: 'female' },
  { id: 17, name: 'Evi Maryanti', position: 'Guru Mapel', username: 'gulip17', password: 'smansagata', gender: 'female' },
  { id: 18, name: 'Ismi Deshayati', position: 'Guru Mapel', username: 'gulip18', password: 'smansagata', gender: 'female' },
  { id: 19, name: 'Nurmawati', position: 'Guru Mapel', username: 'gulip19', password: 'smansagata', gender: 'female' },
  { id: 20, name: 'Nanik Rofiah', position: 'Guru Mapel', username: 'gulip20', password: 'smansagata', gender: 'female' },
  { id: 21, name: 'Rahmad Ashadi', position: 'Guru BK', username: 'gulip21', password: 'smansagata', gender: 'male' },
  { id: 22, name: 'Wely Silvia', position: 'Guru Mapel', username: 'gulip22', password: 'smansagata', gender: 'female' },
  { id: 23, name: 'Ade Aulia Sukma', position: 'Guru Mapel', username: 'gulip23', password: 'smansagata', gender: 'female' },
  { id: 24, name: 'Alfiatun Nuraini', position: 'Guru Mapel', username: 'gulip24', password: 'smansagata', gender: 'female' },
  { id: 25, name: 'Agus Apriyanto', position: 'Guru Mapel', username: 'gulip25', password: 'smansagata', gender: 'male' },
  { id: 26, name: 'Albaddri Duja S.L', position: 'Guru Mapel', username: 'gulip26', password: 'smansagata', gender: 'male' },
  { id: 27, name: 'Sri Lestari', position: 'Guru Mapel', username: 'gulip27', password: 'smansagata', gender: 'female' },
  { id: 28, name: 'Citra Hardina', position: 'Guru Mapel', username: 'gulip28', password: 'smansagata', gender: 'female' },
  { id: 29, name: 'Ferdina Nur Fitria', position: 'Guru BK', username: 'gulip29', password: 'smansagata', gender: 'female' },
  { id: 30, name: 'Rudi Hendra', position: 'Guru Mapel', username: 'gulip30', password: 'smansagata', gender: 'male' },
  { id: 31, name: 'Ade Novita Sari', position: 'Guru Mapel', username: 'gulip31', password: 'smansagata', gender: 'female' },
  { id: 32, name: 'Listiani', position: 'Guru Mapel', username: 'gulip32', password: 'smansagata', gender: 'female' },
  { id: 33, name: 'Monica Jienta Nabila', position: 'Guru Mapel', username: 'gulip33', password: 'smansagata', gender: 'female' },
  { id: 34, name: 'Decky Ramandha', position: 'Guru Mapel', username: 'gulip34', password: 'smansagata', gender: 'male' },
];

const LOCAL_STORAGE_KEY = 'simpogulip_guru_list';

const DataGuru: React.FC = () => {
    const [guruList, setGuruList] = useState<Guru[]>(() => {
        try {
            const items = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            return items ? JSON.parse(items) : placeholderGurus;
        } catch (error) {
            console.error("Could not load teachers from local storage", error);
            return placeholderGurus;
        }
    });
    
    useEffect(() => {
        try {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guruList));
        } catch (error) {
            console.error("Could not save teachers to local storage", error);
        }
    }, [guruList]);

    const [showForm, setShowForm] = useState(false);
    const [editingGuru, setEditingGuru] = useState<Guru | null>(null);
    const [formData, setFormData] = useState({ id: 0, name: '', position: '', username: '', gender: 'male' as 'male' | 'female' });
    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [guruToDelete, setGuruToDelete] = useState<Guru | null>(null);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleAddNew = () => {
        setEditingGuru(null);
        setFormData({ id: 0, name: '', position: '', username: '', gender: 'male' });
        setShowForm(true);
    };

    const handleEdit = (guru: Guru) => {
        setEditingGuru(guru);
        setFormData({ ...guru, gender: guru.gender || 'male' });
        setShowForm(true);
    };

    const handleDelete = (guru: Guru) => {
        setGuruToDelete(guru);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (guruToDelete) {
            setGuruList(guruList.filter(g => g.id !== guruToDelete.id));
            setNotification(`Guru "${guruToDelete.name}" berhasil dihapus.`);
            setIsDeleteModalOpen(false);
            setGuruToDelete(null);
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setGuruToDelete(null);
    };
    
    const handleCancel = () => {
        setShowForm(false);
        setEditingGuru(null);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value as any }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingGuru) {
            setGuruList(guruList.map(g => g.id === editingGuru.id ? formData : g));
            setNotification('Data guru berhasil diperbarui!');
        } else {
            setGuruList([...guruList, { ...formData, id: Date.now() }]);
            setNotification('Guru baru berhasil ditambahkan!');
        }
        setShowForm(false);
        setEditingGuru(null);
    };

  return (
    <>
      {notification && (
        <div className="fixed top-20 right-5 bg-green-500 text-white py-3 px-5 rounded-lg shadow-xl z-50 animate-fade-in-down" role="alert">
          <p className="font-bold">Sukses!</p>
          <p>{notification}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-light text-gray-700">Data Guru & Staf</h2>
          <h3 className="text-sm font-light text-gray-500">Informasi Guru dan Staf Sekolah</h3>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md shadow-sm">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <HomeIcon />
                    <a href="#" className="hover:text-blue-500">Home</a>
                </li>
                <li className="mx-2">/</li>
                <li>Data Guru</li>
            </ol>
        </div>
      </div>
      
      {showForm && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-3">
              {editingGuru ? 'Edit Data Guru' : 'Tambah Data Guru Baru'}
            </h3>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-sm font-bold text-gray-600 block">Nama</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleFormChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                 <div>
                  <label htmlFor="position" className="text-sm font-bold text-gray-600 block">Jabatan</label>
                  <input id="position" name="position" type="text" value={formData.position} onChange={handleFormChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm font-bold text-gray-600 block">Jenis Kelamin</label>
                    <div className="mt-2 flex space-x-6">
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleFormChange} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                            <span className="ml-2 text-gray-700">Laki-laki</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleFormChange} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                            <span className="ml-2 text-gray-700">Perempuan</span>
                        </label>
                    </div>
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Batal</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{editingGuru ? 'Update' : 'Simpan'}</button>
              </div>
            </form>
        </div>
      )}

      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center border-b-2 border-gray-200 pb-3">
             <h3 className="text-xl font-semibold text-gray-700">Daftar Guru dan Staf</h3>
             <button onClick={handleAddNew} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                <PlusIcon />
                Tambah Data
             </button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {guruList.map((guru, index) => (
                  <tr key={guru.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{guru.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{guru.position}</td>
                     <td className="py-4 px-6 text-sm flex space-x-2">
                        <button onClick={() => handleEdit(guru)} className="text-blue-600 hover:text-blue-900" aria-label={`Edit ${guru.name}`}><EditIcon /></button>
                        <button onClick={() => handleDelete(guru)} className="text-red-600 hover:text-red-900" aria-label={`Delete ${guru.name}`}><DeleteIcon /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && guruToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <h3 id="delete-modal-title" className="text-xl font-bold text-gray-800">Konfirmasi Hapus</h3>
                <p className="mt-4 text-gray-600">
                    Apakah Anda yakin ingin menghapus data <span className="font-semibold">{guruToDelete.name}</span>?
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

export default DataGuru;