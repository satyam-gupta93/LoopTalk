
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