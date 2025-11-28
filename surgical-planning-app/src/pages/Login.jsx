import React, { useState } from 'react';
import { User, Lock, AlertCircle, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (formData.email && formData.password) {
        localStorage.setItem('authToken', 'mock-token-12345');
        localStorage.setItem('userEmail', formData.email);
        navigate('/');
      } else {
        setError('Enter both email and password.');
      }
      setLoading(false);
    }, 600);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-gray-300 flex items-center justify-center">
            <Activity className="w-6 h-6 text-gray-700" />
          </div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">Clinical access</p>
          <h1 className="text-2xl font-semibold text-gray-900 mt-1">Sign in</h1>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email address</span>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@clinic.org"
                className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm text-gray-900"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm text-gray-900"
                required
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-2 rounded-md text-sm font-semibold disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Need an account?{' '}
          <button type="button" onClick={() => navigate('/register')} className="text-gray-900 underline">
            Register
          </button>
        </p>
      </div>
    </div>
  );
}