import React, { useState } from 'react';
import { Calendar, User, Users, Home, Activity, MessageSquare, Book, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/', icon: <Home className="w-4 h-4" /> },
  { label: 'Patients', path: '/patients', icon: <Users className="w-4 h-4" /> },
  { label: 'Calendar', path: '/calendar', icon: <Calendar className="w-4 h-4" /> },
  { label: 'Assistant', path: '/chat', icon: <MessageSquare className="w-4 h-4" /> },
  { label: 'Reference', path: '/reference', icon: <Book className="w-4 h-4" /> },
];

export default function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-gray-900"
          >
            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white">
              <Activity className="w-5 h-5 text-gray-900" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold tracking-wide uppercase text-gray-500">Clinical Tools</p>
              <p className="text-lg font-semibold">CaseWise</p>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 bg-white"
            >
              <User className="w-4 h-4" />
              <span>Account</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">
                    {localStorage.getItem('userEmail') || 'clinician@example.com'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Access Level: Staff</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/logout');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}