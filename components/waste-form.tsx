"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trash2, Recycle, TrendingDown, Calculator, PieChart, Leaf } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WasteData {
  weeklyWasteKg: number
  weeklyRecycledKg: number
  weeklyCompostKg: number
  householdSize: number
}

export function WasteForm() {
  const [formData, setFormData] = useState<WasteData>({
    weeklyWasteKg: 0,
    weeklyRecycledKg: 0,
    weeklyCompostKg: 0,
    householdSize: 1,
  })
  const [results, setResults] = useState<{
    weeklyEmissions: number
    annualEmissions: number
    recyclingRate: number
    wastePerPerson: number
    divertedWaste: number
  } | null>(null)

  const calculateWasteImpact = () => {
    if (!formData.weeklyWasteKg || !formData.householdSize) return

    // Landfill emissions: ~0.5 kg CO2 per kg of waste
    // Recycling saves: ~2 kg CO2 per kg recycled
    // Composting saves: ~0.3 kg CO2 per kg composted
    const landfillEmissions = formData.weeklyWasteKg * 0.5
    const recyclingSavings = formData.weeklyRecycledKg * 2
    const compostSavings = formData.weeklyCompostKg * 0.3

    const weeklyEmissions = landfillEmissions - recyclingSavings - compostSavings
    const annualEmissions = weeklyEmissions * 52

    const totalWaste = formData.weeklyWasteKg + formData.weeklyRecycledKg + formData.weeklyCompostKg
    const recyclingRate =
      totalWaste > 0 ? ((formData.weeklyRecycledKg + formData.weeklyCompostKg) / totalWaste) * 100 : 0
    const wastePerPerson = totalWaste / formData.householdSize
    const divertedWaste = formData.weeklyRecycledKg + formData.weeklyCompostKg

    setResults({
      weeklyEmissions: Math.round(weeklyEmissions * 100) / 100,
      annualEmissions: Math.round(annualEmissions),
      recyclingRate: Math.round(recyclingRate),
      wastePerPerson: Math.round(wastePerPerson * 100) / 100,
      divertedWaste: Math.round(divertedWaste * 100) / 100,
    })
  }

  const getSuggestions = () => {
    const suggestions = []

    if (formData.weeklyCompostKg < 2) {
      suggestions.push({
        title: "Start Composting",
        impact: "Reduce methane emissions",
        co2Reduction: "50 kg CO₂/year for food scraps",
        icon: Leaf,
      })
    }

    if (results && results.recyclingRate < 50) {
      suggestions.push({
        title: "Increase Recycling",
        impact: "Divert waste from landfills",
        co2Reduction: `${Math.round(formData.weeklyWasteKg * 2 * 26)} kg CO₂/year`,
        icon: Recycle,
      })
    }

    if (formData.wastePerPerson > 2) {
      suggestions.push({
        title: "Reduce Packaging",
        impact: "Buy bulk, avoid single-use",
        co2Reduction: "30 kg CO₂/year",
        icon: TrendingDown,
      })
    }

    suggestions.push({
      title: "Repair Instead of Replace",
      impact: "Extend product lifecycles",
      co2Reduction: "100 kg CO₂/year",
      icon: Trash2,
    })

    return suggestions
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Trash2 className="w-8 h-8 text-primary" />
          Waste Management Tracking
        </h2>
        <p className="text-muted-foreground">
          Track your waste generation and recycling to minimize environmental impact.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Waste Calculator
            </CardTitle>
            <CardDescription>Enter your weekly waste generation details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weeklyWaste">Weekly Waste to Landfill (kg)</Label>
              <Input
                id="weeklyWaste"
                type="number"
                placeholder="e.g., 15"
                value={formData.weeklyWasteKg || ""}
                onChange={(e) => setFormData({ ...formData, weeklyWasteKg: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weeklyRecycled">Weekly Recycled Materials (kg)</Label>
              <Input
                id="weeklyRecycled"
                type="number"
                placeholder="e.g., 8"
                value={formData.weeklyRecycledKg || ""}
                onChange={(e) => setFormData({ ...formData, weeklyRecycledKg: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weeklyCompost">Weekly Composted Organic Waste (kg)</Label>
              <Input
                id="weeklyCompost"
                type="number"
                placeholder="e.g., 3"
                value={formData.weeklyCompostKg || ""}
                onChange={(e) => setFormData({ ...formData, weeklyCompostKg: Number(e.target.value) })}
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

            <Button
              onClick={calculateWasteImpact}
              className="w-full"
              disabled={!formData.weeklyWasteKg || !formData.householdSize}
            >
              Calculate Waste Impact
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Your Waste Impact
              </CardTitle>
              <CardDescription>Environmental impact of your waste management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{results.recyclingRate}%</div>
                  <div className="text-sm text-muted-foreground">recycling rate</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{Math.abs(results.annualEmissions)}</div>
                  <div className="text-sm text-muted-foreground">
                    kg CO₂/year {results.annualEmissions < 0 ? "saved" : "emitted"}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Waste per Person</span>
                  <span>{results.wastePerPerson} kg/week</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Diverted from Landfill</span>
                  <span>{results.divertedWaste} kg/week</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Waste Diversion Score</span>
                  <span>{results.recyclingRate}%</span>
                </div>
                <Progress value={results.recyclingRate} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {results.recyclingRate >= 70
                    ? "Excellent waste management!"
                    : results.recyclingRate >= 40
                      ? "Good progress, room for improvement"
                      : "Consider increasing recycling and composting"}
                </p>
              </div>

              {results.annualEmissions < 0 && (
                <Alert>
                  <Recycle className="h-4 w-4" />
                  <AlertDescription>
                    Great job! Your recycling and composting efforts are creating a net positive environmental impact.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Waste Reduction Tips
          </CardTitle>
          <CardDescription>Personalized suggestions to minimize your waste footprint</CardDescription>
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

      {/* Waste Breakdown */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Waste Stream Analysis</CardTitle>
            <CardDescription>Breakdown of your weekly waste management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-red-600" />
                  <span>Landfill Waste</span>
                </div>
                <span className="font-medium">{formData.weeklyWasteKg} kg/week</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Recycle className="w-4 h-4 text-blue-600" />
                  <span>Recycled Materials</span>
                </div>
                <span className="font-medium">{formData.weeklyRecycledKg} kg/week</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-600" />
                  <span>Composted Organics</span>
                </div>
                <span className="font-medium">{formData.weeklyCompostKg} kg/week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
