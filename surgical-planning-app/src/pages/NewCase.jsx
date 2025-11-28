import React, { useState } from 'react';
import { Plus, User, Calendar, Clock, FileText, AlertCircle, CheckCircle, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewCase() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientGender: '',
    procedure: '',
    surgeon: '',
    date: '',
    time: '',
    duration: '',
    riskLevel: 'low',
    notes: '',
    medicalHistory: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientName) newErrors.patientName = 'Patient name is required';
    if (!formData.patientAge) newErrors.patientAge = 'Patient age is required';
    if (!formData.patientGender) newErrors.patientGender = 'Gender is required';
    if (!formData.procedure) newErrors.procedure = 'Procedure is required';
    if (!formData.surgeon) newErrors.surgeon = 'Surgeon is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Case Created Successfully!</h2>
          <p className="text-gray-400">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
            <Plus className="w-10 h-10 text-blue-400" />
            New Surgical Case
          </h1>
          <p className="text-gray-400">Create a new surgical planning case with patient details</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-blue-400" />
              Patient Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Patient Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 border ${errors.patientName ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="John Doe"
                />
                {errors.patientName && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.patientName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Age <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="patientAge"
                  value={formData.patientAge}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 border ${errors.patientAge ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="45"
                />
                {errors.patientAge && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.patientAge}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gender <span className="text-red-400">*</span>
                </label>
                <select
                  name="patientGender"
                  value={formData.patientGender}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 border ${errors.patientGender ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.patientGender && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.patientGender}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Medical History
                </label>
                <input
                  type="text"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Diabetes, Hypertension..."
                />
              </div>
            </div>
          </div>

          {/* Procedure Details */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-400" />
              Procedure Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Procedure Type <span className="text-red-400">*</span>
                </label>
                <select
                  name="procedure"
                  value={formData.procedure}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 border ${errors.procedure ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                >
                  <option value="">Select procedure</option>
                  <option value="Total Knee Replacement">Total Knee Replacement</option>
                  <option value="Hip Replacement">Hip Replacement</option>
                  <option value="Spinal Fusion">Spinal Fusion</option>
                  <option value="ACL Reconstruction">ACL Reconstruction</option>
                  <option value="Rotator Cuff Repair">Rotator Cuff Repair</option>
                  <option value="Lumbar Laminectomy">Lumbar Laminectomy</option>
                  <option value="Carpal Tunnel Release">Carpal Tunnel Release</option>
                  <option value="Other">Other</option>
                </select>
                {errors.procedure && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.procedure}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Surgeon <span className="text-red-400">*</span>
                </label>
                <select
                  name="surgeon"
                  value={formData.surgeon}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 border ${errors.surgeon ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                >
                  <option value="">Select surgeon</option>
                  <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                  <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
                  <option value="Dr. Sarah Park">Dr. Sarah Park</option>
                  <option value="Dr. David Kim">Dr. David Kim</option>
                </select>
                {errors.surgeon && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.surgeon}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Risk Level <span className="text-red-400">*</span>
                </label>
                <select
                  name="riskLevel"
                  value={formData.riskLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-400" />
              Schedule
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 border ${errors.date ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Time <span className="text-red-400">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 border ${errors.time ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.time && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.time}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800 border ${errors.duration ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="e.g., 3h 30m"
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.duration}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-400" />
              Additional Notes
            </h2>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Any additional notes or special considerations..."
            ></textarea>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-gray-800 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Create Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}