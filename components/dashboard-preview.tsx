import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, Award, Leaf, Zap } from "lucide-react"

export function DashboardPreview() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Your Personal Eco Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Track your progress, celebrate achievements, and stay motivated with real-time insights.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Carbon Savings Chart */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingDown className="w-5 h-5 text-accent" />
                  Carbon Footprint Reduction
                </CardTitle>
                <CardDescription>Your progress this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Electricity</span>
                    <span className="text-sm font-medium text-accent">-15%</span>
                  </div>
                  <Progress value={85} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Transport</span>
                    <span className="text-sm font-medium text-accent">-22%</span>
                  </div>
                  <Progress value={78} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Water Usage</span>
                    <span className="text-sm font-medium text-accent">-8%</span>
                  </div>
                  <Progress value={92} className="h-2" />

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">Total Reduction</span>
                      <span className="text-lg font-bold text-accent">-18%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements & Points */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Award className="w-5 h-5 text-primary" />
                  Eco Achievements
                </CardTitle>
                <CardDescription>Points earned and milestones reached</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">2,450</div>
                    <p className="text-sm text-muted-foreground">Green Points Earned</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-accent" />
                        <span className="text-sm">Eco Warrior</span>
                      </div>
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        Unlocked
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm">Energy Saver</span>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Unlocked
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Carbon Neutral</span>
                      </div>
                      <Badge variant="outline">In Progress</Badge>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Next Goal</p>
                      <Progress value={65} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">550 more points to Carbon Neutral</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
