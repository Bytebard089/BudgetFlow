import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Receipt, 
  PlusCircle, 
  LogOut,
  Wallet,
  TrendingUp,
  Settings,
  User
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
    { path: '/new-entry', icon: PlusCircle, label: 'Add Entry' },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <Link to="/dashboard" className="flex items-center justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Wallet className="w-5 h-5 text-white" />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link relative ${isActive(item.path) ? 'active' : ''}`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sidebar-expanded:block text-sm font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="mt-auto space-y-2">
        {/* User Avatar */}
        <div className="flex items-center justify-center py-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {user?.name?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
            </span>
          </div>
        </div>
        
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="sidebar-link w-full justify-center text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
