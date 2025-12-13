import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Clock, LogOut, ArrowRight, Plus } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import withAuth from '../utils/withAuth';

function Home() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (meetingCode.trim()) {
      await addToUserHistory(meetingCode);
      navigate(`/${meetingCode}`);
    }
  };

  const handleCreateMeeting = () => {
    const newCode = Math.random().toString(36).substring(2, 10);
    setMeetingCode(newCode);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleJoinVideoCall();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Loop Talk</h2>
            </div>

            {/* Desktop Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/history")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition"
              >
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">History</span>
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/auth");
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span>Start your video call now</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Welcome to Loop Talk
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Providing quality video calls just like quality education. 
              Join or create a meeting instantly.
            </p>
          </div>

          {/* Meeting Actions Card */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 mb-8 shadow-2xl">
            <div className="space-y-6">
              {/* Join Meeting */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Enter Meeting Code
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={meetingCode}
                    onChange={(e) => setMeetingCode(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter meeting code"
                    className="flex-1 px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
                  />
                  <button
                    onClick={handleJoinVideoCall}
                    disabled={!meetingCode.trim()}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-medium transition"
                  >
                    Join Meeting <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-900 text-slate-400">or</span>
                </div>
              </div>

              {/* Create Meeting */}
              <div>
                <button
                  onClick={handleCreateMeeting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-slate-700 hover:border-emerald-600 hover:bg-slate-950 text-white font-medium transition"
                >
                  <Plus className="w-5 h-5" />
                  Create New Meeting
                </button>
              </div>
            </div>
          </div>

          {/* Quick Features */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Instant Access',
                description: 'No downloads required, join directly from browser',
              },
              {
                title: 'Secure & Private',
                description: 'End-to-end encryption for all your calls',
              },
              {
                title: 'HD Quality',
                description: 'Crystal clear video and audio experience',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition"
              >
                <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Decorative Glow */}
      <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
}

export default withAuth(Home);