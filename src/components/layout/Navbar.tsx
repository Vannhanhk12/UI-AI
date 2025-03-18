import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Home,
  BarChart2,
  FileText,
  Code,
  Menu,
  X,
  Bot,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, accessToken, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState<{id: string; email: string} | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) return;
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };
    
    fetchProfile();
  }, [accessToken]);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
    { name: "Tasks", path: "/tasks", icon: <FileText size={18} /> },
    { name: "AI Assistant", path: "/ai-chat", icon: <Bot size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
    { name: "About Nyan", path: "/about", icon: <Code size={18} /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      if (accessToken) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        if (response.status === 204) {
          // Successful logout
          logout(); // Clear local storage and state
          toast.success("Logged out successfully");
          navigate("/"); // Redirect to landing page
        } else {
          throw new Error("Logout failed");
        }
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
      
      // If server is unavailable, still perform local logout
      logout();
      navigate("/");
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (profileData?.email) {
      return profileData.email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <BarChart2 className="w-6 h-6 text-blue-600" />
            </motion.div>
            <span className="text-xl font-bold text-gray-900">TaskMaster</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                className={`flex items-center gap-2 ${isActive(item.path) ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600"}`}
                size="sm"
              >
                {item.icon}
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="hidden md:flex items-center ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium max-w-[150px] truncate">
                  {profileData?.email || user?.username || "User"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white border-b border-gray-200"
        >
          <div className="px-4 py-3 space-y-1">
            {/* User Info in Mobile Menu */}
            <div className="flex items-center py-2 mb-2 border-b border-gray-100">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium truncate">
                  {profileData?.email || user?.username || "User"}
                </p>
              </div>
            </div>
            
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`w-full justify-start ${isActive(item.path) ? "bg-blue-600 text-white" : "text-gray-700"}`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    {item.name}
                  </div>
                </Button>
              </Link>
            ))}
            
            {/* Logout Button in Mobile Menu */}
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-2">
                <LogOut size={18} />
                Logout
              </div>
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
