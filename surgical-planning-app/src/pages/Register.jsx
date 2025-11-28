import React, { useState } from 'react';
import { User, Mail, Lock, AlertCircle, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.name) nextErrors.name = 'Name is required.';
    if (!formData.email) nextErrors.email = 'Email is required.';
    if (!formData.password) nextErrors.password = 'Password is required.';
    if (formData.password && formData.password.length < 6) nextErrors.password = 'Use at least 6 characters.';
    if (formData.password !== formData.confirmPassword) nextErrors.confirmPassword = 'Passwords must match.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('authToken', 'mock-token-12345');
      localStorage.setItem('userEmail', formData.email);
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-gray-300 flex items-center justify-center">
            <Activity className="w-6 h-6 text-gray-700" />
          </div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">Create access</p>
          <h1 className="text-2xl font-semibold text-gray-900">Register</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Full name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Dr. Jane Smith"
            icon={<User className="w-4 h-4 text-gray-400" />}
            error={errors.name}
          />
          <FormField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="clinician@hospital.org"
            icon={<Mail className="w-4 h-4 text-gray-400" />}
            error={errors.email}
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            icon={<Lock className="w-4 h-4 text-gray-400" />}
            error={errors.password}
          />
          <FormField
            label="Confirm password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            icon={<Lock className="w-4 h-4 text-gray-400" />}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-2 rounded-md text-sm font-semibold disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already registered?{' '}
          <button type="button" onClick={() => navigate('/login')} className="text-gray-900 underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

function FormField({ label, name, value, onChange, placeholder, icon, type = 'text', error }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="mt-1 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border rounded-md pl-9 pr-3 py-2 text-sm text-gray-900 ${error ? 'border-red-400' : 'border-gray-300'}`}
        />
      </div>
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </label>
  );
}