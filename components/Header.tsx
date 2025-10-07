import React from 'react';
import { User } from '../types';

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V5h10a1 1 0 100-2H3zm12.293 4.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L16.586 13H9a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

interface HeaderProps {
  onMenuClick: () => void;
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, user, onLogout }) => {
  return (
    <header className="flex justify-between items-center px-4 sm:px-6 py-3 bg-white border-b-2" style={{ backgroundColor: '#3c8dbc' }}>
      <div className="flex items-center">
        <button onClick={onMenuClick} className="text-white focus:outline-none">
          <MenuIcon />
        </button>
        <div className="relative text-lg text-white font-bold ml-3 hidden lg:block" style={{ backgroundColor: '#367fa9', padding: '6px 12px' }}>
          SIMPONI GULIP
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="relative">
          <button className="flex items-center text-white focus:outline-none">
            {user.avatar ? (
              <img src={user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full object-cover mr-2" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-sm mr-2 flex-shrink-0">
                  {user.name.charAt(0)}
              </div>
            )}
            <span className="hidden sm:inline">{user.name}</span>
            <svg className="h-5 w-5 text-white ml-1 hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center ml-4 sm:ml-6 text-white font-semibold focus:outline-none"
        >
            <LogoutIcon />
            <span className="hidden sm:inline">LOGOUT</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
