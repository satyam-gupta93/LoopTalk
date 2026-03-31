
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import withAuth from '../utils/withAuth';

function Home() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const { addToUserHistory } = useContext(AuthContext);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleJoinVideoCall = async () => {
    if (meetingCode.trim()) {
      await addToUserHistory(meetingCode);
      navigate(`/${meetingCode}`);
    }
  };

  const handleCreateMeeting = () => {
    const newCode = Math.random().toString(36).substring(2, 10);
    navigate(`/${newCode}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleJoinVideoCall();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Matching Landing Page Style */}
      <nav className="fixed w-full top-0 z-50 bg-black/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img 
                src="/logo_2.svg" 
                alt="Loop Talk Logo" 
                className="h-10 w-auto object-contain"
              />
              <h2 className="text-2xl font-bold text-white">Loop Talk</h2>
            </div>

            {/* Desktop Menu */}
            <div className="flex items-center gap-4">
              {/* Real-time Clock */}
              <div className="hidden md:block text-slate-400 text-sm">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })} • {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              
              <button
                onClick={() => navigate("/history")}
                className="text-slate-300 hover:text-white transition font-medium cursor-pointer "
              >
                History
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/auth");
                }}
                className="text-slate-300 cursor-pointer hover:text-white transition font-medium flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Gradient Overlay - Bottom Right */}
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-emerald-200/40 via-teal-100/20 to-transparent pointer-events-none z-0"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Side - Text and Actions */}
            <div className="flex-1 w-full max-w-xl">
              {/* Hero Text */}
              <div className="mb-10">
                <h1 className="text-5xl lg:text-3xl font-bold mb-5 text-slate-900 leading-tight">
                  Secure video conferencing for everyone
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Connect, collaborate, and celebrate from anywhere with Loop Talk
                </p>
              </div>

              {/* Meeting Actions */}
              <div className="space-y-4">
                {/* Create New Meeting Button */}
                <button
                  onClick={handleCreateMeeting}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 3.5C6 2.67157 6.67157 2 7.5 2H10V6.5C10 7.05228 10.4477 7.5 11 7.5H15.5V14.5C15.5 15.3284 14.8284 16 14 16H7.5C6.67157 16 6 15.3284 6 14.5V3.5Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M15.5 7.5L10 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  New meeting
                </button>

                {/* Join Meeting Input */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={meetingCode}
                      onChange={(e) => setMeetingCode(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter a code or nickname"
                      className="w-full px-4 py-4 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition text-base"
                    />
                  </div>
                  <button
                    onClick={handleJoinVideoCall}
                    disabled={!meetingCode.trim()}
                    className="px-8 py-4 rounded-lg text-emerald-600 hover:bg-emerald-50 disabled:text-slate-400 disabled:hover:bg-transparent disabled:cursor-not-allowed font-semibold text-lg transition"
                  >
                    Join
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="my-8 border-t border-slate-200"></div>

              {/* Info Link */}
              <a 
                href="#features" 
                className="text-emerald-600 hover:underline font-semibold inline-flex items-center gap-1"
              >
                Get details on everyone
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* Right Side - Illustration */}
            <div className="flex-1 w-full max-w-lg">
              <div className="relative">
                {/* Main circular background */}
                <div className="w-full aspect-square rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative overflow-hidden shadow-xl">
                  {/* Connection icon circle */}
                  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center shadow-lg z-10">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <path d="M20 16H28M20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20C18.2091 20 20 18.2091 20 16ZM20 16V20M28 16C28 13.7909 29.7909 12 32 12C34.2091 12 36 13.7909 36 16C36 18.2091 34.2091 20 32 20C29.7909 20 28 18.2091 28 16ZM28 16V20M20 20H28M20 20V28M28 20V28M20 28H28M20 28C20 30.2091 18.2091 32 16 32C13.7909 32 12 30.2091 12 28C12 25.7909 13.7909 24 16 24C18.2091 24 20 25.7909 20 28ZM28 28C28 30.2091 29.7909 32 32 32C34.2091 32 36 30.2091 36 28C36 25.7909 34.2091 24 32 24C29.7909 24 28 25.7909 28 28Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Person 1 - Left */}
                  <div className="absolute left-[15%] top-1/2 transform -translate-y-1/2">
                    <div className="relative">
                      {/* Laptop */}
                      <div className="w-28 h-20 bg-slate-700 rounded-lg relative shadow-md">
                        <div className="absolute inset-2 bg-slate-900 rounded"></div>
                      </div>
                      {/* Person */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        {/* Head */}
                        <div className="w-10 h-10 rounded-full bg-amber-400 relative">
                          {/* Hair */}
                          <div className="absolute -top-2 left-1 w-8 h-6 rounded-full bg-orange-800"></div>
                        </div>
                        {/* Body */}
                        <div className="w-16 h-16 bg-amber-500 rounded-b-full mt-1"></div>
                      </div>
                    </div>
                  </div>

                  {/* Person 2 - Right */}
                  <div className="absolute right-[15%] top-1/2 transform -translate-y-1/2">
                    <div className="relative">
                      {/* Laptop */}
                      <div className="w-28 h-20 bg-slate-700 rounded-lg relative shadow-md">
                        <div className="absolute inset-2 bg-slate-900 rounded"></div>
                      </div>
                      {/* Person */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        {/* Head */}
                        <div className="w-10 h-10 rounded-full bg-amber-300 relative">
                          {/* Hair */}
                          <div className="absolute -top-3 -left-1 w-12 h-8 rounded-full bg-gray-900"></div>
                        </div>
                        {/* Body */}
                        <div className="w-16 h-16 bg-emerald-500 rounded-b-full mt-1"></div>
                      </div>
                    </div>
                  </div>

                  {/* Table/Desk Base */}
                  <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 w-3/4 h-32">
                    <div className="w-full h-full bg-gradient-to-b from-slate-100 to-slate-200 rounded-t-full opacity-60"></div>
                  </div>
                </div>

                {/* Carousel Navigation Dots */}
                <div className="flex justify-center gap-2 mt-8">
                  <button className="w-2 h-2 rounded-full bg-emerald-600"></button>
                  <button className="w-2 h-2 rounded-full bg-slate-300"></button>
                  <button className="w-2 h-2 rounded-full bg-slate-300"></button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Features Section */}
          <div className="mt-20 pt-12 border-t border-slate-200">
            <h3 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Get a link you can share
            </h3>
            <p className="text-center text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Create instant meetings with just a click. Share the link with anyone to get started with secure video conferencing. 
              No downloads required - join directly from your browser.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(Home);