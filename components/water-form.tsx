"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Droplets, TrendingDown, Flower as Shower, Calculator, BarChart3 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WaterData {
  dailyUsage: number
  householdSize: number
  showerMinutes: number
  dishwasherLoads: number
}

export function WaterForm() {
  const [formData, setFormData] = useState<WaterData>({
    dailyUsage: 0,
    householdSize: 1,
    showerMinutes: 0,
    dishwasherLoads: 0,
  })
  const [results, setResults] = useState<{
    dailyEmissions: number
    annualEmissions: number
    usagePerPerson: number
    comparison: string
    efficiencyScore: number
  } | null>(null)

  const calculateWaterImpact = () => {
    if (!formData.dailyUsage || !formData.householdSize) return

    // Water treatment and pumping emissions: ~0.4 kg CO2 per 1000L
    const dailyEmissions = (formData.dailyUsage * 0.4) / 1000
    const annualEmissions = dailyEmissions * 365
    const usagePerPerson = formData.dailyUsage / formData.householdSize

    // Average daily water usage per person: 150L
    const averageUsage = 150
    const comparison =
      usagePerPerson > averageUsage
        ? `${Math.round(((usagePerPerson - averageUsage) / averageUsage) * 100)}% above average`
        : `${Math.round(((averageUsage - usagePerPerson) / averageUsage) * 100)}% below average`

    // Efficiency score based on usage per person
    const efficiencyScore = Math.max(0, Math.min(100, 100 - ((usagePerPerson - 100) / 200) * 100))

    setResults({
      dailyEmissions: Math.round(dailyEmissions * 100) / 100,
      annualEmissions: Math.round(annualEmissions),
      usagePerPerson: Math.round(usagePerPerson),
      comparison,
      efficiencyScore: Math.round(efficiencyScore),
    })
  }

  const getSuggestions = () => {
    const suggestions = []

    if (formData.showerMinutes > 8) {
      suggestions.push({
        title: "Shorter Showers",
        impact: "Save 10L per minute reduced",
        co2Reduction: "15 kg CO₂/year for 2min less",
        icon: Shower,
      })
    }

    if (formData.dailyUsage / formData.householdSize > 150) {
      suggestions.push({
        title: "Install Low-Flow Fixtures",
        impact: "Reduce usage by 30%",
        co2Reduction: `${Math.round(results?.annualEmissions ? results.annualEmissions * 0.3 : 20)} kg CO₂/year`,
        icon: Droplets,
      })
    }

    suggestions.push({
      title: "Fix Leaky Faucets",
      impact: "A drip can waste 15L/day",
      co2Reduction: "2 kg CO₂/year per leak",
      icon: TrendingDown,
    })

    if (formData.dishwasherLoads < 3) {
      suggestions.push({
        title: "Full Dishwasher Loads",
        impact: "More efficient than hand washing",
        co2Reduction: "10 kg CO₂/year",
        icon: Droplets,
      })
    }

    return suggestions
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Droplets className="w-8 h-8 text-primary" />
          Water Usage Tracking
        </h2>
        <p className="text-muted-foreground">Monitor your water consumption and discover conservation opportunities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Water Calculator
            </CardTitle>
            <CardDescription>Enter your household water usage details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dailyUsage">Daily Water Usage (liters)</Label>
              <Input
                id="dailyUsage"
                type="number"
                placeholder="e.g., 300"
                value={formData.dailyUsage || ""}
                onChange={(e) => setFormData({ ...formData, dailyUsage: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="householdSize">Household Size</Label>
              <Input
                id="householdSize"
                type="number"
                placeholder="Number of people"
                value={formData.householdSize || ""}
                onChange={(e) => setFormData({ ...formData, householdSize: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="showerMinutes">Average Shower Time (minutes)</Label>
              <Input
                id="showerMinutes"
                type="number"
                placeholder="e.g., 8"
                value={formData.showerMinutes || ""}
                onChange={(e) => setFormData({ ...formData, showerMinutes: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dishwasherLoads">Dishwasher Loads per Week</Label>
              <Input
                id="dishwasherLoads"
                type="number"
                placeholder="e.g., 4"
                value={formData.dishwasherLoads || ""}
                onChange={(e) => setFormData({ ...formData, dishwasherLoads: Number(e.target.value) })}
              />
            </div>

            <Button
              onClick={calculateWaterImpact}
              className="w-full"
              disabled={!formData.dailyUsage || !formData.householdSize}
            >
              Calculate Water Impact
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Your Water Footprint
              </CardTitle>
              <CardDescription>Environmental impact of your water usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{results.usagePerPerson}L</div>
                  <div className="text-sm text-muted-foreground">per person/day</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{results.annualEmissions}</div>
                  <div className="text-sm text-muted-foreground">kg CO₂/year</div>
                </div>
              </div>

              <Alert>
                <Droplets className="h-4 w-4" />
                <AlertDescription>
                  Your usage is <strong>{results.comparison}</strong> compared to typical households.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Water Efficiency Score</span>
                  <span>{results.efficiencyScore}%</span>
                </div>
                <Progress value={results.efficiencyScore} className="h-2" />
                <p className="text-xs text-muted-foreground">Based on usage per person vs. recommended levels</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Water Conservation Tips
          </CardTitle>
          <CardDescription>Personalized suggestions to reduce your water footprint</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getSuggestions().map((suggestion, index) => {
              const Icon = suggestion.icon
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{suggestion.title}</h4>
                    <p className="text-sm text-muted-foreground">{suggestion.impact}</p>
                    <Badge variant="secondary" className="mt-2">
                      Save {suggestion.co2Reduction}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
