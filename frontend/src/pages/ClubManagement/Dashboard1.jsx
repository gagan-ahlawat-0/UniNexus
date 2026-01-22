import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';

const Dashboard1 = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.classList.toggle('dark', saved === 'dark');
      return saved === 'dark';
    }
    return document.documentElement.classList.contains('dark');
  });

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#0c1d1a] dark:text-slate-300 antialiased min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-20 border-b border-[#e6f4f2] dark:border-border-dark">
          <div className="flex items-center gap-4">
            <div className="lg:hidden text-[#0c1d1a] dark:text-white cursor-pointer">
              <span className="material-symbols-outlined">menu</span>
            </div>
            <h2 className="text-[#0c1d1a] dark:text-white text-xl font-bold">Dashboard</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-500 text-sm">search</span>
              <input 
                className="bg-white dark:bg-input-dark border border-[#e6f4f2] dark:border-none rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary/40 text-[#0c1d1a] dark:text-white placeholder-gray-500 dark:placeholder-slate-500 outline-none" 
                placeholder="Search events..." 
                type="text"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className={`size-10 rounded-xl flex items-center justify-center relative transition-colors ${isDark ? 'bg-input-dark border border-border-dark text-slate-300 hover:bg-border-dark' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}>
                <span className="material-symbols-outlined">notifications</span>
                <span className={`absolute top-2.5 right-2.5 size-2 bg-yellow-accent rounded-full border-2 ${isDark ? 'border-background-dark' : 'border-white'}`}></span>
              </button>
              <div className="h-8 w-px bg-[#e6f4f2] dark:bg-border-dark mx-1"></div>
              <button onClick={toggleTheme} className={`flex items-center justify-center rounded-xl h-10 w-10 transition-colors ${isDark ? 'bg-white/5 text-white/80 hover:bg-primary/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                <span className="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-[#0c1d1a] dark:text-white">IEEE Student Branch</p>
                  <p className="text-xs text-gray-500 dark:text-slate-500">Administrator</p>
                </div>
                {/* Profile Placeholder */}
                <div className="size-10 rounded-full bg-gray-300 dark:bg-slate-700 border-2 border-primary/40 flex items-center justify-center text-[#0c1d1a] dark:text-white overflow-hidden">
                   <span className="material-symbols-outlined">person</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] mx-auto pb-20">
          <div className="mb-10">
            <h3 className="text-4xl font-black text-[#0c1d1a] dark:text-white tracking-tight">Welcome back, Team! 👋</h3>
            <p className="text-gray-600 dark:text-slate-400 mt-2 text-lg">Your club's activity is up 12% this month. Keep up the momentum!</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatsCard 
              icon="event_available" 
              iconColor="text-primary" 
              iconBg="bg-primary/10" 
              change="+12%" 
              label="Active Events" 
              value="12" 
            />
            <StatsCard 
              icon="groups" 
              iconColor="text-indigo-custom" 
              iconBg="bg-indigo-custom/10" 
              change="+5%" 
              label="Total Members" 
              value="1,248" 
            />
             <StatsCard 
              icon="check_circle" 
              iconColor="text-yellow-accent" 
              iconBg="bg-yellow-accent/10" 
              change="Pending" 
              changeColor="text-yellow-accent bg-yellow-accent/10"
              label="New RSVPs" 
              value="42" 
            />
            <StatsCard 
              icon="trending_up" 
              iconColor="text-primary" 
              iconBg="bg-primary/10" 
              change="High" 
              label="Engagement Rate" 
              value="84%" 
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Create Event Form */}
            <div className="xl:col-span-2 space-y-6">
              <div className={`rounded-xl p-8 border shadow-xl ${isDark ? 'bg-card-dark border-border-dark' : 'bg-white border-[#e6f4f2]'}`}>
                <h4 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>
                  <span className="material-symbols-outlined text-primary">add_circle</span>
                  Create New Event
                </h4>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                      <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Event Title</label>
                      <input className={`w-full rounded-lg p-4 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none ${isDark ? 'bg-input-dark border border-border-dark text-white placeholder-slate-500' : 'bg-gray-50 border border-gray-200 text-[#0c1d1a] placeholder-gray-400'}`} placeholder="e.g. Annual Tech Symposium 2024" type="text"/>
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Category</label>
                      <div className="relative">
                        <select className={`w-full rounded-lg p-4 focus:ring-2 focus:ring-primary/40 focus:border-primary appearance-none transition-all outline-none ${isDark ? 'bg-input-dark border border-border-dark text-white' : 'bg-gray-50 border border-gray-200 text-[#0c1d1a]'}`}>
                          <option>Academic</option>
                          <option>Social</option>
                          <option>Workshop</option>
                          <option>Competition</option>
                        </select>
                        <span className={`material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>expand_more</span>
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Venue</label>
                      <input className={`w-full rounded-lg p-4 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none ${isDark ? 'bg-input-dark border border-border-dark text-white placeholder-slate-500' : 'bg-gray-50 border border-gray-200 text-[#0c1d1a] placeholder-gray-400'}`} placeholder="e.g. Main Hall / Room 402" type="text"/>
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Date</label>
                      <input className={`w-full rounded-lg p-4 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none ${isDark ? 'bg-input-dark border border-border-dark text-white [color-scheme:dark]' : 'bg-gray-50 border border-gray-200 text-[#0c1d1a] [color-scheme:light]'}`} type="date"/>
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Time</label>
                      <input className={`w-full rounded-lg p-4 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none ${isDark ? 'bg-input-dark border border-border-dark text-white [color-scheme:dark]' : 'bg-gray-50 border border-gray-200 text-[#0c1d1a] [color-scheme:light]'}`} type="time"/>
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Event Poster</label>
                    <div className={`border-2 border-dashed border-primary/40 rounded-xl p-12 flex flex-col items-center justify-center group hover:border-primary transition-all cursor-pointer ${isDark ? 'bg-primary/5 hover:bg-primary/10' : 'bg-primary/5 hover:bg-primary/10'}`}>
                      <div className="size-14 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-3xl text-primary">cloud_upload</span>
                      </div>
                      <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>Drag & drop event poster here</p>
                      <p className={`text-sm mt-2 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>PNG, JPG or PDF up to 10MB</p>
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-6 pt-4">
                    <button className={`px-6 py-3 rounded-xl font-bold transition-all ${isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-[#0c1d1a] hover:bg-gray-100'}`} type="button">Save Draft</button>
                    <button className="px-10 py-4 bg-primary text-white rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20" type="submit">Publish Event</button>
                  </div>
                </form>
              </div>
            </div>

            {/* Side Events List */}
            <div className="xl:col-span-1 space-y-6">
              <div className="flex items-center justify-between px-2">
                <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>My Events</h4>
                <Link to="/events1" className="text-primary text-sm font-bold hover:text-primary/80 transition-colors">View All</Link>
              </div>
              
              <EventCard 
                isDark={isDark}
                title="Cybersecurity Fundamentals"
                date="Oct 24, 2024 • 2:00 PM"
                students="42 Students"
                category="Workshop"
                tag="Popular"
                tagColor="bg-yellow-accent text-background-dark"
                bgClass="bg-gradient-to-br from-blue-500 to-purple-600"
              />

              <EventCard 
                isDark={isDark}
                title="Intro to Robotics 101"
                date="Nov 02, 2024 • 10:00 AM"
                students="18 Students"
                category="Academic"
                bgClass="bg-gradient-to-br from-green-500 to-teal-600"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper Components to keep code clean
const StatsCard = ({ icon, iconColor, iconBg, change, changeColor = "text-emerald-400 bg-emerald-500/10", label, value }) => (
  <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-[#e6f4f2] dark:border-border-dark shadow-xl">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 ${iconBg} ${iconColor} rounded-lg`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${changeColor}`}>{change}</span>
    </div>
    <p className="text-gray-600 dark:text-slate-400 text-sm font-medium">{label}</p>
    <p className="text-3xl font-bold text-[#0c1d1a] dark:text-white mt-1">{value}</p>
  </div>
);

const EventCard = ({ isDark, title, date, students, category, tag, tagColor, bgClass }) => (
  <div className={`rounded-xl border shadow-xl overflow-hidden group hover:border-primary/30 transition-all ${isDark ? 'bg-card-dark border-border-dark' : 'bg-white border-[#e6f4f2]'}`}>
    <div className={`h-40 ${bgClass} bg-cover bg-center relative`}>
      <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-card-dark/95 via-card-dark/20' : 'from-white/95 via-white/20'} to-transparent`}></div>
      <div className="absolute bottom-4 left-4 flex gap-2">
        <span className="px-2.5 py-1 bg-primary text-white text-[10px] font-bold rounded-md uppercase tracking-wider">{category}</span>
        {tag && <span className={`px-2.5 py-1 ${tagColor} text-[10px] font-bold rounded-md uppercase tracking-wider`}>{tag}</span>}
      </div>
    </div>
    <div className="p-6">
      <h5 className={`font-bold text-lg mb-1 group-hover:text-primary transition-colors ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>{title}</h5>
      <p className={`text-sm flex items-center gap-2 mb-5 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
        <span className="material-symbols-outlined text-base">calendar_month</span>
        {date}
      </p>
      <div className={`flex items-center justify-between pt-5 border-t ${isDark ? 'border-border-dark' : 'border-[#e6f4f2]'}`}>
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-custom/20 text-indigo-400 rounded-lg">
            <span className="material-symbols-outlined text-sm">person_check</span>
          </div>
          <p className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>{students}</p>
        </div>
        <div className="flex gap-2">
          <button className={`size-9 flex items-center justify-center rounded-lg transition-colors ${isDark ? 'hover:bg-primary/10 text-slate-500 hover:text-primary' : 'hover:bg-primary/10 text-gray-500 hover:text-primary'}`}>
            <span className="material-symbols-outlined text-xl">edit</span>
          </button>
          <button className={`size-9 flex items-center justify-center rounded-lg transition-colors ${isDark ? 'hover:bg-red-500/10 text-slate-500 hover:text-red-400' : 'hover:bg-red-500/10 text-gray-500 hover:text-red-400'}`}>
            <span className="material-symbols-outlined text-xl">delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard1;