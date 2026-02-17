import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance for client-side calls
export const api = axios.create({
  baseURL: API_URL,
});

// Add interceptor to include token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('nusava_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export async function getProperties(params?: any) {
  const cleanParams: any = {};
  if (params) {
    Object.keys(params).forEach(key => {
      const val = params[key];
      if (val !== undefined && val !== null && val !== '' && val !== 'All') {
        cleanParams[key] = val;
      }
    });
  }
  const query = new URLSearchParams(cleanParams).toString();
  const url = `${API_URL}/properties${query ? `?${query}` : ''}`;
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.error(`getProperties failed: ${res.status} ${res.statusText}`);
      return { properties: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } };
    }
    return res.json();
  } catch (error: any) {
    clearTimeout(timeout);
    console.error('getProperties fetch error:', error?.message || error);
    return { properties: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } };
  }
}

export async function getProperty(identifier: string) {
  const res = await fetch(`${API_URL}/properties/${identifier}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch property');
  return res.json();
}

export async function createBooking(data: any, token: string) {
  const res = await api.post('/bookings', data);
  return res.data;
}

export async function getAgentDashboard(token: string) {
  const res = await api.get('/dashboard/agent');
  return res.data;
}

export async function getAdminDashboard(token: string) {
  const res = await api.get('/dashboard/admin');
  return res.data;
}
export async function getAgents() {
  const res = await fetch(`${API_URL}/users/agents`, {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getFavorites() {
  const res = await api.get('/users/favorites');
  return res.data;
}

export async function addToFavorites(propertyId: string) {
  const res = await api.post(`/users/favorites/${propertyId}`);
  return res.data;
}

export async function removeFromFavorites(propertyId: string) {
  const res = await api.delete(`/users/favorites/${propertyId}`);
  return res.data;
}

export async function getUsers() {
  const res = await api.get('/users');
  return res.data;
}

export async function updateUserRole(id: string, role: string) {
  const res = await api.patch(`/users/${id}/role`, { role });
  return res.data;
}
export async function updateProfile(data: { name: string; phone?: string }) {
  const res = await api.put('/users/profile', data);
  return res.data;
}

export async function updateAvatar(formData: FormData) {
  const res = await api.post('/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

export async function changePassword(data: any) {
  const res = await api.put('/users/password', data);
  return res.data;
}
