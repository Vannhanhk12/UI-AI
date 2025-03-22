import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { SidebarProvider } from '../../context/SidebarContext';
import { useTheme } from '../../context/ThemeContext';

const DashboardLayout: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <SidebarProvider>
      <div className={`flex min-h-screen transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900' 
          : 'bg-gradient-to-br from-blue-50 to-indigo-50'
      }`}>
        <Sidebar />
        <div className="flex-1 transition-all duration-300 ml-[72px] md:ml-[240px]">
          <main className="p-4 md:p-8">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;