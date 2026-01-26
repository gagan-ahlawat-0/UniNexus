import { Link } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';

function Discussion2() {
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
    <div className="bg-background-light dark:bg-background-dark font-display text-[#0c1d1a] dark:text-white antialiased transition-colors duration-200 flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto h-screen">
      <div className="layout-container flex h-full grow flex-col">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-solid border-[#e6f4f2] dark:border-white/10 px-6 lg:px-20 py-3">
          <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">hub</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight">Campus Hub</h2>
              </div>
              <div className="hidden md:flex">
                <label className="flex flex-col min-w-40 h-10 w-64 lg:w-80">
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-[#e6f4f2] dark:bg-white/5">
                    <div className="text-primary flex items-center justify-center pl-4">
                      <span className="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:outline-0 focus:ring-0 placeholder:text-primary/60 px-3 text-sm font-normal" placeholder="Search discussions, events, groups..." />
                  </div>
                </label>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden lg:flex items-center gap-8">
                <Link to="/discussion2" className="text-sm font-medium hover:text-primary transition-colors">Discussions</Link>
                <Link to="/events1" className="text-sm font-medium hover:text-primary transition-colors">Events</Link>
                <Link to="/dashboard1" className="text-sm font-medium hover:text-primary transition-colors">Groups</Link>
              </nav>
              <div className="flex gap-3">
                <button onClick={toggleTheme} className="flex items-center justify-center rounded-xl h-10 w-10 bg-[#e6f4f2] dark:bg-white/5 text-deep-indigo dark:text-white/80 hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span>
                </button>
                <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-[#e6f4f2] dark:bg-white/5 text-deep-indigo dark:text-white/80 hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <div className="h-10 w-10 rounded-full border-2 border-primary overflow-hidden">
                  <img alt="Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1rrer-vbFicplvmGX2qwBsAUUhU2BSeaH03RnYlarW6WlUQOioCY0wa-UUmY6QttZMDZPv2TwqmJTwz4dKyN4rqkysM3ehThBs4yg90ESHZSIfD9eump8A94UChWVsFXqI5v9Afh4Cw9zfK5rB7wUko6KT1ThgMVVmbRhbZwZwsDIlIUx_Fc6c9Vtt0UUCiwU6dNqrnD9thXwc4YgTIh2B-hxS2Dwrm3TaVIVjjZ3efP9ZeARNontYdAr0W0WcPCLi5EORSFpKM0" />
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 lg:px-20 py-8">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-sm">
                <Link to="/" className="text-primary font-medium hover:underline">Home</Link>
                <span className="text-primary/40 material-symbols-outlined text-xs">chevron_right</span>
                <Link to="/discussion2" className="text-primary font-medium hover:underline">Communities</Link>
                <span className="text-primary/40 material-symbols-outlined text-xs">chevron_right</span>
                <span className="opacity-60">Campus Planning</span>
              </nav>
              {/* Page Heading */}
              <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-[#e6f4f2] dark:border-white/10 shadow-sm">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <span className="bg-accent-yellow/20 text-[#856404] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Popular</span>
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">#Architecture</span>
                    </div>
                    <h1 className="text-3xl font-black leading-tight tracking-tight">Proposals for the new Student Union layout</h1>
                    <div className="flex items-center gap-2 text-sm text-primary/70">
                      <div className="size-6 rounded-full bg-deep-indigo/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-xs">verified_user</span>
                      </div>
                      <span>Posted by <span className="font-bold text-deep-indigo dark:text-primary">@student_council</span> • 2 hours ago</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-bold text-sm transition-all shrink-0">
                    <span className="material-symbols-outlined text-[18px]">bookmark</span>
                    <span>Follow</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      </div>
    </div>
  );
}

export default Discussion2;