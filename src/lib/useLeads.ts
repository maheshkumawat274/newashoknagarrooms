import { useState, useEffect } from 'react';
import { Lead } from '../types';
import { API_URLS } from '../apiConfig';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await fetch(API_URLS.GET_LEADS);
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const addLead = async (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch(API_URLS.ADD_LEAD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      if (res.ok) await fetchLeads();
    } catch (error) {
      console.error('Failed to add lead:', error);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const res = await fetch(API_URLS.DELETE_LEAD(id), {
        method: 'DELETE',
      });
      if (res.ok) await fetchLeads();
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  };

  const bulkDeleteLeads = async (ids: string[]) => {
    try {
      const res = await fetch(API_URLS.BULK_DELETE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, action: 'bulk_delete' }), // Added action for PHP support
      });
      if (res.ok) await fetchLeads();
    } catch (error) {
      console.error('Failed to bulk delete leads:', error);
    }
  };

  return { leads, loading, addLead, deleteLead, bulkDeleteLeads, refresh: fetchLeads };
}
