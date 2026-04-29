import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { WHATSAPP_GROUP_LINK } from '@/src/lib/utils';
import { PropertyType } from '@/src/types';
import { API_URLS } from '@/src/apiConfig';

interface LeadFormProps {
  className?: string;
  onSuccess?: () => void;
}

export default function LeadForm({ className, onSuccess }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '',
    propertyType: '' as PropertyType | '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const propertyTypes: PropertyType[] = ['1RK', '2RK', '1BHK', '2BHK', '3BHK', 'PG', 'Room'];
  const budgets = ['Under ₹6,000', '₹6,000 - ₹10,000', '₹10,000 - ₹15,000', '₹15,000 - ₹20,000', 'Above ₹20,000'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.budget || !formData.propertyType) {
      setErrorMessage('Please fill all fields');
      return;
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage('Please enter a valid 10-digit phone number');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(API_URLS.ADD_LEAD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          budget: formData.budget,
          propertyType: formData.propertyType,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setStatus('success');
        setTimeout(() => {
          window.open(WHATSAPP_GROUP_LINK, '_blank');
          onSuccess?.();
          
          // Reset form
          setFormData({
            name: '',
            phone: '',
            budget: '',
            propertyType: '',
          });
        }, 1000);
      } else {
        throw new Error(data.message || 'Failed to save lead');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className={cn("bg-white p-6 rounded-2xl shadow-xl border border-gray-100", className)}>
      <h3 className="text-2xl font-bold mb-6 text-primary">Get Instant Options</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            required
            type="text"
            placeholder="e.g. Rahul Kumar"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={status === 'loading'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            required
            type="tel"
            placeholder="e.g. 9876543210"
            maxLength={10}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
            disabled={status === 'loading'}
          />
          <p className="text-xs text-gray-400 mt-1">Enter 10-digit mobile number</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-white"
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
              disabled={status === 'loading'}
            >
              <option value="">Select Type</option>
              {propertyTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
            <select
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-white"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              disabled={status === 'loading'}
            >
              <option value="">Select Budget</option>
              {budgets.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-600 text-sm flex items-center gap-1">
            <AlertCircle size={14} />
            {errorMessage}
          </div>
        )}

        <button
          disabled={status === 'loading'}
          type="submit"
          className="w-full bg-primary text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {status === 'loading' ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send size={20} />
              Get Details on WhatsApp
            </>
          )}
        </button>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-green-600 font-medium justify-center pt-2"
            >
              <CheckCircle2 size={18} />
              Lead recorded! Opening WhatsApp...
            </motion.div>
          )}
          {status === 'error' && !errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-red-600 font-medium justify-center pt-2"
            >
              <AlertCircle size={18} />
              Something went wrong. Try again.
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}