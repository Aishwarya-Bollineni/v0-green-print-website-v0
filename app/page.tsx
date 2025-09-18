import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { DashboardPreview } from "@/components/dashboard-preview"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DashboardPreview />

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Green Journey?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already tracking and reducing their carbon footprint with GreenPrint.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Launch Dashboard
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
