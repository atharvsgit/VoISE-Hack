import React, { useState, useEffect } from 'react';
import { Users, Search, Phone, Calendar, FileText } from 'lucide-react';
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
    }, 200);
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contact.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <header className="flex flex-col gap-1">
          <p className="text-sm text-gray-500 uppercase tracking-wide">Patient management</p>
          <h1 className="text-3xl font-semibold text-gray-900">Patient records</h1>
          <p className="text-sm text-gray-500">Search, review, and update patient files.</p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4">
          <label className="relative flex-1">
            <span className="sr-only">Search patients</span>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or phone"
              className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm text-gray-900 placeholder-gray-500 bg-white"
            />
          </label>
          <div className="flex gap-4">
            <SummaryCard label="Total patients" value={patients.length} />
            <SummaryCard label="Active (30d)" value={6} />
            <SummaryCard label="Procedures" value={17} hideOnSmall />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {loading ? (
            <div className="px-6 py-16 text-center text-sm text-gray-500">Loading patient list…</div>
          ) : filteredPatients.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-gray-500">No patients match this search.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Patient</th>
                    <th className="px-6 py-3 font-semibold">Age / Gender</th>
                    <th className="px-6 py-3 font-semibold">Contact</th>
                    <th className="px-6 py-3 font-semibold">Last visit</th>
                    <th className="px-6 py-3 font-semibold">Procedures</th>
                    <th className="px-6 py-3 font-semibold">Insurance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedPatient(patient)}>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p>{patient.age} yrs</p>
                        <p className="text-xs text-gray-500">{patient.gender}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {patient.contact}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {patient.last_visit}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 text-gray-900">
                          <FileText className="w-4 h-4 text-gray-400" />
                          {patient.total_procedures}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{patient.insurance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedPatient && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" onClick={() => setSelectedPatient(null)}>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl border border-gray-200" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Patient profile</p>
                  <h2 className="text-2xl font-semibold text-gray-900">{selectedPatient.name}</h2>
                  <p className="text-sm text-gray-600">{selectedPatient.age} years · {selectedPatient.gender}</p>
                </div>
                <button type="button" onClick={() => setSelectedPatient(null)} className="text-gray-500 hover:text-gray-900 text-xl">
                  ×
                </button>
              </div>
              <div className="px-6 py-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoPanel label="Phone" value={selectedPatient.contact} />
                  <InfoPanel label="Email" value={selectedPatient.email} />
                  <InfoPanel label="Insurance" value={selectedPatient.insurance} />
                  <InfoPanel label="Last visit" value={selectedPatient.last_visit} />
                </div>
                <div className="border border-gray-200 rounded-md p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Medical history</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {selectedPatient.medical_history.map((item) => (
                      <li key={item} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between border border-gray-200 rounded-md p-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Total procedures</p>
                    <p className="text-2xl font-semibold text-gray-900">{selectedPatient.total_procedures}</p>
                  </div>
                  <FileText className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ label, value, hideOnSmall }) {
  return (
    <div className={`${hideOnSmall ? 'hidden md:block' : 'block'} bg-white border border-gray-200 rounded-md px-4 py-2 text-center`}>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function InfoPanel({ label, value }) {
  return (
    <div className="border border-gray-200 rounded-md p-3">
      <p className="text-xs font-semibold text-gray-500 uppercase">{label}</p>
      <p className="text-sm text-gray-900 mt-1">{value}</p>
    </div>
  );
}