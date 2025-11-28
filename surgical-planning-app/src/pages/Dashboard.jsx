import React, { useState, useEffect } from 'react';
import { Activity, Plus, Calendar, Clock, User, CheckCircle, TrendingUp, Users, Award, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockCases, mockStats } from '../data/mockData';

export default function Dashboard() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading delay for better UX
    setTimeout(() => {
      setCases(mockCases);
      setLoading(false);
    }, 500);
  }, []);

  const handleNewAnalysis = () => {
    navigate('/new-case');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-1.5 rounded-full">
            <CheckCircle className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            In Progress
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium px-3 py-1.5 rounded-full">
            <Calendar className="w-3.5 h-3.5" />
            Scheduled
          </span>
        );
      default:
        return null;
    }
  };

  const getRiskBadge = (riskLevel) => {
    switch (riskLevel) {
      case 'low':
        return <span className="text-emerald-400 text-xs font-medium">Low Risk</span>;
      case 'medium':
        return <span className="text-amber-400 text-xs font-medium">Medium Risk</span>;
      case 'high':
        return <span className="text-red-400 text-xs font-medium">High Risk</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Surgical Planning Dashboard
          </h1>
          <p className="text-gray-400">Overview of surgical cases and operational metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Cases</p>
            <p className="text-3xl font-bold text-white">{mockStats.totalCases}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl p-6 hover:border-emerald-500/40 transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Completed This Month</p>
            <p className="text-3xl font-bold text-white">{mockStats.completedThisMonth}</p>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-amber-400" />
              </div>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Scheduled Upcoming</p>
            <p className="text-3xl font-bold text-white">{mockStats.scheduledUpcoming}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Success Rate</p>
            <p className="text-3xl font-bold text-white">{mockStats.successRate}%</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleNewAnalysis}
            className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Start New Analysis
          </button>
        </div>

        {/* Recent Cases */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-800 bg-gray-900/80">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-400" />
              Recent Cases
            </h2>
          </div>
          
          {loading ? (
            <div className="px-6 py-16 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500/30 border-t-blue-500"></div>
              <p className="mt-4 text-gray-400">Loading cases...</p>
            </div>
          ) : cases.length === 0 ? (
            <div className="px-6 py-16 text-center text-gray-400">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <p>No recent cases found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {cases.map((caseItem, index) => (
                <div
                  key={caseItem.id}
                  className="px-6 py-5 hover:bg-gray-800/50 transition-all cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                          <User className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                            {caseItem.patient_name}
                          </h3>
                          <p className="text-sm text-gray-500">{caseItem.age} years old</p>
                        </div>
                      </div>
                      <div className="ml-11 space-y-2">
                        <p className="text-gray-300 font-medium">{caseItem.procedure}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            {caseItem.surgeon}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {caseItem.duration}
                          </span>
                          {getRiskBadge(caseItem.risk_level)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex items-center gap-2 text-gray-400 bg-gray-800/50 px-3 py-1.5 rounded-lg">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium whitespace-nowrap">{caseItem.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 bg-gray-800/50 px-3 py-1.5 rounded-lg">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium whitespace-nowrap">{caseItem.time}</span>
                      </div>
                      {getStatusBadge(caseItem.status)}
                    </div>
                  </div>
                  {caseItem.notes && (
                    <div className="ml-11 mt-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                      <p className="text-sm text-gray-400 italic">{caseItem.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}