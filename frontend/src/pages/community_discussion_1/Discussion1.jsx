import React, { useState } from 'react';

const Discussion1 = () => {
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
    <div className="bg-background-light dark:bg-background-dark font-display text-[#0c1d1a] dark:text-off-white antialiased transition-colors duration-200 min-h-screen">
      <style>
        {`
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
            background: #1f2626;
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
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#e6f4f2] dark:border-white/10 px-6 lg:px-20 py-3">
          <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">hub</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-[#0c1d1a] dark:text-white">Campus Hub</h2>
              </div>
              <div className="hidden md:flex">
                <label className="flex flex-col min-w-40 h-10 w-64 lg:w-80">
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-white/5">
                    <div className="text-primary flex items-center justify-center pl-4">
                      <span className="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:outline-0 focus:ring-0 placeholder:text-primary/40 px-3 text-sm font-normal text-[#0c1d1a] dark:text-white" placeholder="Search discussions, events, groups..." />
                  </div>
                </label>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden lg:flex items-center gap-8">
                <a className="text-sm font-medium hover:text-primary transition-colors text-[#0c1d1a]/80 dark:text-white/80" href="#">Discussions</a>
                <a className="text-sm font-medium hover:text-primary transition-colors text-[#0c1d1a]/80 dark:text-white/80" href="#">Events</a>
                <a className="text-sm font-medium hover:text-primary transition-colors text-[#0c1d1a]/80 dark:text-white/80" href="#">Groups</a>
              </nav>
              <div className="flex gap-3">
                <button onClick={toggleTheme} className="flex items-center justify-center rounded-xl h-10 w-10 bg-white/5 dark:bg-white/5 text-[#0c1d1a]/80 dark:text-white/80 hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span>
                </button>
                <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-white/5 dark:bg-white/5 text-[#0c1d1a]/80 dark:text-white/80 hover:bg-primary/10 transition-colors">
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
                <a className="text-primary font-medium hover:underline" href="#">Home</a>
                <span className="text-primary/40 material-symbols-outlined text-xs">chevron_right</span>
                <a className="text-primary font-medium hover:underline" href="#">Communities</a>
                <span className="text-primary/40 material-symbols-outlined text-xs">chevron_right</span>
                <span className="opacity-60 text-off-white">Campus Planning</span>
              </nav>
              <div className="bg-container-dark p-6 rounded-xl border border-white/10 shadow-xl">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <span className="bg-accent-yellow/10 text-accent-yellow text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-accent-yellow/20">Popular</span>
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-primary/20">#Architecture</span>
                    </div>
                    <h1 className="text-3xl font-black leading-tight tracking-tight text-white">Proposals for the new Student Union layout</h1>
                    <div className="flex items-center gap-2 text-sm text-off-white/60">
                      <div className="size-6 rounded-full bg-deep-indigo/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-xs text-deep-indigo">verified_user</span>
                      </div>
                      <span>Posted by <span className="font-bold text-primary">@student_council</span> • 2 hours ago</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-off-white rounded-xl font-bold text-sm transition-all shrink-0 border border-white/10">
                    <span className="material-symbols-outlined text-[18px]">bookmark</span>
                    <span>Follow</span>
                  </button>
                </div>
              </div>
              <div className="relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
                <div className="p-6 rounded-xl border-2 border-dashed border-primary/40 bg-container-dark flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="size-12 rounded-xl bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/30">
                      <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Thread AI Summarizer</h3>
                      <p className="text-sm text-off-white/70 leading-relaxed">Don't have time to read all 152 comments? Get an instant bulleted summary of consensus and concerns.</p>
                    </div>
                  </div>
                  <button className="w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold flex items-center justify-center gap-2 glow-button transition-all">
                    <span>Summarize Discussion</span>
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                  </button>
                </div>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-primary">AI-Generated Key Points</h4>
                  <div className="flex gap-2">
                    <button className="text-primary hover:bg-primary/10 p-1 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">thumb_up</span></button>
                    <button className="text-primary hover:bg-primary/10 p-1 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">thumb_down</span></button>
                  </div>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex gap-3 text-sm text-off-white/80">
                    <span className="text-primary mt-1 material-symbols-outlined text-xs">circle</span>
                    <span>Majority support for 24/7 access to the common areas and quiet study pods.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-off-white/80">
                    <span className="text-primary mt-1 material-symbols-outlined text-xs">circle</span>
                    <span>Controversy over the reduction of cafeteria space for "digital labs".</span>
                  </li>
                  <li className="flex gap-3 text-sm text-off-white/80">
                    <span className="text-primary mt-1 material-symbols-outlined text-xs">circle</span>
                    <span>Requests for more sustainable building materials (Timber vs Steel).</span>
                  </li>
                  <li className="flex gap-3 text-sm text-off-white/80">
                    <span className="text-primary mt-1 material-symbols-outlined text-xs">circle</span>
                    <span>Agreement on adding more rooftop green space for relaxation.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-container-dark rounded-xl border border-white/10 overflow-hidden focus-within:ring-2 focus-within:ring-primary/30 transition-all">
                <div className="flex items-center gap-2 p-3 border-b border-white/10 bg-white/5">
                  <button className="p-2 hover:bg-primary/10 rounded-lg text-primary/70 transition-colors"><span className="material-symbols-outlined text-sm">format_bold</span></button>
                  <button className="p-2 hover:bg-primary/10 rounded-lg text-primary/70 transition-colors"><span className="material-symbols-outlined text-sm">format_italic</span></button>
                  <button className="p-2 hover:bg-primary/10 rounded-lg text-primary/70 transition-colors"><span className="material-symbols-outlined text-sm">link</span></button>
                  <button className="p-2 hover:bg-primary/10 rounded-lg text-primary/70 transition-colors"><span className="material-symbols-outlined text-sm">image</span></button>
                  <div className="flex-1"></div>
                  <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Rich Text Editor</span>
                </div>
                <textarea className="w-full bg-transparent border-none focus:ring-0 p-4 min-h-[120px] placeholder:text-off-white/20 text-sm text-off-white" placeholder="Add your perspective to the discussion..."></textarea>
                <div className="p-3 bg-white/5 border-t border-white/10 flex justify-end">
                  <button className="px-6 py-2 bg-primary text-white font-bold rounded-lg text-sm hover:shadow-lg hover:shadow-primary/20 transition-all">Post Comment</button>
                </div>
              </div>
              <div className="space-y-8 mt-10">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-2 w-10">
                    <button className="text-primary hover:text-white transition-colors"><span className="material-symbols-outlined">expand_less</span></button>
                    <span className="text-xs font-bold text-white">142</span>
                    <button className="text-off-white/40 hover:text-primary transition-colors"><span className="material-symbols-outlined">expand_more</span></button>
                    <div className="comment-thread-line flex-1 mt-2 rounded-full"></div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full bg-deep-indigo/20 overflow-hidden border border-white/10">
                        <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClqD3pPXcNmEjjVmECah5sr41fCYJYrsLJoNOLTktQu9pLALA9-720owx6wz_ysXVF4SKtPQHR8849IMEr7EV7cjmhFzuf6DQrCup4aBQoc75-qEDfhd3M2TZ7B5_tZ3J4zbli7Y829tLixMutYrYHgJj-7NdZokJWDDf6W5muMBbLs0JwH2Jg0c7LtC8fb9rOX9Y1l3A35fg7Gaad0oJnkE8edKZxfrK-5cdltjmvmk3Fg5SMOJN32RmOXcQBqqxQUzYa2YIWvTU" />
                      </div>
                      <span className="text-sm font-bold text-primary">@arch_major_jane</span>
                      <span className="text-xs opacity-40">• 1h ago</span>
                    </div>
                    <p className="text-[15px] leading-relaxed text-off-white/90">I've reviewed the blue prints for the Student Union and I'm worried about the acoustics in the central atrium. If we have it completely open like that, it'll be impossible to study there during peak hours. We should consider acoustic baffles or some sort of sound-absorbing installation.</p>
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-1.5 text-xs font-bold opacity-60 hover:text-primary hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[16px]">reply</span> Reply</button>
                      <button className="flex items-center gap-1.5 text-xs font-bold opacity-60 hover:text-primary hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[16px]">share</span> Share</button>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <div className="flex flex-col items-center gap-2 w-10">
                        <button className="text-off-white/40 hover:text-primary transition-colors"><span className="material-symbols-outlined">expand_less</span></button>
                        <span className="text-xs font-bold text-white">24</span>
                        <button className="text-off-white/40 hover:text-primary transition-colors"><span className="material-symbols-outlined">expand_more</span></button>
                        <div className="comment-thread-line flex-1 mt-2 rounded-full"></div>
                      </div>
                      <div className="flex-1 space-y-4 bg-nested-dark p-4 rounded-xl border border-white/10 shadow-inner">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-accent-yellow/20 overflow-hidden border border-accent-yellow/30">
                            <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCInkc2o99afwxtqQrq4enYROSWEscrcUuqrU0Bqu3II61gYMgC5j8GQlxGe6sPO4tuAA8UoV0hDOSZO4ybz1IaIHy_NSX_jM_5NvFNW_z-J9Y8Tj0e4EN818TA5bm9qMb2DGm9BHhK-gJkpoNcrslzPNhGJIZchzPY_74GVNJ1Z-bdGqmbIh1_PEIEtEkWZOrwLbPyFajeWGHgi61Om0VhbeWp8usITz1CatMIBVRzOhCB6t5kGENAhT_F0_q9ZdEFfQUznED_oWI" />
                          </div>
                          <span className="text-sm font-bold text-primary">@civil_mike</span>
                          <span className="text-xs opacity-40">• 45m ago</span>
                        </div>
                        <p className="text-sm leading-relaxed text-off-white/80">Good point Jane. The current plan uses a lot of glass and polished concrete, which are terrible for echo. Adding some moss walls or fabric panels could solve this and look great too.</p>
                        <div className="flex items-center gap-4">
                          <button className="text-xs font-bold opacity-60 hover:text-primary transition-opacity">Reply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-2 w-10">
                    <button className="text-off-white/40 hover:text-primary transition-colors"><span className="material-symbols-outlined">expand_less</span></button>
                    <span className="text-xs font-bold text-white">89</span>
                    <button className="text-off-white/40 hover:text-primary transition-colors"><span className="material-symbols-outlined">expand_more</span></button>
                    <div className="w-px bg-white/10 flex-1 mt-2"></div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full bg-primary/20 overflow-hidden border border-white/10">
                        <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOrtcJKE54gIj4DWiTfAY4ES5necxPZ7lATTQGBtiXhLSPWE4qTAxvdG2SGzpaYoDSj2Uem6620zYyKhYfyKvBw-PFhgAkC3VezoLWDGv_S79RarlrfOVLGcMrDju8wjNArZiK1zap6vlEewbJcIj_eE1pw5O0tUKKKKqRuQ8oZG48ziaUSmxsWuCkPqFWFm-nP4w4q2r3fCK-q5Z-UOUwTdDFKe-AJ1QrTnrhCq0Mzp-z-CIKzCtneFGl8mwDTw88Mi2gk-6lDOo" />
                      </div>
                      <span className="text-sm font-bold text-primary">@freshman_frank</span>
                      <span className="text-xs opacity-40">• 2h ago</span>
                    </div>
                    <p className="text-[15px] leading-relaxed text-off-white/90">As long as there are enough power outlets. The current Student Union has like three outlets for the whole lounge. The new layout needs to prioritize charging stations.</p>
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-1.5 text-xs font-bold opacity-60 hover:text-primary hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[16px]">reply</span> Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-container-dark rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                <div className="h-24 bg-primary/20 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-6 text-white font-bold text-lg">About Community</h3>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-off-white/80 leading-relaxed">Official hub for campus urban planning, architecture projects, and student space improvements. Your voice shapes our campus.</p>
                  <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-4">
                    <div>
                      <p className="text-xs opacity-50 uppercase font-bold tracking-widest">Members</p>
                      <p className="text-xl font-black text-white">12.4k</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-50 uppercase font-bold tracking-widest">Active</p>
                      <p className="text-xl font-black text-primary">842</p>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-deep-indigo text-white font-bold rounded-xl hover:bg-deep-indigo/90 shadow-lg shadow-deep-indigo/20 transition-all">Create Post</button>
                </div>
              </div>
              <div className="bg-container-dark rounded-2xl border border-white/10 p-6 space-y-4 shadow-xl">
                <h4 className="font-bold text-sm uppercase tracking-widest opacity-60 text-off-white">Top Contributors</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img alt="Top Contributor" className="size-8 rounded-full border border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp4tC7vYg-5oj8uh61bmeMM_bnrDP1eT1Xmlr04lJhLbnOZhyT5YTWtvve96RTo-MuX9dZ65yfZLUGPL9oKd2IzaYZ-zEAs7vierMtfeNoJdf8cBabYt7FV3US56faylDJvNLrgRaLe9_N9NFgd4fI9C1BMEQbgf2ub6ejGKqiTzw8nWipjKHxSjnh4Csm4Rk559tIeyJbU9xQXr3wM-LFBrYUtXonNOGPrFBkJiDyxpZS9CI6DP1KuL-xSlBY-nPybhZiMPkLKE4" />
                      <span className="text-sm font-bold text-off-white">@design_queen</span>
                    </div>
                    <span className="text-xs font-black text-primary">2.4k exp</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img alt="Top Contributor" className="size-8 rounded-full border border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANbBX8KhwSnkOwuXJt_dt1py9Ob4-xD_nJmSuGAjtuLFSZyHqt-3Tg5MUOHI7Y33iIL1lDkav1A3jLx5dVX0vPYvg0q8Ow4S0xBiQb-EsX2ejEJktCT32vCucXut-RCtj1-pMhqEgB61j_4F6ooJdKS3G5LmdE_l66vbRlU_W-ctJfLJfDYdGvpJlHumqmoxCnHX0p81ebgoJsibV4O6xtVUzPrHWmRFUq0jPhGiBWorP1HlHM64qHEEM904qb3li1dmjVA3gUNJI" />
                      <span className="text-sm font-bold text-off-white">@arch_major_jane</span>
                    </div>
                    <span className="text-xs font-black text-primary">1.8k exp</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img alt="Top Contributor" className="size-8 rounded-full border border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnwgphe9LfpFj2fXYPx_MLe7US2r14CLiia9BuIdaRtJVxowA1-1ESyrLLFHDxg3veg2o1huGuxs30f_WT0nUaYa4Oi0W6FQfZhrCv5KXGU01E08p3EUjNTgTjwGdei3JuyTwlOmNS48Ht534js5ueV3n4sPD1_rORTCNYy61leULlPPeeg-yv3v7c-FMvaKbEW7ieB0N2Y6rzL6p9EP7EADlLT_iUNlyYFohwEUmvpuwpW4Hei6ctDSppeJCow_4LAagGc7fQhrI" />
                      <span className="text-sm font-bold text-off-white">@council_alex</span>
                    </div>
                    <span className="text-xs font-black text-primary">1.2k exp</span>
                  </div>
                </div>
              </div>
              <div className="bg-accent-yellow/5 rounded-2xl border border-accent-yellow/20 p-6 space-y-4">
                <div className="flex items-center gap-2 text-accent-yellow">
                  <span className="material-symbols-outlined">event</span>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Related Events</h4>
                </div>
                <div className="space-y-4">
                  <div className="bg-container-dark/60 p-3 rounded-lg border border-accent-yellow/20 group cursor-pointer hover:border-primary transition-all">
                    <p className="text-xs font-bold text-primary mb-1">TOMORROW • 10:00 AM</p>
                    <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">Union Layout Town Hall</p>
                    <p className="text-xs text-off-white/60">West Wing Hall B</p>
                  </div>
                  <div className="bg-container-dark/60 p-3 rounded-lg border border-accent-yellow/20 group cursor-pointer hover:border-primary transition-all">
                    <p className="text-xs font-bold text-primary mb-1">OCT 24 • 4:00 PM</p>
                    <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">Digital Labs Workshop</p>
                    <p className="text-xs text-off-white/60">Architecture Building</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Discussion1;