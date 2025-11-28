import React, { useState, useEffect } from 'react';
import { Users, Search, Phone, Mail, Calendar, FileText, Filter, ChevronDown } from 'lucide-react';
import { mockPatients } from '../data/mockData';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setPatients(mockPatients);
      setLoading(false);
    }, 400);
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contact.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
            <Users className="w-10 h-10 text-blue-400" />
            Patient Records
          </h1>
          <p className="text-gray-400">Comprehensive patient database and medical history</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 hover:border-gray-700 hover:bg-gray-800 transition-all">
            <Filter className="w-5 h-5" />
            Filter
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Total Patients</p>
            <p className="text-2xl font-bold text-white">{patients.length}</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Active This Month</p>
            <p className="text-2xl font-bold text-white">6</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Total Procedures</p>
            <p className="text-2xl font-bold text-white">17</p>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
          {loading ? (
            <div className="px-6 py-16 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500/30 border-t-blue-500"></div>
              <p className="mt-4 text-gray-400">Loading patients...</p>
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="px-6 py-16 text-center text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <p>No patients found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/80 border-b border-gray-800">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Patient</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Age/Gender</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Last Visit</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Procedures</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Insurance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredPatients.map((patient, index) => (
                    <tr
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className="hover:bg-gray-800/50 transition-all cursor-pointer group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                              {patient.name}
                            </p>
                            <p className="text-sm text-gray-500">{patient.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-300">{patient.age} years</p>
                        <p className="text-sm text-gray-500">{patient.gender}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-gray-300 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{patient.contact}</span>
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{patient.last_visit}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium px-3 py-1.5 rounded-full">
                          <FileText className="w-3.5 h-3.5" />
                          {patient.total_procedures}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-300">{patient.insurance}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Patient Detail Modal */}
        {selectedPatient && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPatient(null)}
          >
            <div
              className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full p-8 animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                    {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedPatient.name}</h2>
                    <p className="text-gray-400">{selectedPatient.age} years • {selectedPatient.gender}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                    <p className="text-white font-medium">{selectedPatient.contact}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <p className="text-white font-medium">{selectedPatient.email}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Insurance</p>
                    <p className="text-white font-medium">{selectedPatient.insurance}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Last Visit</p>
                    <p className="text-white font-medium">{selectedPatient.last_visit}</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-3">Medical History</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.medical_history.map((condition, index) => (
                      <span
                        key={index}
                        className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium px-3 py-1.5 rounded-full"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div>
                    <p className="text-gray-400 text-sm">Total Procedures</p>
                    <p className="text-2xl font-bold text-white">{selectedPatient.total_procedures}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}