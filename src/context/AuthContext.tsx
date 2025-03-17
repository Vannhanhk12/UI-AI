import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  checkAuth: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for tokens in localStorage on mount
  // Add this to AuthContext.tsx in the AuthProvider component
  useEffect(() => {
    const checkInitialAuth = async () => {
      const storedAccessToken = localStorage.getItem('accessToken');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      const storedUser = localStorage.getItem('user');
      
      if (storedAccessToken && storedRefreshToken && storedUser) {
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
        try {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          
          // Optionally validate the token with your backend
          await checkAuth();
        } catch (e) {
          console.error("Error restoring auth state:", e);
          logout();
        }
      }
      
      setIsLoading(false);
    };
    
    checkInitialAuth();
  }, []);

  const login = (accessToken: string, refreshToken: string, user: User) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const checkAuth = async (): Promise<boolean> => {
    if (!accessToken) return false;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        accessToken, 
        refreshToken, 
        isAuthenticated, 
        isLoading, 
        login, 
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};