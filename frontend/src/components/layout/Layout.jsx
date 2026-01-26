import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSidebar } from '../../context/SidebarContext';

const Layout = ({ children }) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Sidebar />
      <main 
        className={`transition-all duration-300 pt-0 
          ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
          ml-0
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;