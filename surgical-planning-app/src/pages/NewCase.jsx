import React, { useState } from 'react';
import { Plus, User, Calendar, Clock, FileText, AlertCircle, CheckCircle } from 'lucide-react';
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center bg-white border border-gray-200 rounded-lg p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-gray-300 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-gray-700" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Case saved</h2>
          <p className="text-sm text-gray-600">Redirecting to the dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-wide">Case intake</p>
          <h1 className="text-3xl font-semibold text-gray-900 flex items-center gap-3">
            <Plus className="w-6 h-6 text-gray-600" />
            New surgical case
          </h1>
          <p className="text-sm text-gray-500">Provide patient context and scheduling details.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              Patient information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.patientName ? 'border-red-400' : 'border-gray-300'} rounded-md text-gray-900`}
                  placeholder="John Doe"
                />
                {errors.patientName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.patientName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="patientAge"
                  value={formData.patientAge}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.patientAge ? 'border-red-400' : 'border-gray-300'} rounded-md text-gray-900`}
                  placeholder="45"
                />
                {errors.patientAge && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.patientAge}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="patientGender"
                  value={formData.patientGender}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.patientGender ? 'border-red-400' : 'border-gray-300'} rounded-md text-gray-900`}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.patientGender && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.patientGender}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical history
                </label>
                <input
                  type="text"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                  placeholder="Diabetes, Hypertension..."
                />
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-500" />
              Procedure details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Procedure type <span className="text-red-500">*</span>
                </label>
                <select
                  name="procedure"
                  value={formData.procedure}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.procedure ? 'border-red-400' : 'border-gray-300'} rounded-md text-gray-900`}
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
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.procedure}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surgeon <span className="text-red-500">*</span>
                </label>
                <select
                  name="surgeon"
                  value={formData.surgeon}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.surgeon ? 'border-red-400' : 'border-gray-300'} rounded-md text-gray-900`}
                >
                  <option value="">Select surgeon</option>
                  <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                  <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
                  <option value="Dr. Sarah Park">Dr. Sarah Park</option>
                  <option value="Dr. David Kim">Dr. David Kim</option>
                </select>
                {errors.surgeon && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.surgeon}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk level <span className="text-red-500">*</span>
                </label>
                <select
                  name="riskLevel"
                  value={formData.riskLevel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                >
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              Schedule
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.date ? 'border-red-400' : 'border-gray-300'} rounded-md text-gray-900`}
                />
                {errors.date && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.time ? 'border-red-400' : 'border-gray-300'} rounded-md text-gray-900`}
                />
                {errors.time && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.time}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.duration ? 'border-red-400' : 'border-gray-300'} rounded-md text-gray-900`}
                  placeholder="e.g., 3h 30m"
                />
                {errors.duration && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.duration}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-500" />
              Additional notes
            </h2>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Special considerations, preparation notes…"
            ></textarea>
          </section>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-semibold flex items-center gap-2"
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