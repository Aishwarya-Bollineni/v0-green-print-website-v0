import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Car, Droplets, Recycle, Lightbulb, Gamepad2 } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Electricity Tracking",
    description: "Monitor your energy consumption and discover renewable alternatives to reduce your carbon footprint.",
  },
  {
    icon: Car,
    title: "Transport & Fuel",
    description: "Track vehicle emissions, commute patterns, and explore eco-friendly transportation options.",
  },
  {
    icon: Droplets,
    title: "Water Usage",
    description: "Measure water consumption and get tips for conservation to minimize environmental impact.",
  },
  {
    icon: Recycle,
    title: "Waste Management",
    description: "Log waste production, recycling habits, and learn about sustainable disposal methods.",
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestions",
    description: "Receive personalized recommendations based on your usage patterns and environmental goals.",
  },
  {
    icon: Gamepad2,
    title: "Gamification",
    description: "Earn points, unlock achievements, and compete with friends to make sustainability fun.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Comprehensive Carbon Tracking
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Everything you need to understand, monitor, and reduce your environmental impact in one powerful platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
