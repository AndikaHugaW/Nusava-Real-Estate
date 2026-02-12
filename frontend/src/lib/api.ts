const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getAgentDashboard(token: string) {
  const res = await fetch(`${API_URL}/dashboard/agent`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch agent dashboard');
  return res.json();
}
