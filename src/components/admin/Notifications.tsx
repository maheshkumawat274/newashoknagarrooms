import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, User, Clock, Eye } from 'lucide-react';
import { Lead } from '@/src/types';
import { format, isValid } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface NotificationsProps {
  leads: Lead[];
  onClose: () => void;
  onMarkAsRead?: (leadId: string) => Promise<void>;
}

export default function Notifications({ leads, onClose, onMarkAsRead }: NotificationsProps) {
  const navigate = useNavigate();
  
  const formatTimeSafe = (dateString: string | undefined | null) => {
    if (!dateString) return 'Invalid time';
    try {
      const date = new Date(dateString);
      if (!isValid(date)) return 'Invalid time';
      return format(date, 'hh:mm aa');
    } catch {
      return 'Invalid time';
    }
  };

  const newLeads = leads.filter(l => l.isNew === true).slice(0, 5);

  const handleMarkAsRead = async (e: React.MouseEvent, leadId: string) => {
    e.stopPropagation();
    if (onMarkAsRead) {
      await onMarkAsRead(leadId);
    }
  };

  const handleViewAllLeads = () => {
    onClose();
    navigate('/admin/leads');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="absolute top-full right-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-[60]"
    >
      <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <h4 className="font-bold text-gray-900">
          New Leads 
          {newLeads.length > 0 && (
            <span className="ml-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
              {newLeads.length}
            </span>
          )}
        </h4>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
          <X size={16} />
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {newLeads.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {newLeads.map((lead) => (
              <div key={lead.id} className="p-4 hover:bg-gray-50 transition-colors group">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <User size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 leading-tight mb-1">
                      {lead.name} inquired for <span className="text-primary">{lead.propertyType}</span>
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
                      <Clock size={12} />
                      {formatTimeSafe(lead.created_at)}
                    </div>
                    <p className="text-xs text-gray-400 mt-1 truncate">Budget: {lead.budget}</p>
                  </div>
                  <button
                    onClick={(e) => handleMarkAsRead(e, lead.id!)}
                    className="p-2 bg-blue-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600"
                    title="Mark as Read"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center">
            <Bell size={40} className="mx-auto text-gray-100 mb-4" />
            <p className="text-sm text-gray-400 font-medium">No new notifications</p>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50/50 border-t border-gray-50 text-center">
        <button onClick={handleViewAllLeads} className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">
          View All Leads
        </button>
      </div>
    </motion.div>
  );
}