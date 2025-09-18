"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Zap, Car, Droplets, Trash2, TrendingDown, TrendingUp, Target, Award } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

// Sample data for charts
const emissionTrendData = [
  { month: "Jan", electricity: 120, transport: 180, water: 15, waste: 25 },
  { month: "Feb", electricity: 115, transport: 165, water: 14, waste: 22 },
  { month: "Mar", electricity: 110, transport: 170, water: 13, waste: 20 },
  { month: "Apr", electricity: 105, transport: 155, water: 12, waste: 18 },
  { month: "May", electricity: 100, transport: 140, water: 11, waste: 16 },
  { month: "Jun", electricity: 95, transport: 135, water: 10, waste: 15 },
]

const categoryBreakdownData = [
  { name: "Transport", value: 45, color: "#ef4444" },
  { name: "Electricity", value: 30, color: "#f59e0b" },
  { name: "Water", value: 15, color: "#3b82f6" },
  { name: "Waste", value: 10, color: "#10b981" },
]

const weeklyProgressData = [
  { day: "Mon", target: 100, actual: 85 },
  { day: "Tue", target: 100, actual: 92 },
  { day: "Wed", target: 100, actual: 78 },
  { day: "Thu", target: 100, actual: 88 },
  { day: "Fri", target: 100, actual: 95 },
  { day: "Sat", target: 100, actual: 82 },
  { day: "Sun", target: 100, actual: 90 },
]

export function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Welcome back, John!</h2>
        <p className="text-muted-foreground">Here's your carbon footprint overview for this month.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Footprint</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 tons</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline w-3 h-3 mr-1 text-green-500" />
              12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Electricity</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450 kWh</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-red-500" />
              5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transport</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 tons</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline w-3 h-3 mr-1 text-green-500" />
              8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eco Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85/100</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />3 points this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emission Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Emission Trends</CardTitle>
            <CardDescription>Your carbon footprint over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={emissionTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="electricity" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="transport" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="water" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="waste" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Footprint Breakdown</CardTitle>
            <CardDescription>Current month emissions by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Progress Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Goals</CardTitle>
            <CardDescription>Track your progress towards carbon reduction targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Electricity Reduction</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Transport Optimization</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Water Conservation</span>
                <span>90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Weekly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>Daily eco-score vs target this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="target" fill="#e5e7eb" />
                <Bar dataKey="actual" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
          <CardDescription>Your latest eco-friendly milestones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Droplets className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Water Warrior</p>
              <p className="text-xs text-muted-foreground">Reduced water usage by 20%</p>
            </div>
            <Badge variant="secondary">New</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Car className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Eco Commuter</p>
              <p className="text-xs text-muted-foreground">Used public transport 15 days</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Energy Saver</p>
              <p className="text-xs text-muted-foreground">Reduced electricity by 15%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Log your daily activities to track your impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <Zap className="w-8 h-8 text-primary mb-2" />
              <span className="text-sm font-medium">Log Electricity</span>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <Car className="w-8 h-8 text-primary mb-2" />
              <span className="text-sm font-medium">Track Transport</span>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <Droplets className="w-8 h-8 text-primary mb-2" />
              <span className="text-sm font-medium">Water Usage</span>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <Trash2 className="w-8 h-8 text-primary mb-2" />
              <span className="text-sm font-medium">Waste Log</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
