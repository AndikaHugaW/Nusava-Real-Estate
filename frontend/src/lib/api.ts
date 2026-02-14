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
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        cleanParams[key] = params[key];
      }
    });
  }
  const query = new URLSearchParams(cleanParams).toString();
  const res = await fetch(`${API_URL}/properties?${query}`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!res.ok) throw new Error('Failed to fetch properties');
  return res.json();
}

export async function getProperty(identifier: string) {
  const res = await fetch(`${API_URL}/properties/${identifier}`, {
    next: { revalidate: 3600 }
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
export async function getAgents() {
  const res = await fetch(`${API_URL}/users/agents`, {
    next: { revalidate: 3600 }
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
