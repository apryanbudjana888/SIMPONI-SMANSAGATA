import React, { useState, useEffect } from 'react';

const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2.586l-3-3z" /></svg>);
const PlusIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>);
const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>);
const DeleteIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>);

const LOCAL_STORAGE_KEY = 'simpogulip_prestasi_list';

interface Prestasi {
  id: number;
  name: string;
  points: number;
}

const placeholderPrestasi: Prestasi[] = [
  // A. Prestasi Akademik
  { id: 1, name: 'Meraih Peringkat / Juara Kelas 1-3', points: 25 },
  { id: 2, name: 'Mempunyai karya (karya ilmiah, artikel untuk majalah sekolah)', points: 15 },
  { id: 3, name: 'Menjadi peserta lomba akademik tingkat sekolah', points: 10 },
  { id: 4, name: 'Juara lomba akademik tingkat kabupaten/kota', points: 20 },
  { id: 5, name: 'Juara lomba akademik tingkat provinsi', points: 40 },
  { id: 6, name: 'Juara lomba akademik tingkat nasional', points: 60 },
  // B. Prestasi Non-Akademik
  { id: 7, name: 'Juara lomba olahraga/seni tingkat sekolah', points: 10 },
  { id: 8, name: 'Juara lomba olahraga/seni tingkat kabupaten/kota', points: 20 },
  { id: 9, name: 'Juara lomba olahraga/seni tingkat provinsi/nasional', points: 40 },
  { id: 10, name: 'Juara lomba olahraga/seni tingkat nasional', points: 60 },
  { id: 11, name: 'Menjadi perwakilan sekolah dalam event resmi (olahraga, seni, OSN, FLS2N)', points: 15 },
  // C. Keteladanan & Kedisiplinan
  { id: 12, name: 'Hadir tepat waktu tanpa absen selama 1 bulan', points: 10 },
  { id: 13, name: 'Menjadi teladan kedisiplinan di kelas selama 1 bulan', points: 10 },
  { id: 14, name: 'Mengikuti upacara dengan sikap sempurna dan tertib selama 1 semester', points: 10 },
  { id: 15, name: 'Tidak pernah melanggar tata tertib selama 1 semester', points: 15 },
  // D. Kepedulian dan Partisipasi
  { id: 16, name: 'Menolong teman/guru/warga sekolah yang kesulitan', points: 5 },
  { id: 17, name: 'Aktif menjaga kebersihan kelas/lingkungan sekolah tanpa diminta', points: 5 },
  { id: 18, name: 'Mengikuti kegiatan bakti sosial sekolah', points: 5 },
  { id: 19, name: 'Menjadi petugas upacara dengan baik dan bertanggungjawab', points: 10 },
  { id: 20, name: 'Menjadi panitia kegiatan sekolah', points: 10 },
  // E. Pengembangan Diri
  { id: 21, name: 'Menjadi pengurus OSIS/ekstrakurikuler aktif', points: 15 },
  { id: 22, name: 'Menjadi Narasumber dalam kegiatan sekolah', points: 10 },
  { id: 23, name: 'Mengikuti seminar/pelatihan di luar sekolah dengan izin resmi', points: 10 },
  { id: 24, name: 'Membuat karya inovasi atau prakarya bermanfaat untuk sekolah', points: 20 },
];

const DataPrestasi: React.FC = () => {
  const [prestasiList, setPrestasiList] = useState<Prestasi[]>(() => {
    try {
      const items = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return items ? JSON.parse(items) : placeholderPrestasi;
    } catch (error) {
      console.error("Could not load achievements data", error);
      return placeholderPrestasi;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prestasiList));
    } catch (error) {
      console.error("Could not save achievements data", error);
    }
  }, [prestasiList]);

  const [showForm, setShowForm] = useState(false);
  const [editingPrestasi, setEditingPrestasi] = useState<Prestasi | null>(null);
  const [formData, setFormData] = useState({ id: 0, name: '', points: 0 });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [prestasiToDelete, setPrestasiToDelete] = useState<Prestasi | null>(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAddNew = () => {
    setEditingPrestasi(null);
    setFormData({ id: 0, name: '', points: 0 });
    setShowForm(true);
  };

  const handleEdit = (prestasi: Prestasi) => {
    setEditingPrestasi(prestasi);
    setFormData(prestasi);
    setShowForm(true);
  };

  const handleDelete = (prestasi: Prestasi) => {
    setPrestasiToDelete(prestasi);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (prestasiToDelete) {
      setPrestasiList(prestasiList.filter(p => p.id !== prestasiToDelete.id));
      setNotification(`Prestasi "${prestasiToDelete.name}" berhasil dihapus.`);
      setIsDeleteModalOpen(false);
      setPrestasiToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setPrestasiToDelete(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPrestasi(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPrestasi) {
      setPrestasiList(prestasiList.map(p => p.id === editingPrestasi.id ? formData : p));
      setNotification('Data prestasi berhasil diperbarui!');
    } else {
      setPrestasiList([...prestasiList, { ...formData, id: Date.now() }]);
      setNotification('Prestasi baru berhasil ditambahkan!');
    }
    setShowForm(false);
    setEditingPrestasi(null);
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
          <h2 className="text-3xl font-light text-gray-700">Data Prestasi</h2>
          <h3 className="text-sm font-light text-gray-500">Informasi Jenis Prestasi</h3>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md shadow-sm self-end sm:self-auto">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <HomeIcon />
                    <a href="#" className="hover:text-blue-500">Home</a>
                </li>
                <li className="mx-2">/</li>
                <li>Data Prestasi</li>
            </ol>
        </div>
      </div>
      
      {showForm && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-3">
              {editingPrestasi ? 'Edit Prestasi' : 'Tambah Prestasi Baru'}
            </h3>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-sm font-bold text-gray-600 block">Nama Prestasi</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleFormChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="points" className="text-sm font-bold text-gray-600 block">Poin</label>
                  <input id="points" name="points" type="number" value={formData.points} onChange={handleFormChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Batal</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{editingPrestasi ? 'Update' : 'Simpan'}</button>
              </div>
            </form>
        </div>
      )}

      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b-2 border-gray-200 pb-3">
             <h3 className="text-xl font-semibold text-gray-700">Daftar Jenis Prestasi</h3>
             <button onClick={handleAddNew} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                <PlusIcon />
                Tambah Data Prestasi
             </button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Prestasi</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poin</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {prestasiList.map((prestasi, index) => (
                  <tr key={prestasi.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{prestasi.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{prestasi.points}</td>
                    <td className="py-4 px-6 text-sm flex space-x-2">
                        <button onClick={() => handleEdit(prestasi)} className="text-blue-600 hover:text-blue-900" aria-label={`Edit ${prestasi.name}`}><EditIcon /></button>
                        <button onClick={() => handleDelete(prestasi)} className="text-red-600 hover:text-red-900" aria-label={`Delete ${prestasi.name}`}><DeleteIcon /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && prestasiToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <h3 id="delete-modal-title" className="text-xl font-bold text-gray-800">Konfirmasi Hapus</h3>
                <p className="mt-4 text-gray-600">
                    Apakah Anda yakin ingin menghapus prestasi <span className="font-semibold">{prestasiToDelete.name}</span>?
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

export default DataPrestasi;
