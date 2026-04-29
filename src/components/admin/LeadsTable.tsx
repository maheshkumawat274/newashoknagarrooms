import { useState, useMemo } from 'react';
import { Search, Trash2, Download, MessageSquare, ChevronLeft, ChevronRight, CheckCircle, Clock, Eye } from 'lucide-react';
import { Lead } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { format, isValid } from 'date-fns';

interface LeadsTableProps {
  leads: Lead[];
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  onMarkAsRead?: (id: string) => Promise<void>;  // ✅ Mark as read handler
}

export default function LeadsTable({ leads, onDelete, onBulkDelete, onMarkAsRead }: LeadsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingLead, setUpdatingLead] = useState<string | null>(null);
  const itemsPerPage = 10;

  // Safe date formatting function
  const formatDateSafe = (dateString: string | undefined | null) => {
    if (!dateString) return { date: 'Invalid date', time: 'Invalid time' };
    
    try {
      const date = new Date(dateString);
      if (!isValid(date)) {
        return { date: 'Invalid date', time: 'Invalid time' };
      }
      return {
        date: format(date, 'MMM dd, yyyy'),
        time: format(date, 'hh:mm aa')
      };
    } catch (error) {
      return { date: 'Invalid date', time: 'Invalid time' };
    }
  };

  // Filter logic
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           lead.phone.includes(searchTerm);
      const matchesType = filterType === 'All' || lead.propertyType === filterType;
      const matchesStatus = filterStatus === 'All' || 
                           (filterStatus === 'new' && lead.isNew === true) ||
                           (filterStatus === 'processed' && lead.isNew === false);
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [leads, searchTerm, filterType, filterStatus]);

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLeads.slice(start, start + itemsPerPage);
  }, [filteredLeads, currentPage]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.length === paginatedLeads.length ? [] : paginatedLeads.map(l => l.id!));
  };

  const handleWhatsAppLead = (lead: Lead) => {
    let phoneNumber = lead.phone;
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = phoneNumber.startsWith('91') ? `+${phoneNumber}` : `+91${phoneNumber}`;
    }
    const message = `Hi ${lead.name}, I am contacting you regarding your inquiry for a ${lead.propertyType} in New Ashok Nagar.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // ✅ Handle Mark as Read
  const handleMarkAsRead = async (lead: Lead) => {
    if (!onMarkAsRead) return;
    
    setUpdatingLead(lead.id!);
    try {
      await onMarkAsRead(lead.id!);
    } catch (error) {
      console.error('Error marking as read:', error);
    } finally {
      setUpdatingLead(null);
    }
  };

  const handleExport = () => {
    const headers = ['Name', 'Phone', 'Property Type', 'Budget', 'Status', 'Date'];
    const csvData = filteredLeads.map(lead => {
      let dateStr = 'Invalid date';
      if (lead.created_at) {
        try {
          const date = new Date(lead.created_at);
          if (isValid(date)) {
            dateStr = format(date, 'dd/MM/yyyy');
          }
        } catch (e) {
          dateStr = 'Invalid date';
        }
      }
      return [
        lead.name,
        lead.phone,
        lead.propertyType,
        lead.budget,
        lead.isNew ? 'New Lead' : 'Processed',
        dateStr
      ];
    });
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Table Actions */}
      <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          <div className="relative flex-grow min-w-[200px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl w-full md:w-64 outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <select 
            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Types</option>
            {['1RK', '1BHK', '2BHK', '3BHK', 'PG', 'Room'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select 
            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Status</option>
            <option value="new">New Leads</option>
            <option value="processed">Processed</option>
          </select>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {selectedIds.length > 0 && (
            <button 
              onClick={() => { 
                onBulkDelete(selectedIds); 
                setSelectedIds([]);
              }}
              className="px-4 py-3 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-100 transition-colors"
            >
              <Trash2 size={18} />
              Delete ({selectedIds.length})
            </button>
          )}
          <button 
            onClick={handleExport}
            className="px-4 py-3 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {paginatedLeads.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 text-lg mb-2">No leads found</div>
          <p className="text-gray-400 text-sm">Try adjusting your search or filter</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4 w-12">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      checked={selectedIds.length === paginatedLeads.length && paginatedLeads.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4">Name & Contact</th>
                  <th className="px-6 py-4">Property Preferences</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Submission Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedLeads.map(lead => {
                  const { date, time } = formatDateSafe(lead.created_at);
                  const isUpdating = updatingLead === lead.id;
                  
                  return (
                    <tr key={lead.id} className={cn(
                      "hover:bg-gray-50/80 transition-colors group",
                      lead.isNew && "bg-blue-50/30"
                    )}>
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          checked={selectedIds.includes(lead.id!)}
                          onChange={() => toggleSelect(lead.id!)}
                          disabled={isUpdating}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                            {lead.propertyType}
                          </span>
                          <span className="text-sm font-medium text-gray-600">{lead.budget}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {lead.isNew ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            New Lead
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            <CheckCircle size={10} />
                            Processed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium">{date}</div>
                        <div className="text-[11px] text-gray-400 uppercase">{time}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* ✅ Mark as Read Button - Only for new leads */}
                          {lead.isNew && (
                            <button 
                              onClick={() => handleMarkAsRead(lead)}
                              disabled={isUpdating}
                              className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-100"
                              title="Mark as Read"
                            >
                              {isUpdating ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          )}
                          
                          <button 
                            onClick={() => handleWhatsAppLead(lead)}
                            className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-100"
                            title="Send WhatsApp Message"
                          >
                            <MessageSquare size={18} />
                          </button>
                          
                          <button 
                            onClick={() => onDelete(lead.id!)}
                            className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-6 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between flex-wrap gap-4">
            <div className="text-sm text-gray-500 font-medium">
              Showing <span className="text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="text-gray-900">
                {Math.min(currentPage * itemsPerPage, filteredLeads.length)}
              </span>{' '}
              of <span className="text-gray-900">{filteredLeads.length}</span> results
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="px-4 py-2 text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}