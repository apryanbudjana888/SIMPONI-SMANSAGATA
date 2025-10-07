import React, { useState, useEffect } from 'react';
import { User, Guru } from '../types';

const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2.586l-3-3z" /></svg>);
const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>);

const GURU_LIST_KEY = 'simpogulip_guru_list';

interface GantiPasswordProps {
  user: User; // The currently logged-in user
}

const GantiPassword: React.FC<GantiPasswordProps> = ({ user }) => {
  const [guruList, setGuruList] = useState<Guru[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Guru | null>(null);
  const [modalFormData, setModalFormData] = useState({ username: '', newPassword: '' });
  
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    try {
      const guruItems = window.localStorage.getItem(GURU_LIST_KEY);
      if (guruItems) {
        setGuruList(JSON.parse(guruItems));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setNotification({ type: 'error', message: 'Gagal memuat data pengguna.' });
    }
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGurus = guruList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(guruList.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleEditClick = (userToEdit: Guru) => {
    setEditingUser(userToEdit);
    setModalFormData({ username: userToEdit.username, newPassword: '' });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleModalSave = () => {
    if (!editingUser) return;

    const isUsernameTaken = guruList.some(g => g.username.trim().toLowerCase() === modalFormData.username.trim().toLowerCase() && g.id !== editingUser.id);
    if (isUsernameTaken) {
        setNotification({ type: 'error', message: 'Username sudah digunakan oleh pengguna lain.' });
        return;
    }

    const updatedGuruList = guruList.map(g => 
      g.id === editingUser.id ? { ...g, username: modalFormData.username.trim() } : g
    );
    // Note: Password change is simulated. In a real app, this would be an API call.
    setGuruList(updatedGuruList);
    window.localStorage.setItem(GURU_LIST_KEY, JSON.stringify(updatedGuruList));
    setNotification({ type: 'success', message: `Akun untuk ${editingUser.name} berhasil diperbarui.`});
    handleModalClose();
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
          <h2 className="text-3xl font-light text-gray-700">Manajemen Akun Guru & Staf</h2>
          <h3 className="text-sm font-light text-gray-500">Ubah username atau reset password untuk semua pengguna.</h3>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md shadow-sm">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <HomeIcon />
                    <a href="#" className="hover:text-blue-500">Home</a>
                </li>
                <li className="mx-2">/</li>
                <li>Manajemen Akun</li>
            </ol>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-3">Daftar Guru & Staf</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
                   <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentGurus.length > 0 ? currentGurus.map((guru, index) => (
                  <tr key={guru.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-900">{indexOfFirstItem + index + 1}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{guru.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{guru.position}</td>
                    <td className="py-4 px-6 text-sm text-gray-500 font-mono">{guru.username}</td>
                    <td className="py-4 px-6 text-sm flex space-x-2">
                        <button onClick={() => handleEditClick(guru)} className="flex items-center text-blue-600 hover:text-blue-900 text-sm bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-md" aria-label={`Edit ${guru.name}`}><EditIcon /> Edit Akun</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">Tidak ada data guru.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-between items-center">
              <span className="text-sm text-gray-700">
                  Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, guruList.length)}</span> of <span className="font-semibold">{guruList.length}</span> results
              </span>
              <nav aria-label="Pagination">
                <ul className="inline-flex items-center -space-x-px">
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
          </div>
        </div>
      </div>
      
      {isModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" role="dialog" aria-modal="true">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
                <h3 className="text-xl font-bold text-gray-800">Edit Akun: {editingUser.name}</h3>
                <div className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="username" className="text-sm font-bold text-gray-600 block">Username</label>
                        <input id="username" type="text" value={modalFormData.username} onChange={e => setModalFormData({...modalFormData, username: e.target.value})} className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="text-sm font-bold text-gray-600 block">Password Baru (Opsional)</label>
                        <input id="newPassword" type="password" placeholder="Masukkan password baru" value={modalFormData.newPassword} onChange={e => setModalFormData({...modalFormData, newPassword: e.target.value})} className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
                        <p className="text-xs text-gray-500 mt-1">Kosongkan jika tidak ingin mengubah password.</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={handleModalClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Batal</button>
                    <button onClick={handleModalSave} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Simpan Perubahan</button>
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
      `}</style>
    </>
  );
};

export default GantiPassword;