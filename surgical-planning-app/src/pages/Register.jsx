import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, AlertCircle, Activity, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    // Mock registration - replace with real API call
    setTimeout(() => {
      localStorage.setItem('authToken', 'mock-token-12345');
      localStorage.setItem('userEmail', formData.email);
      navigate('/');
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4 py-12">
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
            Create Account
          </h1>
          <p className="text-[#8b949e] text-sm">
            Register for surgical planning system access
          </p>
        </div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#161b22] border border-[#30363d] rounded-md p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8b949e]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-[#0d1117] border ${errors.name ? 'border-red-500' : 'border-[#30363d]'} rounded-md text-[#f1f5f9] placeholder-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] transition-colors`}
                  placeholder="Dr. John Smith"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8b949e]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-[#0d1117] border ${errors.email ? 'border-red-500' : 'border-[#30363d]'} rounded-md text-[#f1f5f9] placeholder-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] transition-colors`}
                  placeholder="surgeon@hospital.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
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
                  className={`w-full pl-10 pr-4 py-2.5 bg-[#0d1117] border ${errors.password ? 'border-red-500' : 'border-[#30363d]'} rounded-md text-[#f1f5f9] placeholder-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] transition-colors`}
                  placeholder="Minimum 6 characters"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8b949e]" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-[#0d1117] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#30363d]'} rounded-md text-[#f1f5f9] placeholder-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] transition-colors`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-[#1f6feb] hover:bg-[#1a5dd9] text-white font-medium py-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                'Creating account...'
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Create Account
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#30363d]">
            <p className="text-center text-sm text-[#8b949e]">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[#1f6feb] hover:underline"
              >
                Sign in here
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

