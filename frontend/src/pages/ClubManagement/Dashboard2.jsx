import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';

const Dashboard2 = () => {
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
    <div className="bg-background-light dark:bg-background-dark font-display text-[#0c1d1a] dark:text-white min-h-screen">
      <style>
        {`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
          .active-nav {
            background-color: rgba(0, 163, 133, 0.1);
            border-left: 4px solid #00a385;
          }
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-thumb {
            background: #cdeae4;
            border-radius: 10px;
          }
        `}
      </style>
      <div className="flex min-h-screen">
        {/* Sidebar Navigation */}
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto h-screen">
          {/* Top Navbar */}
          <header className="h-20 flex items-center justify-between px-8 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-20 border-b border-[#e6f4f2] dark:border-border-dark">
            <div className="flex items-center gap-4">
              <div className="lg:hidden text-[#0c1d1a] dark:text-white cursor-pointer">
                <span className="material-symbols-outlined">menu</span>
              </div>
              <h2 className="text-[#0c1d1a] dark:text-white text-xl font-bold">Members</h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative hidden md:block">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-500 text-sm">search</span>
                <input className="bg-white dark:bg-input-dark border border-[#e6f4f2] dark:border-none rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary/40 text-[#0c1d1a] dark:text-white placeholder-gray-500 dark:placeholder-slate-500 outline-none" placeholder="Search members..." type="text"/>
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
          <div className="p-8 max-w-[1400px] mx-auto">
            {/* Page Heading */}
            <div className="mb-8">
              <h3 className="text-4xl font-black text-[#0c1d1a] dark:text-white tracking-tight">Welcome back, Team! 👋</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Your club's activity is up 12% this month. Keep up the momentum!</p>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white dark:bg-[#142d28] p-6 rounded-xl border border-[#cdeae4] dark:border-white/5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <span className="material-symbols-outlined">event_available</span>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Active Events</p>
                <p className="text-3xl font-bold dark:text-white">12</p>
              </div>
              <div className="bg-white dark:bg-[#142d28] p-6 rounded-xl border border-[#cdeae4] dark:border-white/5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-indigo-custom/10 text-indigo-custom rounded-lg">
                    <span className="material-symbols-outlined">groups</span>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+5%</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Total Members</p>
                <p className="text-3xl font-bold dark:text-white">1,248</p>
              </div>
              <div className="bg-white dark:bg-[#142d28] p-6 rounded-xl border border-[#cdeae4] dark:border-white/5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-yellow-accent/10 text-yellow-600 rounded-lg">
                    <span className="material-symbols-outlined">check_circle</span>
                  </div>
                  <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">Pending</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">New RSVPs</p>
                <p className="text-3xl font-bold dark:text-white">42</p>
              </div>
              <div className="bg-white dark:bg-[#142d28] p-6 rounded-xl border border-[#cdeae4] dark:border-white/5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <span className="material-symbols-outlined">trending_up</span>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">High</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Engagement Rate</p>
                <p className="text-3xl font-bold dark:text-white">84%</p>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Create Event Form */}
              <div className="xl:col-span-2 space-y-6">
                <div className="bg-white dark:bg-[#142d28] rounded-xl p-8 border border-[#cdeae4] dark:border-white/10 shadow-sm">
                  <h4 className="text-2xl font-bold mb-6 flex items-center gap-2 dark:text-white">
                    <span className="material-symbols-outlined text-primary">add_circle</span>
                    Create New Event
                  </h4>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Event Title</label>
                        <input className="w-full bg-[#f5f8f8] dark:bg-white/5 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 text-[#0c1d1a] dark:text-white" placeholder="e.g. Annual Tech Symposium 2024" type="text"/>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Category</label>
                        <select className="w-full bg-[#f5f8f8] dark:bg-white/5 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 text-[#0c1d1a] dark:text-white">
                          <option>Academic</option>
                          <option>Social</option>
                          <option>Workshop</option>
                          <option>Competition</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Venue</label>
                        <input className="w-full bg-[#f5f8f8] dark:bg-white/5 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 text-[#0c1d1a] dark:text-white" placeholder="e.g. Main Hall / Room 402" type="text"/>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Date</label>
                        <input className="w-full bg-[#f5f8f8] dark:bg-white/5 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 text-[#0c1d1a] dark:text-white" type="date"/>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Time</label>
                        <input className="w-full bg-[#f5f8f8] dark:bg-white/5 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 text-[#0c1d1a] dark:text-white" type="time"/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Event Poster</label>
                      <div className="border-2 border-dashed border-[#cdeae4] dark:border-white/20 rounded-xl p-10 flex flex-col items-center justify-center bg-[#f5f8f8]/30 dark:bg-white/5 group hover:border-primary transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-4xl text-primary mb-3">cloud_upload</span>
                        <p className="font-bold text-[#0c1d1a] dark:text-white">Drag & drop event poster here</p>
                        <p className="text-sm text-slate-500 mt-1">PNG, JPG or PDF up to 10MB</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4">
                      <button className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-all" type="button">Save Draft</button>
                      <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20" type="submit">Publish Event</button>
                    </div>
                  </form>
                </div>
              </div>
              {/* My Events List */}
              <div className="xl:col-span-1 space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h4 className="text-xl font-bold dark:text-white">My Events</h4>
                  <button className="text-primary text-sm font-bold hover:underline">View All</button>
                </div>
                {/* Event Card 1 */}
                <div className="bg-white dark:bg-[#142d28] rounded-xl border border-[#cdeae4] dark:border-white/10 shadow-sm overflow-hidden group">
                  <div className="h-32 bg-slate-200 bg-cover bg-center relative" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBA9S7ZJkYS-lbTE2Pa97ZOIUbxch2nFu7vHCT6O7hq2fhPcmYP0uk8pAZRT6FgFsuLQL7rVua_xxvgmIRMMRjw5SAfoji6yJRcGGRc5ZCmMi-Cg3gAH2dHoWdW2EnliwGu--KEElLJMkw48f5uOK3uajKeZY4sKEjEax9dbAZ6ya_GwtGpdhJiw-wyfFlqPlP8DUJxK5oBdOoiBwRIaXxvAxfwGLY9TWyRQXpZQWIp1jowxJsHY_BBQz_Mi0jJJgpw0dQIkOxSi7M')"}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <span className="px-2 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider">Workshop</span>
                      <span className="px-2 py-1 bg-yellow-accent text-[#0c1d1a] text-[10px] font-bold rounded uppercase tracking-wider">Popular</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h5 className="font-bold text-lg dark:text-white mb-1">Cybersecurity Fundamentals</h5>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mb-4">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      Oct 24, 2024 • 2:00 PM
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#e6f4f2] dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-custom/10 text-indigo-custom rounded-lg">
                          <span className="material-symbols-outlined text-sm">person_check</span>
                        </div>
                        <p className="text-sm font-bold text-indigo-custom dark:text-slate-300">42 Students</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                        <button className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Event Card 2 */}
                <div className="bg-white dark:bg-[#142d28] rounded-xl border border-[#cdeae4] dark:border-white/10 shadow-sm overflow-hidden group">
                  <div className="h-32 bg-slate-200 bg-cover bg-center relative" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBI6uLdl2_3Br4i5qyd9B3j4Pp5cIdR_5bCtLTPiObMGdU07zbe8UGoLnX8DDvlpYDXAPxCfOI15NWfUxQaNIBOk236Rvsylt2uBM4bzkxFIO6wsZLSSPqFGy46odsHH2Q-3hFWX70pV1xCGzEeWpKR3IPHMefkhuZqwIvXVf6cd3-KkGW90Px3kYhnTR2f24SDC-8s5U8wHoWGbxGcQwuXY8rdGh1Z9SMuLyA6zalZf-Rx_hvycH0hCjkXtqRE3nsxOm27S3jpJI')"}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <span className="px-2 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider">Academic</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h5 className="font-bold text-lg dark:text-white mb-1">Intro to Robotics 101</h5>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mb-4">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      Nov 02, 2024 • 10:00 AM
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#e6f4f2] dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-custom/10 text-indigo-custom rounded-lg">
                          <span className="material-symbols-outlined text-sm">person_check</span>
                        </div>
                        <p className="text-sm font-bold text-indigo-custom dark:text-slate-300">18 Students</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                        <button className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard2;