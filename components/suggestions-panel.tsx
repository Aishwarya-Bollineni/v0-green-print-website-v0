"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Lightbulb, Calculator, TrendingDown, Zap, Car, Droplets, Trash2, Target } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WhatIfScenario {
  category: string
  currentValue: number
  newValue: number
  unit: string
  emissionFactor: number
}

export function SuggestionsPanel() {
  const [whatIfData, setWhatIfData] = useState<WhatIfScenario>({
    category: "car",
    currentValue: 150,
    newValue: 120,
    unit: "km/week",
    emissionFactor: 0.21,
  })

  const personalizedSuggestions = [
    {
      title: "Switch to LED Lighting",
      category: "Electricity",
      impact: "High",
      difficulty: "Easy",
      co2Reduction: "75 kg CO₂/year",
      cost: "Low",
      description: "Replace incandescent bulbs with LED alternatives to reduce energy consumption by 75%.",
      icon: Lightbulb,
      priority: 1,
    },
    {
      title: "Optimize Thermostat Settings",
      category: "Electricity",
      impact: "High",
      difficulty: "Easy",
      co2Reduction: "120 kg CO₂/year",
      cost: "Free",
      description: "Lower heating by 2°C in winter and raise cooling by 2°C in summer.",
      icon: Target,
      priority: 1,
    },
    {
      title: "Use Public Transport 2 Days/Week",
      category: "Transport",
      impact: "Medium",
      difficulty: "Medium",
      co2Reduction: "200 kg CO₂/year",
      cost: "Medium",
      description: "Replace car trips with public transport for commuting twice per week.",
      icon: Car,
      priority: 2,
    },
    {
      title: "Install Low-Flow Showerhead",
      category: "Water",
      impact: "Medium",
      difficulty: "Easy",
      co2Reduction: "45 kg CO₂/year",
      cost: "Low",
      description: "Reduce water usage by 30% without compromising shower experience.",
      icon: Droplets,
      priority: 2,
    },
    {
      title: "Start Home Composting",
      category: "Waste",
      impact: "Medium",
      difficulty: "Medium",
      co2Reduction: "85 kg CO₂/year",
      cost: "Low",
      description: "Compost organic waste to reduce methane emissions from landfills.",
      icon: Trash2,
      priority: 2,
    },
    {
      title: "Unplug Electronics When Not in Use",
      category: "Electricity",
      impact: "Low",
      difficulty: "Easy",
      co2Reduction: "35 kg CO₂/year",
      cost: "Free",
      description: "Eliminate phantom power draw from standby devices.",
      icon: Zap,
      priority: 3,
    },
  ]

  const calculateWhatIfSavings = () => {
    const reduction = whatIfData.currentValue - whatIfData.newValue
    const weeklySavings = reduction * whatIfData.emissionFactor
    const annualSavings = weeklySavings * 52
    return Math.round(annualSavings)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Lightbulb className="w-8 h-8 text-primary" />
          Smart Suggestions
        </h2>
        <p className="text-muted-foreground">
          Personalized recommendations to reduce your carbon footprint based on your usage patterns.
        </p>
      </div>

      {/* What-If Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            What-If Calculator
          </CardTitle>
          <CardDescription>See the impact of potential changes to your lifestyle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Current Car Travel: {whatIfData.currentValue} km/week</Label>
              <Slider
                value={[whatIfData.currentValue]}
                onValueChange={(value) => setWhatIfData({ ...whatIfData, currentValue: value[0] })}
                max={300}
                min={0}
                step={10}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Reduced to: {whatIfData.newValue} km/week</Label>
              <Slider
                value={[whatIfData.newValue]}
                onValueChange={(value) => setWhatIfData({ ...whatIfData, newValue: value[0] })}
                max={whatIfData.currentValue}
                min={0}
                step={10}
                className="w-full"
              />
            </div>
          </div>

          <Alert>
            <TrendingDown className="h-4 w-4" />
            <AlertDescription>
              <strong>Potential Savings:</strong> By reducing your car travel by{" "}
              {whatIfData.currentValue - whatIfData.newValue} km/week, you could save{" "}
              <strong>{calculateWhatIfSavings()} kg CO₂ per year</strong>.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Personalized Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Action Plan</CardTitle>
          <CardDescription>Ranked by impact and ease of implementation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {personalizedSuggestions
              .sort((a, b) => a.priority - b.priority)
              .map((suggestion, index) => {
                const Icon = suggestion.icon
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{suggestion.title}</h4>
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getImpactColor(suggestion.impact)}>
                            {suggestion.impact} Impact
                          </Badge>
                          <Badge variant="outline" className={getDifficultyColor(suggestion.difficulty)}>
                            {suggestion.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-sm">
                          <span className="text-green-600 font-medium">Save {suggestion.co2Reduction}</span>
                          <span className="text-muted-foreground">Cost: {suggestion.cost}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Daily Habits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">• Turn off lights when leaving rooms</div>
            <div className="text-sm">• Take shorter showers (aim for 5 minutes)</div>
            <div className="text-sm">• Walk or bike for trips under 2km</div>
            <div className="text-sm">• Use reusable bags and containers</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Weekly Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">• Plan meals to reduce food waste</div>
            <div className="text-sm">• Batch errands into single trips</div>
            <div className="text-sm">• Air dry clothes instead of using dryer</div>
            <div className="text-sm">• Check and fix any water leaks</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Monthly Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">• Review and optimize energy bills</div>
            <div className="text-sm">• Try one new sustainable recipe</div>
            <div className="text-sm">• Organize a carpool with neighbors</div>
            <div className="text-sm">• Audit household for energy efficiency</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
