"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Car, Bike, Bus, Plane, TrendingDown, Users, Calculator, PieChart } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TransportData {
  carKmWeek: number
  bikeKmWeek: number
  publicTransportKmWeek: number
  flightHoursYear: number
}

const transportEmissionFactors = {
  car: 0.21, // kg CO2 per km (average car)
  bike: 0, // kg CO2 per km
  publicTransport: 0.05, // kg CO2 per km (bus/train average)
  flight: 90, // kg CO2 per hour of flight
}

export function TransportForm() {
  const [formData, setFormData] = useState<TransportData>({
    carKmWeek: 0,
    bikeKmWeek: 0,
    publicTransportKmWeek: 0,
    flightHoursYear: 0,
  })
  const [results, setResults] = useState<{
    weeklyEmissions: number
    annualEmissions: number
    breakdown: { mode: string; emissions: number; percentage: number }[]
    ecoScore: number
  } | null>(null)

  const calculateEmissions = () => {
    const carWeekly = formData.carKmWeek * transportEmissionFactors.car
    const bikeWeekly = formData.bikeKmWeek * transportEmissionFactors.bike
    const publicWeekly = formData.publicTransportKmWeek * transportEmissionFactors.publicTransport
    const flightWeekly = (formData.flightHoursYear * transportEmissionFactors.flight) / 52

    const weeklyEmissions = carWeekly + bikeWeekly + publicWeekly + flightWeekly
    const annualEmissions = weeklyEmissions * 52

    const breakdown = [
      { mode: "Car", emissions: carWeekly * 52, percentage: 0 },
      { mode: "Bike", emissions: bikeWeekly * 52, percentage: 0 },
      { mode: "Public Transport", emissions: publicWeekly * 52, percentage: 0 },
      { mode: "Flights", emissions: formData.flightHoursYear * transportEmissionFactors.flight, percentage: 0 },
    ].map((item) => ({
      ...item,
      percentage: annualEmissions > 0 ? Math.round((item.emissions / annualEmissions) * 100) : 0,
    }))

    // Calculate eco score based on sustainable transport usage
    const totalKm = formData.carKmWeek + formData.bikeKmWeek + formData.publicTransportKmWeek
    const sustainableKm = formData.bikeKmWeek + formData.publicTransportKmWeek
    const ecoScore = totalKm > 0 ? Math.round((sustainableKm / totalKm) * 100) : 0

    setResults({
      weeklyEmissions: Math.round(weeklyEmissions),
      annualEmissions: Math.round(annualEmissions),
      breakdown,
      ecoScore,
    })
  }

  const getSuggestions = () => {
    const suggestions = []

    if (formData.carKmWeek > 100) {
      suggestions.push({
        title: "Try Carpooling",
        impact: "Reduce car emissions by 50%",
        co2Reduction: `${Math.round(formData.carKmWeek * transportEmissionFactors.car * 26)} kg CO₂/year`,
        icon: Users,
      })
    }

    if (formData.carKmWeek > 50 && formData.publicTransportKmWeek < 50) {
      suggestions.push({
        title: "Use Public Transport",
        impact: "75% less emissions than driving",
        co2Reduction: `${Math.round(formData.carKmWeek * 0.16 * 52)} kg CO₂/year`,
        icon: Bus,
      })
    }

    if (formData.bikeKmWeek < 20) {
      suggestions.push({
        title: "Bike for Short Trips",
        impact: "Zero emissions + health benefits",
        co2Reduction: "50 kg CO₂/year for 5km/week",
        icon: Bike,
      })
    }

    if (formData.flightHoursYear > 10) {
      suggestions.push({
        title: "Consider Video Calls",
        impact: "Replace business flights",
        co2Reduction: `${Math.round(formData.flightHoursYear * 45)} kg CO₂/year`,
        icon: TrendingDown,
      })
    }

    return suggestions
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Car className="w-8 h-8 text-primary" />
          Transport Tracking
        </h2>
        <p className="text-muted-foreground">
          Track your transportation habits and discover greener ways to get around.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Travel Calculator
            </CardTitle>
            <CardDescription>Enter your weekly and annual travel details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="carKm" className="flex items-center gap-2">
                <Car className="w-4 h-4" />
                Car Travel (km/week)
              </Label>
              <Input
                id="carKm"
                type="number"
                placeholder="e.g., 150"
                value={formData.carKmWeek || ""}
                onChange={(e) => setFormData({ ...formData, carKmWeek: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bikeKm" className="flex items-center gap-2">
                <Bike className="w-4 h-4" />
                Bike Travel (km/week)
              </Label>
              <Input
                id="bikeKm"
                type="number"
                placeholder="e.g., 20"
                value={formData.bikeKmWeek || ""}
                onChange={(e) => setFormData({ ...formData, bikeKmWeek: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publicKm" className="flex items-center gap-2">
                <Bus className="w-4 h-4" />
                Public Transport (km/week)
              </Label>
              <Input
                id="publicKm"
                type="number"
                placeholder="e.g., 50"
                value={formData.publicTransportKmWeek || ""}
                onChange={(e) => setFormData({ ...formData, publicTransportKmWeek: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="flightHours" className="flex items-center gap-2">
                <Plane className="w-4 h-4" />
                Flight Hours (per year)
              </Label>
              <Input
                id="flightHours"
                type="number"
                placeholder="e.g., 8"
                value={formData.flightHoursYear || ""}
                onChange={(e) => setFormData({ ...formData, flightHoursYear: Number(e.target.value) })}
              />
            </div>

            <Button onClick={calculateEmissions} className="w-full">
              Calculate Transport Emissions
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Your Transport Footprint
              </CardTitle>
              <CardDescription>Breakdown of your transportation emissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{results.weeklyEmissions}</div>
                  <div className="text-sm text-muted-foreground">kg CO₂/week</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{results.annualEmissions}</div>
                  <div className="text-sm text-muted-foreground">kg CO₂/year</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Eco Transport Score</span>
                  <span>{results.ecoScore}%</span>
                </div>
                <Progress value={results.ecoScore} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Based on sustainable transport usage (bike + public transport)
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Emissions Breakdown</h4>
                {results.breakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.mode === "Car" && <Car className="w-4 h-4 text-red-500" />}
                      {item.mode === "Bike" && <Bike className="w-4 h-4 text-green-500" />}
                      {item.mode === "Public Transport" && <Bus className="w-4 h-4 text-blue-500" />}
                      {item.mode === "Flights" && <Plane className="w-4 h-4 text-orange-500" />}
                      <span className="text-sm">{item.mode}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{Math.round(item.emissions)} kg</div>
                      <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Suggestions */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              Smart Transport Tips
            </CardTitle>
            <CardDescription>Personalized suggestions to reduce your transport emissions</CardDescription>
          </CardHeader>
          <CardContent>
            {getSuggestions().length > 0 ? (
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
            ) : (
              <Alert>
                <TrendingDown className="h-4 w-4" />
                <AlertDescription>
                  Great job! Your transport habits are already quite eco-friendly. Keep up the good work!
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Comparison */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle>How You Compare</CardTitle>
            <CardDescription>Your transport emissions vs. average person</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Your Annual Emissions</span>
                <span className="font-bold">{results.annualEmissions} kg CO₂</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Person</span>
                <span className="font-bold">2,300 kg CO₂</span>
              </div>
              <Progress value={Math.min(100, (results.annualEmissions / 2300) * 100)} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {results.annualEmissions < 2300
                  ? `You're ${Math.round(((2300 - results.annualEmissions) / 2300) * 100)}% below average! 🌱`
                  : `You're ${Math.round(((results.annualEmissions - 2300) / 2300) * 100)}% above average. Consider more sustainable options.`}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
