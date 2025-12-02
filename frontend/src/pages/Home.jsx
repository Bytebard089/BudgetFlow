import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Wallet, 
  TrendingUp, 
  Shield, 
  Zap, 
  ArrowRight,
  ChartBar,
  PiggyBank,
  Receipt
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: ChartBar,
      title: 'Track Expenses',
      description: 'Monitor your spending patterns with detailed analytics',
      color: 'violet'
    },
    {
      icon: TrendingUp,
      title: 'Smart Forecasting',
      description: 'AI-powered predictions for better financial planning',
      color: 'emerald'
    },
    {
      icon: PiggyBank,
      title: 'Save More',
      description: 'Set goals and watch your savings grow over time',
      color: 'amber'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and protected',
      color: 'rose'
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="bg-animated" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grid-pattern" />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in-up">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Wallet className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">BudgetFlow</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Take Control of Your{' '}
            <span className="text-gradient">Finances</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Track expenses, analyze spending patterns, and achieve your financial goals with our intuitive budget management tool.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            {user ? (
              <Link to="/dashboard" className="btn-primary flex items-center gap-2">
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/login" className="btn-secondary">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Everything you need to manage money
            </h2>
            <p className="text-slate-400">Simple, powerful tools for personal finance</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                violet: 'bg-violet-500/15 text-violet-400',
                emerald: 'bg-emerald-500/15 text-emerald-400',
                amber: 'bg-amber-500/15 text-amber-400',
                rose: 'bg-rose-500/15 text-rose-400'
              };
              
              return (
                <div 
                  key={feature.title}
                  className="glass-card p-5 hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <div className={`w-10 h-10 rounded-lg ${colorClasses[feature.color]} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 text-center">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold text-white mb-1">₹0</p>
                <p className="text-sm text-slate-400">Monthly Cost</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1">100%</p>
                <p className="text-sm text-slate-400">Privacy Focused</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1">∞</p>
                <p className="text-sm text-slate-400">Transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-violet-400" />
            <span className="text-sm text-slate-400">BudgetFlow</span>
          </div>
          <p className="text-sm text-slate-500">© 2024 BudgetFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
