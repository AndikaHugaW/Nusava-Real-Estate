'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getAgentDashboard, getAdminDashboard } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", Revenue: 75, Visit: 70 },
  { month: "February", Revenue: 45, Visit: 55 },
  { month: "March", Revenue: 70, Visit: 50 },
  { month: "April", Revenue: 60, Visit: 70 },
  { month: "May", Revenue: 85, Visit: 80 },
  { month: "June", Revenue: 72, Visit: 52 },
  { month: "July", Revenue: 60, Visit: 65 },
  { month: "August", Revenue: 82, Visit: 78 },
]

const chartConfig = {
  Revenue: {
    label: "Revenue",
    color: "#F97316",
  },
  Visit: {
    label: "Visit",
    color: "#FACC15",
  },
} satisfies ChartConfig

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && (user.role === 'AGENT' || user.role === 'ADMIN')) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('nusava_token');
      if (!token) return;
      
      let dashboardData;
      if (user?.role === 'ADMIN') {
        try {
          dashboardData = await getAdminDashboard(token);
        } catch (adminError: any) {
          // If 403 (role mismatch in token), fallback to agent dashboard
          console.warn('Admin dashboard access denied, falling back to agent dashboard');
          dashboardData = await getAgentDashboard(token);
        }
      } else {
        dashboardData = await getAgentDashboard(token);
      }
      
      setData(dashboardData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const stats = user?.role === 'ADMIN' ? [
    { 
      label: 'Active Leads', 
      value: data?.stats?.totalInquiries || 0, 
      trend: '+ 12%', 
      isUp: true,
      icon: '👤', 
      href: '/dashboard/inquiries'
    },
    { 
      label: 'Total Revenue', 
      value: `Rp ${(data?.stats?.totalRevenue || 0).toLocaleString('id-ID')}`, 
      trend: '+ 8%', 
      isUp: true,
      icon: '🪙', 
      href: '/dashboard/transactions'
    },
    { 
      label: 'Active Listing', 
      value: data?.stats?.totalProperties || 0, 
      trend: '+ 5%', 
      isUp: true,
      icon: '🏠', 
      href: '/dashboard/properties'
    },
    { 
      label: 'Total Closed', 
      value: data?.stats?.totalBookings || 0, 
      trend: '+ 15%', 
      isUp: true,
      icon: '🤝', 
      href: '/dashboard/transactions'
    },
  ] : [
    { 
      label: 'Total Views', 
      value: data?.stats?.totalViews || 0, 
      trend: '+ 24%', 
      isUp: true,
      icon: '👁️', 
      href: '/dashboard/properties'
    },
    { 
      label: 'My Listings', 
      value: data?.stats?.totalProperties || 0, 
      trend: '+ 2%', 
      isUp: true,
      icon: '🏠', 
      href: '/dashboard/properties'
    },
    { 
      label: 'Active Leads', 
      value: data?.stats?.totalInquiries || 0, 
      trend: '+ 18%', 
      isUp: true,
      icon: '👤', 
      href: '/dashboard/inquiries'
    },
    { 
      label: 'In Progress', 
      value: data?.stats?.totalBookings || 0, 
      trend: '+ 10%', 
      isUp: true,
      icon: '🤝', 
      href: '/dashboard/inquiries'
    },
  ];

  const spotlightProperty = data?.recentProperties?.[0];

  const getImageUrl = (url: string) => {
    if (!url) return '/placeholder-property.jpg';
    if (url.startsWith('http')) return url;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Row 1: Stats & Reminder Together */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stats Grid & Performance (Left 8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat: any, i) => (
              <Link key={i} href={stat.href}>
                <motion.div 
                  variants={item}
                  className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col gap-3 group h-full"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50/50 group-hover:bg-blue-50 rounded-full flex items-center justify-center text-lg transition-colors">
                      {stat.icon}
                    </div>
                    <p className="text-sm font-medium text-slate-800">{stat.label}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <h4 className="text-2xl font-black text-slate-900 leading-none truncate max-w-[120px]">{stat.value}</h4>
                    <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold ${
                      stat.isUp 
                        ? 'bg-emerald-50/50 text-emerald-500' 
                        : 'bg-rose-50/50 text-rose-500'
                    }`}>
                      {stat.trend} {stat.isUp ? '↗' : '↘'}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Performance, Somerset & Deals Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
            {/* Performance Chart Component */}
            <div className="flex flex-col">
              <Card 
                className="flex-1 rounded-[2.5rem] border-slate-100/50 shadow-sm overflow-hidden flex flex-col hover:border-blue-100 transition-all cursor-pointer group"
                onClick={() => router.push('/dashboard/analytics')}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                        Performance
                        <span className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all scale-75">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14m-7-7l7 7-7 7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      </CardTitle>
                      <div className="flex items-center gap-5 mt-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Revenue</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Visit</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 group/btn cursor-pointer hover:bg-slate-100 transition-colors">
                      <span className="text-[11px] font-black text-slate-600">Monthly</span>
                      <svg className="w-3.5 h-3.5 text-slate-400 group-hover/btn:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 min-h-[280px] mt-2">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <LineChart
                      accessibilityLayer
                      data={chartData}
                      margin={{
                        left: 12,
                        right: 12,
                        top: 12,
                        bottom: 12
                      }}
                    >
                      <CartesianGrid vertical={false} strokeDasharray="6 6" stroke="#F1F5F9" />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                        className="text-[10px] font-black fill-slate-300 uppercase tracking-widest"
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        className="text-[10px] font-black fill-slate-300"
                        ticks={[0, 25, 50, 75, 100]}
                        tickFormatter={(value: number) => `${value}%`}
                        domain={[0, 100]}
                      />
                      <ChartTooltip 
                        cursor={{ stroke: '#F97316', strokeWidth: 1.5, strokeDasharray: '6 6' }} 
                        content={<ChartTooltipContent />} 
                        offset={20}
                      />
                      <Line
                        dataKey="Revenue"
                        type="monotone"
                        stroke="#F97316"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 5, fill: "#F97316", stroke: "#FFF", strokeWidth: 2, className: "drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]" }}
                      />
                      <Line
                        dataKey="Visit"
                        type="monotone"
                        stroke="#FACC15"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 5, fill: "#FACC15", stroke: "#FFF", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Somerset & Deals Stack (Right) */}
            <div className="flex flex-col gap-6">
              <motion.div 
                variants={item} 
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative group overflow-hidden cursor-pointer hover:shadow-xl hover:border-blue-100 transition-all flex-1"
                onClick={() => spotlightProperty && router.push(`/dashboard/properties/edit/${spotlightProperty.id}`)}
              >
                <div className="flex flex-col lg:flex-row gap-5 items-stretch h-full">
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight line-clamp-1">{spotlightProperty?.title || 'No Spotlight'}</h3>
                      <p className="text-sm font-medium text-slate-400 mt-0.5">{spotlightProperty?.type || 'N/A'}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {[
                        { label: 'Units', val: spotlightProperty?.area || '0' },
                        { label: 'Leads', val: spotlightProperty?._count?.inquiries || '0' },
                        { label: 'Views', val: spotlightProperty?._count?.views || '0' },
                      ].map((s, idx) => (
                        <div key={idx} className="bg-slate-50/50 p-3 rounded-[1.25rem] flex flex-col items-center justify-center">
                          <p className="text-base font-bold text-slate-900 leading-none">{s.val}</p>
                          <p className="text-[10px] font-medium text-slate-400 mt-1.5">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative w-full lg:w-[42%] aspect-[4/3] rounded-[1.75rem] overflow-hidden shadow-sm">
                    <img 
                      src={getImageUrl(spotlightProperty?.images?.[0]?.url)} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    
                    {/* Arrow Button Overlay */}
                    <div className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md group-hover:bg-slate-900 group-hover:text-white transition-all">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 17L17 7M17 7H8M17 7V16" />
                      </svg>
                    </div>

                    {/* Recommendation Badge Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 bg-black/30 backdrop-blur-md px-1.5 py-1 rounded-full flex items-center gap-2 border border-white/20">
                      <div className="w-6 h-6 rounded-full bg-orange-500/90 flex items-center justify-center shadow-lg">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <p className="text-[10px] font-bold text-white tracking-tight">Active Spotlight</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                variants={item} 
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer group"
                onClick={() => router.push('/dashboard/transactions')}
              >
                <div className="flex justify-between items-center mb-5 px-1">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">Deals</h3>
                  <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <div className="relative">
                  {/* Progress Bar Container */}
                  <div className="relative h-12 w-full rounded-[1rem] overflow-hidden flex">
                    {/* Left Side (Orange Gradient) */}
                    <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 w-[35%] relative">
                      <div className="absolute inset-0 bg-white/10 blur-[1px] transform -skew-x-12 translate-x-1/2"></div>
                    </div>
                    {/* Right Side (Striped Gray) */}
                    <div 
                      className="h-full flex-1 bg-slate-50 relative"
                      style={{
                        backgroundImage: `repeating-linear-gradient(135deg, transparent, transparent 12px, #f1f5f9 12px, #f1f5f9 13px)`,
                        backgroundSize: '24px 100%'
                      }}
                    ></div>

                    {/* Separator Line with Triangles */}
                    <div className="absolute top-0 bottom-0 left-[35%] -translate-x-1/2 flex flex-col items-center justify-between py-0 z-10 h-full">
                      <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-orange-500"></div>
                      <div className="flex-1 border-l border-dashed border-orange-500/40"></div>
                      <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-orange-500"></div>
                    </div>
                  </div>

                  {/* Labels Below Bar */}
                  <div className="flex justify-between items-start mt-4 px-1">
                    <div>
                      <p className="text-xl font-bold text-slate-900 leading-none">{data?.stats?.totalBookings || 0}</p>
                      <p className="text-[11px] font-medium text-slate-400 mt-1.5">Closed Deals</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-slate-900 leading-none">{data?.stats?.totalInquiries || 0}</p>
                      <p className="text-[11px] font-medium text-slate-400 mt-1.5">Active Leads</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Property Distribution & Recent Activity & Top Locations (Inside Left Column) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Property Distribution */}
            <motion.div variants={item} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Property Distribution</h3>
                <div className="w-7 h-7 bg-slate-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-900 hover:text-white transition-all">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 5v14m-7-7h14" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              <div className="space-y-3.5 flex-1">
                {[
                  { type: 'Residential', percent: 42, color: 'bg-orange-500', count: data?.stats?.totalProperties ? Math.round((data.stats.totalProperties) * 0.42) : 5 },
                  { type: 'Commercial', percent: 28, color: 'bg-blue-500', count: data?.stats?.totalProperties ? Math.round((data.stats.totalProperties) * 0.28) : 3 },
                  { type: 'Townhouse', percent: 18, color: 'bg-emerald-500', count: data?.stats?.totalProperties ? Math.round((data.stats.totalProperties) * 0.18) : 2 },
                  { type: 'Studio', percent: 12, color: 'bg-violet-500', count: data?.stats?.totalProperties ? Math.round((data.stats.totalProperties) * 0.12) : 1 },
                ].map((stat, i) => (
                  <div key={i} className="group/dist cursor-pointer">
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
                        <span className="text-[11px] font-bold text-slate-700 group-hover/dist:text-slate-900 transition-colors">{stat.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-slate-400">{stat.count} units</span>
                        <span className="text-[11px] font-black text-slate-900">{stat.percent}%</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${stat.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.percent}%` }}
                        transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Properties</p>
                <p className="text-base font-black text-slate-900">{data?.stats?.totalProperties || 0}</p>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={item} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Recent Activity</h3>
                <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[9px] font-bold text-emerald-600">Live</span>
                </div>
              </div>
              <div className="space-y-0.5 flex-1">
                {[
                  { action: 'New inquiry received', detail: 'Michael Chen — Modern Retail Space', time: '2m ago', icon: '💬', accent: 'bg-blue-50' },
                  { action: 'Listing price updated', detail: 'Zen Studio Apartment adjusted', time: '15m ago', icon: '✏️', accent: 'bg-amber-50' },
                  { action: 'Deal closed', detail: 'Elite Townhouse — Rp 7.5B', time: '1h ago', icon: '🎉', accent: 'bg-emerald-50' },
                  { action: 'New lead assigned', detail: 'Sarah Wilson → Premium Duplex', time: '2h ago', icon: '👤', accent: 'bg-violet-50' },
                  { action: 'Site visit scheduled', detail: 'Premium Villa Seminyak', time: '3h ago', icon: '📍', accent: 'bg-rose-50' },
                ].map((activity, i) => (
                  <div key={i} className="flex gap-2.5 p-1.5 rounded-xl hover:bg-slate-50/80 transition-all cursor-pointer group/act">
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full ${activity.accent} flex items-center justify-center text-xs flex-shrink-0`}>
                        {activity.icon}
                      </div>
                      {i < 4 && <div className="w-px h-full bg-slate-100 mt-0.5"></div>}
                    </div>
                    <div className="flex-1 min-w-0 pb-1.5">
                      <p className="text-[11px] font-bold text-slate-900 group-hover/act:text-blue-600 transition-colors">{activity.action}</p>
                      <p className="text-[9px] font-medium text-slate-400 mt-0.5 truncate">{activity.detail}</p>
                      <p className="text-[8px] font-bold text-slate-300 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Locations */}
            <motion.div variants={item} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Top Locations</h3>
                <Link href="/dashboard/properties" className="w-7 h-7 bg-slate-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-900 hover:text-white transition-all">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                </Link>
              </div>
              <div className="space-y-2 flex-1">
                {[
                  { city: 'Jakarta Selatan', area: 'DKI Jakarta', listings: 12, revenue: 'Rp 45.2B', rank: 1, trend: '+18%' },
                  { city: 'Bali, Seminyak', area: 'Bali', listings: 8, revenue: 'Rp 32.8B', rank: 2, trend: '+24%' },
                  { city: 'Bandung', area: 'Jawa Barat', listings: 6, revenue: 'Rp 18.5B', rank: 3, trend: '+12%' },
                  { city: 'Surabaya', area: 'Jawa Timur', listings: 4, revenue: 'Rp 12.1B', rank: 4, trend: '+8%' },
                ].map((loc, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50/80 transition-all cursor-pointer group/loc border border-transparent hover:border-slate-100">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0 ${
                      i === 0 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-md shadow-orange-200/50' :
                      i === 1 ? 'bg-gradient-to-br from-slate-600 to-slate-700 text-white shadow-md shadow-slate-200/50' :
                      i === 2 ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md shadow-amber-200/50' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {loc.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-900 group-hover/loc:text-blue-600 transition-colors truncate">{loc.city}</p>
                      <p className="text-[9px] font-medium text-slate-400 mt-0.5">{loc.area} · {loc.listings}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] font-bold text-slate-900">{loc.revenue}</p>
                      <p className="text-[8px] font-bold text-emerald-500 mt-0.5">{loc.trend} ↗</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-50">
                <Link href="/dashboard/analytics" className="flex items-center justify-center gap-2 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-600 transition-all cursor-pointer group/btn">
                  <span className="text-[10px] font-bold">View All Locations</span>
                  <svg className="w-2.5 h-2.5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14m-7-7l7 7-7 7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Right Sidebar (4 Columns) - Reminder + Calendar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Reminder Section (Compact) */}
          <motion.div variants={item} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative group overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Reminder</h3>
              <div 
                className="w-9 h-9 bg-slate-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-900 hover:text-white transition-all group-hover:scale-110"
                onClick={() => router.push('/dashboard/calendar')}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
            
            <div className="space-y-1.5">
              {[
                { label: 'Follow-Ups', sub: `${data?.stats?.totalInquiries || 0} leads need response`, val: 35, bg: 'bg-[#FFF9F5]', hasAvatars: true, href: '/dashboard/inquiries' },
                { label: 'Documents', sub: '3 Documents awaiting review', val: 80, href: '/dashboard/analytics' },
                { label: 'Expire Listings', sub: '2 Listings about to expire', val: 45, href: '/dashboard/properties' },
              ].map((rem, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-2xl flex justify-between items-center group/item transition-all cursor-pointer ${rem.bg || 'bg-white'} border border-transparent hover:border-blue-100 hover:shadow-sm`}
                  onClick={() => router.push(rem.href)}
                >
                  <div className="flex-1">
                    <p className="text-[13px] font-bold text-slate-900 leading-none group-hover/item:text-blue-600 transition-colors">{rem.label}</p>
                    <p className="text-[10px] font-medium text-slate-400 mt-1.5">{rem.sub}</p>
                    {rem.hasAvatars && (
                      <div className="flex -space-x-1.5 mt-2">
                        {[1,2,3,4].map(j => (
                          <img key={j} src={`https://i.pravatar.cc/100?u=${j+10}`} className="w-5 h-5 rounded-full border-2 border-white object-cover" />
                        ))}
                        <div className="w-5 h-5 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[7px] font-bold text-slate-400">+11</div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#F97316" strokeWidth="4" strokeDasharray={`${rem.val}, 100`} strokeLinecap="round" />
                      </svg>
                    </div>
                    <svg className="w-3 h-3 text-slate-400 group-hover/item:text-slate-900 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Calendar Section (Below Reminder) */}
          <motion.div variants={item} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">June 2025</h3>
              <div className="flex gap-6">
                <button className="text-slate-900 hover:text-orange-500 transition-colors">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="text-slate-900 hover:text-orange-500 transition-colors">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-y-3 text-center mb-6 px-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <span key={day} className="text-[11px] font-medium text-slate-400 capitalize">{day}</span>
              ))}
              {[...Array(3)].map((_, i) => <span key={i} className="py-1"></span>)}
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map(day => (
                <div key={day} className="flex flex-col items-center gap-1 py-0.5">
                   <span className={`w-7 h-7 text-xs font-bold cursor-pointer rounded-lg transition-all flex items-center justify-center ${day === 2 ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'text-slate-500 hover:bg-slate-50'}`}>
                    {day}
                  </span>
                  {(day === 1 || day === 4) && <div className={`w-1 h-1 rounded-full ${day === 1 ? 'bg-emerald-400' : 'bg-yellow-400'}`}></div>}
                </div>
              ))}
            </div>

            <div className="flex gap-8 border-b border-slate-100 pb-0 mb-5 px-1">
              <span className="text-xs font-bold text-slate-900 border-b-[3px] border-orange-500 pb-3">All</span>
              <span className="text-xs font-medium text-slate-400 pb-3 cursor-pointer hover:text-slate-600">Assigned</span>
              <span className="text-xs font-medium text-slate-400 pb-3 cursor-pointer hover:text-slate-600">My Schedule</span>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Visit Client Michael Reynolds', sub: '742 Oak Street, Denver, CO 80220', border: 'border-l-yellow-400' },
                { title: 'Visit Client Sarah Thompson', sub: '1256 Maple Ave, Austin, TX 78704', border: 'border-l-yellow-400' },
                { title: 'Follow Up Aaliyah Lovato', sub: 'aaliyah123@listify.com | (512) 555-0398', border: 'border-l-cyan-400' },
              ].map((task, i) => (
                <div key={i} className={`p-4 rounded-[1.25rem] bg-slate-50/50 border-l-[4px] ${task.border} transition-all cursor-pointer hover:bg-slate-100/50`}>
                  <p className="text-[13px] font-bold text-slate-900">{task.title}</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-1.5">{task.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>


      {/* Row 2: Bottom Grid - Active Listing & Leads Contact (Compact) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Active Listing Table (Takes 8 columns) */}
        <div className="lg:col-span-8">
          <motion.section variants={item} className="bg-white p-6 rounded-[2.5rem] border border-slate-100/50 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Active Listing</h3>
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <input type="text" placeholder="Search..." className="pl-9 pr-3 py-1.5 bg-slate-50/80 border-none rounded-xl text-[12px] font-medium outline-none w-44 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300" />
                  <svg className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-900 cursor-pointer hover:bg-slate-900 hover:text-white transition-all">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4 text-[11px] font-medium text-slate-400">Property</th>
                    <th className="pb-4 text-[11px] font-medium text-slate-400">Type</th>
                    <th className="pb-4 text-[11px] font-medium text-slate-400">Units</th>
                    <th className="pb-4 text-[11px] font-medium text-slate-400">Cost</th>
                    <th className="pb-4 text-[11px] font-medium text-slate-400">Leads</th>
                    <th className="pb-4 text-[11px] font-medium text-slate-400">Views</th>
                    <th className="pb-4 text-[11px] font-medium text-slate-400 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {(data?.recentProperties || []).slice(0, 4).map((prop: any, i: number) => (
                    <tr key={prop.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => router.push(`/dashboard/properties/edit/${prop.id}`)}>
                      <td className="py-2.5">
                        <div className="flex items-center gap-3">
                          <img 
                            src={getImageUrl(prop.images?.[0]?.url)} 
                            className="w-8 h-8 rounded-lg object-cover shadow-sm" 
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900">{prop.title}</p>
                            <p className="text-[9px] font-medium text-slate-400 mt-0.5">{prop.city}, {prop.state}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-[11px] font-bold text-slate-900">{prop.type}</td>
                      <td className="py-3 text-[11px] font-bold text-slate-900">{prop.area} m²</td>
                      <td className="py-3 text-[11px] font-bold text-slate-900">Rp {prop.price.toLocaleString('id-ID')}</td>
                      <td className="py-3">
                        <div className="flex -space-x-1 items-center">
                          <div className="w-5 h-5 rounded-full bg-slate-50 border border-white flex items-center justify-center text-[7px] font-bold text-slate-500">+{prop._count?.inquiries || 0}</div>
                        </div>
                      </td>
                      <td className="py-3 text-[11px] font-bold text-slate-900">{prop._count?.views || 0}</td>
                      <td className="py-3 text-right">
                        <span className={`px-3 py-1.5 rounded-full text-[9px] font-bold ${prop.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'} whitespace-nowrap`}>
                          {prop.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!data?.recentProperties || data.recentProperties.length === 0) && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400 text-xs italic">No listings found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.section>
        </div>

        {/* Leads Contact Card (Takes 4 columns) */}
        <div className="lg:col-span-4">
          <motion.div variants={item} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Leads Contact</h3>
                <p className="text-[10px] font-medium text-slate-400 mt-0.5">{data?.recentInquiries?.length || 0} active leads</p>
              </div>
              <Link href="/dashboard/inquiries" className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-900 hover:text-white transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </div>

            <div className="space-y-2 flex-1 overflow-hidden">
              {(data?.recentInquiries || []).slice(0, 5).map((inquiry: any, i: number) => (
                <div 
                  key={inquiry.id} 
                  className="flex items-center gap-3 group/lead cursor-pointer hover:bg-slate-50/80 p-2.5 -mx-1 rounded-2xl transition-all border border-transparent hover:border-slate-100"
                  onClick={() => router.push('/dashboard/inquiries')}
                >
                  {/* Profile Photo with Online Indicator */}
                  <div className="relative flex-shrink-0">
                    <img 
                      src={inquiry.user.avatar || `https://i.pravatar.cc/100?u=${inquiry.user.name}`} 
                      alt={inquiry.user.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-md" 
                    />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      i < 2 ? 'bg-emerald-500' : i < 3 ? 'bg-amber-400' : 'bg-slate-300'
                    }`}></div>
                  </div>
                  
                  {/* Lead Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate group-hover/lead:text-blue-600 transition-colors">{inquiry.user.name}</p>
                    <p className="text-[10px] font-medium text-slate-400 truncate mt-0.5">Re: {inquiry.property.title}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover/lead:opacity-100 transition-opacity">
                    <div className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-all cursor-pointer">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="w-7 h-7 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                  </div>

                  {/* Arrow (shown when action buttons hidden) */}
                  <div className="w-7 h-7 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover/lead:hidden flex-shrink-0 transition-all">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
              {(!data?.recentInquiries || data.recentInquiries.length === 0) && (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 py-8">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">No new leads</p>
                </div>
              )}
            </div>

            {/* Footer: Stacked Avatars */}
            {data?.recentInquiries && data.recentInquiries.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {(data.recentInquiries || []).slice(0, 4).map((inq: any, i: number) => (
                    <img 
                      key={i} 
                      src={inq.user.avatar || `https://i.pravatar.cc/100?u=${inq.user.name}`}
                      alt={inq.user.name}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                  ))}
                  {data.recentInquiries.length > 4 && (
                    <div className="w-7 h-7 rounded-full bg-orange-50 ring-2 ring-white flex items-center justify-center text-[8px] font-black text-orange-500">
                      +{data.recentInquiries.length - 4}
                    </div>
                  )}
                </div>
                <Link href="/dashboard/inquiries" className="text-[10px] font-bold text-orange-500 hover:text-orange-600 transition-colors">
                  View All →
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
