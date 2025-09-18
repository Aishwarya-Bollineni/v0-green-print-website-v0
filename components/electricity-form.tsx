"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingDown, Lightbulb, Calculator, BarChart3 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

interface ElectricityData {
  monthlyUsage: number
  energyType: string
  householdSize: number
}

const energyEmissionFactors = {
  coal: 0.82, // kg CO2 per kWh
  gas: 0.49,
  renewable: 0.05,
  mixed: 0.65, // average grid mix
}

const electricityHistoryData = [
  { month: "Jan", usage: 480, emissions: 394, benchmark: 450 },
  { month: "Feb", usage: 465, emissions: 382, benchmark: 450 },
  { month: "Mar", usage: 470, emissions: 386, benchmark: 450 },
  { month: "Apr", usage: 445, emissions: 365, benchmark: 450 },
  { month: "May", usage: 430, emissions: 353, benchmark: 450 },
  { month: "Jun", usage: 420, emissions: 345, benchmark: 450 },
]

const dailyUsageData = [
  { day: "Mon", usage: 15.2 },
  { day: "Tue", usage: 14.8 },
  { day: "Wed", usage: 16.1 },
  { day: "Thu", usage: 15.5 },
  { day: "Fri", usage: 14.2 },
  { day: "Sat", usage: 18.3 },
  { day: "Sun", usage: 17.9 },
]

export function ElectricityForm() {
  const [formData, setFormData] = useState<ElectricityData>({
    monthlyUsage: 0,
    energyType: "",
    householdSize: 1,
  })
  const [results, setResults] = useState<{
    monthlyEmissions: number
    annualEmissions: number
    comparison: string
    savings: number
  } | null>(null)

  const calculateEmissions = () => {
    if (!formData.monthlyUsage || !formData.energyType) return

    const emissionFactor = energyEmissionFactors[formData.energyType as keyof typeof energyEmissionFactors]
    const monthlyEmissions = formData.monthlyUsage * emissionFactor
    const annualEmissions = monthlyEmissions * 12

    // Average household comparison (450 kWh/month)
    const averageMonthlyUsage = 450
    const comparison =
      formData.monthlyUsage > averageMonthlyUsage
        ? `${Math.round(((formData.monthlyUsage - averageMonthlyUsage) / averageMonthlyUsage) * 100)}% above average`
        : `${Math.round(((averageMonthlyUsage - formData.monthlyUsage) / averageMonthlyUsage) * 100)}% below average`

    // Potential savings if switching to renewable
    const renewableSavings = formData.monthlyUsage * (emissionFactor - energyEmissionFactors.renewable) * 12

    setResults({
      monthlyEmissions: Math.round(monthlyEmissions),
      annualEmissions: Math.round(annualEmissions),
      comparison,
      savings: Math.round(renewableSavings),
    })
  }

  const getSuggestions = () => {
    const suggestions = [
      {
        title: "Switch to LED Bulbs",
        impact: "Save 75% on lighting costs",
        co2Reduction: "50 kg CO₂/year",
        icon: Lightbulb,
      },
      {
        title: "Unplug Standby Devices",
        impact: "Reduce phantom load by 10%",
        co2Reduction: "30 kg CO₂/year",
        icon: Zap,
      },
      {
        title: "Use Smart Thermostat",
        impact: "Optimize heating/cooling",
        co2Reduction: "120 kg CO₂/year",
        icon: TrendingDown,
      },
    ]

    if (formData.energyType !== "renewable") {
      suggestions.unshift({
        title: "Switch to Renewable Energy",
        impact: "Reduce emissions by 85%",
        co2Reduction: `${results?.savings || 200} kg CO₂/year`,
        icon: Zap,
      })
    }

    return suggestions
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Zap className="w-8 h-8 text-primary" />
          Electricity Tracking
        </h2>
        <p className="text-muted-foreground">
          Monitor your electricity usage and discover ways to reduce your carbon footprint.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Usage Calculator
            </CardTitle>
            <CardDescription>Enter your electricity consumption details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyUsage">Monthly Electricity Usage (kWh)</Label>
              <Input
                id="monthlyUsage"
                type="number"
                placeholder="e.g., 450"
                value={formData.monthlyUsage || ""}
                onChange={(e) => setFormData({ ...formData, monthlyUsage: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="energyType">Energy Source Type</Label>
              <Select
                value={formData.energyType}
                onValueChange={(value) => setFormData({ ...formData, energyType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select energy source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coal">Coal</SelectItem>
                  <SelectItem value="gas">Natural Gas</SelectItem>
                  <SelectItem value="renewable">Renewable (Solar/Wind)</SelectItem>
                  <SelectItem value="mixed">Mixed Grid (Average)</SelectItem>
                </SelectContent>
              </Select>
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
              onClick={calculateEmissions}
              className="w-full"
              disabled={!formData.monthlyUsage || !formData.energyType}
            >
              Calculate Emissions
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Your Carbon Footprint
              </CardTitle>
              <CardDescription>Based on your electricity usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{results.monthlyEmissions}</div>
                  <div className="text-sm text-muted-foreground">kg CO₂/month</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{results.annualEmissions}</div>
                  <div className="text-sm text-muted-foreground">kg CO₂/year</div>
                </div>
              </div>

              <Alert>
                <TrendingDown className="h-4 w-4" />
                <AlertDescription>
                  Your usage is <strong>{results.comparison}</strong> compared to typical households.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Efficiency Score</span>
                  <span>
                    {formData.monthlyUsage <= 400
                      ? "Excellent"
                      : formData.monthlyUsage <= 500
                        ? "Good"
                        : "Needs Improvement"}
                  </span>
                </div>
                <Progress value={Math.max(0, 100 - (formData.monthlyUsage / 600) * 100)} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Smart Suggestions
          </CardTitle>
          <CardDescription>Personalized tips to reduce your electricity footprint</CardDescription>
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
                      {suggestion.co2Reduction}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Historical Data */}
      <Card>
        <CardHeader>
          <CardTitle>Usage History</CardTitle>
          <CardDescription>Track your electricity consumption over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Monthly Usage & Emissions</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={electricityHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="usage" fill="#3b82f6" name="Usage (kWh)" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="emissions"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Emissions (kg CO₂)"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="benchmark"
                    stroke="#6b7280"
                    strokeDasharray="5 5"
                    name="Benchmark"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 className="font-medium mb-3">Daily Usage This Week</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dailyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
