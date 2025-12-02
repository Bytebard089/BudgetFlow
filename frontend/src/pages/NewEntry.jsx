import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import { useToast } from '../context/ToastContext';
import { 
  ArrowLeft, 
  Save, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Tag,
  FileText,
  IndianRupee
} from 'lucide-react';

const NewEntry = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(isEditing);
  const [formData, setFormData] = useState({
    type: 'Expense',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Business', 'Gift', 'Other'];
  const expenseCategories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'];

  useEffect(() => {
    if (isEditing) {
      fetchTransaction();
    }
  }, [id]);

  const fetchTransaction = async () => {
    try {
      const data = await api.getTransaction(id);
      setFormData({
        type: data.type,
        amount: data.amount.toString(),
        description: data.description,
        category: data.category || '',
        date: new Date(data.date).toISOString().split('T')[0]
      });
    } catch (error) {
      showToast('Failed to load transaction', 'error');
      navigate('/transactions');
    } finally {
      setFetchingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset category when type changes
      ...(name === 'type' && { category: '' })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      if (isEditing) {
        await api.updateTransaction(id, payload);
        showToast('Transaction updated', 'success');
      } else {
        await api.createTransaction(payload);
        showToast('Transaction added', 'success');
      }
      navigate('/transactions');
    } catch (error) {
      showToast(error.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  const categories = formData.type === 'Income' ? incomeCategories : expenseCategories;

  if (fetchingData) {
    return (
      <div className="max-w-lg mx-auto flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-white">
            {isEditing ? 'Edit Transaction' : 'New Transaction'}
          </h1>
          <p className="text-slate-400 text-sm">
            {isEditing ? 'Update transaction details' : 'Add a new income or expense'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="glass-card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type Toggle */}
          <div>
            <label className="label-modern">Transaction Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'Income', category: '' }))}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                  formData.type === 'Income'
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/10'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Income</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'Expense', category: '' }))}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                  formData.type === 'Expense'
                    ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/10'
                }`}
              >
                <TrendingDown className="w-4 h-4" />
                <span className="font-medium">Expense</span>
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="label-modern">Amount (₹)</label>
            <div className="relative">
              <IndianRupee className="input-icon-left" />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="input-modern input-with-icon"
                placeholder="0"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="label-modern">Description</label>
            <div className="relative">
              <FileText className="input-icon-left" />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-modern input-with-icon"
                placeholder="What was this for?"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="label-modern">Category</label>
            <div className="relative">
              <Tag className="input-icon-left" />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-modern input-with-icon"
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="label-modern">Date</label>
            <div className="relative">
              <Calendar className="input-icon-left" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-modern input-with-icon"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEditing ? 'Update Transaction' : 'Add Transaction'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewEntry;
