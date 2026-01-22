import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <aside className="w-72 flex-shrink-0 bg-white dark:bg-card-dark border-r border-[#e6f4f2] dark:border-border-dark hidden lg:flex flex-col">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-primary size-10 rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">hub</span>
          </div>
          <div>
            <h1 className="text-white dark:text-white text-lg font-bold leading-none">Uninexus</h1>
            <p className="text-primary text-xs font-medium uppercase tracking-wider mt-1">Campus Platform</p>
          </div>
        </div>
        <nav className="space-y-2">
          <Link 
            to="/dashboard1" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive('/dashboard1') || isActive('/') 
                ? 'bg-primary/10 border-l-4 border-primary text-primary' 
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className={isActive('/dashboard1') || isActive('/') ? 'font-bold' : 'font-medium'}>Dashboard</span>
          </Link>
          <Link 
            to="/dashboard2" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive('/dashboard2') 
                ? 'bg-primary/10 border-l-4 border-primary text-primary' 
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined">group</span>
            <span className={isActive('/dashboard2') ? 'font-bold' : 'font-medium'}>Members</span>
          </Link>
          <Link 
            to="/events1" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive('/events1') || isActive('/events2')
                ? 'bg-primary/10 border-l-4 border-primary text-primary' 
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined">calendar_today</span>
            <span className={isActive('/events1') || isActive('/events2') ? 'font-bold' : 'font-medium'}>Events</span>
          </Link>
          <Link 
            to="/discussion1" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive('/discussion1') || isActive('/discussion2') || isActive('/discussion1-alt')
                ? 'bg-primary/10 border-l-4 border-primary text-primary' 
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined">analytics</span>
            <span className={isActive('/discussion1') || isActive('/discussion2') || isActive('/discussion1-alt') ? 'font-bold' : 'font-medium'}>Engagement</span>
          </Link>
          <Link 
            to="/search1" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive('/search1') || isActive('/search2')
                ? 'bg-primary/10 border-l-4 border-primary text-primary' 
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined">settings</span>
            <span className={isActive('/search1') || isActive('/search2') ? 'font-bold' : 'font-medium'}>Settings</span>
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-8">
        <div className="bg-indigo-custom rounded-xl p-5 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs opacity-80 mb-1">Club Status</p>
            <p className="font-bold">Premium Plan</p>
            <button className="mt-3 text-xs font-bold py-2 px-4 bg-white text-indigo-custom rounded-lg hover:bg-slate-100 transition-colors">Upgrade Now</button>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/10 text-8xl rotate-12 select-none">auto_awesome</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
