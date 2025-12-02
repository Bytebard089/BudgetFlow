import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Plus, 
  ArrowRight, 
  Receipt, 
  PiggyBank,
  Sparkles,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ income: 0, expenses: 0, balance: 0 });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [transactionsData, forecastData] = await Promise.all([
        api.getTransactions({ limit: 5, sortBy: 'date', sortOrder: 'desc' }),
        api.getSMAForecast()
      ]);

      setRecentTransactions(transactionsData.transactions);
      setForecast(forecastData);

      const allTransactions = await api.getTransactions({ limit: 1000 });
      const income = allTransactions.transactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = allTransactions.transactions
        .filter(t => t.type === 'Expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      setStats({ income, expenses, balance: income - expenses });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Salary': '💼', 'Freelance': '💻', 'Investment': '📈', 'Business': '🏢',
      'Gift': '🎁', 'Food': '🍔', 'Transport': '🚗', 'Entertainment': '🎬',
      'Shopping': '🛍️', 'Bills': '📄', 'Healthcare': '🏥', 'Education': '📚',
      'Other': '📦'
    };
    return icons[category] || '📦';
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Loading your finances...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white mb-1">
          Welcome back, <span className="text-gradient">{user?.name || 'there'}</span> 👋
        </h1>
        <p className="text-slate-400 text-sm">Here's your financial overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Income Card */}
        <div className="stats-card stats-card-income hover-lift">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wide">Total Income</p>
              <p className="text-xl font-bold text-white">{formatCurrency(stats.income)}</p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/15">
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>Money coming in</span>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="stats-card stats-card-expense hover-lift">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wide">Total Expenses</p>
              <p className="text-xl font-bold text-white">{formatCurrency(stats.expenses)}</p>
            </div>
            <div className="p-2 rounded-lg bg-rose-500/15">
              <ArrowDownRight className="w-4 h-4 text-rose-400" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-rose-400">
            <TrendingDown className="w-3 h-3" />
            <span>Money going out</span>
          </div>
        </div>

        {/* Balance Card */}
        <div className="stats-card stats-card-balance hover-lift">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wide">Current Balance</p>
              <p className={`text-xl font-bold ${stats.balance >= 0 ? 'text-white' : 'text-rose-400'}`}>
                {formatCurrency(stats.balance)}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-violet-500/15">
              <Wallet className="w-4 h-4 text-violet-400" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-violet-400">
            <Sparkles className="w-3 h-3" />
            <span>Net worth</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* SMA Forecast */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-violet-500/15">
              <PiggyBank className="w-4 h-4 text-violet-400" />
            </div>
            <h2 className="text-sm font-medium text-white">Spending Forecast</h2>
          </div>
          
          {forecast && forecast.sma > 0 ? (
            <div>
              <p className="text-2xl font-bold text-white mb-1">
                {formatCurrency(forecast.sma)}
                <span className="text-xs font-normal text-slate-400 ml-1">/month</span>
              </p>
              <p className="text-xs text-slate-400 mb-3">{forecast.forecast}</p>
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <IndianRupee className="w-3 h-3" />
                Based on {forecast.dataPoints} transactions
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <PiggyBank className="w-8 h-8 text-violet-400/40 mx-auto mb-2" />
              <p className="text-slate-500 text-xs">Add more transactions for forecasts</p>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-violet-500/15">
                <Receipt className="w-4 h-4 text-violet-400" />
              </div>
              <h2 className="text-sm font-medium text-white">Recent Transactions</h2>
            </div>
            <Link 
              to="/transactions"
              className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentTransactions.length > 0 ? (
            <div className="space-y-2">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'Income' 
                        ? 'bg-emerald-500/15' 
                        : 'bg-rose-500/15'
                    }`}>
                      <span className="text-sm">{getCategoryIcon(transaction.category)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{transaction.description}</p>
                      <p className="text-[11px] text-slate-500">
                        {transaction.category || 'Uncategorized'} • {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <p className={`font-semibold text-sm ${
                    transaction.type === 'Income' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {transaction.type === 'Income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Receipt className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm mb-4">No transactions yet</p>
              <Link to="/new-entry" className="btn-primary inline-flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" />
                <span>Add transaction</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Link to="/new-entry" className="card card-gradient group text-center p-4 hover-lift">
          <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-violet-500/15 flex items-center justify-center group-hover:bg-violet-500/25 transition-colors">
            <Plus className="w-5 h-5 text-violet-400" />
          </div>
          <h3 className="font-medium text-white text-sm">Add Entry</h3>
          <p className="text-[11px] text-slate-500">New transaction</p>
        </Link>

        <Link to="/transactions" className="card card-gradient group text-center p-4 hover-lift">
          <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-violet-500/15 flex items-center justify-center group-hover:bg-violet-500/25 transition-colors">
            <Receipt className="w-5 h-5 text-violet-400" />
          </div>
          <h3 className="font-medium text-white text-sm">View All</h3>
          <p className="text-[11px] text-slate-500">All transactions</p>
        </Link>

        <Link to="/transactions?type=Income" className="card card-gradient group text-center p-4 hover-lift">
          <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-emerald-500/15 flex items-center justify-center group-hover:bg-emerald-500/25 transition-colors">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="font-medium text-white text-sm">Income</h3>
          <p className="text-[11px] text-slate-500">View income</p>
        </Link>

        <Link to="/transactions?type=Expense" className="card card-gradient group text-center p-4 hover-lift">
          <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-rose-500/15 flex items-center justify-center group-hover:bg-rose-500/25 transition-colors">
            <TrendingDown className="w-5 h-5 text-rose-400" />
          </div>
          <h3 className="font-medium text-white text-sm">Expenses</h3>
          <p className="text-[11px] text-slate-500">View expenses</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

