import { Button } from "@/components/ui/button"
import { Leaf, Zap, TreePine } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-accent/10 py-20 lg:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="p-3 bg-accent rounded-full">
              <Leaf className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">GreenPrint</h1>
          </div>

          {/* Main heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
            <span className="text-foreground">Track. Optimize.</span> <span className="text-accent">Live Green.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto leading-relaxed">
            Monitor your carbon footprint with precision, get personalized recommendations, and join a community
            committed to sustainable living.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
              Calculate My Carbon Footprint
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-transparent">
              Learn More
            </Button>
          </div>

          {/* Hero illustration placeholder */}
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-lg border">
              <div className="grid grid-cols-3 gap-6 items-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TreePine className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-sm text-muted-foreground">Sustainable Living</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Smart Optimization</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-sm text-muted-foreground">Carbon Tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
