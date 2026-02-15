'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { getUsers, updateUserRole } from '@/lib/api';

export default function UsersManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser?.role === 'ADMIN') {
      fetchUsers();
    }
  }, [currentUser]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
    
    setUpdating(userId);
    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      console.error('Failed to update role', err);
      alert('Failed to update user role');
    } finally {
      setUpdating(null);
    }
  };

  if (currentUser?.role !== 'ADMIN') {
    return (
      <div className="bg-white p-20 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl">🔒</div>
        <h3 className="text-2xl font-black text-slate-900">Access Restricted</h3>
        <p className="text-slate-500 mt-2">Only administrators can access user management.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">User <span className="text-blue-600">Management</span></h2>
        <p className="text-slate-500 mt-2 font-medium">Monitor all platform users and manage their access levels.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-50 bg-slate-50/50">
                <th className="p-8 text-xs font-bold text-slate-400 uppercase tracking-widest">User Details</th>
                <th className="p-8 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
                <th className="p-8 text-xs font-bold text-slate-400 uppercase tracking-widest">Stats</th>
                <th className="p-8 text-xs font-bold text-slate-400 uppercase tracking-widest">Joined Date</th>
                <th className="p-8 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i}>
                    <td colSpan={5} className="p-8"><div className="h-6 bg-slate-100 animate-pulse rounded-lg w-full" /></td>
                  </tr>
                ))
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-lg">
                          {u.name?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{u.name}</p>
                          <p className="text-sm text-slate-400 font-medium">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-8">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        u.role === 'ADMIN' ? 'bg-indigo-600 text-white' :
                        u.role === 'AGENT' ? 'bg-blue-600 text-white' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-8">
                      <p className="text-sm font-bold text-slate-700">{u._count?.properties || 0} <span className="text-slate-400 font-medium">Listings</span></p>
                    </td>
                    <td className="p-8">
                      <p className="text-sm font-medium text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="p-8 text-right">
                      {u.id !== currentUser.id ? (
                        <div className="flex justify-end gap-2">
                          <select 
                            disabled={updating === u.id}
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            <option value="USER">USER</option>
                            <option value="AGENT">AGENT</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest italic">You</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
