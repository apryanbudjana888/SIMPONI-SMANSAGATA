import React, { useState, useEffect } from 'react';

const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2.586l-3-3z" /></svg>);
const PlusIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>);
const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>);
const DeleteIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>);

interface TahunAjaran {
    id: number;
    year: string;
    status: 'Aktif' | 'Non-Aktif';
}

const placeholderTahunAjaran: TahunAjaran[] = [
  { id: 1, year: '2025/2026', status: 'Aktif' },
];

const DataTahunAjaran: React.FC = () => {
    const [tahunAjaranList, setTahunAjaranList] = useState<TahunAjaran[]>(placeholderTahunAjaran);
    const [showForm, setShowForm] = useState(false);
    const [editingTahunAjaran, setEditingTahunAjaran] = useState<TahunAjaran | null>(null);
    const [formData, setFormData] = useState<TahunAjaran>({ id: 0, year: '', status: 'Aktif' });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [tahunAjaranToDelete, setTahunAjaranToDelete] = useState<TahunAjaran | null>(null);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleAddNew = () => {
        setEditingTahunAjaran(null);
        setFormData({ id: 0, year: '', status: 'Aktif' });
        setShowForm(true);
    };

    const handleEdit = (item: TahunAjaran) => {
        setEditingTahunAjaran(item);
        setFormData(item);
        setShowForm(true);
    };

    const handleDelete = (item: TahunAjaran) => {
        setTahunAjaranToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (tahunAjaranToDelete) {
            setTahunAjaranList(tahunAjaranList.filter(item => item.id !== tahunAjaranToDelete.id));
            setNotification(`Tahun ajaran "${tahunAjaranToDelete.year}" berhasil dihapus.`);
            setIsDeleteModalOpen(false);
            setTahunAjaranToDelete(null);
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setTahunAjaranToDelete(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingTahunAjaran(null);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value } as TahunAjaran));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTahunAjaran) {
            setTahunAjaranList(tahunAjaranList.map(item => item.id === editingTahunAjaran.id ? formData : item));
            setNotification('Data tahun ajaran berhasil diperbarui!');
        } else {
            setTahunAjaranList([...tahunAjaranList, { ...formData, id: Date.now() }]);
            setNotification('Tahun ajaran baru berhasil ditambahkan!');
        }
        setShowForm(false);
        setEditingTahunAjaran(null);
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
          <h2 className="text-3xl font-light text-gray-700">Data Tahun Ajaran</h2>
          <h3 className="text-sm font-light text-gray-500">Informasi Tahun Ajaran</h3>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md shadow-sm self-end sm:self-auto">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <HomeIcon />
                    <a href="#" className="hover:text-blue-500">Home</a>
                </li>
                <li className="mx-2">/</li>
                <li>Data Tahun Ajaran</li>
            </ol>
        </div>
      </div>
      
      {showForm && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-3">
              {editingTahunAjaran ? 'Edit Tahun Ajaran' : 'Tambah Tahun Ajaran Baru'}
            </h3>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="year" className="text-sm font-bold text-gray-600 block">Tahun Ajaran</label>
                  <input id="year" name="year" type="text" placeholder="Contoh: 2024/2025" value={formData.year} onChange={handleFormChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="status" className="text-sm font-bold text-gray-600 block">Status</label>
                  <select id="status" name="status" value={formData.status} onChange={handleFormChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="Aktif">Aktif</option>
                    <option value="Non-Aktif">Non-Aktif</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Batal</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{editingTahunAjaran ? 'Update' : 'Simpan'}</button>
              </div>
            </form>
        </div>
      )}

      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b-2 border-gray-200 pb-3">
             <h3 className="text-xl font-semibold text-gray-700">Daftar Tahun Ajaran</h3>
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
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun Ajaran</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tahunAjaranList.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{item.year}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm flex space-x-2">
                        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900" aria-label={`Edit ${item.year}`}><EditIcon /></button>
                        <button onClick={() => handleDelete(item)} className="text-red-600 hover:text-red-900" aria-label={`Delete ${item.year}`}><DeleteIcon /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && tahunAjaranToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <h3 id="delete-modal-title" className="text-xl font-bold text-gray-800">Konfirmasi Hapus</h3>
                <p className="mt-4 text-gray-600">
                    Apakah Anda yakin ingin menghapus tahun ajaran <span className="font-semibold">{tahunAjaranToDelete.year}</span>?
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

export default DataTahunAjaran;
