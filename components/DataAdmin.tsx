import React, { useState, useEffect, useMemo } from 'react';
import { Guru } from '../types';

const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2.586l-3-3z" /></svg>);

const GURU_LIST_KEY = 'simpogulip_guru_list';
const ACTIVE_ADMIN_IDS_KEY = 'simpogulip_active_admin_ids';

const placeholderGurus: Guru[] = [
  { id: 1, name: 'Sasmadi', position: 'Kepala Sekolah', username: 'gulip1' },
  { id: 2, name: 'Hary Soebagio', position: 'Guru Mapel', username: 'gulip2' },
  { id: 3, name: 'Rosmalia', position: 'Guru Mapel', username: 'gulip3' },
  { id: 4, name: 'Wiwin Sumiati', position: 'Waka. Kurikulum', username: 'gulip4' },
  { id: 5, name: 'Rachmat Priyono', position: 'Guru Mapel', username: 'gulip5' },
  { id: 6, name: 'Lestari Handayani', position: 'Guru Mapel', username: 'gulip6' },
  { id: 7, name: 'Marlinawati', position: 'Guru Mapel', username: 'gulip7' },
  { id: 8, name: 'Meily Rosmayanti', position: 'Waka. Kesiswaan', username: 'gulip8' },
  { id: 9, name: 'Lulut Ermasari', position: 'Guru Mapel', username: 'gulip9' },
  { id: 10, name: 'Ernawati', position: 'Guru Mapel', username: 'gulip10' },
  { id: 11, name: 'Harry Prasetio Nugroho', position: 'Guru Mapel', username: 'gulip11' },
  { id: 12, name: 'Hendricus Yuli Fitriyanto', position: 'Guru Mapel', username: 'gulip12' },
  { id: 13, name: 'Koko Kurniawan', position: 'Waka. Sarpras', username: 'gulip13' },
  { id: 14, name: 'Asih Triyanti', position: 'Waka. Humas', username: 'gulip14' },
  { id: 15, name: 'Ely Tsulust', position: 'Guru Mapel', username: 'gulip15' },
  { id: 16, name: 'Ismiatun', position: 'Guru BK', username: 'gulip16' },
  { id: 17, name: 'Evi Maryanti', position: 'Guru Mapel', username: 'gulip17' },
  { id: 18, name: 'Ismi Deshayati', position: 'Guru Mapel', username: 'gulip18' },
  { id: 19, name: 'Nurmawati', position: 'Guru Mapel', username: 'gulip19' },
  { id: 20, name: 'Nanik Rofiah', position: 'Guru Mapel', username: 'gulip20' },
  { id: 21, name: 'Rahmad Ashadi', position: 'Guru BK', username: 'gulip21' },
  { id: 22, name: 'Wely Silvia', position: 'Guru Mapel', username: 'gulip22' },
  { id: 23, name: 'Ade Aulia Sukma', position: 'Guru Mapel', username: 'gulip23' },
  { id: 24, name: 'Alfiatun Nuraini', position: 'Guru Mapel', username: 'gulip24' },
  { id: 25, name: 'Agus Apriyanto', position: 'Guru Mapel', username: 'gulip25' },
  { id: 26, name: 'Albaddri Duja S.L', position: 'Guru Mapel', username: 'gulip26' },
  { id: 27, name: 'Sri Lestari', position: 'Guru Mapel', username: 'gulip27' },
  { id: 28, name: 'Citra Hardina', position: 'Guru Mapel', username: 'gulip28' },
  { id: 29, name: 'Ferdina Nur Fitria', position: 'Guru BK', username: 'gulip29' },
  { id: 30, name: 'Rudi Hendra', position: 'Guru Mapel', username: 'gulip30' },
  { id: 31, name: 'Ade Novita Sari', position: 'Guru Mapel', username: 'gulip31' },
  { id: 32, name: 'Listiani', position: 'Guru Mapel', username: 'gulip32' },
  { id: 33, name: 'Monica Jienta Nabila', position: 'Guru Mapel', username: 'gulip33' },
  { id: 34, name: 'Decky Ramandha', position: 'Guru Mapel', username: 'gulip34' },
  { id: 35, name: 'Ferrianda Yusni, S.Kom', position: 'Tendik', username: 'gulip35' },
  { id: 36, name: 'Dodi Hidayat, S.Kom', position: 'Tendik', username: 'gulip36' },
  { id: 37, name: 'Vina Septalia, S.Kom', position: 'Tendik', username: 'gulip37' },
  { id: 38, name: 'Suhariyanto, A.Md', position: 'Tendik', username: 'gulip38' },
  { id: 39, name: 'Rizki Adi Winarko, A.Md', position: 'Tendik', username: 'gulip39' },
  { id: 40, name: 'Sisce Aditia', position: 'Tendik', username: 'gulip40' },
  { id: 41, name: 'Zavira Qurota Aini', position: 'Tendik', username: 'gulip41' },
  { id: 42, name: 'Lisa Safera', position: 'Tendik', username: 'gulip42' },
  { id: 43, name: 'Reno Syahputra', position: 'Tendik', username: 'gulip43' },
  { id: 44, name: 'Zainuri', position: 'Tendik', username: 'gulip44' },
  { id: 45, name: 'Hepi Hayati', position: 'Tendik', username: 'gulip45' },
  { id: 46, name: 'Hayuzal', position: 'Tendik', username: 'gulip46' },
];

const DataAdmin: React.FC = () => {
    const [userList, setUserList] = useState<Guru[]>([]);
    const [activeAdminIds, setActiveAdminIds] = useState<Set<number>>(new Set());
    const [notification, setNotification] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        try {
            const guruItems = window.localStorage.getItem(GURU_LIST_KEY);
            setUserList(guruItems ? JSON.parse(guruItems) : placeholderGurus);
        } catch (error) {
            console.error("Error loading guru list:", error);
            setUserList(placeholderGurus);
        }

        try {
            const adminIdItems = window.localStorage.getItem(ACTIVE_ADMIN_IDS_KEY);
            // By default, activate 'Wiwin Sumiati' as an admin if no setting exists
            const defaultAdmin = placeholderGurus.find(g => g.name.includes("Wiwin Sumiati")) || placeholderGurus[0];
            setActiveAdminIds(adminIdItems ? new Set(JSON.parse(adminIdItems)) : new Set([defaultAdmin.id]));
        } catch (error) {
            console.error("Error loading active admin IDs:", error);
            const defaultAdmin = placeholderGurus.find(g => g.name.includes("Wiwin Sumiati")) || placeholderGurus[0];
            setActiveAdminIds(new Set([defaultAdmin.id]));
        }
    }, []);

    useEffect(() => {
        try {
            window.localStorage.setItem(ACTIVE_ADMIN_IDS_KEY, JSON.stringify(Array.from(activeAdminIds)));
        } catch (error) {
            console.error("Error saving active admin IDs:", error);
        }
    }, [activeAdminIds]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const usersWithAdminStatus = useMemo(() => {
        return userList.map(user => ({
            ...user,
            isActiveAdmin: activeAdminIds.has(user.id),
        }));
    }, [userList, activeAdminIds]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = usersWithAdminStatus.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(usersWithAdminStatus.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleToggleAdminStatus = (userId: number, userName: string) => {
        const newActiveAdminIds = new Set(activeAdminIds);
        let action: 'diaktifkan' | 'dinonaktifkan';

        if (newActiveAdminIds.has(userId)) {
            newActiveAdminIds.delete(userId);
            action = 'dinonaktifkan';
        } else {
            newActiveAdminIds.add(userId);
            action = 'diaktifkan';
        }

        setActiveAdminIds(newActiveAdminIds);
        setNotification(`User "${userName}" berhasil ${action} sebagai admin.`);
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
          <h2 className="text-3xl font-light text-gray-700">Manajemen Admin</h2>
          <h3 className="text-sm font-light text-gray-500">Aktifkan atau Nonaktifkan Admin</h3>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md shadow-sm self-end sm:self-auto">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <HomeIcon />
                    <a href="#" className="hover:text-blue-500">Home</a>
                </li>
                <li className="mx-2">/</li>
                <li>Data Admin</li>
            </ol>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center border-b-2 border-gray-200 pb-3">
             <h3 className="text-xl font-semibold text-gray-700">Daftar Pengguna</h3>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Admin</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-900">{indexOfFirstItem + index + 1}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{user.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{user.position}</td>
                    <td className="py-4 px-6 text-sm">
                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActiveAdmin ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.isActiveAdmin ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm">
                        <button 
                            onClick={() => handleToggleAdminStatus(user.id, user.name)} 
                            className={`font-bold py-2 px-4 rounded text-white ${user.isActiveAdmin ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-green-500 hover:bg-green-700'}`}
                            aria-label={user.isActiveAdmin ? `Nonaktifkan ${user.name}` : `Aktifkan ${user.name}`}
                        >
                            {user.isActiveAdmin ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
               <span className="text-sm text-gray-700">
                  Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, usersWithAdminStatus.length)}</span> of <span className="font-semibold">{usersWithAdminStatus.length}</span> results
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
                  {/* Pagination numbers can be added for more complex scenarios */}
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
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

export default DataAdmin;
