import React, { useState, useEffect } from 'react';

const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2.586l-3-3z" /></svg>);
const PlusIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>);
const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>);
const DeleteIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>);

const LOCAL_STORAGE_KEY = 'simpogulip_pelanggaran_list';

interface Pelanggaran {
    id: number;
    name: string;
    points: number;
}

const placeholderPelanggaran: Pelanggaran[] = [
    // A. Terlambat
    { id: 1, name: 'Terlambat masuk sekolah', points: -2 },
    { id: 2, name: 'Terlambat setelah bel istirahat berbunyi', points: -2 },
    { id: 3, name: 'Terlambat masuk kelas saat pergantian mata pelajaran', points: -2 },
    { id: 4, name: 'Izin keluar saat KBM dan tidak kembali lagi', points: -5 },
    // B. Kehadiran
    { id: 5, name: 'Tidak masuk sekolah (surat kepentingan keluarga tidak jelas)', points: -2 },
    { id: 6, name: 'Tidak masuk sekolah tanpa keterangan', points: -5 },
    { id: 7, name: 'Tidak hadir tanpa keterangan dalam kegiatan sekolah', points: -5 },
    { id: 8, name: 'Tidak masuk dengan keterangan palsu', points: -5 },
    { id: 9, name: 'Keluar lingkungan sekolah tanpa izin dan tidak kembali (bolos)', points: -10 },
    { id: 10, name: 'Keluar/masuk sekolah/kelas tidak melalui pintu (melompat)', points: -10 },
    // C. Berpakaian
    { id: 11, name: 'Memakai seragam tidak sesuai ketentuan/hari', points: -5 },
    { id: 12, name: 'Memakai seragam tidak lengkap', points: -5 },
    { id: 13, name: 'Baju putra tidak dimasukan ke dalam celana (Senin-Jumat)', points: -5 },
    { id: 14, name: 'Baju putri tidak dimasukan ke dalam rok (kecuali olahraga)', points: -5 },
    { id: 15, name: 'Baju/rok ketat, celana pensil, atau potongan tidak sesuai', points: -5 },
    { id: 16, name: 'Celana/rok/baju sengaja dijahit lebih pendek', points: -5 },
    { id: 17, name: 'Seragam ada grafiti/tulisan, kumal, atau sobek', points: -5 },
    { id: 18, name: 'Siswa putra tidak memakai ikat pinggang/ikat pinggang selain hitam', points: -5 },
    { id: 19, name: 'Membuat model seragam sendiri/bahan tidak sesuai', points: -5 },
    { id: 20, name: 'Memakai seragam/atribut yang dicoret-coret', points: -5 },
    { id: 21, name: 'Memakai jilbab tidak sesuai ketentuan', points: -5 },
    { id: 22, name: 'Tidak memakai seragam olahraga pada jamnya', points: -5 },
    { id: 23, name: 'Memakai seragam olahraga di luar jamnya', points: -5 },
    { id: 24, name: 'Tidak memakai/memberi warna bedge lokasi sekolah', points: -5 },
    { id: 25, name: 'Memakai sepatu/sandal tidak sesuai ketentuan', points: -5 },
    { id: 26, name: 'Memakai sandal saat KBM', points: -5 },
    { id: 27, name: 'Tidak memakai kaos kaki sesuai ketentuan', points: -5 },
    { id: 28, name: 'Siswa putri tidak memakai kaos kaki panjang', points: -5 },
    { id: 29, name: 'Tas ada grafiti/gambar tidak pantas', points: -5 },
    { id: 30, name: 'Berseragam dengan atribut sekolah lain', points: -5 },
    // D. Ketertiban
    { id: 31, name: 'Mencoret-coret barang milik sekolah', points: -5 },
    { id: 32, name: 'Merusak barang milik sekolah/orang lain', points: -10 },
    { id: 33, name: 'Berada di kantin saat KBM berlangsung', points: -5 },
    { id: 34, name: 'Menggunakan HP saat KBM tanpa izin guru', points: -10 },
    { id: 35, name: 'Menggunakan alat permainan lain saat jam pelajaran', points: -5 },
    { id: 36, name: 'Pelecehan/penghinaan terhadap guru/PPL saat KBM', points: -25 },
    { id: 37, name: 'Memarkir kendaraan di luar area sekolah saat KBM', points: -10 },
    // E. Pelaksanaan Ibadah
    { id: 38, name: 'Tidak melaksanakan sholat Dzuhur/Jum\'at berjama\'ah', points: -5 },
    { id: 39, name: 'Tidak mengikuti kegiatan Pesantren Ramadhan', points: -20 },
    { id: 40, name: 'Tidak berpuasa saat Ramadhan tanpa alasan', points: -10 },
    // F. Kepribadian
    { id: 41, name: 'Siswa putri memakai perhiasan/make up berlebihan', points: -5 },
    { id: 42, name: 'Berkuku panjang', points: -3 },
    { id: 43, name: 'Berambut gondrong', points: -5 },
    { id: 44, name: 'Rambut diwarnai (pirang)', points: -5 },
    { id: 45, name: 'Mengeluarkan kata-kata kotor/tidak wajar', points: -5 },
    { id: 46, name: 'Memberi keterangan palsu', points: -10 },
    { id: 47, name: 'Memalsukan tanda tangan', points: -10 },
    { id: 48, name: 'Bermain kartu/sejenisnya di lingkungan sekolah', points: -10 },
    { id: 49, name: 'Berkata kasar pada guru/karyawan/orang lebih tua', points: -20 },
    { id: 50, name: 'Bertato', points: -20 },
    { id: 51, name: 'Siswa putra memakai asesoris (gelang, kalung, anting, dll)', points: -5 },
    { id: 52, name: 'Memakai tindik tidak pada tempatnya', points: -15 },
    { id: 53, name: 'Meluapkan emosi berlebihan (berteriak, membanting, dll)', points: -20 },
    // G. Rokok, Miras, Narkoba
    { id: 54, name: 'Membawa/menghisap rokok di lingkungan sekolah', points: -20 },
    { id: 55, name: 'Merokok saat berseragam sekolah (termasuk di luar)', points: -20 },
    { id: 56, name: 'Membawa narkoba/miras di dalam/luar sekolah', points: -80 },
    { id: 57, name: 'Mengedarkan/mengonsumsi narkoba/miras', points: -100 },
    // H. Perilaku Seksual
    { id: 58, name: 'Berpacaran berduaan di lingkungan sekolah', points: -20 },
    { id: 59, name: 'Berpacaran dengan tenaga pendidik/kependidikan', points: -50 },
    { id: 60, name: 'Membawa/melihat/menjual media porno/alat kontrasepsi', points: -80 },
    { id: 61, name: 'Membuat/menyebarkan konten asusila', points: -100 },
    { id: 62, name: 'Pelecehan seksual terhadap warga sekolah', points: -80 },
    { id: 63, name: 'Nikah/hamil selama pendidikan', points: -100 },
    { id: 64, name: 'Melakukan hubungan seksual pra nikah', points: -100 },
    // I. Kriminalitas
    { id: 65, name: 'Mengancam/mengeroyok Kepala Sekolah/Guru/Karyawan', points: -100 },
    { id: 66, name: 'Mengancam/bermusuhan dengan sesama siswa', points: -25 },
    { id: 67, name: 'Berkelahi antar siswa internal sekolah', points: -50 },
    { id: 68, name: 'Memalak/meminta paksa uang/barang', points: -25 },
    { id: 69, name: 'Mencuri di lingkungan sekolah', points: -25 },
    { id: 70, name: 'Bermain judi di lingkungan sekolah', points: -75 },
    { id: 71, name: 'Menjadi provokator perkelahian', points: -30 },
    { id: 72, name: 'Membawa senjata tajam/api tanpa izin', points: -50 },
    { id: 73, name: 'Terlibat perkelahian/tawuran dengan sekolah lain', points: -50 },
    { id: 74, name: 'Melindungi teman yang bersalah', points: -10 },
    { id: 75, name: 'Menggunakan senjata tajam/api untuk mengancam/melukai', points: -100 },
    { id: 76, name: 'Ikut lomba/kontes bertentangan ajaran agama', points: -75 },
    { id: 77, name: 'Berurusan dengan pihak berwajib karena kejahatan', points: -75 },
];

const DataPelanggaran: React.FC = () => {
    const [pelanggaranList, setPelanggaranList] = useState<Pelanggaran[]>(() => {
      try {
        const items = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        return items ? JSON.parse(items) : placeholderPelanggaran;
      } catch (error) {
        console.error("Could not load violations data", error);
        return placeholderPelanggaran;
      }
    });

    useEffect(() => {
      try {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pelanggaranList));
      } catch (error) {
        console.error("Could not save violations data", error);
      }
    }, [pelanggaranList]);
    
    const [showForm, setShowForm] = useState(false);
    const [editingPelanggaran, setEditingPelanggaran] = useState<Pelanggaran | null>(null);
    const [formData, setFormData] = useState({ id: 0, name: '', points: 0 });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [pelanggaranToDelete, setPelanggaranToDelete] = useState<Pelanggaran | null>(null);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleAddNew = () => {
        setEditingPelanggaran(null);
        setFormData({ id: 0, name: '', points: 0 });
        setShowForm(true);
    };

    const handleEdit = (pelanggaran: Pelanggaran) => {
        setEditingPelanggaran(pelanggaran);
        setFormData(pelanggaran);
        setShowForm(true);
    };

    const handleDelete = (pelanggaran: Pelanggaran) => {
        setPelanggaranToDelete(pelanggaran);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (pelanggaranToDelete) {
            setPelanggaranList(pelanggaranList.filter(p => p.id !== pelanggaranToDelete.id));
            setNotification(`Pelanggaran "${pelanggaranToDelete.name}" berhasil dihapus.`);
            setIsDeleteModalOpen(false);
            setPelanggaranToDelete(null);
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setPelanggaranToDelete(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingPelanggaran(null);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value) || 0 : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPelanggaran) {
            setPelanggaranList(pelanggaranList.map(p => p.id === editingPelanggaran.id ? formData : p));
            setNotification('Data pelanggaran berhasil diperbarui!');
        } else {
            setPelanggaranList([...pelanggaranList, { ...formData, id: Date.now() }]);
            setNotification('Pelanggaran baru berhasil ditambahkan!');
        }
        setShowForm(false);
        setEditingPelanggaran(null);
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
          <h2 className="text-3xl font-light text-gray-700">Data Pelanggaran</h2>
          <h3 className="text-sm font-light text-gray-500">Informasi Jenis Pelanggaran</h3>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md shadow-sm">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <HomeIcon />
                    <a href="#" className="hover:text-blue-500">Home</a>
                </li>
                <li className="mx-2">/</li>
                <li>Data Pelanggaran</li>
            </ol>
        </div>
      </div>

      {showForm && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-3">
              {editingPelanggaran ? 'Edit Pelanggaran' : 'Tambah Pelanggaran Baru'}
            </h3>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-sm font-bold text-gray-600 block">Nama Pelanggaran</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleFormChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="points" className="text-sm font-bold text-gray-600 block">Poin</label>
                  <input id="points" name="points" type="number" value={formData.points} onChange={handleFormChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Batal</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{editingPelanggaran ? 'Update' : 'Simpan'}</button>
              </div>
            </form>
        </div>
      )}

      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center border-b-2 border-gray-200 pb-3">
             <h3 className="text-xl font-semibold text-gray-700">Daftar Jenis Pelanggaran</h3>
             <button onClick={handleAddNew} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                <PlusIcon />
                Tambah Data Pelanggaran
             </button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pelanggaran</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poin</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pelanggaranList.map((pelanggaran, index) => (
                  <tr key={pelanggaran.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{pelanggaran.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{pelanggaran.points}</td>
                    <td className="py-4 px-6 text-sm flex space-x-2">
                        <button onClick={() => handleEdit(pelanggaran)} className="text-blue-600 hover:text-blue-900" aria-label={`Edit ${pelanggaran.name}`}><EditIcon /></button>
                        <button onClick={() => handleDelete(pelanggaran)} className="text-red-600 hover:text-red-900" aria-label={`Delete ${pelanggaran.name}`}><DeleteIcon /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && pelanggaranToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <h3 id="delete-modal-title" className="text-xl font-bold text-gray-800">Konfirmasi Hapus</h3>
                <p className="mt-4 text-gray-600">
                    Apakah Anda yakin ingin menghapus pelanggaran <span className="font-semibold">{pelanggaranToDelete.name}</span>?
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

export default DataPelanggaran;