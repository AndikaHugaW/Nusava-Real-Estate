'use client';

import { useState } from 'react';

export default function InquiryForm({ propertyId, agentName }: { propertyId: string; agentName: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // In a real app, you'd send the auth token here.
          // For now, since auth is tricky in this demo, let's assume the user is logged in or we handle it in the backend.
        },
        body: JSON.stringify({
          propertyId,
          message: `Inquiry from ${formData.name} (${formData.email}): ${formData.message}`
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
      <h3 className="text-xl font-bold mb-6">Interested in this property?</h3>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
          {agentName[0]}
        </div>
        <div>
          <p className="font-bold">{agentName}</p>
          <p className="text-sm text-gray-500">Property Agent</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 mb-4 animate-in fade-in slide-in-from-bottom-2">
          Your inquiry has been sent successfully! Our agent will contact you soon.
          <button 
            onClick={() => setStatus('idle')}
            className="block mt-2 text-sm font-bold underline"
          >
            Send another inquiry
          </button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input 
            type="text" 
            required
            key="name"
            placeholder="Your Name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input 
            type="email" 
            required
            key="email"
            placeholder="Your Email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea 
            placeholder="Message" 
            key="message"
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          ></textarea>
          
          {status === 'error' && (
            <p className="text-red-500 text-sm">Failed to send inquiry. Please try again.</p>
          )}

          <button 
            type="submit"
            disabled={status === 'sending'}
            className={`w-full ${status === 'sending' ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98]`}
          >
            {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>
      )}
    </div>
  );
}
