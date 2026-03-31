
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
//   Shield, // Used for the new Value Proposition Tag
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
//                     onClick={() => handleMobileNavClick('/aljk24')}
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
//       <section className="pt-30 pb-30 sm:pt-45 sm:pb-41 px-4 bg-slate-950 sm:mt-4">
//         <div className="max-w-7xl mx-auto">
//           {/* Flex column on mobile (order-1, order-2), grid on medium screens and up */}
//           <div className="flex flex-col gap-16 items-center md:grid md:grid-cols-2">
            
//             {/* Video Mockup - Placed FIRST to ensure immediate visibility on mobile */}
//             <div className="relative flex flex-col items-center justify-center order-1 md:order-2">
              
//               {/* --- START OF REPLACEMENT --- */}
//               {/* Value Proposition Tag (Replaced "Trusted Badge") */}
//               <div className="mb-6 inline-flex items-center gap-2 px-4 py-2  text-emerald-400 text-sm font-medium">
//                 <Shield className="w-4 h-4 text-emerald-500" />
//                 <span>Secure, High-Quality Video Conferencing</span>
//               </div>
//               {/* --- END OF REPLACEMENT --- */}

//               <div className="relative w-full max-w-sm sm:max-w-md">
//                 <div className="relative z-10 w-full h-80 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
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
//                       onClick={() => handleNavigation('/aljk24')}
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

//               {/* Stats */}
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

//       {/* FEATURES SECTION */}
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

//       {/* CTA SECTION */}
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

//       {/* FOOTER */}
//       <footer className="border-t border-slate-800 py-10 sm:py-12 px-4 bg-slate-950">
//         <div className="max-w-7xl mx-auto">
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
//   ChevronDown,
//   Play,
//   Check,
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
//     window.scrollTo(0, 0);
//     console.log(`Navigating to ${path}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     setShowProfileMenu(false);
//     handleNavigation('/');
//   };

//   const handleMobileNavClick = (path) => {
//     handleNavigation(path);
//     setMobileMenuOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-white text-slate-900">
//       {/* ---------------- NAVIGATION ---------------- */}
//       <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* Logo */}
//             <div
//               className="flex items-center gap-3 cursor-pointer"
//               onClick={() => handleNavigation('/')}
//             >
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
//                 <Video className="w-5 h-5 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-slate-900">Loop Talk</h2>
//             </div>

//             {/* Desktop Navigation Links */}
//             <div className="hidden lg:flex items-center gap-8">
//               <button className="text-slate-700 hover:text-slate-900 transition font-medium flex items-center gap-1">
//                 Products <ChevronDown className="w-4 h-4" />
//               </button>
//               <button className="text-slate-700 hover:text-slate-900 transition font-medium flex items-center gap-1">
//                 Solutions <ChevronDown className="w-4 h-4" />
//               </button>
//               <button className="text-slate-700 hover:text-slate-900 transition font-medium">
//                 Plans & Pricing
//               </button>
//               <button className="text-slate-700 hover:text-slate-900 transition font-medium flex items-center gap-1">
//                 Resources <ChevronDown className="w-4 h-4" />
//               </button>
//             </div>

//             {/* Desktop Actions */}
//             <div className="hidden lg:flex items-center gap-4">
//               {!isAuthenticated ? (
//                 <>
//                   <button
//                     onClick={() => handleNavigation('/aljk24')}
//                     className="text-slate-700 hover:text-slate-900 transition font-medium"
//                   >
//                     Join a Meeting
//                   </button>
//                   <button
//                     onClick={() => handleNavigation('/auth')}
//                     className="text-slate-700 hover:text-slate-900 transition font-medium"
//                   >
//                     Sign In
//                   </button>
//                   <button
//                     onClick={() => handleNavigation('/auth')}
//                     className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition shadow-lg hover:shadow-xl"
//                   >
//                     Sign Up, It's Free
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => handleNavigation('/home')}
//                     className="text-slate-700 hover:text-slate-900 transition font-medium"
//                   >
//                     Dashboard
//                   </button>
//                   <div className="relative">
//                     <button
//                       onClick={() => setShowProfileMenu(!showProfileMenu)}
//                       className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 flex items-center justify-center transition shadow-md"
//                     >
//                       <User className="w-5 h-5 text-white" />
//                     </button>

//                     {showProfileMenu && (
//                       <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2">
//                         <button
//                           onClick={() => {
//                             handleNavigation('/home');
//                             setShowProfileMenu(false);
//                           }}
//                           className="w-full px-4 py-3 text-left text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition flex items-center gap-3 font-medium"
//                         >
//                           <Video className="w-5 h-5" />
//                           Dashboard
//                         </button>
//                         <button
//                           onClick={() => {
//                             handleNavigation('/history');
//                             setShowProfileMenu(false);
//                           }}
//                           className="w-full px-4 py-3 text-left text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition flex items-center gap-3 font-medium"
//                         >
//                           <Clock className="w-5 h-5" />
//                           History
//                         </button>
//                         <div className="border-t border-slate-200 my-2"></div>
//                         <button
//                           onClick={handleLogout}
//                           className="w-full px-4 py-3 text-left text-red-600 hover:text-red-700 hover:bg-red-50 transition flex items-center gap-3 font-medium"
//                         >
//                           <LogOut className="w-5 h-5" />
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
//               className="lg:hidden text-slate-900"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>

//           {/* Mobile Menu Dropdown */}
//           {mobileMenuOpen && (
//             <div className="lg:hidden pb-6 space-y-2 border-t border-slate-200 pt-6">
//               {!isAuthenticated ? (
//                 <>
//                   <button
//                     onClick={() => handleMobileNavClick('/aljk24')}
//                     className="block w-full text-left px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition font-medium"
//                   >
//                     Join a Meeting
//                   </button>
//                   <button
//                     onClick={() => handleMobileNavClick('/auth')}
//                     className="block w-full text-left px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition font-medium"
//                   >
//                     Sign In
//                   </button>
//                   <button
//                     onClick={() => handleMobileNavClick('/auth')}
//                     className="w-full px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition shadow-lg mt-2"
//                   >
//                     Sign Up, It's Free
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => handleMobileNavClick('/home')}
//                     className="block w-full text-left px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition flex items-center gap-3 font-medium"
//                   >
//                     <Video className="w-5 h-5" />
//                     Dashboard
//                   </button>
//                   <button
//                     onClick={() => handleMobileNavClick('/history')}
//                     className="block w-full text-left px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition flex items-center gap-3 font-medium"
//                   >
//                     <Clock className="w-5 h-5" />
//                     History
//                   </button>
//                   <div className="border-t border-slate-200 my-3"></div>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="w-full px-4 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition shadow-lg flex items-center justify-center gap-2"
//                   >
//                     <LogOut className="w-5 h-5" />
//                     Logout
//                   </button>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Announcement Banner */}
//       <div className="fixed top-20 w-full z-40 bg-slate-50 border-b border-slate-200 py-3">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="hidden sm:flex w-16 h-16 rounded-xl bg-white border-2 border-amber-400 items-center justify-center shadow-md">
//                 <div className="flex flex-col items-center">
//                   <div className="flex gap-0.5 mb-1">
//                     <div className="w-1.5 h-3 bg-amber-400 rounded-sm"></div>
//                     <div className="w-1.5 h-3 bg-amber-400 rounded-sm"></div>
//                   </div>
//                   <span className="text-[8px] font-bold text-amber-600">AWARD</span>
//                 </div>
//               </div>
//               <p className="text-sm sm:text-base text-slate-700">
//                 <span className="font-semibold">Loop Talk recognized</span> as a 2025 Customers' Choice for Unified Communications
//               </p>
//             </div>
//             <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm whitespace-nowrap ml-4">
//               Read Report →
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* HERO SECTION */}
//       <section className="pt-48 pb-20 sm:pt-56 sm:pb-28 px-4 bg-gradient-to-b from-slate-50 to-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             {/* Text Content */}
//             <div className="space-y-8 order-2 lg:order-1">
//               <div className="inline-block">
//                 <span className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">
//                   Loop Talk Meetings
//                 </span>
//               </div>
              
//               <div className="space-y-6">
//                 <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
//                   Where common ground is found.
//                 </h1>
//                 <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed max-w-2xl">
//                   When everyone has an equitable experience, your meeting platform isn't just helping collaboration—it's driving better business results.
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 {!isAuthenticated ? (
//                   <>
//                     <button
//                       onClick={() => handleNavigation('/auth')}
//                       className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition shadow-lg hover:shadow-xl"
//                     >
//                       Plans & Pricing
//                       <ArrowRight size={20} />
//                     </button>
//                     <button
//                       onClick={() => handleNavigation('/aljk24')}
//                       className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-slate-300 hover:border-slate-400 text-slate-900 font-semibold text-lg transition bg-white"
//                     >
//                       <Play size={20} className="fill-current" />
//                       See How it Works
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => handleNavigation('/home')}
//                     className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition shadow-lg hover:shadow-xl"
//                   >
//                     Go to Dashboard
//                     <ArrowRight size={20} />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Hero Image/Video Mockup */}
//             <div className="relative order-1 lg:order-2">
//               <div className="relative w-full max-w-2xl mx-auto">
//                 <div className="relative z-10 w-full aspect-[4/3] rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-2xl">
//                   {/* Main video call interface */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-50">
//                     {/* Video participant grid */}
//                     <div className="grid grid-cols-2 gap-2 p-4 h-full">
//                       <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
//                         <User className="w-12 h-12 text-white/80" />
//                       </div>
//                       <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
//                         <User className="w-12 h-12 text-white/80" />
//                       </div>
//                       <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center relative">
//                         <User className="w-12 h-12 text-white/80" />
//                         {/* Speaking indicator */}
//                         <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm">
//                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
//                           <span className="text-xs font-medium text-slate-700">Speaking</span>
//                         </div>
//                       </div>
//                       <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
//                         <User className="w-12 h-12 text-white/80" />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Call Controls */}
//                   <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
//                     <button className="w-14 h-14 rounded-full bg-white hover:bg-slate-100 border-2 border-slate-300 flex items-center justify-center transition shadow-lg">
//                       <Video className="w-6 h-6 text-slate-700" />
//                     </button>
//                     <button className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition shadow-lg">
//                       <X className="w-6 h-6 text-white" />
//                     </button>
//                     <button className="w-14 h-14 rounded-full bg-white hover:bg-slate-100 border-2 border-slate-300 flex items-center justify-center transition shadow-lg">
//                       <Users className="w-6 h-6 text-slate-700" />
//                     </button>
//                   </div>

//                   {/* Top bar */}
//                   <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
//                     <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200">
//                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
//                       <span className="text-sm font-semibold text-slate-700">Live Meeting</span>
//                     </div>
//                     <div className="px-3 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200">
//                       <span className="text-sm font-mono font-medium text-slate-700">
//                         {currentTime.toLocaleTimeString('en-US', { 
//                           hour: '2-digit', 
//                           minute: '2-digit',
//                           hour12: false 
//                         })}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Subtle glow effect */}
//                 <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-200/30 rounded-full blur-3xl"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 px-4 bg-white border-y border-slate-200">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
//             <div>
//               <p className="text-5xl font-bold text-slate-900 mb-2">1M+</p>
//               <p className="text-lg text-slate-600 font-medium">Active Users Worldwide</p>
//             </div>
//             <div>
//               <p className="text-5xl font-bold text-slate-900 mb-2">99.9%</p>
//               <p className="text-lg text-slate-600 font-medium">Platform Uptime</p>
//             </div>
//             <div>
//               <p className="text-5xl font-bold text-slate-900 mb-2">180+</p>
//               <p className="text-lg text-slate-600 font-medium">Countries Supported</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES SECTION */}
//       <section className="py-24 px-4 bg-slate-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">
//               Built for modern teams
//             </h2>
//             <p className="text-xl text-slate-600 max-w-3xl mx-auto">
//               Everything you need for seamless collaboration, security, and productivity
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <Video className="w-7 h-7" />,
//                 title: 'Crystal Clear HD Video',
//                 desc: '1080p HD video quality with adaptive streaming technology for smooth, lag-free meetings',
//               },
//               {
//                 icon: <Lock className="w-7 h-7" />,
//                 title: 'Enterprise Security',
//                 desc: 'End-to-end encryption and bank-level security protocols protect all your conversations',
//               },
//               {
//                 icon: <Zap className="w-7 h-7" />,
//                 title: 'Ultra-Low Latency',
//                 desc: 'Global infrastructure ensures instant connections with minimal delay, anywhere in the world',
//               },
//               {
//                 icon: <Users className="w-7 h-7" />,
//                 title: 'Large Group Meetings',
//                 desc: 'Host professional meetings with up to 100 participants without compromising quality',
//               },
//               {
//                 icon: <Globe className="w-7 h-7" />,
//                 title: 'HD Screen Sharing',
//                 desc: 'Share your screen in full HD quality with smooth performance and clear visuals',
//               },
//               {
//                 icon: <Shield className="w-7 h-7" />,
//                 title: 'No Downloads Required',
//                 desc: 'Browser-based platform means you can join meetings instantly from any device',
//               },
//             ].map((feature, idx) => (
//               <div
//                 key={idx}
//                 className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 group"
//               >
//                 <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200 flex items-center justify-center mb-5 group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:border-emerald-600 transition-all duration-300">
//                   <span className="text-emerald-600 group-hover:text-white transition-colors duration-300">
//                     {feature.icon}
//                   </span>
//                 </div>
//                 <h3 className="text-xl font-bold mb-3 text-slate-900">
//                   {feature.title}
//                 </h3>
//                 <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Trust & Security Section */}
//       <section className="py-24 px-4 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div className="space-y-6">
//               <div className="inline-block">
//                 <span className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">
//                   Security First
//                 </span>
//               </div>
//               <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
//                 Your privacy is our priority
//               </h2>
//               <p className="text-xl text-slate-600 leading-relaxed">
//                 With enterprise-grade security features and compliance certifications, Loop Talk ensures your meetings stay private and secure.
//               </p>
              
//               <div className="space-y-4 pt-4">
//                 {[
//                   'End-to-end encryption for all meetings',
//                   'SOC 2 Type II certified infrastructure',
//                   'GDPR and HIPAA compliant',
//                   'Regular third-party security audits',
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex items-start gap-3">
//                     <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
//                       <Check className="w-4 h-4 text-emerald-600" />
//                     </div>
//                     <span className="text-lg text-slate-700">{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="relative">
//               <div className="relative z-10 p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl">
//                 <div className="space-y-6">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center">
//                       <Lock className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-slate-400">Security Status</p>
//                       <p className="text-lg font-semibold text-white">All Systems Protected</p>
//                     </div>
//                   </div>
                  
//                   <div className="border-t border-slate-700 pt-6 space-y-3">
//                     <div className="flex justify-between items-center">
//                       <span className="text-slate-400">Encryption Level</span>
//                       <span className="text-white font-semibold">256-bit AES</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-slate-400">Compliance</span>
//                       <span className="text-white font-semibold">SOC 2, GDPR</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-slate-400">Last Security Audit</span>
//                       <span className="text-emerald-400 font-semibold">Passed ✓</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="py-24 px-4 bg-gradient-to-br from-emerald-600 to-teal-700">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
//             Ready to transform your meetings?
//           </h2>
//           <p className="text-xl text-emerald-50 mb-10 leading-relaxed">
//             Join millions of professionals connecting seamlessly across the globe every day.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             {!isAuthenticated ? (
//               <>
//                 <button
//                   onClick={() => handleNavigation('/auth')}
//                   className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-emerald-700 font-semibold text-lg transition shadow-xl hover:shadow-2xl"
//                 >
//                   Get Started Free
//                 </button>
//                 <button
//                   onClick={() => handleNavigation('/aljk24')}
//                   className="px-8 py-4 rounded-full border-2 border-white hover:bg-white/10 text-white font-semibold text-lg transition"
//                 >
//                   Join as Guest
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => handleNavigation('/home')}
//                 className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-emerald-700 font-semibold text-lg transition shadow-xl hover:shadow-2xl"
//               >
//                 Go to Dashboard
//               </button>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="border-t border-slate-200 py-16 px-4 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
//             <div className="col-span-2 md:col-span-1">
//               <div
//                 className="flex items-center gap-3 mb-5 cursor-pointer"
//                 onClick={() => handleNavigation('/')}
//               >
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
//                   <Video className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="font-bold text-xl text-slate-900">Loop Talk</span>
//               </div>
//               <p className="text-slate-600 leading-relaxed">
//                 Professional video conferencing made simple, secure, and accessible for everyone.
//               </p>
//             </div>

//             <div>
//               <h4 className="font-bold mb-4 text-slate-900 text-lg">Product</h4>
//               <ul className="space-y-3 text-slate-600">
//                 <li className="hover:text-slate-900 transition cursor-pointer">Features</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Pricing</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Security</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Enterprise</li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold mb-4 text-slate-900 text-lg">Company</h4>
//               <ul className="space-y-3 text-slate-600">
//                 <li className="hover:text-slate-900 transition cursor-pointer">About Us</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Blog</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Careers</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Press</li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold mb-4 text-slate-900 text-lg">Resources</h4>
//               <ul className="space-y-3 text-slate-600">
//                 <li className="hover:text-slate-900 transition cursor-pointer">Support</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Privacy Policy</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Terms of Service</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Contact</li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-slate-600 text-sm">
//               &copy; 2025 Loop Talk. All rights reserved.
//             </p>
//             <div className="flex gap-6">
//               <a href="#" className="text-slate-600 hover:text-slate-900 transition">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
//               </a>
//               <a href="#" className="text-slate-600 hover:text-slate-900 transition">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
//               </a>
//               <a href="#" className="text-slate-600 hover:text-slate-900 transition">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/></svg>
//               </a>
//             </div>
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
//   Menu,
//   X,
//   Globe,
//   User,
//   LogOut,
//   Clock,
//   ChevronDown,
//   Play,
//   Check,
//   ArrowRight,
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
//     window.scrollTo(0, 0);
//     console.log(`Navigating to ${path}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     setShowProfileMenu(false);
//     handleNavigation('/');
//   };

//   const handleMobileNavClick = (path) => {
//     handleNavigation(path);
//     setMobileMenuOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-white text-slate-900">
//       {/* ---------------- NAVIGATION ---------------- */}
//       <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* Logo */}
//             <div
//               className="flex items-center gap-3 cursor-pointer"
//               onClick={() => handleNavigation('/')}
//             >
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
//                 <Video className="w-5 h-5 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-slate-900">Loop Talk</h2>
//             </div>

//             {/* Desktop Navigation Links */}
//             <div className="hidden lg:flex items-center gap-8">
//               <button className="text-slate-700 hover:text-slate-900 transition font-medium flex items-center gap-1">
//                 Products <ChevronDown className="w-4 h-4" />
//               </button>
//               <button className="text-slate-700 hover:text-slate-900 transition font-medium flex items-center gap-1">
//                 Solutions <ChevronDown className="w-4 h-4" />
//               </button>
//               <button className="text-slate-700 hover:text-slate-900 transition font-medium">
//                 Plans & Pricing
//               </button>
//               <button className="text-slate-700 hover:text-slate-900 transition font-medium flex items-center gap-1">
//                 Resources <ChevronDown className="w-4 h-4" />
//               </button>
//             </div>

//             {/* Desktop Actions */}
//             <div className="hidden lg:flex items-center gap-4">
//               {!isAuthenticated ? (
//                 <>
//                   <button
//                     onClick={() => handleNavigation('/aljk24')}
//                     className="text-slate-700 hover:text-slate-900 transition font-medium"
//                   >
//                     Join a Meeting
//                   </button>
//                   <button
//                     onClick={() => handleNavigation('/auth')}
//                     className="text-slate-700 hover:text-slate-900 transition font-medium"
//                   >
//                     Sign In
//                   </button>
//                   <button
//                     onClick={() => handleNavigation('/auth')}
//                     className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition shadow-lg hover:shadow-xl"
//                   >
//                     Sign Up, It's Free
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => handleNavigation('/home')}
//                     className="text-slate-700 hover:text-slate-900 transition font-medium"
//                   >
//                     Dashboard
//                   </button>
//                   <div className="relative">
//                     <button
//                       onClick={() => setShowProfileMenu(!showProfileMenu)}
//                       className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 flex items-center justify-center transition shadow-md"
//                     >
//                       <User className="w-5 h-5 text-white" />
//                     </button>

//                     {showProfileMenu && (
//                       <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2">
//                         <button
//                           onClick={() => {
//                             handleNavigation('/home');
//                             setShowProfileMenu(false);
//                           }}
//                           className="w-full px-4 py-3 text-left text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition flex items-center gap-3 font-medium"
//                         >
//                           <Video className="w-5 h-5" />
//                           Dashboard
//                         </button>
//                         <button
//                           onClick={() => {
//                             handleNavigation('/history');
//                             setShowProfileMenu(false);
//                           }}
//                           className="w-full px-4 py-3 text-left text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition flex items-center gap-3 font-medium"
//                         >
//                           <Clock className="w-5 h-5" />
//                           History
//                         </button>
//                         <div className="border-t border-slate-200 my-2"></div>
//                         <button
//                           onClick={handleLogout}
//                           className="w-full px-4 py-3 text-left text-red-600 hover:text-red-700 hover:bg-red-50 transition flex items-center gap-3 font-medium"
//                         >
//                           <LogOut className="w-5 h-5" />
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
//               className="lg:hidden text-slate-900"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>

//           {/* Mobile Menu Dropdown */}
//           {mobileMenuOpen && (
//             <div className="lg:hidden pb-6 space-y-2 border-t border-slate-200 pt-6">
//               {!isAuthenticated ? (
//                 <>
//                   <button
//                     onClick={() => handleMobileNavClick('/aljk24')}
//                     className="block w-full text-left px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition font-medium"
//                   >
//                     Join a Meeting
//                   </button>
//                   <button
//                     onClick={() => handleMobileNavClick('/auth')}
//                     className="block w-full text-left px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition font-medium"
//                   >
//                     Sign In
//                   </button>
//                   <button
//                     onClick={() => handleMobileNavClick('/auth')}
//                     className="w-full px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition shadow-lg mt-2"
//                   >
//                     Sign Up, It's Free
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => handleMobileNavClick('/home')}
//                     className="block w-full text-left px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition flex items-center gap-3 font-medium"
//                   >
//                     <Video className="w-5 h-5" />
//                     Dashboard
//                   </button>
//                   <button
//                     onClick={() => handleMobileNavClick('/history')}
//                     className="block w-full text-left px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition flex items-center gap-3 font-medium"
//                   >
//                     <Clock className="w-5 h-5" />
//                     History
//                   </button>
//                   <div className="border-t border-slate-200 my-3"></div>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="w-full px-4 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition shadow-lg flex items-center justify-center gap-2"
//                   >
//                     <LogOut className="w-5 h-5" />
//                     Logout
//                   </button>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Announcement Banner */}
//       <div className="fixed top-20 w-full z-40 bg-slate-50 border-b border-slate-200 py-3">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center sm:justify-between">
//             <p className="text-sm sm:text-base text-slate-700 text-center sm:text-left">
//               <span className="font-semibold">Loop Talk recognized</span> as a 2025 Customers' Choice for Unified Communications
//             </p>
//             <button className="hidden sm:inline-block text-emerald-600 hover:text-emerald-700 font-semibold text-sm whitespace-nowrap ml-4">
//               Read Report →
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* HERO SECTION */}
//       <section className="pt-48 pb-20 sm:pt-56 sm:pb-28 px-4 bg-gradient-to-b from-slate-50 to-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             {/* Text Content */}
//             <div className="space-y-8 order-2 lg:order-1">
//               <div className="inline-block">
//                 <span className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">
//                   Loop Talk Meetings
//                 </span>
//               </div>
              
//               <div className="space-y-6">
//                 <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
//                   Where common ground is found.
//                 </h1>
//                 <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed max-w-2xl">
//                   When everyone has an equitable experience, your meeting platform isn't just helping collaboration—it's driving better business results.
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 {!isAuthenticated ? (
//                   <>
//                     <button
//                       onClick={() => handleNavigation('/auth')}
//                       className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition shadow-lg hover:shadow-xl"
//                     >
//                       Plans & Pricing
//                       <ArrowRight size={20} />
//                     </button>
//                     <button
//                       onClick={() => handleNavigation('/aljk24')}
//                       className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-slate-300 hover:border-slate-400 text-slate-900 font-semibold text-lg transition bg-white"
//                     >
//                       <Play size={20} className="fill-current" />
//                       See How it Works
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => handleNavigation('/home')}
//                     className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition shadow-lg hover:shadow-xl"
//                   >
//                     Go to Dashboard
//                     <ArrowRight size={20} />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Hero Image */}
//             <div className="relative order-1 lg:order-2">
//               <div className="relative w-full max-w-2xl mx-auto">
//                 <div className="relative z-10 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
//                   {/* Placeholder for hero image - Replace src with your actual image */}
//                   <img 
//                     src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop" 
//                     alt="Professional video meeting" 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 px-4 bg-white border-y border-slate-200">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
//             <div>
//               <p className="text-5xl font-bold text-slate-900 mb-2">1M+</p>
//               <p className="text-lg text-slate-600 font-medium">Active Users Worldwide</p>
//             </div>
//             <div>
//               <p className="text-5xl font-bold text-slate-900 mb-2">99.9%</p>
//               <p className="text-lg text-slate-600 font-medium">Platform Uptime</p>
//             </div>
//             <div>
//               <p className="text-5xl font-bold text-slate-900 mb-2">180+</p>
//               <p className="text-lg text-slate-600 font-medium">Countries Supported</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES SECTION */}
//       <section className="py-24 px-4 bg-slate-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">
//               Built for modern teams
//             </h2>
//             <p className="text-xl text-slate-600 max-w-3xl mx-auto">
//               Everything you need for seamless collaboration, security, and productivity
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 title: 'Crystal Clear HD Video',
//                 desc: '1080p HD video quality with adaptive streaming technology for smooth, lag-free meetings',
//               },
//               {
//                 title: 'Enterprise Security',
//                 desc: 'End-to-end encryption and bank-level security protocols protect all your conversations',
//               },
//               {
//                 title: 'Ultra-Low Latency',
//                 desc: 'Global infrastructure ensures instant connections with minimal delay, anywhere in the world',
//               },
//               {
//                 title: 'Large Group Meetings',
//                 desc: 'Host professional meetings with up to 100 participants without compromising quality',
//               },
//               {
//                 title: 'HD Screen Sharing',
//                 desc: 'Share your screen in full HD quality with smooth performance and clear visuals',
//               },
//               {
//                 title: 'No Downloads Required',
//                 desc: 'Browser-based platform means you can join meetings instantly from any device',
//               },
//             ].map((feature, idx) => (
//               <div
//                 key={idx}
//                 className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all duration-300"
//               >
//                 <h3 className="text-xl font-bold mb-3 text-slate-900">
//                   {feature.title}
//                 </h3>
//                 <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Trust & Security Section */}
//       <section className="py-24 px-4 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div className="space-y-6">
//               <div className="inline-block">
//                 <span className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">
//                   Security First
//                 </span>
//               </div>
//               <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
//                 Your privacy is our priority
//               </h2>
//               <p className="text-xl text-slate-600 leading-relaxed">
//                 With enterprise-grade security features and compliance certifications, Loop Talk ensures your meetings stay private and secure.
//               </p>
              
//               <div className="space-y-4 pt-4">
//                 {[
//                   'End-to-end encryption for all meetings',
//                   'SOC 2 Type II certified infrastructure',
//                   'GDPR and HIPAA compliant',
//                   'Regular third-party security audits',
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex items-start gap-3">
//                     <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
//                       <Check className="w-4 h-4 text-white" />
//                     </div>
//                     <span className="text-lg text-slate-700">{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="relative">
//               <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
//                 <img 
//                   src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop" 
//                   alt="Secure video conferencing" 
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="py-24 px-4 bg-gradient-to-br from-emerald-600 to-teal-700">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
//             Ready to transform your meetings?
//           </h2>
//           <p className="text-xl text-emerald-50 mb-10 leading-relaxed">
//             Join millions of professionals connecting seamlessly across the globe every day.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             {!isAuthenticated ? (
//               <>
//                 <button
//                   onClick={() => handleNavigation('/auth')}
//                   className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-emerald-700 font-semibold text-lg transition shadow-xl hover:shadow-2xl"
//                 >
//                   Get Started Free
//                 </button>
//                 <button
//                   onClick={() => handleNavigation('/aljk24')}
//                   className="px-8 py-4 rounded-full border-2 border-white hover:bg-white/10 text-white font-semibold text-lg transition"
//                 >
//                   Join as Guest
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => handleNavigation('/home')}
//                 className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-emerald-700 font-semibold text-lg transition shadow-xl hover:shadow-2xl"
//               >
//                 Go to Dashboard
//               </button>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="border-t border-slate-200 py-16 px-4 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
//             <div className="col-span-2 md:col-span-1">
//               <div
//                 className="flex items-center gap-3 mb-5 cursor-pointer"
//                 onClick={() => handleNavigation('/')}
//               >
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
//                   <Video className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="font-bold text-xl text-slate-900">Loop Talk</span>
//               </div>
//               <p className="text-slate-600 leading-relaxed">
//                 Professional video conferencing made simple, secure, and accessible for everyone.
//               </p>
//             </div>

//             <div>
//               <h4 className="font-bold mb-4 text-slate-900 text-lg">Product</h4>
//               <ul className="space-y-3 text-slate-600">
//                 <li className="hover:text-slate-900 transition cursor-pointer">Features</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Pricing</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Security</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Enterprise</li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold mb-4 text-slate-900 text-lg">Company</h4>
//               <ul className="space-y-3 text-slate-600">
//                 <li className="hover:text-slate-900 transition cursor-pointer">About Us</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Blog</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Careers</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Press</li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold mb-4 text-slate-900 text-lg">Resources</h4>
//               <ul className="space-y-3 text-slate-600">
//                 <li className="hover:text-slate-900 transition cursor-pointer">Support</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Privacy Policy</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Terms of Service</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Contact</li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-slate-200 pt-8 text-center">
//             <p className="text-slate-600 text-sm">
//               &copy; 2025 Loop Talk. All rights reserved.
//             </p>
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
//   Menu,
//   X,
//   Globe,
//   User,
//   LogOut,
//   Clock,
//   ChevronDown,
//   Play,
//   Check,
//   ArrowRight,
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
//     window.scrollTo(0, 0);
//     console.log(`Navigating to ${path}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     setShowProfileMenu(false);
//     handleNavigation('/');
//   };

//   const handleMobileNavClick = (path) => {
//     handleNavigation(path);
//     setMobileMenuOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-white text-slate-900">
//       {/* ---------------- NAVIGATION ---------------- */}
//       <nav className="fixed w-full top-0 z-50 bg-black/95 backdrop-blur-md border-b border-slate-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* Logo */}
//             <div
//               className="flex items-center gap-3 cursor-pointer"
//               onClick={() => handleNavigation('/')}
//             >
//               <img 
//                 src="/logo.png" 
//                 alt="Loop Talk Logo" 
//                 className="h-10 w-auto object-contain"
//               />
//               <h2 className="text-2xl font-bold text-white">Loop Talk</h2>
//             </div>

//             {/* Desktop Navigation Links */}
//             <div className="hidden lg:flex items-center gap-8">
//               <button className="text-slate-300 hover:text-white transition font-medium flex items-center gap-1">
//                 Products <ChevronDown className="w-4 h-4" />
//               </button>
//               <button className="text-slate-300 hover:text-white transition font-medium flex items-center gap-1">
//                 Solutions <ChevronDown className="w-4 h-4" />
//               </button>
//               <button className="text-slate-300 hover:text-white transition font-medium">
//                 Plans & Pricing
//               </button>
//               <button className="text-slate-300 hover:text-white transition font-medium flex items-center gap-1">
//                 Resources <ChevronDown className="w-4 h-4" />
//               </button>
//             </div>

//             {/* Desktop Actions */}
//             <div className="hidden lg:flex items-center gap-4">
//               {!isAuthenticated ? (
//                 <>
//                   <button
//                     onClick={() => handleNavigation('/aljk24')}
//                     className="text-slate-300 hover:text-white transition font-medium"
//                   >
//                     Join a Meeting
//                   </button>
//                   <button
//                     onClick={() => handleNavigation('/auth')}
//                     className="text-slate-300 hover:text-white transition font-medium"
//                   >
//                     Sign In
//                   </button>
//                   <button
//                     onClick={() => handleNavigation('/auth')}
//                     className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-black font-semibold transition shadow-lg hover:shadow-xl"
//                   >
//                     Sign Up, It's Free
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => handleNavigation('/home')}
//                     className="text-slate-300 hover:text-white transition font-medium"
//                   >
//                     Dashboard
//                   </button>
//                   <div className="relative">
//                     <button
//                       onClick={() => setShowProfileMenu(!showProfileMenu)}
//                       className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 flex items-center justify-center transition shadow-md"
//                     >
//                       <User className="w-5 h-5 text-white" />
//                     </button>

//                     {showProfileMenu && (
//                       <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2">
//                         <button
//                           onClick={() => {
//                             handleNavigation('/home');
//                             setShowProfileMenu(false);
//                           }}
//                           className="w-full px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-3 font-medium"
//                         >
//                           <Video className="w-5 h-5" />
//                           Dashboard
//                         </button>
//                         <button
//                           onClick={() => {
//                             handleNavigation('/history');
//                             setShowProfileMenu(false);
//                           }}
//                           className="w-full px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-3 font-medium"
//                         >
//                           <Clock className="w-5 h-5" />
//                           History
//                         </button>
//                         <div className="border-t border-slate-700 my-2"></div>
//                         <button
//                           onClick={handleLogout}
//                           className="w-full px-4 py-3 text-left text-red-400 hover:text-red-300 hover:bg-slate-800 transition flex items-center gap-3 font-medium"
//                         >
//                           <LogOut className="w-5 h-5" />
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
//               className="lg:hidden text-white"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>

//           {/* Mobile Menu Dropdown */}
//           {mobileMenuOpen && (
//             <div className="lg:hidden pb-6 space-y-2 border-t border-slate-800 pt-6">
//               {!isAuthenticated ? (
//                 <>
//                   <button
//                     onClick={() => handleMobileNavClick('/aljk24')}
//                     className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition font-medium"
//                   >
//                     Join a Meeting
//                   </button>
//                   <button
//                     onClick={() => handleMobileNavClick('/auth')}
//                     className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition font-medium"
//                   >
//                     Sign In
//                   </button>
//                   <button
//                     onClick={() => handleMobileNavClick('/auth')}
//                     className="w-full px-4 py-3 rounded-full bg-white hover:bg-slate-100 text-black font-semibold transition shadow-lg mt-2"
//                   >
//                     Sign Up, It's Free
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => handleMobileNavClick('/home')}
//                     className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition flex items-center gap-3 font-medium"
//                   >
//                     <Video className="w-5 h-5" />
//                     Dashboard
//                   </button>
//                   <button
//                     onClick={() => handleMobileNavClick('/history')}
//                     className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition flex items-center gap-3 font-medium"
//                   >
//                     <Clock className="w-5 h-5" />
//                     History
//                   </button>
//                   <div className="border-t border-slate-800 my-3"></div>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="w-full px-4 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition shadow-lg flex items-center justify-center gap-2"
//                   >
//                     <LogOut className="w-5 h-5" />
//                     Logout
//                   </button>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Announcement Banner */}
//       <div className="fixed top-20 w-full z-40 bg-slate-50 border-b border-slate-200 py-3">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center sm:justify-between">
//             <p className="text-sm sm:text-base text-slate-700 text-center sm:text-left">
//               <span className="font-semibold">Loop Talk recognized</span> as a 2025 Customers' Choice for Unified Communications
//             </p>
//             <button className="hidden sm:inline-block text-emerald-600 hover:text-emerald-700 font-semibold text-sm whitespace-nowrap ml-4">
//               Read Report →
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* HERO SECTION */}
//       <section className="pt-48 pb-20 sm:pt-56 sm:pb-28 px-4 bg-gradient-to-b from-slate-50 to-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             {/* Text Content */}
//             <div className="space-y-8 order-2 lg:order-1">
//               <div className="inline-block">
//                 <span className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">
//                   Loop Talk Meetings
//                 </span>
//               </div>
              
//               <div className="space-y-6">
//                 <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
//                   Where common ground is found.
//                 </h1>
//                 <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed max-w-2xl">
//                   When everyone has an equitable experience, your meeting platform isn't just helping collaboration—it's driving better business results.
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 {!isAuthenticated ? (
//                   <>
//                     <button
//                       onClick={() => handleNavigation('/auth')}
//                       className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition shadow-lg hover:shadow-xl"
//                     >
//                       Plans & Pricing
//                       <ArrowRight size={20} />
//                     </button>
//                     <button
//                       onClick={() => handleNavigation('/aljk24')}
//                       className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-slate-300 hover:border-slate-400 text-slate-900 font-semibold text-lg transition bg-white"
//                     >
//                       <Play size={20} className="fill-current" />
//                       See How it Works
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => handleNavigation('/home')}
//                     className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition shadow-lg hover:shadow-xl"
//                   >
//                     Go to Dashboard
//                     <ArrowRight size={20} />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Hero Image */}
//             <div className="relative order-1 lg:order-2">
//               <div className="relative w-full max-w-2xl mx-auto">
//                 <div className="relative z-10 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
//                   {/* Placeholder for hero image - Replace src with your actual image */}
//                   <img 
//                     src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop" 
//                     alt="Professional video meeting" 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 px-4 bg-white border-y border-slate-200">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
//             <div>
//               <p className="text-5xl font-bold text-slate-900 mb-2">1M+</p>
//               <p className="text-lg text-slate-600 font-medium">Active Users Worldwide</p>
//             </div>
//             <div>
//               <p className="text-5xl font-bold text-slate-900 mb-2">99.9%</p>
//               <p className="text-lg text-slate-600 font-medium">Platform Uptime</p>
//             </div>
//             <div>
//               <p className="text-5xl font-bold text-slate-900 mb-2">180+</p>
//               <p className="text-lg text-slate-600 font-medium">Countries Supported</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES SECTION */}
//       <section className="py-24 px-4 bg-slate-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">
//               Built for modern teams
//             </h2>
//             <p className="text-xl text-slate-600 max-w-3xl mx-auto">
//               Everything you need for seamless collaboration, security, and productivity
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 title: 'Crystal Clear HD Video',
//                 desc: '1080p HD video quality with adaptive streaming technology for smooth, lag-free meetings',
//               },
//               {
//                 title: 'Enterprise Security',
//                 desc: 'End-to-end encryption and bank-level security protocols protect all your conversations',
//               },
//               {
//                 title: 'Ultra-Low Latency',
//                 desc: 'Global infrastructure ensures instant connections with minimal delay, anywhere in the world',
//               },
//               {
//                 title: 'Large Group Meetings',
//                 desc: 'Host professional meetings with up to 100 participants without compromising quality',
//               },
//               {
//                 title: 'HD Screen Sharing',
//                 desc: 'Share your screen in full HD quality with smooth performance and clear visuals',
//               },
//               {
//                 title: 'No Downloads Required',
//                 desc: 'Browser-based platform means you can join meetings instantly from any device',
//               },
//             ].map((feature, idx) => (
//               <div
//                 key={idx}
//                 className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all duration-300"
//               >
//                 <h3 className="text-xl font-bold mb-3 text-slate-900">
//                   {feature.title}
//                 </h3>
//                 <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Trust & Security Section */}
//       <section className="py-24 px-4 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div className="space-y-6">
//               <div className="inline-block">
//                 <span className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">
//                   Security First
//                 </span>
//               </div>
//               <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
//                 Your privacy is our priority
//               </h2>
//               <p className="text-xl text-slate-600 leading-relaxed">
//                 With enterprise-grade security features and compliance certifications, Loop Talk ensures your meetings stay private and secure.
//               </p>
              
//               <div className="space-y-4 pt-4">
//                 {[
//                   'End-to-end encryption for all meetings',
//                   'SOC 2 Type II certified infrastructure',
//                   'GDPR and HIPAA compliant',
//                   'Regular third-party security audits',
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex items-start gap-3">
//                     <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
//                       <Check className="w-4 h-4 text-white" />
//                     </div>
//                     <span className="text-lg text-slate-700">{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="relative">
//               <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
//                 <img 
//                   src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop" 
//                   alt="Secure video conferencing" 
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="py-24 px-4 bg-gradient-to-br from-emerald-600 to-teal-700">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
//             Ready to transform your meetings?
//           </h2>
//           <p className="text-xl text-emerald-50 mb-10 leading-relaxed">
//             Join millions of professionals connecting seamlessly across the globe every day.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             {!isAuthenticated ? (
//               <>
//                 <button
//                   onClick={() => handleNavigation('/auth')}
//                   className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-emerald-700 font-semibold text-lg transition shadow-xl hover:shadow-2xl"
//                 >
//                   Get Started Free
//                 </button>
//                 <button
//                   onClick={() => handleNavigation('/aljk24')}
//                   className="px-8 py-4 rounded-full border-2 border-white hover:bg-white/10 text-white font-semibold text-lg transition"
//                 >
//                   Join as Guest
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => handleNavigation('/home')}
//                 className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-emerald-700 font-semibold text-lg transition shadow-xl hover:shadow-2xl"
//               >
//                 Go to Dashboard
//               </button>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="border-t border-slate-200 py-16 px-4 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
//             <div className="col-span-2 md:col-span-1">
//               <div
//                 className="flex items-center gap-3 mb-5 cursor-pointer"
//                 onClick={() => handleNavigation('/')}
//               >
//                 <img 
//                   src="/logo.png" 
//                   alt="Loop Talk Logo" 
//                   className="h-10 w-auto object-contain"
//                 />
//                 <span className="font-bold text-xl text-slate-900">Loop Talk</span>
//               </div>
//               <p className="text-slate-600 leading-relaxed">
//                 Professional video conferencing made simple, secure, and accessible for everyone.
//               </p>
//             </div>

//             <div>
//               <h4 className="font-bold mb-4 text-slate-900 text-lg">Product</h4>
//               <ul className="space-y-3 text-slate-600">
//                 <li className="hover:text-slate-900 transition cursor-pointer">Features</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Pricing</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Security</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Enterprise</li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold mb-4 text-slate-900 text-lg">Company</h4>
//               <ul className="space-y-3 text-slate-600">
//                 <li className="hover:text-slate-900 transition cursor-pointer">About Us</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Blog</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Careers</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Press</li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold mb-4 text-slate-900 text-lg">Resources</h4>
//               <ul className="space-y-3 text-slate-600">
//                 <li className="hover:text-slate-900 transition cursor-pointer">Support</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Privacy Policy</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Terms of Service</li>
//                 <li className="hover:text-slate-900 transition cursor-pointer">Contact</li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-slate-200 pt-8 text-center">
//             <p className="text-slate-600 text-sm">
//               &copy; 2025 Loop Talk. All rights reserved.
//             </p>
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
    Menu,
    X,
    Globe,
    User,
    LogOut,
    Clock,
    ChevronDown,
    Play,
    Check,
    ArrowRight,
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
      window.scrollTo(0, 0);
      console.log(`Navigating to ${path}`);
    };

    const handleLogout = () => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setShowProfileMenu(false);
      handleNavigation('/');
    };

    const handleMobileNavClick = (path) => {
      handleNavigation(path);
      setMobileMenuOpen(false);
    };

    return (
      <div className="min-h-screen bg-white text-slate-900 relative overflow-hidden">
        {/* Gradient Overlay - Bottom Right */}
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-emerald-200/40 via-teal-100/20 to-transparent pointer-events-none z-0"></div>
        
        {/* ---------------- NAVIGATION ---------------- */}
        <nav className="fixed w-full top-0 z-50 bg-black/95 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => handleNavigation('/')}
              >
                <img 
                  src="/logo_2.svg" 
                  alt="Loop Talk Logo" 
                  className="h-10 w-auto object-contain"
                />
                <h2 className="text-2xl font-bold text-white">Loop Talk</h2>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-8">
                <button className="text-slate-300 cursor-pointer hover:text-white transition font-medium flex items-center gap-1">
                  Products <ChevronDown className="w-4 h-4" />
                </button>
                <button className="text-slate-300 cursor-pointer hover:text-white transition font-medium flex items-center gap-1">
                  Solutions <ChevronDown className="w-4 h-4" />
                </button>
                <button className="text-slate-300 cursor-pointer hover:text-white transition font-medium">
                  Plans & Pricing
                </button>
                <button className="text-slate-300 hover:text-white cursor-pointer transition font-medium flex items-center gap-1">
                  Resources <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-4">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => handleNavigation('/aljk24')}
                      className="text-slate-300 hover:text-white transition font-medium cursor-pointer "
                    >
                      Join a Meeting
                    </button>
                    <button
                      onClick={() => handleNavigation('/auth')}
                      className="text-slate-300 hover:text-white transition font-medium cursor-pointer"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleNavigation('/auth')}
                      className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-black cursor-pointer font-semibold transition shadow-lg hover:shadow-xl"
                    >
                      Sign Up, It's Free
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavigation('/home')}
                      className="text-slate-300 hover:text-white transition cursor-pointer font-medium"
                    >
                      Dashboard
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 flex items-center justify-center transition shadow-md"
                      >
                        <User className="w-5 h-5 text-white cursor-pointer " />
                      </button>

                      {showProfileMenu && (
                        <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2">
                          <button
                            onClick={() => {
                              handleNavigation('/home');
                              setShowProfileMenu(false);
                            }}
                            className="w-full px-4 cursor-pointer py-3 text-left text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-3 font-medium"
                          >
                            <Video className="w-5 h-5 cursor-pointer " />
                            Dashboard
                          </button>
                          <button
                            onClick={() => {
                              handleNavigation('/history');
                              setShowProfileMenu(false);
                            }}
                            className="w-full cursor-pointer px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-3 font-medium"
                          >
                            <Clock className="w-5 h-5" />
                            History
                          </button>
                          <div className="border-t border-slate-700 my-2"></div>
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3  text-left text-red-400 hover:text-red-300 hover:bg-slate-800 transition flex items-center gap-3 font-medium cursor-pointer "
                          >
                            <LogOut className="w-5 h-5" />
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
                className="lg:hidden text-white  "
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <div className="lg:hidden pb-6 space-y-2 border-t border-slate-800 pt-6">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => handleMobileNavClick('/aljk24')}
                      className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition font-medium"
                    >
                      Join a Meeting
                    </button>
                    <button
                      onClick={() => handleMobileNavClick('/auth')}
                      className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition font-medium"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleMobileNavClick('/auth')}
                      className="w-full px-4 py-3 rounded-full bg-white hover:bg-slate-100 text-black font-semibold transition shadow-lg mt-2"
                    >
                      Sign Up, It's Free
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleMobileNavClick('/home')}
                      className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition flex items-center gap-3 font-medium"
                    >
                      <Video className="w-5 h-5" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => handleMobileNavClick('/history')}
                      className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition flex items-center gap-3 font-medium"
                    >
                      <Clock className="w-5 h-5" />
                      History
                    </button>
                    <div className="border-t border-slate-800 my-3"></div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition shadow-lg flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Announcement Banner */}
        <div className="fixed top-20 w-full z-40 bg-slate-50 border-b border-slate-200 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center sm:justify-between">
              <p className="text-sm sm:text-base text-slate-700 text-center sm:text-left">
                <span className="font-semibold">Loop Talk recognized</span> as a 2025 Customers' Choice for Unified Communications
              </p>
              <button className="hidden cursor-pointer sm:inline-block text-emerald-600 hover:text-emerald-700 font-semibold text-sm whitespace-nowrap ml-4">
                Read Report →
              </button>
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="pt-48 pb-20 sm:pt-56 sm:pb-28 px-4 bg-gradient-to-b from-slate-50 to-white relative">
          {/* Additional subtle gradient on hero */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-emerald-100/30 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Text Content */}
              <div className="space-y-8 order-2 lg:order-1">
                <div className="inline-block">
                  <span className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">
                    Loop Talk Meetings
                  </span>
                </div>
                
                <div className="space-y-6">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
                    Where common ground is found.
                  </h1>
                  <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed max-w-2xl">
                    When everyone has an equitable experience, your meeting platform isn't just helping collaboration—it's driving better business results.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {!isAuthenticated ? (
                    <>
                      <button
                        onClick={() => handleNavigation('/auth')}
                        className="inline-flex items-center cursor-pointer justify-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition shadow-lg hover:shadow-xl"
                      >
                        Plans & Pricing
                        <ArrowRight size={20} />
                      </button>
                      <button
                        onClick={() => handleNavigation('/aljk24')}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-slate-300 hover:border-slate-400 text-slate-900 font-semibold text-lg transition bg-white"
                      >
                        <Play size={20} className="fill-current" />
                        See How it Works
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleNavigation('/home')}
                      className="inline-flex cursor-pointer items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition shadow-lg hover:shadow-xl"
                    >
                      Go to Dashboard
                      <ArrowRight size={20} />
                    </button>
                  )}
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative order-1 lg:order-2">
                <div className="relative w-full max-w-2xl mx-auto">
                  <div className="relative z-10 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                    {/* Placeholder for hero image - Replace src with your actual image */}
                    <img 
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop" 
                      alt="Professional video meeting" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <p className="text-5xl font-bold text-slate-900 mb-2">1M+</p>
                <p className="text-lg text-slate-600 font-medium">Active Users Worldwide</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-slate-900 mb-2">99.9%</p>
                <p className="text-lg text-slate-600 font-medium">Platform Uptime</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-slate-900 mb-2">180+</p>
                <p className="text-lg text-slate-600 font-medium">Countries Supported</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-24 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">
                Built for modern teams
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Everything you need for seamless collaboration, security, and productivity
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Crystal Clear HD Video',
                  desc: '1080p HD video quality with adaptive streaming technology for smooth, lag-free meetings',
                },
                {
                  title: 'Enterprise Security',
                  desc: 'End-to-end encryption and bank-level security protocols protect all your conversations',
                },
                {
                  title: 'Ultra-Low Latency',
                  desc: 'Global infrastructure ensures instant connections with minimal delay, anywhere in the world',
                },
                {
                  title: 'Large Group Meetings',
                  desc: 'Host professional meetings with up to 100 participants without compromising quality',
                },
                {
                  title: 'HD Screen Sharing',
                  desc: 'Share your screen in full HD quality with smooth performance and clear visuals',
                },
                {
                  title: 'No Downloads Required',
                  desc: 'Browser-based platform means you can join meetings instantly from any device',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-3 text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Security Section */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">
                    Security First
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
                  Your privacy is our priority
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  With enterprise-grade security features and compliance certifications, Loop Talk ensures your meetings stay private and secure.
                </p>
                
                <div className="space-y-4 pt-4">
                  {[
                    'End-to-end encryption for all meetings',
                    'SOC 2 Type II certified infrastructure',
                    'GDPR and HIPAA compliant',
                    'Regular third-party security audits',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop" 
                    alt="Secure video conferencing" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 px-4 bg-gradient-to-br from-emerald-600 to-teal-700 relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-teal-400/20 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
              Ready to transform your meetings?
            </h2>
            <p className="text-xl text-emerald-50 mb-10 leading-relaxed">
              Join millions of professionals connecting seamlessly across the globe every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => handleNavigation('/auth')}
                    className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-emerald-700 font-semibold text-lg transition shadow-xl hover:shadow-2xl"
                  >
                    Get Started Free
                  </button>
                  <button
                    onClick={() => handleNavigation('/aljk24')}
                    className="px-8 py-4 rounded-full border-2 border-white hover:bg-white/10 text-white font-semibold text-lg transition"
                  >
                    Join as Guest
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleNavigation('/home')}
                  className="px-8 cursor-pointer py-4 rounded-full bg-white hover:bg-slate-50 text-emerald-700 font-semibold text-lg transition shadow-xl hover:shadow-2xl"
                >
                  Go to Dashboard
                </button>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-200 py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-2 md:col-span-1">
                <div
                  className="flex items-center gap-3 mb-5 cursor-pointer"
                  onClick={() => handleNavigation('/')}
                >
                  <img 
                    src="/logo_2.svg" 
                    alt="Loop Talk Logo" 
                    className="h-10 w-auto object-contain"
                  />
                  <span className="font-bold text-xl text-slate-900">Loop Talk</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Professional video conferencing made simple, secure, and accessible for everyone.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-slate-900 text-lg">Product</h4>
                <ul className="space-y-3 text-slate-600">
                  <li className="hover:text-slate-900 transition cursor-pointer">Features</li>
                  <li className="hover:text-slate-900 transition cursor-pointer">Pricing</li>
                  <li className="hover:text-slate-900 transition cursor-pointer">Security</li>
                  <li className="hover:text-slate-900 transition cursor-pointer">Enterprise</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-slate-900 text-lg">Company</h4>
                <ul className="space-y-3 text-slate-600">
                  <li className="hover:text-slate-900 transition cursor-pointer">About Us</li>
                  <li className="hover:text-slate-900 transition cursor-pointer">Blog</li>
                  <li className="hover:text-slate-900 transition cursor-pointer">Careers</li>
                  <li className="hover:text-slate-900 transition cursor-pointer">Press</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-slate-900 text-lg">Resources</h4>
                <ul className="space-y-3 text-slate-600">
                  <li className="hover:text-slate-900 transition cursor-pointer">Support</li>
                  <li className="hover:text-slate-900 transition cursor-pointer">Privacy Policy</li>
                  <li className="hover:text-slate-900 transition cursor-pointer">Terms of Service</li>
                  <li className="hover:text-slate-900 transition cursor-pointer">Contact</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-200 pt-8 text-center">
              <p className="text-slate-600 text-sm">
                &copy; 2025 Loop Talk. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }