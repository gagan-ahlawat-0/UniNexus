import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';

const Events1 = () => {
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
    <div className={`min-h-screen flex ${isDark ? 'bg-background-dark text-slate-100' : 'bg-background-light text-[#0c1d1a]'}`}>
      <Sidebar />
      <div className="flex-1 overflow-y-auto h-screen">
      <style>
        {`
          @layer base {
            body {
              font-family: 'Space Grotesk', sans-serif;
              @apply ${isDark ? 'bg-background-dark text-slate-100' : 'bg-background-light text-[#0c1d1a]'};
            }
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: ${isDark ? '#2d2d2d' : '#e6f4f2'};
            border-radius: 10px;
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <header className={`sticky top-0 z-50 ${isDark ? 'bg-[#121212]/80' : 'bg-white/80'} backdrop-blur-md border-b ${isDark ? 'border-border-muted' : 'border-[#e6f4f2]'} px-6 py-3`}>
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/dashboard1" className="flex items-center justify-center rounded-xl h-10 w-10 bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div className="bg-primary p-2 rounded-lg text-white">
              <svg className="size-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
              </svg>
            </div>
            <h1 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>Uninexus</h1>
          </div>
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-primary">
                <span className="material-symbols-outlined text-xl">auto_awesome</span>
              </div>
              <input className={`w-full ${isDark ? 'bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-500' : 'bg-white border-[#e6f4f2] text-[#0c1d1a] placeholder:text-gray-500'} rounded-xl py-3 pl-12 pr-4 text-base focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all`} placeholder="What are you looking for today? (e.g., 'coding', 'wellness', 'pizza')" type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className={`flex items-center justify-center rounded-xl h-10 w-10 transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}> <span className="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span> </button>
            <button className={`p-2.5 rounded-xl transition-colors relative ${isDark ? 'bg-white/5 hover:bg-white/10 text-slate-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
              <span className="material-symbols-outlined">notifications</span>
              <span className={`absolute top-2 right-2 size-2 bg-accent-violet rounded-full border-2 ${isDark ? 'border-background-dark' : 'border-white'}`}></span>
            </button>
            <div className={`flex items-center gap-3 pl-4 ${isDark ? 'border-l border-white/10' : 'border-l border-[#e6f4f2]'}`}>
              <div className="text-right hidden sm:block">
                <p className={`text-sm font-bold leading-none ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>Alex Rivera</p>
                <p className="text-xs text-primary mt-1">CS Junior</p>
              </div>
              <div className="size-10 rounded-full bg-cover bg-center border-2 border-primary/20" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmOgjK04ZQN6YmUsfrztbjf_MlRHPtPWQX2DTOe6m3lZY0KVC1kVNrI4dkYJ8TZq_bRYy0XvUNwYDQ9Iz7_UxmNoc_iXbrLNpKxSq9uguB_GRnFvd4PSPHnOV84EKhPHbYFANP-xTnGi3B8oK9mu3ZsgUH8vgkpZldoMHsZHiMdb481DT6lo3cHCi3iPSwZmc6DP7Klf53p_pyM3fCY6j1TtMjFOULbNd7yVjXTmzbd05luL57LNoqEsfNZxsXtLgRp8IDDQZ08Zg')" }}></div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className={`text-4xl font-black leading-tight tracking-tight ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>Upcoming Events</h2>
                  <p className={`text-slate-400 font-medium ${isDark ? '' : 'text-gray-600'}`}>Curated discovery based on your interests.</p>
                </div>
                <Link to="/dashboard1" className="bg-primary text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-accent-violet transition-all shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-lg">add_circle</span>
                  <span>Create Event</span>
                </Link>
              </div>

              {/* Filter Chips */}
              <div className="flex gap-3 flex-wrap">
                <button className="px-5 py-2.5 rounded-full bg-primary text-white font-bold text-sm hover:brightness-110 transition-all shadow-md shadow-primary/20">
                  All Events
                </button>
                <button className={`px-5 py-2.5 rounded-full ${isDark ? 'bg-white/5 text-slate-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-medium text-sm transition-all`}>
                  Tech & Coding
                </button>
                <button className={`px-5 py-2.5 rounded-full ${isDark ? 'bg-white/5 text-slate-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-medium text-sm transition-all`}>
                  Workshops
                </button>
                <button className={`px-5 py-2.5 rounded-full ${isDark ? 'bg-white/5 text-slate-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-medium text-sm transition-all`}>
                  Social
                </button>
                <button className={`px-5 py-2.5 rounded-full ${isDark ? 'bg-white/5 text-slate-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-medium text-sm transition-all`}>
                  Academic
                </button>
              </div>
            </div>

            {/* Event Cards */}
            <div className="space-y-6">
              <EventCard 
                isDark={isDark}
                title="Cybersecurity Fundamentals Workshop"
                club="IEEE Student Branch"
                date="Oct 24, 2024"
                time="2:00 PM - 5:00 PM"
                location="Engineering Building, Room 402"
                attendees="42"
                category="Workshop"
                tags={["Popular", "Tech"]}
                bgImage="bg-gradient-to-br from-blue-500 to-purple-600"
              />

              <EventCard 
                isDark={isDark}
                title="Annual Tech Symposium 2024"
                club="Computer Science Club"
                date="Nov 02, 2024"
                time="10:00 AM - 6:00 PM"
                location="Main Auditorium"
                attendees="156"
                category="Academic"
                tags={["Featured"]}
                bgImage="bg-gradient-to-br from-emerald-500 to-teal-600"
              />

              <EventCard 
                isDark={isDark}
                title="Pizza & Code Night"
                club="Dev Community"
                date="Oct 28, 2024"
                time="6:00 PM - 9:00 PM"
                location="Student Center, Room 201"
                attendees="28"
                category="Social"
                tags={["Food", "Networking"]}
                bgImage="bg-gradient-to-br from-orange-500 to-red-600"
              />

              <EventCard 
                isDark={isDark}
                title="AI & Machine Learning Bootcamp"
                club="Data Science Society"
                date="Nov 10, 2024"
                time="9:00 AM - 4:00 PM"
                location="Computer Lab 3"
                attendees="35"
                category="Workshop"
                tags={["Hands-on", "AI"]}
                bgImage="bg-gradient-to-br from-violet-500 to-purple-600"
              />

              <EventCard 
                isDark={isDark}
                title="Hackathon 2024: Build the Future"
                club="Tech Innovation Hub"
                date="Nov 15-17, 2024"
                time="48 Hours"
                location="Innovation Center"
                attendees="89"
                category="Competition"
                tags={["Prizes", "Team Event"]}
                bgImage="bg-gradient-to-br from-pink-500 to-rose-600"
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Calendar Widget */}
            <div className={`${isDark ? 'bg-card-dark border-border-dark' : 'bg-white border-[#e6f4f2]'} rounded-xl p-6 border shadow-xl`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>Quick Calendar</h3>
              <div className="space-y-3">
                <CalendarItem isDark={isDark} day="24" month="OCT" title="Cybersecurity Workshop" time="2:00 PM" />
                <CalendarItem isDark={isDark} day="28" month="OCT" title="Pizza & Code Night" time="6:00 PM" />
                <CalendarItem isDark={isDark} day="02" month="NOV" title="Tech Symposium" time="10:00 AM" />
                <CalendarItem isDark={isDark} day="10" month="NOV" title="AI Bootcamp" time="9:00 AM" />
              </div>
            </div>

            {/* Your Interests */}
            <div className={`${isDark ? 'bg-card-dark border-border-dark' : 'bg-white border-[#e6f4f2]'} rounded-xl p-6 border shadow-xl`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>Your Interests</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-primary/20 text-primary rounded-full text-xs font-bold">Coding</span>
                <span className="px-3 py-1.5 bg-primary/20 text-primary rounded-full text-xs font-bold">AI/ML</span>
                <span className="px-3 py-1.5 bg-primary/20 text-primary rounded-full text-xs font-bold">Cybersecurity</span>
                <span className="px-3 py-1.5 bg-primary/20 text-primary rounded-full text-xs font-bold">Networking</span>
                <span className="px-3 py-1.5 bg-primary/20 text-primary rounded-full text-xs font-bold">Workshops</span>
              </div>
              <button className={`mt-4 w-full py-2 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10 text-slate-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} font-medium text-sm transition-all`}>
                Edit Interests
              </button>
            </div>

            {/* Trending Clubs */}
            <div className={`${isDark ? 'bg-card-dark border-border-dark' : 'bg-white border-[#e6f4f2]'} rounded-xl p-6 border shadow-xl`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>Trending Clubs</h3>
              <div className="space-y-3">
                <ClubItem isDark={isDark} name="IEEE Student Branch" members="1,248" />
                <ClubItem isDark={isDark} name="Data Science Society" members="892" />
                <ClubItem isDark={isDark} name="Dev Community" members="654" />
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

// Helper Components
const EventCard = ({ isDark, title, club, date, time, location, attendees, category, tags, bgImage }) => (
  <div className={`${isDark ? 'bg-card-dark border-border-dark' : 'bg-white border-[#e6f4f2]'} rounded-xl border shadow-xl overflow-hidden hover:border-primary/30 transition-all group`}>
    <div className={`h-48 ${bgImage} relative`}>
      <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-card-dark/95 via-card-dark/20' : 'from-white/95 via-white/20'} to-transparent`}></div>
      <div className="absolute top-4 right-4 flex gap-2">
        {tags.map((tag, idx) => (
          <span key={idx} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute bottom-4 left-4">
        <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-md uppercase tracking-wider">
          {category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#0c1d1a]'} group-hover:text-primary transition-colors`}>
        {title}
      </h3>
      <p className="text-primary text-sm font-bold mb-4">{club}</p>
      <div className="space-y-2 mb-6">
        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
          <span className="material-symbols-outlined text-base">calendar_month</span>
          <span>{date} • {time}</span>
        </div>
        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
          <span className="material-symbols-outlined text-base">location_on</span>
          <span>{location}</span>
        </div>
      </div>
      <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-border-dark' : 'border-[#e6f4f2]'}`}>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="size-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-card-dark"></div>
            <div className="size-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white dark:border-card-dark"></div>
            <div className="size-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white dark:border-card-dark"></div>
          </div>
          <span className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
            {attendees} attending
          </span>
        </div>
        <button className="px-6 py-2.5 bg-primary text-white rounded-lg font-bold hover:brightness-110 transition-all">
          RSVP
        </button>
      </div>
    </div>
  </div>
);

const CalendarItem = ({ isDark, day, month, title, time }) => (
  <div className={`flex gap-3 p-3 rounded-lg ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'} transition-all cursor-pointer`}>
    <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-lg px-3 py-2 min-w-[60px]">
      <span className="text-2xl font-black leading-none">{day}</span>
      <span className="text-xs font-bold uppercase">{month}</span>
    </div>
    <div className="flex-1">
      <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>{title}</p>
      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'} mt-1`}>{time}</p>
    </div>
  </div>
);

const ClubItem = ({ isDark, name, members }) => (
  <div className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'} transition-all cursor-pointer`}>
    <div className="flex items-center gap-3">
      <div className="size-10 rounded-full bg-gradient-to-br from-primary to-accent-violet"></div>
      <div>
        <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>{name}</p>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{members} members</p>
      </div>
    </div>
    <button className={`px-3 py-1.5 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10 text-slate-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} text-xs font-bold transition-all`}>
      Follow
    </button>
  </div>
);

export default Events1;