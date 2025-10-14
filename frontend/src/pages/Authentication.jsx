import React, { useState, useContext } from 'react';
import { Video, LockKeyhole, User, Mail, Eye, EyeOff } from 'lucide-react';
// import { AuthContext } from '../contexts/AuthContext';

export default function Authentication() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState(0); // 0 = login, 1 = register
  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);



  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAuth();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 to-slate-950/90" />
        
        {/* Overlay Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Video className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Loop Talk</h2>
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Connect with your team,<br />anywhere, anytime.
          </h1>
          <p className="text-xl text-slate-200 leading-relaxed">
            Secure, reliable video conferencing for modern teams.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Loop Talk</h2>
          </div>

          {/* Avatar Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-600 flex items-center justify-center">
              <LockKeyhole className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          {/* Toggle Buttons */}
          <div className="flex gap-2 mb-8 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => {
                setFormState(0);
                setError('');
              }}
              className={`flex-1 py-3 px-6 rounded-md font-medium transition ${
                formState === 0
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setFormState(1);
                setError('');
              }}
              className={`flex-1 py-3 px-6 rounded-md font-medium transition ${
                formState === 1
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Full Name (Register only) */}
            {formState === 1 && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your full name"
                    className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                  />
                </div>
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your username"
                  className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // onKeyPress={handleKeyPress}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-950/50 border border-red-800 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              // onClick={handleAuth}
              className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              {formState === 0 ? 'Sign In' : 'Create Account'}
            </button>

            {/* Additional Links */}
            {formState === 0 && (
              <div className="text-center">
                <a href="#" className="text-sm text-emerald-400 hover:text-emerald-300 transition">
                  Forgot password?
                </a>
              </div>
            )}
          </div>

          {/* Terms (Register only) */}
          {formState === 1 && (
            <p className="mt-6 text-xs text-center text-slate-500">
              By signing up, you agree to our{' '}
              <a href="#" className="text-emerald-400 hover:text-emerald-300">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-emerald-400 hover:text-emerald-300">
                Privacy Policy
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Snackbar */}
      {showSnackbar && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-emerald-950 border border-emerald-600 rounded-lg px-6 py-3 shadow-xl">
            <p className="text-emerald-300 font-medium">{message}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}