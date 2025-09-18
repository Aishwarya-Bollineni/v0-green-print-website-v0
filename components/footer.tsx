import { Button } from "@/components/ui/button"
import { Leaf, Github, Mail, Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Join thousands of users who are already reducing their carbon footprint with GreenPrint.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg">
            Join the Green Movement
          </Button>
        </div>

        {/* Footer Links */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent rounded-full">
                <Leaf className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">GreenPrint</span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Mail className="w-4 h-4" />
                Contact
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Shield className="w-4 h-4" />
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Github className="w-4 h-4" />
                GitHub Repo
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">© 2025 GreenPrint. Built with 💚 for a sustainable future.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
