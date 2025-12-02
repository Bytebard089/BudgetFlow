import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import NewEntry from './pages/NewEntry';

// Layout component to handle sidebar vs navbar
const AppLayout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Public routes that should show navbar
  const publicRoutes = ['/', '/login', '/register'];
  const isPublicRoute = publicRoutes.includes(location.pathname);
  
  if (user && !isPublicRoute) {
    // Authenticated layout with sidebar
    return (
      <div className="min-h-screen">
        {/* Animated Background */}
        <div className="bg-animated" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-pattern" />
        <div className="noise-overlay" />
        
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    );
  }
  
  // Public layout with navbar
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

function AppContent() {
  return (
    <AppLayout>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/transactions" 
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/new-entry" 
          element={
            <PrivateRoute>
              <NewEntry />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/edit-entry/:id" 
          element={
            <PrivateRoute>
              <NewEntry />
            </PrivateRoute>
          } 
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AppContent />
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
