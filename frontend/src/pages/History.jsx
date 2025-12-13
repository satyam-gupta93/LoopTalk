import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Video, Home, Calendar, Clock, ArrowRight, Inbox } from 'lucide-react';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (error) {
                console.error('Failed to fetch history:', error);
                // IMPLEMENT SNACKBAR
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    const handleRejoinMeeting = (meetingCode) => {
        navigate(`/${meetingCode}`);
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

                        {/* Back to Home Button */}
                        <button
                            onClick={() => navigate("/home")}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition"
                        >
                            <Home className="w-4 h-4" />
                            <span className="hidden sm:inline">Back to Home</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 pb-16 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2 text-white">Meeting History</h1>
                        <p className="text-slate-400">View and rejoin your past meetings</p>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && meetings.length === 0 && (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-slate-800 mb-4">
                                <Inbox className="w-8 h-8 text-slate-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No Meeting History</h3>
                            <p className="text-slate-400 mb-6">Your meeting history will appear here once you join or create meetings.</p>
                            <button
                                onClick={() => navigate("/home")}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition"
                            >
                                Start a Meeting <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Meetings Grid */}
                    {!loading && meetings.length > 0 && (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {meetings.map((meeting, index) => (
                                <div
                                    key={index}
                                    className="group bg-slate-900 rounded-xl border border-slate-800 hover:border-emerald-600 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="p-6">
                                        {/* Meeting Icon */}
                                        <div className="w-12 h-12 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition">
                                            <Video className="w-6 h-6 text-emerald-400 group-hover:text-white transition" />
                                        </div>

                                        {/* Meeting Code */}
                                        <div className="mb-4">
                                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Meeting Code</p>
                                            <p className="text-lg font-semibold text-white font-mono">
                                                {meeting.meetingCode}
                                            </p>
                                        </div>

                                        {/* Meeting Details */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(meeting.date)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <Clock className="w-4 h-4" />
                                                <span>{formatTime(meeting.date)}</span>
                                            </div>
                                        </div>

                                        {/* Rejoin Button */}
                                        <button
                                            onClick={() => handleRejoinMeeting(meeting.meetingCode)}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 hover:border-emerald-600 hover:bg-slate-950 text-white font-medium transition group-hover:border-emerald-600"
                                        >
                                            Rejoin Meeting <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Statistics */}
                    {!loading && meetings.length > 0 && (
                        <div className="mt-8 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">Total Meetings</p>
                                    <p className="text-2xl font-bold text-white">{meetings.length}</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center">
                                    <Video className="w-6 h-6 text-emerald-400" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Decorative Glow */}
            <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        </div>
    );
}