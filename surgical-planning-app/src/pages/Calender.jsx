import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, User, AlertCircle } from 'lucide-react';
import { mockCalendarEvents, mockCases } from '../data/mockData';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEvents(mockCalendarEvents);
      setLoading(false);
    }, 400);
  }, []);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const getEventsForDate = (day) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const selectedDateEvents = mockCases.filter(caseItem => caseItem.date === selectedDate.toISOString().split('T')[0]);

  const getEventColor = (type) => {
    switch (type) {
      case 'surgery':
        return 'bg-blue-500';
      case 'consultation':
        return 'bg-emerald-500';
      default:
        return 'bg-purple-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
            <CalendarIcon className="w-10 h-10 text-blue-400" />
            Surgery Calendar
          </h1>
          <p className="text-gray-400">Schedule and manage surgical procedures</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
              {/* Calendar Header */}
              <div className="px-6 py-4 bg-gray-900/80 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={prevMonth}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-300" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Day Names */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {[...Array(firstDayOfMonth)].map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square" />
                  ))}
                  
                  {[...Array(daysInMonth)].map((_, index) => {
                    const day = index + 1;
                    const dayEvents = getEventsForDate(day);
                    const isToday = 
                      day === new Date().getDate() &&
                      currentMonth.getMonth() === new Date().getMonth() &&
                      currentMonth.getFullYear() === new Date().getFullYear();
                    const isSelected =
                      day === selectedDate.getDate() &&
                      currentMonth.getMonth() === selectedDate.getMonth() &&
                      currentMonth.getFullYear() === selectedDate.getFullYear();

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                        className={`
                          aspect-square p-2 rounded-lg transition-all relative
                          ${isSelected ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'}
                          ${isToday && !isSelected ? 'ring-2 ring-emerald-500' : ''}
                        `}
                      >
                        <span className="text-sm font-medium">{day}</span>
                        {dayEvents.length > 0 && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                            {dayEvents.slice(0, 3).map((event, i) => (
                              <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${getEventColor(event.type)}`}
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-400">Surgery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-gray-400">Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full ring-2 ring-emerald-500"></div>
                <span className="text-gray-400">Today</span>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
              <div className="px-6 py-4 bg-gray-900/80 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">
                  {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{selectedDateEvents.length} scheduled</p>
              </div>

              <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                {loading ? (
                  <div className="py-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500/30 border-t-blue-500"></div>
                  </div>
                ) : selectedDateEvents.length === 0 ? (
                  <div className="py-12 text-center text-gray-400">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                    <p className="text-sm">No events scheduled</p>
                  </div>
                ) : (
                  selectedDateEvents.map(event => (
                    <div
                      key={event.id}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-1 h-full ${event.status === 'completed' ? 'bg-emerald-500' : event.status === 'in_progress' ? 'bg-blue-500' : 'bg-amber-500'} rounded-full`}></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium group-hover:text-blue-400 transition-colors mb-1">
                            {event.procedure}
                          </h4>
                          <div className="space-y-1.5 text-sm text-gray-400">
                            <p className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {event.patient_name}
                            </p>
                            <p className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {event.time} • {event.duration}
                            </p>
                            <p className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {event.surgeon}
                            </p>
                          </div>
                          <div className="mt-3">
                            {event.status === 'completed' && (
                              <span className="inline-flex text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                                Completed
                              </span>
                            )}
                            {event.status === 'in_progress' && (
                              <span className="inline-flex text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                                In Progress
                              </span>
                            )}
                            {event.status === 'scheduled' && (
                              <span className="inline-flex text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-1 rounded-full">
                                Scheduled
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}