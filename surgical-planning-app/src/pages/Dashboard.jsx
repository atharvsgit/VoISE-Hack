import React, { useState, useEffect } from 'react';
import { Activity, Plus, Calendar, Clock, User, CheckCircle, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockCases, mockStats } from '../data/mockData';

export default function Dashboard() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setCases(mockCases);
      setLoading(false);
    }, 200);
  }, []);

  const handleNewAnalysis = () => {
    navigate('/new-case');
  };

  const getStatusBadge = (status) => {
    const base = 'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold';
    if (status === 'completed') return <span className={`${base} bg-green-100 text-green-800`}><CheckCircle className="w-3 h-3" />Completed</span>;
    if (status === 'in_progress') return <span className={`${base} bg-blue-100 text-blue-800`}><Clock className="w-3 h-3" />In progress</span>;
    if (status === 'scheduled') return <span className={`${base} bg-gray-100 text-gray-800`}><Calendar className="w-3 h-3" />Scheduled</span>;
    return null;
  };

  const getRiskBadge = (riskLevel) => {
    const tone = {
      low: 'text-green-700',
      medium: 'text-yellow-700',
      high: 'text-red-700',
    };
    return <span className={`text-xs font-medium ${tone[riskLevel]}`}>{riskLevel.replace('_', ' ')} risk</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">Clinic overview</p>
          <h1 className="text-3xl font-semibold text-gray-900 mt-1">Surgical planning dashboard</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard icon={<Activity className="w-5 h-5 text-gray-500" />} label="Total cases" value={mockStats.totalCases} />
          <DashboardCard icon={<CheckCircle className="w-5 h-5 text-gray-500" />} label="Completed this month" value={mockStats.completedThisMonth} />
          <DashboardCard icon={<Calendar className="w-5 h-5 text-gray-500" />} label="Upcoming surgeries" value={mockStats.scheduledUpcoming} />
          <DashboardCard icon={<TrendingUp className="w-5 h-5 text-gray-500" />} label="Success rate" value={`${mockStats.successRate}%`} />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Caseload summary</h2>
            <p className="text-sm text-gray-500">Monitor ongoing and scheduled procedures.</p>
          </div>
          <button
            type="button"
            onClick={handleNewAnalysis}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add new case
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-500" />
            <p className="text-base font-semibold text-gray-900">Recent cases</p>
          </div>

          {loading ? (
            <div className="px-6 py-16 text-center text-sm text-gray-500">Preparing data…</div>
          ) : cases.length === 0 ? (
            <div className="px-6 py-16 text-center text-gray-500">
              <AlertCircle className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              No cases available
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cases.map((caseItem) => (
                <li key={caseItem.id} className="px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">{caseItem.procedure}</p>
                    <p className="text-lg font-semibold text-gray-900">{caseItem.patient_name} · {caseItem.age} yrs</p>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {caseItem.surgeon}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {caseItem.duration}
                      </span>
                      {getRiskBadge(caseItem.risk_level)}
                    </div>
                    {caseItem.notes && <p className="mt-3 text-sm text-gray-700">{caseItem.notes}</p>}
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {caseItem.date} at {caseItem.time}
                    </div>
                    {getStatusBadge(caseItem.status)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {icon}
      </div>
      <p className="mt-3 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}