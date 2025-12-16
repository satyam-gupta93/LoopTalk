
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Video,
//   Users,
//   Lock,
//   Zap,
//   ArrowRight,
//   Menu,
//   X,
//   Shield,
//   Globe,
//   User,
//   LogOut,
//   Clock,
// } from 'lucide-react';

// export default function LandingPage() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   const navigate = useNavigate();

//   // Update time every second
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Check if user is authenticated on component mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!token);
//   }, []);

//   const handleNavigation = (path) => {
//     navigate(path);
//     scrollTo(0, 0);
//     console.log(`Navigating to ${path}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     setShowProfileMenu(false);
//     handleNavigation('/');
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       {/* ---------------- NAVIGATION ---------------- */}
//       <nav className="fixed py-4 w-full top-0 z-50 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div
//               className="flex items-center gap-3 cursor-pointer"
//               onClick={() => {
//                 handleNavigation('/');
//               }}
//             >
//               <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
//                 <Video className="w-5 h-5 text-white" />
//               </div>
//               <h2 className="text-xl font-semibold text-white">Loop Talk</h2>
//             </div>

//             <div className="hidden md:flex items-center gap-8">
//               {/* Real-time Clock */}
//               <div className="text-slate-400 text-sm font-light">
//                 {currentTime.toLocaleTimeString('en-US', { 
//                   hour: '2-digit', 
//                   minute: '2-digit',
//                   hour12: false 
//                 })} • {currentTime.toLocaleDateString('en-US', { 
//                   weekday: 'short',
//                   day: 'numeric',
//                   month: 'short'
//                 })}
//               </div>
              
//               {!isAuthenticated ? (
//                 <>
//                   <button
//                     onClick={() => handleNavigation('/aljk24')}
//                     className="text-slate-300 hover:text-white transition cursor-pointer"
//                   >
//                     Join as Guest
//                   </button>
//                   <button
//                     onClick={() => handleNavigation('/auth')}
//                     className="text-slate-300 hover:text-white transition cursor-pointer"
//                   >
//                     Register
//                   </button>
//                   <button
//                     onClick={() => handleNavigation('/auth')}
//                     className="px-6 py-2.5 rounded-lg bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-medium transition"
//                   >
//                     Login
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => handleNavigation('/home')}
//                     className="text-slate-300 hover:text-white transition cursor-pointer"
//                   >
//                     Dashboard
//                   </button>
//                   <div className="relative">
//                     <button
//                       onClick={() => setShowProfileMenu(!showProfileMenu)}
//                       className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center transition cursor-pointer"
//                     >
//                       <User className="w-5 h-5 text-white" />
//                     </button>

//                     {/* Profile Dropdown */}
//                     {showProfileMenu && (
//                       <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-2">
//                         <button
//                           onClick={() => {
//                             handleNavigation('/home');
//                             setShowProfileMenu(false);
//                           }}
//                           className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-2"
//                         >
//                           <Video className="w-4 h-4" />
//                           Dashboard
//                         </button>
//                         <button
//                           onClick={() => {
//                             handleNavigation('/history');
//                             setShowProfileMenu(false);
//                           }}
//                           className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-2"
//                         >
//                           <Clock className="w-4 h-4" />
//                           History
//                         </button>
//                         <div className="border-t border-slate-800 my-2"></div>
//                         <button
//                           onClick={handleLogout}
//                           className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-slate-800 transition flex items-center gap-2"
//                         >
//                           <LogOut className="w-4 h-4" />
//                           Logout
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Mobile Menu Toggle */}
//             <button
//               className="md:hidden text-white"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {mobileMenuOpen && (
//             <div className="md:hidden pb-4 space-y-3 border-t border-slate-800 pt-4">
//               {!isAuthenticated ? (
//                 <>
//                   <button
//                     onClick={() => {
//                       handleNavigation('/aljk23');
//                       setMobileMenuOpen(false);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition"
//                   >
//                     Join as Guest
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleNavigation('/auth');
//                       setMobileMenuOpen(false);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition"
//                   >
//                     Register
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleNavigation('/auth');
//                       setMobileMenuOpen(false);
//                     }}
//                     className="w-full px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition"
//                   >
//                     Login
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => {
//                       handleNavigation('/home');
//                       setMobileMenuOpen(false);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition flex items-center gap-2"
//                   >
//                     <Video className="w-4 h-4" />
//                     Dashboard
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleNavigation('/history');
//                       setMobileMenuOpen(false);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition flex items-center gap-2"
//                   >
//                     <Clock className="w-4 h-4" />
//                     History
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="w-full px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition flex items-center justify-center gap-2"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     Logout
//                   </button>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/*HERO SECTION*/}
//       <section className="pt-45 pb-41 px-4 bg-slate-950 mt-2">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-16 items-center">
//             {/* Text Content */}
//             <div className="space-y-8">
//               <div className="space-y-6">
//                 <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
//                   Your meetings, simplified and secure.
//                 </h1>
//                 <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
//                   Connect seamlessly with your team, clients, and friends — all
//                   through secure, high-quality video calls.
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 {!isAuthenticated ? (
//                   <>
//                     <button
//                       onClick={() => handleNavigation('/auth')}
//                       className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-lg transition"
//                     >
//                       Get Started Free <ArrowRight size={20} />
//                     </button>
//                     <button
//                       onClick={() => handleNavigation('/aljk23')}
//                       className="inline-flex items-center justify-center gap-2 cursor-pointer px-8 py-4 rounded-lg border-2 border-slate-700 hover:border-emerald-600 text-white font-medium text-lg transition"
//                     >
//                       Join as Guest
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => handleNavigation('/home')}
//                     className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-lg transition"
//                   >
//                     Go to Dashboard <ArrowRight size={20} />
//                   </button>
//                 )}
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-3 gap-8 pt-10 border-t border-slate-800">
//                 <div className="text-center">
//                   <p className="text-3xl md:text-4xl font-bold text-white">1M+</p>
//                   <p className="text-slate-400 text-sm mt-1">Active Users</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-3xl md:text-4xl font-bold text-white">99.9%</p>
//                   <p className="text-slate-400 text-sm mt-1">Uptime</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-3xl md:text-4xl font-bold text-white">180+</p>
//                   <p className="text-slate-400 text-sm mt-1">Countries</p>
//                 </div>
//               </div>
//             </div>

//             {/* Video Mockup */}
//             <div className="relative flex flex-col items-center justify-center">
//               {/* Trusted Badge */}
//               <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-sm">
//                 <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
//                 <span>Trusted by 1M+ users worldwide</span>
//               </div>

//               <div className="relative w-full max-w-md">
//                 <div className="relative z-10 w-full h-64 md:h-80 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Video className="w-16 h-16 text-emerald-500 animate-pulse" />
//                   </div>

//                   {/* Call Controls */}
//                   <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
//                     <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-emerald-600 transition cursor-pointer">
//                       <Video className="w-5 h-5 text-white" />
//                     </div>
//                     <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition cursor-pointer">
//                       <X className="w-5 h-5 text-white" />
//                     </div>
//                     <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-emerald-600 transition cursor-pointer">
//                       <Users className="w-5 h-5 text-white" />
//                     </div>
//                   </div>

//                   {/* Status Badge */}
//                   <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700">
//                     <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
//                     <span className="text-xs text-white font-medium">Connected</span>
//                   </div>

//                   {/* Real-time Clock */}
//                   <div className="absolute top-4 right-4">
//                     <span className="text-xs text-slate-400 font-light font-mono">
//                       {currentTime.toLocaleTimeString('en-US', { 
//                         hour: '2-digit', 
//                         minute: '2-digit',
//                         second: '2-digit',
//                         hour12: false 
//                       })}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Glow Effect */}
//                 <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES SECTION*/}
//       <section className="py-20 px-4 bg-slate-900/50 border-y border-slate-800">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4 text-white">
//               Enterprise-Grade Features
//             </h2>
//             <p className="text-xl text-slate-400">
//               Everything you need for professional communication
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               {
//                 icon: <Video className="w-6 h-6" />,
//                 title: 'HD Quality',
//                 desc: 'Crystal clear 1080p video with adaptive streaming technology',
//               },
//               {
//                 icon: <Lock className="w-6 h-6" />,
//                 title: 'End-to-End Encryption',
//                 desc: 'Bank-level security for all your conversations',
//               },
//               {
//                 icon: <Zap className="w-6 h-6" />,
//                 title: 'Low Latency',
//                 desc: 'Optimized global infrastructure for instant connection',
//               },
//               {
//                 icon: <Users className="w-6 h-6" />,
//                 title: 'Group Calls',
//                 desc: 'Host meetings with up to 100 participants',
//               },
//               {
//                 icon: <Globe className="w-6 h-6" />,
//                 title: 'Screen Sharing',
//                 desc: 'Share your screen with full HD quality',
//               },
//               {
//                 icon: <Shield className="w-6 h-6" />,
//                 title: 'Browser Based',
//                 desc: 'No downloads required, join instantly',
//               },
//             ].map((feature, idx) => (
//               <div
//                 key={idx}
//                 className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-600 transition group"
//               >
//                 <div className="w-12 h-12 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition">
//                   <span className="text-emerald-400 group-hover:text-white transition">
//                     {feature.icon}
//                   </span>
//                 </div>
//                 <h3 className="text-lg font-semibold mb-2 text-white">
//                   {feature.title}
//                 </h3>
//                 <p className="text-slate-400 text-sm">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/*  CTA SECTION */}
//       <section className="py-20 px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-6 text-white">
//             Ready to get started?
//           </h2>
//           <p className="text-xl text-slate-400 mb-8">
//             Join millions of professionals connecting across the globe every day.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             {!isAuthenticated ? (
//               <>
//                 <button
//                   onClick={() => handleNavigation('/auth')}
//                   className="px-8 py-4 rounded-lg bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-medium text-lg transition"
//                 >
//                   Get Started Now
//                 </button>
//                 <button
//                   onClick={() => handleNavigation('/aljk23')}
//                   className="px-8 py-4 rounded-lg border-2 border-slate-700 cursor-pointer hover:border-emerald-600 text-white font-medium text-lg transition"
//                 >
//                   Join as Guest
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => handleNavigation('/home')}
//                 className="px-8 py-4 rounded-lg bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-medium text-lg transition"
//               >
//                 Go to Dashboard
//               </button>
//             )}
//           </div>
//         </div>
//       </section>

//       {/*  FOOTER */}
//       <footer className="border-t border-slate-800 py-12 px-4 bg-slate-950">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div
//                 className="flex items-center gap-2 mb-4 cursor-pointer"
//                 onClick={() => handleNavigation('/')}
//               >
//                 <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
//                   <Video className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="font-semibold text-white">Loop Talk</span>
//               </div>
//               <p className="text-slate-400 text-sm">
//                 Professional video conferencing made simple.
//               </p>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4 text-white">Product</h4>
//               <ul className="space-y-2 text-sm text-slate-400">
//                 <li className="hover:text-white transition cursor-pointer">
//                   Features
//                 </li>
//                 <li className="hover:text-white transition cursor-pointer">
//                   Pricing
//                 </li>
//                 <li className="hover:text-white transition cursor-pointer">
//                   Security
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4 text-white">Company</h4>
//               <ul className="space-y-2 text-sm text-slate-400">
//                 <li className="hover:text-white transition cursor-pointer">
//                   About
//                 </li>
//                 <li className="hover:text-white transition cursor-pointer">
//                   Blog
//                 </li>
//                 <li className="hover:text-white transition cursor-pointer">
//                   Careers
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4 text-white">Legal</h4>
//               <ul className="space-y-2 text-sm text-slate-400">
//                 <li className="hover:text-white transition cursor-pointer">
//                   Privacy
//                 </li>
//                 <li className="hover:text-white transition cursor-pointer">
//                   Terms
//                 </li>
//                 <li className="hover:text-white transition cursor-pointer">
//                   Contact
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
//             <p>&copy; 2025 Loop Talk. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Video,
//   Users,
//   Lock,
//   Zap,
//   ArrowRight,
//   Menu,
//   X,
//   Shield,
//   Globe,
//   User,
//   LogOut,
//   Clock,
// } from 'lucide-react';

// export default function LandingPage() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   const navigate = useNavigate();

//   // Update time every second
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Check if user is authenticated on component mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!token);
//   }, []);

//   const handleNavigation = (path) => {
//     navigate(path);
//     // Ensure the page scrolls to the top on navigation
//     window.scrollTo(0, 0); 
//     console.log(`Navigating to ${path}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     setShowProfileMenu(false);
//     handleNavigation('/');
//   };

//   // Close mobile menu when navigating
//   const handleMobileNavClick = (path) => {
//     handleNavigation(path);
//     setMobileMenuOpen(false);
//   };


//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       {/* ---------------- NAVIGATION ---------------- */}
//       {/* Increased z-index to ensure it sits above all content */}
//       <nav className="fixed py-4 w-full top-0 z-50 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div
//               className="flex items-center gap-3 cursor-pointer"
//               onClick={() => {
//                 handleNavigation('/');
//               }}
//             >
//               <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
//                 <Video className="w-5 h-5 text-white" />
//               </div>
//               <h2 className="text-xl font-semibold text-white">Loop Talk</h2>
//             </div>

//             {/* Desktop Navigation Links */}
//             <div className="hidden md:flex items-center gap-8">
//               {/* Real-time Clock - Moved to be a dedicated desktop element */}
//               <div className="text-slate-400 text-sm font-light flex items-center gap-2">
//                 <Clock className="w-4 h-4 text-slate-500" />
//                 {currentTime.toLocaleTimeString('en-US', { 
//                   hour: '2-digit', 
//                   minute: '2-digit',
//                   hour12: false 
//                 })} • {currentTime.toLocaleDateString('en-US', { 
//                   weekday: 'short',
//                   day: 'numeric',
//                   month: 'short'
//                 })}
//               </div>
              
//               {!isAuthenticated ? (
//                 <>
//                   <button
//                     onClick={() => handleNavigation('/aljk24')}
//                     className="text-slate-300 hover:text-white transition cursor-pointer"
//                   >
//                     Guest Join
//                   </button>
//                   <button
//                     onClick={() => handleNavigation('/auth')}
//                     className="text-slate-300 hover:text-white transition cursor-pointer"
//                   >
//                     Register
//                   </button>
//                   <button
//                     onClick={() => handleNavigation('/auth')}
//                     className="px-6 py-2.5 rounded-lg bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-medium transition"
//                   >
//                     Login
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => handleNavigation('/home')}
//                     className="text-slate-300 hover:text-white transition cursor-pointer"
//                   >
//                     Dashboard
//                   </button>
//                   <div className="relative">
//                     <button
//                       onClick={() => setShowProfileMenu(!showProfileMenu)}
//                       className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center transition cursor-pointer"
//                     >
//                       <User className="w-5 h-5 text-white" />
//                     </button>

//                     {/* Profile Dropdown */}
//                     {showProfileMenu && (
//                       <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-2 z-50">
//                         <button
//                           onClick={() => {
//                             handleNavigation('/home');
//                             setShowProfileMenu(false);
//                           }}
//                           className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-2"
//                         >
//                           <Video className="w-4 h-4" />
//                           Dashboard
//                         </button>
//                         <button
//                           onClick={() => {
//                             handleNavigation('/history');
//                             setShowProfileMenu(false);
//                           }}
//                           className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-2"
//                         >
//                           <Clock className="w-4 h-4" />
//                           History
//                         </button>
//                         <div className="border-t border-slate-800 my-2"></div>
//                         <button
//                           onClick={handleLogout}
//                           className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-slate-800 transition flex items-center gap-2"
//                         >
//                           <LogOut className="w-4 h-4" />
//                           Logout
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Mobile Menu Toggle */}
//             <button
//               className="md:hidden text-white"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>

//           {/* Mobile Menu Dropdown */}
//           {mobileMenuOpen && (
//             <div className="md:hidden pb-4 space-y-3 border-t border-slate-800 pt-4">
//               {/* Mobile Clock */}
//               <div className="flex justify-center border-b border-slate-800 pb-3 mb-2">
//                 <div className="text-slate-400 text-sm font-light flex items-center gap-2">
//                   <Clock className="w-4 h-4 text-slate-500" />
//                   {currentTime.toLocaleTimeString('en-US', { 
//                     hour: '2-digit', 
//                     minute: '2-digit',
//                     hour12: false 
//                   })} • {currentTime.toLocaleDateString('en-US', { 
//                     weekday: 'short',
//                     day: 'numeric',
//                     month: 'short'
//                   })}
//                 </div>
//               </div>

//               {!isAuthenticated ? (
//                 <>
//                   <button
//                     onClick={() => handleMobileNavClick('/aljk23')}
//                     className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition"
//                   >
//                     Join as Guest
//                   </button>
//                   <button
//                     onClick={() => handleMobileNavClick('/auth')}
//                     className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition"
//                   >
//                     Register
//                   </button>
//                   <button
//                     onClick={() => handleMobileNavClick('/auth')}
//                     className="w-full px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition"
//                   >
//                     Login
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => handleMobileNavClick('/home')}
//                     className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition flex items-center gap-2"
//                   >
//                     <Video className="w-4 h-4" />
//                     Dashboard
//                   </button>
//                   <button
//                     onClick={() => handleMobileNavClick('/history')}
//                     className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition flex items-center gap-2"
//                   >
//                     <Clock className="w-4 h-4" />
//                     History
//                   </button>
//                   <div className="border-t border-slate-800 my-2"></div>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="w-full px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition flex items-center justify-center gap-2"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     Logout
//                   </button>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/*HERO SECTION - MOBILE OPTIMIZATION APPLIED*/}
//       {/* Adjusted padding to account for fixed navigation (pt-32 ensures content is below the nav) */}
//       <section className="pt-32 pb-20 px-4 bg-slate-950">
//         <div className="max-w-7xl mx-auto">
//           {/* Flex column on mobile, grid on medium screens and up */}
//           <div className="flex flex-col gap-16 items-center md:grid md:grid-cols-2">
            
//             {/* Video Mockup - Placed FIRST to ensure immediate visibility on mobile */}
//             <div className="relative flex flex-col items-center justify-center order-1 md:order-2">
//               {/* Trusted Badge */}
//               <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-sm">
//                 <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
//                 <span>Trusted by 1M+ users worldwide</span>
//               </div>

//               <div className="relative w-full max-w-sm sm:max-w-md"> {/* Reduced max-width for better mobile fit */}
//                 <div className="relative z-10 w-full h-64 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Video className="w-16 h-16 text-emerald-500 animate-pulse" />
//                   </div>

//                   {/* Call Controls */}
//                   <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-emerald-600 transition cursor-pointer">
//                       <Video className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                     </div>
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition cursor-pointer">
//                       <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                     </div>
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-emerald-600 transition cursor-pointer">
//                       <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                     </div>
//                   </div>

//                   {/* Status Badge */}
//                   <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700">
//                     <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
//                     <span className="text-xs text-white font-medium">Connected</span>
//                   </div>

//                   {/* Real-time Clock */}
//                   <div className="absolute top-4 right-4">
//                     <span className="text-xs text-slate-400 font-light font-mono">
//                       {currentTime.toLocaleTimeString('en-US', { 
//                         hour: '2-digit', 
//                         minute: '2-digit',
//                         second: '2-digit',
//                         hour12: false 
//                       })}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Glow Effect */}
//                 <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
//               </div>
//             </div>

//             {/* Text Content - Placed SECOND on mobile */}
//             <div className="space-y-8 order-2 md:order-1 text-center md:text-left">
//               <div className="space-y-4 sm:space-y-6">
//                 {/* Slightly reduced text size on mobile for better fit */}
//                 <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
//                   Your meetings, simplified and secure.
//                 </h1>
//                 <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed">
//                   Connect seamlessly with your team, clients, and friends.
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//                 {!isAuthenticated ? (
//                   <>
//                     <button
//                       onClick={() => handleNavigation('/auth')}
//                       className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-lg cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base sm:text-lg transition"
//                     >
//                       Get Started Free <ArrowRight size={20} />
//                     </button>
//                     <button
//                       onClick={() => handleNavigation('/aljk23')}
//                       className="inline-flex items-center justify-center gap-2 cursor-pointer px-6 py-3 sm:px-8 sm:py-4 rounded-lg border-2 border-slate-700 hover:border-emerald-600 text-white font-medium text-base sm:text-lg transition"
//                     >
//                       Join as Guest
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => handleNavigation('/home')}
//                     className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-lg cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base sm:text-lg transition"
//                   >
//                     Go to Dashboard <ArrowRight size={20} />
//                   </button>
//                 )}
//               </div>

//               {/* Stats - Reduced padding top and margin bottom for a tighter fit on mobile */}
//               <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800 mt-8">
//                 <div className="text-center">
//                   <p className="text-2xl sm:text-3xl font-bold text-white">1M+</p>
//                   <p className="text-slate-400 text-xs sm:text-sm mt-1">Active Users</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl sm:text-3xl font-bold text-white">99.9%</p>
//                   <p className="text-slate-400 text-xs sm:text-sm mt-1">Uptime</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl sm:text-3xl font-bold text-white">180+</p>
//                   <p className="text-slate-400 text-xs sm:text-sm mt-1">Countries</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES SECTION - No changes needed, as it is already responsive */}
//       <section className="py-16 sm:py-20 px-4 bg-slate-900/50 border-y border-slate-800">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12 sm:mb-16">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-white">
//               Enterprise-Grade Features
//             </h2>
//             <p className="text-base sm:text-xl text-slate-400">
//               Everything you need for professional communication
//             </p>
//           </div>

//           {/* Grid layout is inherently responsive for this feature list */}
//           <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
//             {[
//               {
//                 icon: <Video className="w-6 h-6" />,
//                 title: 'HD Quality',
//                 desc: 'Crystal clear 1080p video with adaptive streaming technology',
//               },
//               {
//                 icon: <Lock className="w-6 h-6" />,
//                 title: 'End-to-End Encryption',
//                 desc: 'Bank-level security for all your conversations',
//               },
//               {
//                 icon: <Zap className="w-6 h-6" />,
//                 title: 'Low Latency',
//                 desc: 'Optimized global infrastructure for instant connection',
//               },
//               {
//                 icon: <Users className="w-6 h-6" />,
//                 title: 'Group Calls',
//                 desc: 'Host meetings with up to 100 participants',
//               },
//               {
//                 icon: <Globe className="w-6 h-6" />,
//                 title: 'Screen Sharing',
//                 desc: 'Share your screen with full HD quality',
//               },
//               {
//                 icon: <Shield className="w-6 h-6" />,
//                 title: 'Browser Based',
//                 desc: 'No downloads required, join instantly',
//               },
//             ].map((feature, idx) => (
//               <div
//                 key={idx}
//                 className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-600 transition group"
//               >
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition">
//                   <span className="text-emerald-400 group-hover:text-white transition">
//                     {feature.icon}
//                   </span>
//                 </div>
//                 <h3 className="text-lg font-semibold mb-2 text-white">
//                   {feature.title}
//                 </h3>
//                 <p className="text-slate-400 text-sm">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA SECTION - Reduced padding for mobile */}
//       <section className="py-16 sm:py-20 px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-3xl sm:text-4xl font-bold mb-5 text-white">
//             Ready to get started?
//           </h2>
//           <p className="text-lg sm:text-xl text-slate-400 mb-7 sm:mb-8">
//             Join millions of professionals connecting across the globe every day.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             {!isAuthenticated ? (
//               <>
//                 <button
//                   onClick={() => handleNavigation('/auth')}
//                   className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-medium text-base sm:text-lg transition"
//                 >
//                   Get Started Now
//                 </button>
//                 <button
//                   onClick={() => handleNavigation('/aljk23')}
//                   className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg border-2 border-slate-700 cursor-pointer hover:border-emerald-600 text-white font-medium text-base sm:text-lg transition"
//                 >
//                   Join as Guest
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => handleNavigation('/home')}
//                 className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-medium text-base sm:text-lg transition"
//               >
//                 Go to Dashboard
//               </button>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* FOOTER - Already generally responsive */}
//       <footer className="border-t border-slate-800 py-10 sm:py-12 px-4 bg-slate-950">
//         <div className="max-w-7xl mx-auto">
//           {/* Change to two columns on mobile, then four on desktop */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
//             <div className="col-span-2 md:col-span-1">
//               <div
//                 className="flex items-center gap-2 mb-4 cursor-pointer"
//                 onClick={() => handleNavigation('/')}
//               >
//                 <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
//                   <Video className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="font-semibold text-white">Loop Talk</span>
//               </div>
//               <p className="text-slate-400 text-sm">
//                 Professional video conferencing made simple.
//               </p>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4 text-white">Product</h4>
//               <ul className="space-y-2 text-sm text-slate-400">
//                 <li className="hover:text-white transition cursor-pointer">
//                   Features
//                 </li>
//                 <li className="hover:text-white transition cursor-pointer">
//                   Pricing
//                 </li>
//                 <li className="hover:text-white transition cursor-pointer">
//                   Security
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4 text-white">Company</h4>
//               <ul className="space-y-2 text-sm text-slate-400">
//                 <li className="hover:text-white transition cursor-pointer">
//                   About
//                 </li>
//                 <li className="hover:text-white transition cursor-pointer">
//                   Blog
//                 </li>
//                 <li className="hover:text-white transition cursor-pointer">
//                   Careers
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4 text-white">Legal</h4>
//               <ul className="space-y-2 text-sm text-slate-400">
//                 <li className="hover:text-white transition cursor-pointer">
//                   Privacy
//                 </li>
//                 <li className="hover:text-white transition cursor-pointer">
//                   Terms
//                 </li>
//                 <li className="hover:text-white transition cursor-pointer">
//                   Contact
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
//             <p>&copy; 2025 Loop Talk. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Video,
  Users,
  Lock,
  Zap,
  ArrowRight,
  Menu,
  X,
  Shield, // Used for the new Value Proposition Tag
  Globe,
  User,
  LogOut,
  Clock,
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const navigate = useNavigate();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    // Ensure the page scrolls to the top on navigation
    window.scrollTo(0, 0); 
    console.log(`Navigating to ${path}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setShowProfileMenu(false);
    handleNavigation('/');
  };

  // Close mobile menu when navigating
  const handleMobileNavClick = (path) => {
    handleNavigation(path);
    setMobileMenuOpen(false);
  };


  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ---------------- NAVIGATION ---------------- */}
      <nav className="fixed py-4 w-full top-0 z-50 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                handleNavigation('/');
              }}
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Loop Talk</h2>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {/* Real-time Clock - Moved to be a dedicated desktop element */}
              <div className="text-slate-400 text-sm font-light flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })} • {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short'
                })}
              </div>
              
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => handleNavigation('/aljk24')}
                    className="text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    Guest Join
                  </button>
                  <button
                    onClick={() => handleNavigation('/auth')}
                    className="text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => handleNavigation('/auth')}
                    className="px-6 py-2.5 rounded-lg bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-medium transition"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigation('/home')}
                    className="text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    Dashboard
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center transition cursor-pointer"
                    >
                      <User className="w-5 h-5 text-white" />
                    </button>

                    {/* Profile Dropdown */}
                    {showProfileMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-2 z-50">
                        <button
                          onClick={() => {
                            handleNavigation('/home');
                            setShowProfileMenu(false);
                          }}
                          className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-2"
                        >
                          <Video className="w-4 h-4" />
                          Dashboard
                        </button>
                        <button
                          onClick={() => {
                            handleNavigation('/history');
                            setShowProfileMenu(false);
                          }}
                          className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-2"
                        >
                          <Clock className="w-4 h-4" />
                          History
                        </button>
                        <div className="border-t border-slate-800 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-slate-800 transition flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3 border-t border-slate-800 pt-4">
              {/* Mobile Clock */}
              <div className="flex justify-center border-b border-slate-800 pb-3 mb-2">
                <div className="text-slate-400 text-sm font-light flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false 
                  })} • {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short'
                  })}
                </div>
              </div>

              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => handleMobileNavClick('/aljk24')}
                    className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition"
                  >
                    Join as Guest
                  </button>
                  <button
                    onClick={() => handleMobileNavClick('/auth')}
                    className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => handleMobileNavClick('/auth')}
                    className="w-full px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleMobileNavClick('/home')}
                    className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition flex items-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleMobileNavClick('/history')}
                    className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    History
                  </button>
                  <div className="border-t border-slate-800 my-2"></div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/*HERO SECTION - MOBILE OPTIMIZATION APPLIED*/}
      <section className="pt-30 pb-30 sm:pt-45 sm:pb-41 px-4 bg-slate-950 sm:mt-4">
        <div className="max-w-7xl mx-auto">
          {/* Flex column on mobile (order-1, order-2), grid on medium screens and up */}
          <div className="flex flex-col gap-16 items-center md:grid md:grid-cols-2">
            
            {/* Video Mockup - Placed FIRST to ensure immediate visibility on mobile */}
            <div className="relative flex flex-col items-center justify-center order-1 md:order-2">
              
              {/* --- START OF REPLACEMENT --- */}
              {/* Value Proposition Tag (Replaced "Trusted Badge") */}
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2  text-emerald-400 text-sm font-medium">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>Secure, High-Quality Video Conferencing</span>
              </div>
              {/* --- END OF REPLACEMENT --- */}

              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="relative z-10 w-full h-64 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="w-16 h-16 text-emerald-500 animate-pulse" />
                  </div>

                  {/* Call Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-emerald-600 transition cursor-pointer">
                      <Video className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition cursor-pointer">
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-emerald-600 transition cursor-pointer">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-xs text-white font-medium">Connected</span>
                  </div>

                  {/* Real-time Clock */}
                  <div className="absolute top-4 right-4">
                    <span className="text-xs text-slate-400 font-light font-mono">
                      {currentTime.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false 
                      })}
                    </span>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Text Content - Placed SECOND on mobile */}
            <div className="space-y-8 order-2 md:order-1 text-center md:text-left">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
                  Your meetings, simplified and secure.
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed">
                  Connect seamlessly with your team, clients, and friends.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => handleNavigation('/auth')}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-lg cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base sm:text-lg transition"
                    >
                      Get Started Free <ArrowRight size={20} />
                    </button>
                    <button
                      onClick={() => handleNavigation('/aljk24')}
                      className="inline-flex items-center justify-center gap-2 cursor-pointer px-6 py-3 sm:px-8 sm:py-4 rounded-lg border-2 border-slate-700 hover:border-emerald-600 text-white font-medium text-base sm:text-lg transition"
                    >
                      Join as Guest
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigation('/home')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-lg cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base sm:text-lg transition"
                  >
                    Go to Dashboard <ArrowRight size={20} />
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800 mt-8">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">1M+</p>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">Active Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">99.9%</p>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">Uptime</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">180+</p>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">Countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 sm:py-20 px-4 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-white">
              Enterprise-Grade Features
            </h2>
            <p className="text-base sm:text-xl text-slate-400">
              Everything you need for professional communication
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: <Video className="w-6 h-6" />,
                title: 'HD Quality',
                desc: 'Crystal clear 1080p video with adaptive streaming technology',
              },
              {
                icon: <Lock className="w-6 h-6" />,
                title: 'End-to-End Encryption',
                desc: 'Bank-level security for all your conversations',
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Low Latency',
                desc: 'Optimized global infrastructure for instant connection',
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: 'Group Calls',
                desc: 'Host meetings with up to 100 participants',
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: 'Screen Sharing',
                desc: 'Share your screen with full HD quality',
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Browser Based',
                desc: 'No downloads required, join instantly',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-600 transition group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition">
                  <span className="text-emerald-400 group-hover:text-white transition">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-5 text-white">
            Ready to get started?
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 mb-7 sm:mb-8">
            Join millions of professionals connecting across the globe every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigation('/auth')}
                  className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-medium text-base sm:text-lg transition"
                >
                  Get Started Now
                </button>
                <button
                  onClick={() => handleNavigation('/aljk23')}
                  className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg border-2 border-slate-700 cursor-pointer hover:border-emerald-600 text-white font-medium text-base sm:text-lg transition"
                >
                  Join as Guest
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigation('/home')}
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-medium text-base sm:text-lg transition"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-10 sm:py-12 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div
                className="flex items-center gap-2 mb-4 cursor-pointer"
                onClick={() => handleNavigation('/')}
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-white">Loop Talk</span>
              </div>
              <p className="text-slate-400 text-sm">
                Professional video conferencing made simple.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-white transition cursor-pointer">
                  Features
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Pricing
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Security
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-white transition cursor-pointer">
                  About
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Blog
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Careers
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-white transition cursor-pointer">
                  Privacy
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Terms
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Contact
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 Loop Talk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}