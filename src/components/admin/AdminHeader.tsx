import { useState } from 'react';
import { Users, TrendingUp, Calendar, Clock, Bell, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { AnimatePresence } from 'motion/react';
import Notifications from './Notifications';

export default function AdminHeader({ 
  leadCount, 
  leads, 
  onNotificationClick,
  onMarkAsRead  // ✅ Add this prop
}: { 
  leadCount: number; 
  leads: any[]; 
  onNotificationClick?: () => void;
  onMarkAsRead?: (leadId: string) => Promise<void>;  // ✅ Add this
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex items-center justify-between mb-10">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 italic">Admin Dashboard</h1>
        <p className="text-gray-500 font-medium">Manage your incoming property leads from New Ashok Nagar.</p>
      </div>

      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              onNotificationClick?.();
            }}
            className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-600 hover:shadow-lg transition-all relative"
          >
            <Bell size={22} />
            {leadCount > 0 && (
              <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white flex items-center justify-center animate-bounce">
                {leadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <Notifications 
                leads={leads} 
                onClose={() => setShowNotifications(false)}
                onMarkAsRead={onMarkAsRead}  // ✅ Pass the callback
              />
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold">NAN Admin</div>
            <div className="text-[10px] text-primary uppercase font-bold tracking-widest">Super Admin</div>
          </div>
          <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-bold">
            AD
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsCards({ leads }: { leads: any[] }) {
  const total = leads.length;
  
  // ✅ Safe date calculation
  const today = leads.filter(l => {
    if (!l.created_at) return false;
    try {
      const leadDate = new Date(l.created_at);
      if (isNaN(leadDate.getTime())) return false;
      return leadDate.toDateString() === new Date().toDateString();
    } catch {
      return false;
    }
  }).length;
  
  const isNew = leads.filter(l => l.isNew === true).length;  // ✅ Explicit boolean check

  const stats = [
    { label: 'Total Leads', value: total, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Today Leads', value: today, icon: Calendar, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Pending Actions', value: isNew, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Avg. Budget', value: '₹12k', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", stat.bg, stat.color)}>
            <stat.icon size={28} />
          </div>
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
          <div className="text-4xl font-bold tracking-tight text-gray-900">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}