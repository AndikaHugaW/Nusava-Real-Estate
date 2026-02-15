'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function EditPropertyPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    price: '',
    type: 'HOUSE',
    status: 'PUBLISHED',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    features: '',
    roiEstimation: '',
    rentalYield: '',
    areaGrowth: '',
    images: [] as File[],
    existingImages: [] as any[]
  });

  useEffect(() => {
    fetchProperty();
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/properties/${propertyId}`);
      if (!res.ok) throw new Error('Property not found');
      
      const data = await res.json();
      
      // Removed individual agent ownership check to allow all dashboard users (Admin/Agent) to edit any property

      setFormData({
        title: data.title || '',
        description: data.description || '',
        price: data.price?.toString() || '',
        type: data.type || 'HOUSE',
        status: data.status || 'PUBLISHED',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        zipCode: data.zipCode || '',
        bedrooms: data.bedrooms?.toString() || '',
        bathrooms: data.bathrooms?.toString() || '',
        area: data.area?.toString() || '',
        features: Array.isArray(data.features) ? data.features.join(', ') : '',
        roiEstimation: data.roiEstimation?.toString() || '',
        rentalYield: data.rentalYield?.toString() || '',
        areaGrowth: data.areaGrowth?.toString() || '',
        images: [],
        existingImages: data.images || []
      });
    } catch (err) {
      console.error('Fetch failed', err);
      router.push('/dashboard/properties');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('nusava_token');
      const data = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (!['images', 'existingImages', 'features'].includes(key)) {
          data.append(key, formData[key]);
        }
      });

      const features = formData.features.split(',').map((f: string) => f.trim()).filter((f: string) => f !== '');
      data.append('features', JSON.stringify(features));
      
      if (formData.images.length > 0) {
        formData.images.forEach((file: File) => {
          data.append('images', file);
        });
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/properties/${propertyId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data,
      });

      if (res.ok) {
        router.push('/dashboard/properties');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to update property');
      }
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to connect to server');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-slate-400">Loading Property Data...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Edit <span className="text-blue-600">Listing</span></h2>
        <p className="text-slate-500 mt-2 font-medium">Update displacement information for your premium property.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-sm font-black">01</span>
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Property Title</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
              <textarea 
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium resize-none"
              />
            </div>
            <div className="md:col-span-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Price (IDR)</label>
              <input 
                required
                type="number" 
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
              />
            </div>
            <div className="md:col-span-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Property Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-600"
              >
                <option value="HOUSE">House</option>
                <option value="VILLA">Villa</option>
                <option value="APARTMENT">Apartment</option>
                <option value="LAND">Land</option>
                <option value="COMMERCIAL">Commercial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location & Details */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <span className="w-8 h-8 bg-purple-50 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-black">02</span>
            Location & Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Address</label>
              <input 
                required
                type="text" 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">City</label>
              <input required type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">State</label>
              <input required type="text" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl" />
            </div>
            <div className="grid grid-cols-3 gap-6 md:col-span-2">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Beds</label>
                <input required type="number" value={formData.bedrooms} onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-center" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Baths</label>
                <input required type="number" value={formData.bathrooms} onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-center" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Area (m²)</label>
                <input required type="number" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-center" />
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Layer */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <span className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-sm font-black">03</span>
            Investor Intelligence & Media
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">ROI Estimation (%)</label>
              <input type="number" step="0.1" value={formData.roiEstimation} onChange={(e) => setFormData({...formData, roiEstimation: e.target.value})} className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-blue-600" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Rental Yield (%)</label>
              <input type="number" step="0.1" value={formData.rentalYield} onChange={(e) => setFormData({...formData, rentalYield: e.target.value})} className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-emerald-600" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Area Growth (%)</label>
              <input type="number" step="0.1" value={formData.areaGrowth} onChange={(e) => setFormData({...formData, areaGrowth: e.target.value})} className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-orange-600" />
            </div>
            <div className="md:col-span-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Features (Comma Separated)</label>
              <input type="text" value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} placeholder="Private Pool, Security 24/7" className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl" />
            </div>
            
            <div className="md:col-span-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Property Media</label>
              <p className="text-[10px] text-slate-400 mb-2">*Uploading new images will replace existing ones</p>
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={(e) => setFormData({...formData, images: Array.from(e.target.files || [])})}
                className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl transition-all font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4">
            {formData.images.length > 0 ? (
              formData.images.map((file: File, i: number) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-slate-100">
                  <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="new preview" />
                </div>
              ))
            ) : (
              formData.existingImages.map((img: any, i: number) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-slate-100 opacity-80">
                  <img src={img.url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${img.url}` : img.url} className="w-full h-full object-cover" alt="existing" />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pb-20">
          <button type="button" onClick={() => router.back()} className="px-10 py-5 bg-white border border-slate-200 text-slate-500 rounded-[2rem] font-bold hover:bg-slate-50 transition-all">Cancel</button>
          <button type="submit" disabled={submitting} className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-bold shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all disabled:bg-slate-300">
            {submitting ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
