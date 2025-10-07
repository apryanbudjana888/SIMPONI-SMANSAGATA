import React, { useState } from 'react';
import { User, UserRole, Guru } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const GURU_LIST_KEY = 'simpogulip_guru_list';

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

const ErrorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);


const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');

  const mapPositionToRole = (position: string): UserRole => {
    if (position.toLowerCase().includes('admin')) {
        return UserRole.Admin;
    }
    if (position.toLowerCase().includes('bk')) {
        return UserRole.GuruBK;
    }
    return UserRole.GuruMapel;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Username dan password harus diisi.');
      setIsLoading(false);
      return;
    }
    
    // Simulate network request
    setTimeout(() => {
        const storedGurusRaw = localStorage.getItem(GURU_LIST_KEY);
        const gurus: Guru[] = storedGurusRaw ? JSON.parse(storedGurusRaw) : placeholderGurus;
        
        const foundUser = gurus.find(g => g.username.toLowerCase() === username.toLowerCase());

        if (foundUser && String(foundUser.password) === String(password)) {
            setWelcomeName(foundUser.name);
            setLoginSuccess(true);
            
            setTimeout(() => {
                const userRole = mapPositionToRole(foundUser.position);
                onLogin({
                    id: foundUser.id,
                    name: foundUser.name,
                    role: userRole,
                    username: foundUser.username,
                    gender: foundUser.gender,
                });
            }, 1500); // Show success message for 1.5 seconds
        } else {
            setError('Login Failed. Invalid Username or Password.');
            setIsLoading(false);
        }
    }, 500); // Simulate network delay
  };
  
  if (loginSuccess) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100" style={{ backgroundColor: '#ecf0f5' }}>
            <div className="w-full max-w-sm p-8 space-y-4 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-green-600">Login Successful!</h1>
                <p className="text-lg text-gray-700">Welcome, {welcomeName}!</p>
            </div>
        </div>
      );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100" style={{ backgroundColor: '#ecf0f5' }}>
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800" style={{ color: '#3c8dbc' }}>SIMPONI GULIP</h1>
          <p className="mt-2 text-gray-600">Sistem Informasi Poin</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="text-sm font-bold text-gray-600 block">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan username Anda"
              aria-label="Username"
              autoComplete="username"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold text-gray-600 block">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan password Anda"
              aria-label="Password"
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>
          
          {error && (
            <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-md relative text-center flex items-center justify-center" role="alert">
                <ErrorIcon />
                <strong className="font-bold">{error}</strong>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#3c8dbc' }}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
