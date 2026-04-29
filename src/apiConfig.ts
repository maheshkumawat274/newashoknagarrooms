/**
 * API Configuration
 * 
 * In this preview environment, we use relative paths handled by Vite/Express.
 * For local deployment with PHP, you can change API_BASE to your local PHP server URL.
 * Example: const API_BASE = 'http://localhost/ashok-nagar-rooms/backend';
 */

// If you are using PHP locally, set this to true and provide the URL
const USE_PHP_BACKEND = true; 
const PHP_API_BASE = 'http://localhost:8000';

export const API_URLS = {
  GET_LEADS: USE_PHP_BACKEND ? `${PHP_API_BASE}/leads.php` : '/api/getLeads',
  ADD_LEAD: USE_PHP_BACKEND ? `${PHP_API_BASE}/leads.php` : '/api/addLead',
  UPDATE_LEAD: (id: string) => USE_PHP_BACKEND ? `${PHP_API_BASE}/leads.php?id=${id}` : `/api/updateLead/${id}`,
  DELETE_LEAD: (id: string) => USE_PHP_BACKEND ? `${PHP_API_BASE}/leads.php?id=${id}` : `/api/deleteLead/${id}`,
  BULK_DELETE: USE_PHP_BACKEND ? `${PHP_API_BASE}/leads.php` : '/api/bulkDelete',
  
  GET_PROPERTIES: USE_PHP_BACKEND ? `${PHP_API_BASE}/properties.php` : '/api/getProperties',
  ADD_PROPERTY: USE_PHP_BACKEND ? `${PHP_API_BASE}/properties.php` : '/api/addProperty',
  UPDATE_PROPERTY: (id: string) => USE_PHP_BACKEND ? `${PHP_API_BASE}/properties.php?id=${id}` : `/api/updateProperty/${id}`,
  DELETE_PROPERTY: (id: string) => USE_PHP_BACKEND ? `${PHP_API_BASE}/properties.php?id=${id}` : `/api/deleteProperty/${id}`,
  
  LOGIN: USE_PHP_BACKEND ? `${PHP_API_BASE}/login.php` : '/api/login',
};
