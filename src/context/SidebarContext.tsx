import React, { createContext, useContext, useState } from 'react';

type SidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggle: () => {},
});

export const SidebarProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);