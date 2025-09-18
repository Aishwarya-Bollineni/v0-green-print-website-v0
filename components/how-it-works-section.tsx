import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BarChart3, Target } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Enter Daily Data",
    description:
      "Input your daily or weekly consumption data across electricity, transport, water, and waste categories.",
  },
  {
    step: "02",
    icon: BarChart3,
    title: "Get Footprint Report",
    description: "Receive detailed analytics and visualizations of your carbon emissions with trend analysis.",
  },
  {
    step: "03",
    icon: Target,
    title: "Follow Smart Tips & Earn Rewards",
    description:
      "Implement personalized recommendations and earn points as you progress toward your sustainability goals.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">How GreenPrint Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Three simple steps to start your journey toward a more sustainable lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full text-center border-border/50 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-accent-foreground">{step.step}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground mb-2">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
