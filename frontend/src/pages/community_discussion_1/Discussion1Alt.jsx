import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';

const Discussion1Alt = () => {
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
    <div className={`font-display antialiased transition-colors duration-200 flex min-h-screen ${isDark ? 'bg-background-dark text-off-white' : 'bg-background-light text-[#0c1d1a]'}`}>
      <Sidebar />
      <div className="flex-1 overflow-y-auto h-screen">
      <style>
        {`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
          .comment-thread-line {
            width: 2px;
            background: linear-gradient(to bottom, #00a385 0%, #1f2626 100%);
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: ${isDark ? '#1f2626' : '#e6f4f2'};
            border-radius: 10px;
          }
          .glow-button {
            box-shadow: 0 0 15px rgba(0, 163, 133, 0.4);
          }
          .glow-button:hover {
            box-shadow: 0 0 25px rgba(0, 163, 133, 0.6);
          }
        `}
      </style>
      <div className="layout-container flex h-full grow flex-col">
        <header className={`sticky top-0 z-50 backdrop-blur-md border-b px-6 lg:px-20 py-3 ${isDark ? 'bg-background-dark/80 border-white/10' : 'bg-white/80 border-[#e6f4f2]'}`}>
          <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">hub</span>
                </div>
                <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>Uninexus</h2>
              </div>
              <div className="hidden md:flex">
                <label className="flex flex-col min-w-40 h-10 w-64 lg:w-80">
                  <div className={`flex w-full flex-1 items-stretch rounded-xl h-full ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                    <div className="text-primary flex items-center justify-center pl-4">
                      <span className="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input className={`form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:outline-0 focus:ring-0 px-3 text-sm font-normal ${isDark ? 'text-white placeholder:text-primary/40' : 'text-[#0c1d1a] placeholder:text-gray-500'}`} placeholder="Search discussions, events, groups..." />
                  </div>
                </label>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden lg:flex items-center gap-8">
                <Link to="/discussion1" className={`text-sm font-medium hover:text-primary transition-colors ${isDark ? 'text-white/80' : 'text-gray-700'}`}>Discussions</Link>
                <Link to="/events1" className={`text-sm font-medium hover:text-primary transition-colors ${isDark ? 'text-white/80' : 'text-gray-700'}`}>Events</Link>
                <Link to="/dashboard1" className={`text-sm font-medium hover:text-primary transition-colors ${isDark ? 'text-white/80' : 'text-gray-700'}`}>Groups</Link>
              </nav>
              <div className="flex gap-3">
                <button onClick={toggleTheme} className={`flex items-center justify-center rounded-xl h-10 w-10 transition-colors ${isDark ? 'bg-white/5 text-white/80 hover:bg-primary/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <span className="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span>
                </button>
                <button className={`flex items-center justify-center rounded-xl h-10 w-10 transition-colors ${isDark ? 'bg-white/5 text-white/80 hover:bg-primary/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
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
            <div className="lg:col-span-8 space-y-6">
              <nav className="flex items-center gap-2 text-sm">
                <Link to="/" className="text-primary font-medium hover:underline">Home</Link>
                <span className="text-primary/40 material-symbols-outlined text-xs">chevron_right</span>
                <Link to="/discussion1" className="text-primary font-medium hover:underline">Communities</Link>
                <span className="text-primary/40 material-symbols-outlined text-xs">chevron_right</span>
                <span className={`opacity-60 ${isDark ? 'text-off-white' : 'text-gray-600'}`}>Campus Planning</span>
              </nav>
              <div className={`p-6 rounded-xl border shadow-xl ${isDark ? 'bg-container-dark border-white/10' : 'bg-white border-[#e6f4f2]'}`}>
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <span className="bg-accent-yellow/10 text-accent-yellow text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-accent-yellow/20">Popular</span>
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-primary/20">#Architecture</span>
                    </div>
                    <h1 className={`text-3xl font-black leading-tight tracking-tight ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>Proposals for the new Student Union layout</h1>
                    <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-off-white/60' : 'text-gray-600'}`}>
                      <div className="size-6 rounded-full bg-deep-indigo/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-xs text-deep-indigo">verified_user</span>
                      </div>
                      <span>Posted by <span className="font-bold text-primary">@student_council</span> • 2 hours ago</span>
                    </div>
                  </div>
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all shrink-0 border ${isDark ? 'bg-white/5 hover:bg-white/10 text-off-white border-white/10' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'}`}>
                    <span className="material-symbols-outlined text-[18px]">bookmark</span>
                    <span>Follow</span>
                  </button>
                </div>
              </div>
              <div className="relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
                <div className={`p-6 rounded-xl border-2 border-dashed border-primary/40 flex flex-col md:flex-row items-center justify-between gap-6 ${isDark ? 'bg-container-dark' : 'bg-white'}`}>
                  <div className="flex gap-4 items-start">
                    <div className="size-12 rounded-xl bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/30">
                      <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>Thread AI Summarizer</h3>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-off-white/70' : 'text-gray-600'}`}>Don't have time to read all 152 comments? Get an instant bulleted summary of consensus and concerns.</p>
                    </div>
                  </div>
                  <button className="w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold flex items-center justify-center gap-2 glow-button transition-all">
                    <span>Summarize Discussion</span>
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                  </button>
                </div>
              </div>

              {/* Discussion Comments */}
              <div className="space-y-4">
                <CommentCard isDark={isDark} 
                  author="@alex_rivera" 
                  time="1 hour ago" 
                  content="I really like the open concept design! It would make the space feel more welcoming and collaborative. However, I'm concerned about noise levels during peak hours."
                  likes="24"
                  replies="5"
                />
                <CommentCard isDark={isDark} 
                  author="@sarah_chen" 
                  time="45 minutes ago" 
                  content="Great point about noise! Maybe we could designate quiet zones? Also, the natural lighting in the proposal looks amazing."
                  likes="18"
                  replies="3"
                />
                <CommentCard isDark={isDark} 
                  author="@mike_johnson" 
                  time="30 minutes ago" 
                  content="Has anyone considered accessibility? We need to ensure there are ramps and elevators that are easily accessible from all entrances."
                  likes="32"
                  replies="7"
                  highlighted
                />
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className={`p-6 rounded-xl border shadow-xl ${isDark ? 'bg-container-dark border-white/10' : 'bg-white border-[#e6f4f2]'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>Discussion Stats</h3>
                <div className="space-y-3">
                  <StatItem isDark={isDark} icon="forum" label="Comments" value="152" />
                  <StatItem isDark={isDark} icon="visibility" label="Views" value="1.2k" />
                  <StatItem isDark={isDark} icon="thumb_up" label="Upvotes" value="89" />
                </div>
              </div>

              <div className={`p-6 rounded-xl border shadow-xl ${isDark ? 'bg-container-dark border-white/10' : 'bg-white border-[#e6f4f2]'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>Related Discussions</h3>
                <div className="space-y-3">
                  <RelatedItem isDark={isDark} title="Library Renovation Ideas" comments="45" />
                  <RelatedItem isDark={isDark} title="Campus Sustainability Initiatives" comments="67" />
                  <RelatedItem isDark={isDark} title="Student Parking Solutions" comments="103" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      </div>
    </div>
  );
};

// Helper Components
const CommentCard = ({ isDark, author, time, content, likes, replies, highlighted }) => (
  <div className={`p-5 rounded-xl border transition-all ${highlighted ? 'border-primary/50 bg-primary/5' : isDark ? 'bg-container-dark border-white/10' : 'bg-white border-[#e6f4f2]'}`}>
    <div className="flex items-start gap-3">
      <div className="size-10 rounded-full bg-gradient-to-br from-primary to-accent-violet flex-shrink-0"></div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-primary">{author}</span>
          <span className={`text-xs ${isDark ? 'text-off-white/60' : 'text-gray-500'}`}>• {time}</span>
        </div>
        <p className={`text-sm leading-relaxed mb-3 ${isDark ? 'text-off-white/80' : 'text-gray-700'}`}>{content}</p>
        <div className="flex items-center gap-4">
          <button className={`flex items-center gap-1 text-xs font-medium transition-colors ${isDark ? 'text-off-white/60 hover:text-primary' : 'text-gray-600 hover:text-primary'}`}>
            <span className="material-symbols-outlined text-sm">thumb_up</span>
            <span>{likes}</span>
          </button>
          <button className={`flex items-center gap-1 text-xs font-medium transition-colors ${isDark ? 'text-off-white/60 hover:text-primary' : 'text-gray-600 hover:text-primary'}`}>
            <span className="material-symbols-outlined text-sm">chat_bubble</span>
            <span>{replies} replies</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const StatItem = ({ isDark, icon, label, value }) => (
  <div className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'} transition-all`}>
    <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-primary text-sm">{icon}</span>
      <span className={`text-sm font-medium ${isDark ? 'text-off-white/80' : 'text-gray-700'}`}>{label}</span>
    </div>
    <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>{value}</span>
  </div>
);

const RelatedItem = ({ isDark, title, comments }) => (
  <div className={`p-3 rounded-lg cursor-pointer transition-all ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
    <h4 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-[#0c1d1a]'}`}>{title}</h4>
    <p className={`text-xs ${isDark ? 'text-off-white/60' : 'text-gray-600'}`}>{comments} comments</p>
  </div>
);

export default Discussion1Alt;