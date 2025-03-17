import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

const GoogleAuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get auth data from URL query parameter
        const searchParams = new URLSearchParams(location.search);
        const authDataParam = searchParams.get('data');
        
        console.log("Auth data param:", authDataParam);
        
        let authResult;
        
        if (authDataParam) {
          // Parse the data from URL parameter
          authResult = JSON.parse(decodeURIComponent(authDataParam));
        } else {
          // If no data in URL, try to extract from page content
          const content = document.body.textContent || "";
          if (content.includes('"accessToken"')) {
            const jsonStart = content.indexOf('{');
            const jsonEnd = content.lastIndexOf('}') + 1;
            if (jsonStart >= 0 && jsonEnd > jsonStart) {
              const jsonStr = content.substring(jsonStart, jsonEnd);
              authResult = JSON.parse(jsonStr);
            }
          }
        }
        
        console.log("Auth result:", authResult);
        
        if (authResult && authResult.accessToken) {
          // Login successful, store tokens and user info
          login(
            authResult.accessToken,
            authResult.refreshToken,
            authResult.user
          );
          
          // Redirect to dashboard with replace to prevent going back to the callback
          navigate('/dashboard', { replace: true });
        } else {
          throw new Error("No valid authentication data found");
        }
      } catch (error) {
        console.error('Error handling Google authentication callback:', error);
        setError('Authentication failed. Please try again.');
        setTimeout(() => navigate('/auth', { replace: true }), 3000);
      }
    };

    handleCallback();
  }, [login, navigate, location]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {error ? (
        <div className="bg-red-50 p-4 rounded-lg text-red-600">
          <p className="font-medium">{error}</p>
          <p className="text-sm mt-2">Redirecting to login page...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-lg font-medium">Completing authentication...</p>
          <p className="text-sm text-gray-500">Please wait while we set up your session</p>
        </div>
      )}
    </div>
  );
};

export default GoogleAuthCallback;