import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet } from 'lucide-react';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Animated Background */}
        <div className="bg-animated" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="grid-pattern" />
        
        <div className="relative text-center">
          {/* Animated Spinner */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-violet-500/20"></div>
            {/* Spinning ring */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 animate-spin"></div>
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-violet-400" />
            </div>
          </div>
          
          {/* Loading text */}
          <h2 className="text-lg font-semibold text-white mb-1">Loading</h2>
          <p className="text-slate-400 text-sm">Please wait...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
