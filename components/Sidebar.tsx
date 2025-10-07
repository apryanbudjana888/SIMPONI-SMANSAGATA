import React from 'react';
import { NavItemType, User, UserRole } from '../types';

// Icon Components
const GaugeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>);
const UsersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm-1.5 5.5a3 3 0 00-3 0V12a2 2 0 00-2 2v1a1 1 0 001 1h8a1 1 0 001-1v-1a2 2 0 00-2-2v-.5a3 3 0 00-3 0z" /><path d="M15.5 11.5a3 3 0 00-3 0V12a2 2 0 00-2 2v1a1 1 0 001 1h4a1 1 0 001-1v-1a2 2 0 00-2-2v-.5z" /></svg>);
const BriefcaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zm-2 4h4V4a1 1 0 10-2 0v2z" clipRule="evenodd" /></svg>);
const TrophyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.894 5.303a1 1 0 00-1.39-1.42l-2.618 2.564-1.48-1.83a1 1 0 00-1.588 1.216l2.4 2.96a1 1 0 001.588-.016l3.5-4.324zM12 10a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM5 10a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1z" /><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-1 1v1a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1h-1V6a4 4 0 00-4-4zm-2 4a2 2 0 114 0v1H8V6zM4 12a1 1 0 00-1 1v2a1 1 0 001 1h12a1 1 0 001-1v-2a1 1 0 00-1-1H4z" clipRule="evenodd" /></svg>);
const WarningIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>);
const BookOpenIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4a2 2 0 012 2v1h-3a1 1 0 100 2h3v1h-3a1 1 0 100 2h3v1h-3a1 1 0 100 2h3v1a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm6 0v1h-3a1 1 0 100 2h3v1h-3a1 1 0 100 2h3v1h-3a1 1 0 100 2h3v1H6a1.99 1.99 0 01-1-1.75V4a1.99 1.99 0 011-1.75H10z" clipRule="evenodd" /></svg>);
const CalendarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>);
const DocumentTextIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>);
const LockClosedIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>);
const DatabaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" /><path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" /><path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" /></svg>);
const ImportIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>);

const allNavItems: NavItemType[] = [
  { isHeader: true, label: 'MAIN NAVIGATION', icon: <></> },
  { icon: <GaugeIcon />, label: 'DASHBOARD' },
  { icon: <UsersIcon />, label: 'DATA SISWA' },
  { icon: <BriefcaseIcon />, label: 'DATA GURU' },
  { icon: <ImportIcon />, label: 'IMPORT DATA SISWA' },
  { icon: <TrophyIcon />, label: 'DATA PRESTASI' },
  { icon: <WarningIcon />, label: 'DATA PELANGGARAN' },
  { icon: <BookOpenIcon />, label: 'DATA KELAS' },
  { icon: <CalendarIcon />, label: 'DATA TAHUN AJARAN' },
  { icon: <TrophyIcon />, label: 'INPUT PRESTASI' },
  { icon: <WarningIcon />, label: 'INPUT PELANGGARAN' },
  { icon: <UsersIcon />, label: 'DATA ADMIN' },
  { icon: <DocumentTextIcon />, label: 'LAPORAN' },
  { icon: <DatabaseIcon />, label: 'BACKUP & RESTORE' },
  { icon: <LockClosedIcon />, label: 'GANTI PASSWORD' },
];

// Role-based navigation item visibility
const navAcls = {
  [UserRole.Admin]: allNavItems.filter(item => !item.isHeader).map(item => item.label),
  [UserRole.GuruBK]: allNavItems.filter(item => !item.isHeader).map(item => item.label),
  [UserRole.GuruMapel]: [
    'DASHBOARD', 'DATA SISWA', 'DATA GURU', 'INPUT PRESTASI', 'INPUT PELANGGARAN', 'GANTI PASSWORD',
  ],
  [UserRole.Siswa]: [ 'DASHBOARD', 'LAPORAN', 'GANTI PASSWORD' ]
};


interface SidebarProps { 
  isOpen: boolean;
  activePage: string;
  onNavClick: (page: string) => void;
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activePage, onNavClick, user }) => {
  const allowedRoutes = navAcls[user.role] || [];
  const navItems = allNavItems.filter(item => item.isHeader || allowedRoutes.includes(item.label));

  return (
    <aside 
      className={`fixed top-0 left-0 z-30 w-64 h-screen transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      style={{ backgroundColor: '#222d32' }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center p-4">
          {user.avatar ? (
            <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-xl">
              {user.name.charAt(0)}
            </div>
          )}
          <div className="ml-3 text-white">
            <p className="font-semibold">{user.name}</p>
            <div className="flex items-center mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-xs text-gray-400">Online</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 text-gray-300 overflow-y-auto">
          <ul>
            {navItems.map((item, index) => {
              if (item.isHeader) {
                return (
                  <li key={index} className="px-4 py-2 text-xs text-gray-500 font-bold uppercase" style={{ backgroundColor: '#1a2226' }}>
                    {item.label}
                  </li>
                );
              }
              const isActive = item.label === activePage;
              return (
                <li 
                  key={index} 
                  className={`cursor-pointer ${isActive ? 'bg-slate-900 text-white' : 'hover:bg-slate-700'}`}
                  onClick={() => onNavClick(item.label)}
                >
                  <a className="flex items-center px-4 py-3">
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
