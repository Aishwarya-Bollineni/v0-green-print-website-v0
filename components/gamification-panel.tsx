"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Award, Target, TrendingUp, Zap, Droplets, Car, Trash2, Star, Medal, Crown, Flame } from "lucide-react"

export function GamificationPanel() {
  const userStats = {
    totalPoints: 2450,
    level: 8,
    nextLevelPoints: 2800,
    co2Saved: 1250,
    streak: 15,
    rank: 23,
    totalUsers: 1547,
  }

  const badges = [
    {
      id: 1,
      name: "Eco Starter",
      description: "Completed your first carbon footprint assessment",
      icon: Target,
      earned: true,
      earnedDate: "2024-01-15",
      rarity: "Common",
    },
    {
      id: 2,
      name: "Energy Saver",
      description: "Reduced electricity usage by 15% for 3 months",
      icon: Zap,
      earned: true,
      earnedDate: "2024-02-20",
      rarity: "Uncommon",
    },
    {
      id: 3,
      name: "Water Warrior",
      description: "Maintained water usage below 120L/day for 30 days",
      icon: Droplets,
      earned: true,
      earnedDate: "2024-03-10",
      rarity: "Rare",
    },
    {
      id: 4,
      name: "Green Commuter",
      description: "Used sustainable transport for 20 consecutive days",
      icon: Car,
      earned: false,
      description2: "Progress: 12/20 days",
      rarity: "Uncommon",
    },
    {
      id: 5,
      name: "Waste Reducer",
      description: "Achieved 80% waste diversion rate",
      icon: Trash2,
      earned: false,
      description2: "Progress: 65/80%",
      rarity: "Rare",
    },
    {
      id: 6,
      name: "Carbon Champion",
      description: "Saved 1000kg CO₂ in total",
      icon: Trophy,
      earned: true,
      earnedDate: "2024-03-25",
      rarity: "Epic",
    },
  ]

  const leaderboard = [
    { rank: 1, name: "EcoMaster2024", points: 4250, co2Saved: 2100, badge: "Carbon Champion" },
    { rank: 2, name: "GreenGuru", points: 3890, co2Saved: 1950, badge: "Sustainability Expert" },
    { rank: 3, name: "ClimateHero", points: 3650, co2Saved: 1800, badge: "Planet Protector" },
    { rank: 4, name: "EcoWarrior", points: 3420, co2Saved: 1700, badge: "Green Guardian" },
    { rank: 5, name: "SustainableSam", points: 3200, co2Saved: 1600, badge: "Eco Advocate" },
    { rank: 23, name: "You", points: 2450, co2Saved: 1250, badge: "Carbon Champion", isUser: true },
  ]

  const challenges = [
    {
      title: "No Car Week",
      description: "Use only sustainable transport for 7 days",
      progress: 3,
      target: 7,
      reward: "500 points + Green Commuter badge",
      difficulty: "Medium",
      timeLeft: "4 days",
    },
    {
      title: "Energy Efficiency",
      description: "Reduce electricity usage by 20% this month",
      progress: 12,
      target: 20,
      reward: "300 points",
      difficulty: "Easy",
      timeLeft: "12 days",
    },
    {
      title: "Zero Waste Day",
      description: "Generate no landfill waste for 24 hours",
      progress: 0,
      target: 1,
      reward: "200 points",
      difficulty: "Hard",
      timeLeft: "Available",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-100 text-gray-800"
      case "Uncommon":
        return "bg-green-100 text-green-800"
      case "Rare":
        return "bg-blue-100 text-blue-800"
      case "Epic":
        return "bg-purple-100 text-purple-800"
      case "Legendary":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Trophy className="w-8 h-8 text-primary" />
          Gamification Hub
        </h2>
        <p className="text-muted-foreground">Track your progress, earn badges, and compete with the community.</p>
      </div>

      {/* User Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">Total Points</span>
            </div>
            <div className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Level</span>
            </div>
            <div className="text-2xl font-bold">{userStats.level}</div>
            <Progress value={((userStats.totalPoints % 350) / 350) * 100} className="h-2 mt-2" />
            <div className="text-xs text-muted-foreground mt-1">
              {userStats.nextLevelPoints - userStats.totalPoints} points to level {userStats.level + 1}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium">Streak</span>
            </div>
            <div className="text-2xl font-bold">{userStats.streak} days</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Medal className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">Rank</span>
            </div>
            <div className="text-2xl font-bold">#{userStats.rank}</div>
            <div className="text-xs text-muted-foreground">of {userStats.totalUsers} users</div>
          </CardContent>
        </Card>
      </div>

      {/* Badges Collection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Badge Collection
          </CardTitle>
          <CardDescription>Earn badges by completing eco-friendly challenges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.id}
                  className={`p-4 border rounded-lg ${
                    badge.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        badge.earned ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${badge.earned ? "text-green-600" : "text-gray-400"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-medium ${badge.earned ? "text-foreground" : "text-muted-foreground"}`}>
                          {badge.name}
                        </h4>
                        <Badge variant="outline" className={getRarityColor(badge.rarity)}>
                          {badge.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                      {badge.earned ? (
                        <p className="text-xs text-green-600 mt-1">Earned on {badge.earnedDate}</p>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-1">{badge.description2}</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Active Challenges
          </CardTitle>
          <CardDescription>Complete challenges to earn points and badges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{challenge.title}</h4>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{challenge.difficulty}</Badge>
                    <div className="text-xs text-muted-foreground mt-1">{challenge.timeLeft}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      {challenge.progress}/{challenge.target}
                    </span>
                  </div>
                  <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600">{challenge.reward}</span>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Community Leaderboard
          </CardTitle>
          <CardDescription>See how you rank against other eco-warriors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  user.isUser ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold">{user.rank}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${user.isUser ? "text-primary" : ""}`}>{user.name}</span>
                    {user.rank <= 3 && <Crown className="w-4 h-4 text-yellow-500" />}
                  </div>
                  <div className="text-sm text-muted-foreground">{user.badge}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{user.points.toLocaleString()} pts</div>
                  <div className="text-sm text-muted-foreground">{user.co2Saved}kg CO₂ saved</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
