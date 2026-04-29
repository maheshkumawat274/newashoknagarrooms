import { motion } from 'motion/react';
import AdminHeader, { StatsCards } from '../components/admin/AdminHeader';
import LeadsTable from '../components/admin/LeadsTable';
import PropertiesManager from '../components/admin/PropertiesManager';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import AdminLogin from './AdminLogin';
import { useState, useEffect } from 'react';
import { LogOut, Users, Home, Calendar, TrendingUp, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { API_URLS } from '@/src/apiConfig';
import { subDays, isValid } from 'date-fns';

const chartData = [
  { day: 'Mon', leads: 4 },
  { day: 'Tue', leads: 7 },
  { day: 'Wed', leads: 12 },
  { day: 'Thu', leads: 9 },
  { day: 'Fri', leads: 15 },
  { day: 'Sat', leads: 22 },
  { day: 'Sun', leads: 30 },
];

// ✅ Custom hook for PHP backend
function useLeadsPHP() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URLS.GET_LEADS);
      const data = await response.json();
      const leadsData = Array.isArray(data) ? data : data.leads || [];
      
      const formattedLeads = leadsData.map((lead: any) => ({
        ...lead,
        isNew: lead.isNew === true || lead.is_new === 1 || lead.is_new === true,
      }));
      
      setLeads(formattedLeads);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = async (id: string) => {
    try {
      await fetch(API_URLS.DELETE_LEAD(id), { method: 'DELETE' });
      await fetchLeads();
      return true;
    } catch (error) {
      console.error('Error deleting lead:', error);
      return false;
    }
  };

  const bulkDeleteLeads = async (ids: string[]) => {
    try {
      await fetch(API_URLS.BULK_DELETE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'bulk_delete', ids }),
      });
      await fetchLeads();
      return true;
    } catch (error) {
      console.error('Error bulk deleting leads:', error);
      return false;
    }
  };

  // ✅ Mark as Read function
  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(API_URLS.UPDATE_LEAD(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_new: false }),
      });
      
      const data = await response.json();
      console.log('Mark as read response:', data);
      
      if (data.status === 'success') {
        await fetchLeads(); // Refresh leads
      }
    } catch (error) {
      console.error('Error marking lead as read:', error);
    }
  };

  return { leads, loading, deleteLead, bulkDeleteLeads, markAsRead, fetchLeads };
}

// ✅ Lead Stats Cards with working pending count
function LeadStatsCards({ leads }: { leads: any[] }) {
  const parseDateSafe = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return isValid(date) ? date : null;
    } catch {
      return null;
    }
  };

  const todayLeads = leads.filter(lead => {
    const date = parseDateSafe(lead.created_at);
    if (!date) return false;
    return date.toDateString() === new Date().toDateString();
  }).length;

  const weeklyLeads = leads.filter(lead => {
    const date = parseDateSafe(lead.created_at);
    if (!date) return false;
    return date >= subDays(new Date(), 7);
  }).length;

  const monthlyLeads = leads.filter(lead => {
    const date = parseDateSafe(lead.created_at);
    if (!date) return false;
    return date >= subDays(new Date(), 30);
  }).length;

  // ✅ Pending count = leads with isNew = true
  const pendingLeads = leads.filter(lead => lead.isNew === true).length;

  const stats = [
    { label: "Today's Leads", value: todayLeads, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'This Week', value: weeklyLeads, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'This Month', value: monthlyLeads, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Pending Actions', value: pendingLeads, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all">
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

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'properties'>('leads');
  const { leads, loading, deleteLead, bulkDeleteLeads, markAsRead, fetchLeads } = useLeadsPHP();

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={setIsAuthenticated} />;
  }

  if (loading && leads.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const newLeadCount = leads.filter(l => l.isNew === true).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-secondary min-h-screen py-12 relative"
    >
      <button 
        onClick={handleLogout}
        className="fixed bottom-8 left-8 p-4 bg-white border border-gray-200 text-gray-500 rounded-2xl hover:text-red-600 transition-all shadow-lg z-50 flex items-center gap-2 font-bold text-sm"
      >
        <LogOut size={20} />
        Logout
      </button>

      <div className="container mx-auto px-4">
        <AdminHeader 
          leadCount={newLeadCount}
          leads={leads}
          onNotificationClick={() => setActiveTab('leads')}
          onMarkAsRead={markAsRead}
        />
        
        {/* Tab Switcher */}
        <div className="flex gap-4 mb-10 bg-white/50 p-2 rounded-3xl w-fit border border-gray-100 mx-auto lg:mx-0">
          <button
            onClick={() => setActiveTab('leads')}
            className={cn(
              "px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all",
              activeTab === 'leads' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-gray-500 hover:bg-white"
            )}
          >
            <Users size={20} />
            Leads
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={cn(
              "px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all",
              activeTab === 'properties' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-gray-500 hover:bg-white"
            )}
          >
            <Home size={20} />
            Properties
          </button>
        </div>

        {activeTab === 'leads' ? (
          <>
            {/* ✅ Stats Cards with working pending count */}
            <LeadStatsCards leads={leads} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <LeadsTable 
                  leads={leads} 
                  onDelete={deleteLead} 
                  onBulkDelete={bulkDeleteLeads}
                  onMarkAsRead={markAsRead}  // ✅ Pass mark as read handler
                />
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm h-full">
                  <h3 className="text-xl font-bold mb-8">Lead Performance</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#24368D" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#24368D" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                        <YAxis hide />
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Area type="monotone" dataKey="leads" stroke="#24368D" strokeWidth={4} fillOpacity={1} fill="url(#colorLeads)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <PropertiesManager />
        )}
      </div>
    </motion.div>
  );
}