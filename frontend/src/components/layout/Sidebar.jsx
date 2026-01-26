import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';
import { 
  Home, 
  Calendar, 
  Users, 
  User, 
  Settings, 
  BookMarked,
  TrendingUp,
  MessageSquare,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Star
} from 'lucide-react';

const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { path: '/', icon: Home, label: 'Home', requireAuth: false },
    { path: '/events', icon: Calendar, label: 'Events', requireAuth: true },
    { path: '/clubs', icon: Users, label: 'Clubs', requireAuth: true },
    { path: '/discover', icon: Search, label: 'Discover', requireAuth: true },
    { path: '/trending', icon: TrendingUp, label: 'Trending', requireAuth: true },
    { path: '/my-rsvps', icon: BookMarked, label: 'My RSVPs', requireAuth: true },
    { path: '/notifications', icon: Bell, label: 'Notifications', requireAuth: true },
    { path: '/messages', icon: MessageSquare, label: 'Messages', requireAuth: true },
  ];

  const bottomItems = [
    { path: '/profile', icon: User, label: 'Profile', requireAuth: true },
    { path: '/settings', icon: Settings, label: 'Settings', requireAuth: true },
  ];

  // Admin-specific items
  const adminItems = user?.role === 'admin' ? [
    { path: '/my-club', icon: LayoutDashboard, label: 'My Club', requireAuth: true },
  ] : [];

  const filteredNavItems = navigationItems.filter(item => 
    !item.requireAuth || isAuthenticated
  );

  const filteredBottomItems = bottomItems.filter(item => 
    !item.requireAuth || isAuthenticated
  );

  return (
    <aside 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-card-dark border-r border-slate-200 dark:border-input-border transition-all duration-300 z-40 
        ${isCollapsed ? 'w-20' : 'w-64'}
        hidden lg:block
      `}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-input-border rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-md"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {/* Main Navigation */}
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all group ${
                  active
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary'}`} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}

          {/* Admin Section */}
          {adminItems.length > 0 && (
            <>
              {!isCollapsed && (
                <div className="pt-6 pb-2 px-3">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Admin
                  </p>
                </div>
              )}
              {adminItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all group ${
                      active
                        ? 'bg-primary text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary'}`} />
                    {!isCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        {/* Bottom Items */}
        {isAuthenticated && (
          <div className="border-t border-slate-200 dark:border-input-border py-4 px-3 space-y-1">
            {filteredBottomItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all group ${
                    active
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary'}`} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              );
            })}

            {/* User Info Card (when expanded) */}
            {!isCollapsed && user && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.firstName?.[0] || user.username?.[0] || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user.firstName || user.username}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                {user.role === 'admin' && (
                  <div className="mt-2 flex items-center space-x-1 text-xs text-primary">
                    <Star className="h-3 w-3" />
                    <span className="font-medium">Club Admin</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
