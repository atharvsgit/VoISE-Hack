import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, AlertCircle, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock authentication - replace with real API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Store auth token (mock)
        localStorage.setItem('authToken', 'mock-token-12345');
        localStorage.setItem('userEmail', formData.email);
        navigate('/');
      } else {
        setError('Please enter both email and password');
      }
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#1f6feb]/10 rounded-lg flex items-center justify-center border border-[#1f6feb]/20">
            <Activity className="w-8 h-8 text-[#1f6feb]" />
          </div>
          <h1 className="text-2xl font-semibold text-[#f1f5f9] mb-2">
            Surgical Planning System
          </h1>
          <p className="text-[#8b949e] text-sm">
            Sign in to access the clinical dashboard
          </p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#161b22] border border-[#30363d] rounded-md p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-md p-3 flex items-center gap-2 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8b949e]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0d1117] border border-[#30363d] rounded-md text-[#f1f5f9] placeholder-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] transition-colors"
                  placeholder="surgeon@hospital.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8b949e]" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0d1117] border border-[#30363d] rounded-md text-[#f1f5f9] placeholder-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-[#1f6feb] hover:bg-[#1a5dd9] text-white font-medium py-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#30363d]">
            <p className="text-center text-sm text-[#8b949e]">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-[#1f6feb] hover:underline"
              >
                Register here
              </button>
            </p>
          </div>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-center text-xs text-[#8b949e]"
        >
          <p>Demo: Use any email and password to login</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

