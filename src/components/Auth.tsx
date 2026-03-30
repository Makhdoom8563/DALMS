import { useState } from 'react';
import { Role } from '../types';

export default function Auth({ onLogin }: { onLogin: (role: Role) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'doctor' | 'lab'>('lab');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(userType === 'doctor' ? 'doctor' : 'lab_admin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md rounded-2xl bg-gray-800 p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-emerald-400">DENTAL ARCHITECT</h1>
        
        <div className="mb-6 flex rounded-lg bg-gray-700 p-1">
          <button
            className={`flex-1 rounded-md py-2 ${userType === 'lab' ? 'bg-emerald-500 text-white' : 'text-gray-400'}`}
            onClick={() => setUserType('lab')}
          >
            Staff Login
          </button>
          <button
            className={`flex-1 rounded-md py-2 ${userType === 'doctor' ? 'bg-emerald-500 text-white' : 'text-gray-400'}`}
            onClick={() => setUserType('doctor')}
          >
            Doctor Login
          </button>
        </div>

        <h2 className="mb-4 text-center text-xl font-semibold">
          {userType === 'lab' ? 'Staff' : 'Doctor'} {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm text-gray-400">Email</label>
            <input type="email" className="w-full rounded-md bg-gray-700 p-2 text-white" required />
          </div>
          <div>
            <label className="block text-sm text-gray-400">Password</label>
            <input type="password" className="w-full rounded-md bg-gray-700 p-2 text-white" required />
          </div>
          <button type="submit" className="w-full rounded-md bg-emerald-500 py-2 font-bold text-white hover:bg-emerald-600">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button className="text-emerald-400 hover:underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
