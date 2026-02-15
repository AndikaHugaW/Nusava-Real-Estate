'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function CreatePropertyPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    images: [] as File[]
  });
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);
    
    if (validFiles.length < files.length) {
      alert('Some files were skipped because they exceed the 5MB size limit.');
    }

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
    setFormData((prev: any) => ({...prev, images: [...prev.images, ...validFiles]}));
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previews[index]);
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    
    setPreviews(newPreviews);
    setFormData((prev: any) => ({...prev, images: newImages}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('nusava_token');
      const data = new FormData();
      
      // Append all text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'images' && key !== 'features') {
          data.append(key, formData[key]);
        }
      });

      // Append features as JSON string
      const features = formData.features.split(',').map((f: string) => f.trim()).filter((f: string) => f !== '');
      data.append('features', JSON.stringify(features));
      
      // Append images
      if (formData.images) {
        formData.images.forEach((file: File) => {
          data.append('images', file);
        });
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/properties`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data,
      });

      if (res.ok) {
        // Cleanup all previews before redirecting
        previews.forEach(url => URL.revokeObjectURL(url));
        router.push('/dashboard/properties');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to create property');
      }
    } catch (err) {
      console.error('Submit failed', err);
      alert('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Create <span className="text-blue-600">Listing</span></h2>
        <p className="text-slate-500 mt-2 font-medium">Add a new premium property to the Nusava marketplace.</p>
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
                placeholder="e.g. Modern Villa with Rice Field View"
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
                placeholder="Describe the property details..."
                className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Price (IDR)</label>
              <input 
                required
                type="number" 
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
              />
            </div>
            <div>
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
              <input 
                required
                type="text" 
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">State/Province</label>
              <input 
                required
                type="text" 
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
              />
            </div>
            <div className="grid grid-cols-3 gap-6 md:col-span-2">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Beds</label>
                <input 
                  required
                  type="number" 
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                  className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-center"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Baths</label>
                <input 
                  required
                  type="number" 
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                  className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-center"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Area (m²)</label>
                <input 
                  required
                  type="number" 
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-center"
                />
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
              <input 
                type="number" 
                step="0.1"
                value={formData.roiEstimation}
                onChange={(e) => setFormData({...formData, roiEstimation: e.target.value})}
                className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-black text-blue-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Rental Yield (%)</label>
              <input 
                type="number" 
                step="0.1"
                value={formData.rentalYield}
                onChange={(e) => setFormData({...formData, rentalYield: e.target.value})}
                className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-black text-emerald-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Area Growth (%)</label>
              <input 
                type="number" 
                step="0.1"
                value={formData.areaGrowth}
                onChange={(e) => setFormData({...formData, areaGrowth: e.target.value})}
                className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-black text-orange-600"
              />
            </div>
            <div className="md:col-span-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Features (Comma Separated)</label>
              <input 
                type="text" 
                value={formData.features}
                onChange={(e) => setFormData({...formData, features: e.target.value})}
                placeholder="Private Pool, Security 24/7, Fully Furnished"
                className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
              />
            </div>
            <div className="md:col-span-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Property Images</label>
              <div className="mt-2 flex flex-col gap-4">
                <input 
                  type="file" 
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                
                {previews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
                    {previews.map((url: string, i: number) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-100 shadow-sm group">
                        <img 
                          src={url} 
                          className="w-full h-full object-cover" 
                          alt="preview" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <button 
                             type="button"
                             onClick={() => removeImage(i)}
                             className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                           >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                           </button>
                        </div>
                        {i === 0 && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 bg-blue-600 text-[8px] font-black text-white uppercase rounded-md shadow-lg">Primary</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pb-20">
          <button 
            type="button"
            onClick={() => router.back()}
            className="px-10 py-5 bg-white border border-slate-200 text-slate-500 rounded-[2rem] font-bold hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-bold shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all disabled:bg-slate-300"
          >
            {loading ? 'Creating Listing...' : 'Publish Property Now'}
          </button>
        </div>
      </form>
    </div>
  );
}
