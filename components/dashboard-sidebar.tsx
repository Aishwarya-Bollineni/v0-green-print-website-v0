"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Zap, Car, Droplets, Trash2, Lightbulb, Trophy, Settings, Leaf } from "lucide-react"
import type { DashboardView } from "@/app/dashboard/page"

interface DashboardSidebarProps {
  activeView: DashboardView
  onViewChange: (view: DashboardView) => void
}

const sidebarItems = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "electricity" as const, label: "Electricity", icon: Zap },
  { id: "transport" as const, label: "Transport", icon: Car },
  { id: "water" as const, label: "Water", icon: Droplets },
  { id: "waste" as const, label: "Waste", icon: Trash2 },
  { id: "suggestions" as const, label: "Suggestions", icon: Lightbulb },
  { id: "gamification" as const, label: "Gamification", icon: Trophy },
  { id: "settings" as const, label: "Settings", icon: Settings },
]

export function DashboardSidebar({ activeView, onViewChange }: DashboardSidebarProps) {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-sidebar-foreground">GreenPrint</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12 text-left",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/60 text-center">Track. Optimize. Live Green.</div>
      </div>
    </div>
  )
}
