import React, { useState, useEffect } from 'react';
import { Moon, Sun, Calendar, User, Users, Home, Activity, MessageSquare, Book } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Close profile menu when clicking outside
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#161b22] border-b border-[#30363d] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-[#1f6feb]/10 border border-[#1f6feb]/20 rounded-md flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#1f6feb]" />
            </div>
            <span className="text-lg font-semibold text-[#f1f5f9]">
              Surgical Planning System
            </span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <NavButton 
              icon={<Home className="w-4 h-4" />}
              label="Dashboard"
              onClick={() => navigate('/')}
              isActive={isActive('/')}
            />
            <NavButton 
              icon={<Users className="w-4 h-4" />}
              label="Patients"
              onClick={() => navigate('/patients')}
              isActive={isActive('/patients')}
            />
            <NavButton 
              icon={<Calendar className="w-4 h-4" />}
              label="Calendar"
              onClick={() => navigate('/calendar')}
              isActive={isActive('/calendar')}
            />
            <NavButton 
              icon={<MessageSquare className="w-4 h-4" />}
              label="Assistant"
              onClick={() => navigate('/chat')}
              isActive={isActive('/chat')}
            />
            <NavButton 
              icon={<Book className="w-4 h-4" />}
              label="Reference"
              onClick={() => navigate('/reference')}
              isActive={isActive('/reference')}
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-[#21262d] hover:bg-[#30363d] transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-[#8b949e]" />
              ) : (
                <Moon className="w-5 h-5 text-[#8b949e]" />
              )}
            </motion.button>

            {/* Profile Menu */}
            <div className="relative profile-menu-container">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-2 rounded-md bg-[#1f6feb] hover:bg-[#1a5dd9] transition-colors"
                aria-label="Profile menu"
              >
                <User className="w-5 h-5 text-white" />
              </motion.button>

              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-56 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-[#30363d]">
                    <p className="text-[#f1f5f9] font-medium text-sm">
                      {localStorage.getItem('userEmail') || 'Dr. John Smith'}
                    </p>
                    <p className="text-xs text-[#8b949e] mt-1">Orthopedic Surgeon</p>
                  </div>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setShowProfileMenu(false);
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-2 text-[#c9d1d9] hover:bg-[#21262d] transition-colors text-sm"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setShowProfileMenu(false);
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-2 text-[#c9d1d9] hover:bg-[#21262d] transition-colors text-sm"
                  >
                    <Activity className="w-4 h-4" />
                    Settings
                  </button>
                  <hr className="my-2 border-[#30363d]" />
                  <button
                    onClick={() => {
                      navigate('/logout');
                      setShowProfileMenu(false);
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-2 text-red-400 hover:bg-[#21262d] transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Nav Button Component
function NavButton({ icon, label, onClick, isActive }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-[#1f6feb] text-white'
          : 'text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#f1f5f9]'
      }`}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}