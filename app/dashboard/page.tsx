"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardHome } from "@/components/dashboard-home"
import { ElectricityForm } from "@/components/electricity-form"
import { TransportForm } from "@/components/transport-form"
import { WaterForm } from "@/components/water-form"
import { WasteForm } from "@/components/waste-form"
import { SuggestionsPanel } from "@/components/suggestions-panel"
import { GamificationPanel } from "@/components/gamification-panel"
import { SettingsPanel } from "@/components/settings-panel"

export type DashboardView =
  | "home"
  | "electricity"
  | "transport"
  | "water"
  | "waste"
  | "suggestions"
  | "gamification"
  | "settings"

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<DashboardView>("home")

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return <DashboardHome />
      case "electricity":
        return <ElectricityForm />
      case "transport":
        return <TransportForm />
      case "water":
        return <WaterForm />
      case "waste":
        return <WasteForm />
      case "suggestions":
        return <SuggestionsPanel />
      case "gamification":
        return <GamificationPanel />
      case "settings":
        return <SettingsPanel />
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
