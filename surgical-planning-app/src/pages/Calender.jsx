import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { mockCases } from '../data/mockData';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEvents(mockCases);
      setLoading(false);
    }, 300);
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

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const selectedDateEvents = events.filter(event => event.date === selectedDate.toISOString().split('T')[0]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <header>
          <p className="text-sm text-gray-500 uppercase tracking-wide">Scheduling</p>
          <h1 className="text-3xl font-semibold text-gray-900">Surgery calendar</h1>
          <p className="text-sm text-gray-500">Daily overview of procedures and consultations.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <div className="bg-white border border-gray-300 rounded shadow-sm">
              <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded transition-colors border border-gray-200 text-gray-700"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded transition-colors border border-gray-200 text-gray-700"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 text-sm">
                  {[...Array(firstDayOfMonth)].map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square" />
                  ))}

                  {[...Array(daysInMonth)].map((_, index) => {
                    const day = index + 1;
                    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const dayEvents = events.filter(e => e.date === dateStr);
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
                        className={`aspect-square p-2 rounded text-sm font-medium transition-all relative border
                          ${isSelected ? 'bg-gray-900 text-white border-gray-900' : 'bg-white hover:bg-gray-100 border-gray-200 text-gray-900'}
                          ${isToday && !isSelected ? 'ring-2 ring-gray-400' : ''}
                          ${dayEvents.length > 0 ? 'font-semibold' : ''}`}
                      >
                        <span>{day}</span>
                        {dayEvents.length > 0 && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gray-900" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-white border border-gray-300 rounded shadow-sm">
              <div className="px-5 py-4 border-b border-gray-200">
                <p className="text-xs uppercase text-gray-500">Selected date</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{selectedDateEvents.length} events</p>
              </div>

              <div className="p-3 space-y-2 max-h-[600px] overflow-y-auto">
                {loading ? (
                  <div className="py-12 text-center text-sm text-gray-500">Preparing schedule…</div>
                ) : selectedDateEvents.length === 0 ? (
                  <div className="py-12 text-center text-gray-500">
                    <CalendarIcon className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm">No events</p>
                  </div>
                ) : (
                  selectedDateEvents.map(event => (
                    <div
                      key={event.id}
                      className="bg-white border border-gray-300 rounded shadow-sm hover:shadow-md transition-shadow cursor-pointer p-3"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <div className={`w-1 h-full rounded-full ${
                          event.status === 'completed' ? 'bg-green-500' :
                          event.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-400'
                        }`} />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">
                            {event.procedure}
                          </h4>
                          <div className="space-y-1 text-xs text-gray-600">
                            <p className="flex items-center gap-1.5">
                              <User className="w-3 h-3" />
                              {event.patient_name}
                            </p>
                            <p className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </p>
                          </div>
                          <div className="mt-2">
                            {event.status === 'completed' && (
                              <span className="inline-block text-xs bg-green-100 text-green-800 border border-green-200 px-2 py-0.5 rounded">
                                Completed
                              </span>
                            )}
                            {event.status === 'in_progress' && (
                              <span className="inline-block text-xs bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 rounded">
                                In Progress
                              </span>
                            )}
                            {event.status === 'scheduled' && (
                              <span className="inline-block text-xs bg-gray-100 text-gray-800 border border-gray-200 px-2 py-0.5 rounded">
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
          </section>
        </div>
      </div>
    </div>
  );
}