import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';

function Search1() {
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
    <div className="bg-background-light dark:bg-background-dark text-[#0c1d1a] dark:text-white min-h-screen flex">
      <Sidebar />
      <div className="flex-1 overflow-y-auto h-screen">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#e6f4f2] dark:border-white/10 px-6 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">Uninexus</h2>
            </div>
            {/* Semantic Search Input */}
            <div className="hidden md:flex items-center w-[400px] bg-primary/5 dark:bg-white/5 rounded-xl border border-primary/20 px-4 py-2 focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-primary mr-2">search_spark</span>
              <input className="bg-transparent border-none focus:ring-0 w-full text-base font-medium" placeholder="Search anything..." type="text" defaultValue="career growth" />
              <span className="material-symbols-outlined text-primary/40 text-sm">auto_awesome</span>
            </div>
          </div>
          <nav className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-6">
              <Link to="/events1" className="text-sm font-semibold hover:text-primary transition-colors">Events</Link>
              <Link to="/dashboard1" className="text-sm font-semibold hover:text-primary transition-colors">Clubs</Link>
              <Link to="/discussion1" className="text-sm font-semibold hover:text-primary transition-colors">Discussions</Link>
              <Link to="/" className="text-sm font-semibold hover:text-primary transition-colors">Resources</Link>
            </div>
            <div className={`flex items-center gap-3 border-l pl-6 ${isDark ? 'border-white/10' : 'border-[#e6f4f2]'}`}>
              <button onClick={toggleTheme} className={`flex items-center justify-center rounded-xl h-10 w-10 transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-primary/10 hover:bg-primary/20'}`}> <span className="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span> </button>
              <button className={`p-2 rounded-xl transition-colors relative ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-primary/10 hover:bg-primary/20'}`}>
                <span className={`material-symbols-outlined ${isDark ? 'text-slate-300' : 'text-primary'}`}>notifications</span>
                <span className={`absolute top-1.5 right-1.5 size-2 bg-accent-violet rounded-full border-2 ${isDark ? 'border-background-dark' : 'border-white'}`}></span>
              </button>
              <button className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-primary/10 hover:bg-primary/20'}`}>
                <span className={`material-symbols-outlined ${isDark ? 'text-slate-300' : 'text-primary'}`}>chat_bubble</span>
              </button>
              <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-slate-700 border-2 border-primary flex items-center justify-center text-[#0c1d1a] dark:text-white overflow-hidden">
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="max-w-[1400px] mx-auto flex gap-8 p-6 lg:p-10">
        {/* Sidebar Navigation & Filters */}
        <aside className="hidden xl:flex flex-col gap-8 w-64 shrink-0">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Discovery Mode</h3>
            <div className="flex flex-col gap-1">
              <Link to="/search1" className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined">explore</span>
                <span className="font-semibold">All Results</span>
              </Link>
              <Link to="/events1" className="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 rounded-xl transition-colors">
                <span className="material-symbols-outlined">calendar_month</span>
                <span className="font-semibold">Events</span>
              </Link>
              <Link to="/dashboard1" className="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 rounded-xl transition-colors">
                <span className="material-symbols-outlined">groups</span>
                <span className="font-semibold">Clubs</span>
              </Link>
              <Link to="/discussion1" className="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 rounded-xl transition-colors">
                <span className="material-symbols-outlined">forum</span>
                <span className="font-semibold">Posts</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-5 bg-white dark:bg-white/5 rounded-2xl border border-[#e6f4f2] dark:border-white/10">
            <h3 className="font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">tune</span>
              Refine Results
            </h3>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400">ENGAGEMENT LEVEL</label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input defaultChecked className="rounded border-primary text-primary focus:ring-primary" type="checkbox" /> Trending Now
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input className="rounded border-primary text-primary focus:ring-primary" type="checkbox" /> High Activity
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400">DATE RANGE</label>
                <select className="w-full bg-background-light dark:bg-background-dark border-none rounded-lg text-sm focus:ring-primary">
                  <option>This Weekend</option>
                  <option>This Month</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div className="pt-2">
                <button className="w-full py-2 bg-primary/10 text-primary text-sm font-bold rounded-lg hover:bg-primary/20 transition-all">Clear Filters</button>
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content Area */}
        <section className="flex-1 flex flex-col gap-8">
          {/* Dynamic Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-primary mb-2">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span className="text-xs font-bold tracking-widest uppercase">Semantic Context Applied</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none mb-4">
                Results for <span className="text-primary italic">'career growth'</span>
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                We've gathered events, student clubs, and community discussions focused on professional development and career acceleration.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-[#e6f4f2] dark:border-white/10 rounded-xl text-sm font-bold">
                Sort by: Relevance <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>
          </div>
          {/* Chips / Tags */}
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold hover:bg-primary/20 transition-all">Academic Clubs</button>
            <button className="px-4 py-2 bg-white dark:bg-white/5 border border-[#e6f4f2] dark:border-white/10 rounded-full text-xs font-bold hover:bg-primary/10 transition-all">Internship Ready</button>
            <button className="px-4 py-2 bg-white dark:bg-white/5 border border-[#e6f4f2] dark:border-white/10 rounded-full text-xs font-bold hover:bg-primary/10 transition-all">Networking</button>
            <button className="px-4 py-2 bg-white dark:bg-white/5 border border-[#e6f4f2] dark:border-white/10 rounded-full text-xs font-bold hover:bg-primary/10 transition-all">Tech</button>
            <button className="px-4 py-2 bg-white dark:bg-white/5 border border-[#e6f4f2] dark:border-white/10 rounded-full text-xs font-bold hover:bg-primary/10 transition-all">+ More Filters</button>
          </div>
          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Event Card 1 */}
            <div className="group bg-white dark:bg-white/5 rounded-2xl border border-[#e6f4f2] dark:border-white/10 overflow-hidden hover:border-primary transition-all hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">Event</span>
                  <span className="bg-yellow-400 px-3 py-1 rounded-full text-[10px] font-bold text-black uppercase tracking-wider">Popular</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                  <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Match Score: 98%</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Networking Mixers</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 font-medium">Connect with local industry professionals and alumni in an informal setting. Great for expanding your circle.</p>
                <div className="flex flex-col gap-2 pt-4 border-t border-[#e6f4f2] dark:border-white/10">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="material-symbols-outlined text-gray-400 text-sm">schedule</span>
                    This Friday, 6:00 PM
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex -space-x-2">
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-200"></div>
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-300"></div>
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-[10px] font-bold">+42</div>
                    </div>
                    <Link to="/events1" className="px-5 py-2 bg-primary text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all">RSVP Now</Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Event Card 2 */}
            <div className="group bg-white dark:bg-white/5 rounded-2xl border border-[#e6f4f2] dark:border-white/10 overflow-hidden hover:border-primary transition-all hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 relative">
                <div className="absolute top-4 left-4">
                  <span className="bg-[#404B72] px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">Workshop</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary text-sm">psychology</span>
                  <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Semantic: Skill Building</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Resume Workshops</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 font-medium">A deep dive into crafting ATS-friendly resumes for the current tech job market. One-on-one critiques available.</p>
                <div className="flex flex-col gap-2 pt-4 border-t border-[#e6f4f2] dark:border-white/10">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="material-symbols-outlined text-gray-400 text-sm">location_on</span>
                    Student Union, Room 204
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-bold text-primary italic">12 spots left</span>
                    <Link to="/events1" className="px-5 py-2 bg-primary/10 text-primary text-sm font-bold rounded-xl hover:bg-primary/20 transition-all">Details</Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Club Suggestion */}
            <div className="group bg-white dark:bg-white/5 rounded-2xl border border-[#e6f4f2] dark:border-white/10 p-6 flex flex-col gap-4 hover:border-primary transition-all">
              <div className="flex items-start justify-between">
                <div className="size-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase">Club</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Entrepreneurship Club</h3>
                <p className="text-sm text-gray-500 font-medium">Focused on building startups and learning from successful founders.</p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-gray-400">2.4k Members</span>
                <Link to="/dashboard1" className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  Visit Club <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
            {/* Community Post */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 p-6 bg-primary/5 border border-primary/20 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary">forum</span>
                  <span className="text-xs font-bold uppercase tracking-widest">Trending Discussion</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">How to get an internship with zero experience?</h2>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-4">"I'm a sophomore and I'm feeling behind. What are the best ways to build a portfolio during the semester?"</p>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">thumb_up</span> 156 Likes</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">mode_comment</span> 48 Replies</span>
                  <span className="text-primary italic">Relevant to your interest in career growth</span>
                </div>
              </div>
              <Link to="/discussion1" className="shrink-0 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:scale-105 transition-transform">Join Thread</Link>
            </div>
          </div>
          {/* Pagination */}
          <div className="mt-10 py-10 border-t border-[#e6f4f2] dark:border-white/10 flex flex-col items-center gap-6">
            <p className="text-sm font-bold text-gray-400 tracking-widest uppercase">End of Semantic Matches</p>
            <div className="flex gap-2">
              <button className="size-10 flex items-center justify-center rounded-lg border border-[#e6f4f2] hover:bg-white transition-colors">1</button>
              <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">2</button>
              <button className="size-10 flex items-center justify-center rounded-lg border border-[#e6f4f2] hover:bg-white transition-colors">3</button>
              <button className="px-4 flex items-center justify-center rounded-lg border border-[#e6f4f2] hover:bg-white transition-colors">Next <span className="material-symbols-outlined text-sm ml-1">chevron_right</span></button>
            </div>
          </div>
        </section>
      </main>
      {/* Feedback Corner */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-primary text-white px-5 py-3 rounded-full flex items-center gap-2 shadow-xl shadow-primary/40 hover:scale-105 transition-transform">
          <span className="material-symbols-outlined">reviews</span>
          <span className="font-bold text-sm">Help improve search</span>
        </button>
      </div>
      </div>
    </div>
  );
}

export default Search1;