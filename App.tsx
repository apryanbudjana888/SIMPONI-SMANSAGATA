
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DataSiswa from './components/DataSiswa';
import Login from './components/Login';
import { User, Student, UserRole } from './types';

// Import all new page components
import DataPrestasi from './components/DataPrestasi';
import DataPelanggaran from './components/DataPelanggaran';
import DataKelas from './components/DataKelas';
import DataTahunAjaran from './components/DataTahunPelajaran';
import InputPrestasi from './components/InputPrestasi';
import InputPelanggaran from './components/InputPelanggaran';
import DataAdmin from './components/DataAdmin';
import Laporan from './components/Laporan';
import GantiPassword from './components/GantiPassword';
import StudentProfile from './components/StudentProfile'; // Import the new component
import BackupRestore from './components/BackupRestore';
import ImportSiswa from './components/ImportSiswa';
import DataGuru from './components/DataGuru';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [activePage, setActivePage] = useState('DASHBOARD');
  const [user, setUser] = useState<User | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [previousPage, setPreviousPage] = useState<string>('DASHBOARD');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setActivePage('DASHBOARD'); // Reset to dashboard on login
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    setPreviousPage(activePage);
    setActivePage('PROFIL SISWA');
  };
  
  const handleNavClick = (page: string) => {
    setActivePage(page);
    if (window.innerWidth < 1024) { // Close sidebar on mobile after navigation
      setSidebarOpen(false);
    }
  };

  const handleBackToList = () => {
    setActivePage(previousPage);
    setSelectedStudent(null);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'DASHBOARD':
        return <Dashboard />;
      case 'DATA SISWA':
        return <DataSiswa onViewProfile={handleViewProfile} />;
      case 'DATA GURU':
        return <DataGuru />;
      case 'IMPORT DATA SISWA':
        return <ImportSiswa onImportSuccess={() => setActivePage('DATA SISWA')} />;
      case 'PROFIL SISWA':
        return selectedStudent ? <StudentProfile student={selectedStudent} onBack={handleBackToList} /> : <DataSiswa onViewProfile={handleViewProfile} />;
      case 'DATA PRESTASI':
        return <DataPrestasi />;
      case 'DATA PELANGGARAN':
        return <DataPelanggaran />;
      case 'DATA KELAS':
        return <DataKelas />;
      case 'DATA TAHUN AJARAN':
        return <DataTahunAjaran />;
      case 'INPUT PRESTASI':
        return <InputPrestasi user={user!} />;
      case 'INPUT PELANGGARAN':
        return <InputPelanggaran user={user!} />;
      case 'DATA ADMIN':
        return <DataAdmin />;
      case 'LAPORAN':
        return <Laporan />;
      case 'BACKUP & RESTORE':
        return <BackupRestore />;
      case 'GANTI PASSWORD':
        return <GantiPassword user={user!} />;
      default:
        return <Dashboard />;
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="relative min-h-screen bg-gray-100 font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        activePage={activePage}
        onNavClick={handleNavClick}
        user={user}
      />
      
      {isSidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          aria-hidden="true"
        ></div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Header 
          onMenuClick={() => setSidebarOpen(!isSidebarOpen)} 
          user={user}
          onLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto" style={{ backgroundColor: '#ecf0f5' }}>
          <div className="container mx-auto px-4 sm:px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;