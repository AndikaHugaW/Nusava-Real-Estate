"use client"

import * as React from "react"
import { ResponsiveContainer, Tooltip } from "recharts"
import { cn } from "@/lib/utils"

export interface ChartConfig {
  [key: string]: {
    label?: React.ReactNode
    color?: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactElement
}

export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, children, className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("w-full h-full", className)} 
        style={{
          ...Object.entries(config).reduce((acc, [key, value]) => ({
            ...acc,
            [`--color-${key}`]: value.color,
          }), {}),
        } as React.CSSProperties}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    )
  }
)
ChartContainer.displayName = "ChartContainer"

export const ChartTooltip = Tooltip

export const ChartTooltipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] rounded-2xl p-5 min-w-[160px]">
        <div className="space-y-1">
          <p className="text-xl font-black text-slate-900 leading-tight">
            ${payload[0].value.toLocaleString() || '0'}
          </p>
          <p className="text-[10px] font-bold text-slate-400">
            Target: <span className="text-slate-900">120M</span>
          </p>
        </div>
      </div>
    )
  }
  return null
}
