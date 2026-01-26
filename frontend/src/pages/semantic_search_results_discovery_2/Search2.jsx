import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search2 = () => {
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
    <div className="bg-background-dark text-white min-h-screen">
      <style>
        {`
          body { font-family: 'Space Grotesk', sans-serif; }
          .semantic-glow { box-shadow: 0 0 20px rgba(0, 163, 133, 0.12); }
          .dark-card-gradient {
            background: linear-gradient(145deg, #121d1b 0%, #0d1614 100%);
          }
        `}
      </style>

      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/10 px-6 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">CampusConnect</h2>
            </div>

            <div className="hidden md:flex items-center w-[400px] bg-white/5 rounded-xl border border-primary/30 px-4 py-2 semantic-glow focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-primary mr-2">search_spark</span>
              <input
                className="bg-transparent border-none focus:ring-0 w-full text-base font-medium text-white placeholder-gray-500"
                placeholder="Search anything..."
                type="text"
                defaultValue="career growth"
              />
              <span className="material-symbols-outlined text-primary/40 text-sm">auto_awesome</span>
            </div>
          </div>

          <nav className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-6 text-gray-300">
              <Link to="/events1" className="text-sm font-semibold hover:text-primary transition-colors">Events</Link>
              <Link to="/dashboard1" className="text-sm font-semibold hover:text-primary transition-colors">Clubs</Link>
              <Link to="/discussion1" className="text-sm font-semibold hover:text-primary transition-colors">Discussions</Link>
              <Link to="/search1" className="text-sm font-semibold hover:text-primary transition-colors">Resources</Link>
            </div>

            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center h-10 w-10 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined">
                  {isDark ? 'light_mode' : 'dark_mode'}
                </span>
              </button>

              <button className="p-2 bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors">
                <span className="material-symbols-outlined text-primary">notifications</span>
              </button>

              <button className="p-2 bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors">
                <span className="material-symbols-outlined text-primary">chat_bubble</span>
              </button>

              <div
                className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-primary"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKjYUKvrBCHSmy2DbyN7Sh6pnWR2YkdhWW_XfzfvpinBPJyBM1tV0o-El_2Z4TD7nS_Z3tHLZ6yhluDKPJ7tFVMULprK5JOSau14zgzC0jhFNKdY7BA-t9zxdEjXtVVYE6XNlgZescnNV0p-VKTc7HlJ_gARpUwaNvBGMKWBUFOsbulGnZZj1Jr1yEEIj1rnfqBowaObRrStu17iH2hErCcsOGRgSiNQ7TrvRPHapSwXyuNl_3jsviUdftgsmgKxijT_hz0PKJfK8')"
                }}
              />
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto flex gap-8 p-6 lg:p-10">
        <section className="flex-1 flex flex-col gap-8">

          {/* Resource Card (fixed ending) */}
          <div className="dark-card-gradient p-6 rounded-xl border border-white/10 semantic-glow hover:border-primary/30 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="size-8 bg-gradient-to-br from-accent-teal to-primary rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm">library_books</span>
                </div>
                <span className="text-xs font-bold text-accent-teal uppercase tracking-wider">Resource</span>
              </div>
              <span className="text-xs text-gray-400">Featured</span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
              Resume Building Workshop Materials
            </h3>

            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              Complete guide with templates, examples, and tips from career services. Includes industry-specific advice and ATS optimization.
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="material-symbols-outlined text-sm">download</span>
                <span>PDF & Docs</span>
              </div>
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                View Resource
              </button>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
};

export default Search2;
