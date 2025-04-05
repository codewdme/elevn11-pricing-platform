"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">ELEVN 11</span>
          </div>

          <div className="flex items-center gap-4">
            <Button size="sm">
              <Link href="/custom-builder">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                Flexible Content Creation, Your Way
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Build your perfect content package by selecting exactly what you
                need. Mix and match different types of shoots, edits, and
                add-ons.
              </p>
              <div className="flex justify-center mt-6">
                <Link href="/custom-builder">
                  <Button size="lg">
                    Build Your Custom Package{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <Alert className="border-primary/20 bg-primary/5 max-w-5xl mx-auto mb-8">
          <AlertDescription className="text-center font-medium">
            Use code <span className="font-bold">ELEVEN11@2025</span> to get 25%
            OFF
            <span className="block text-sm text-muted-foreground mt-1">
              (Auto-applies discount if entered at checkout)
            </span>
          </AlertDescription>
        </Alert>

        {/* Features Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-2 p-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                    <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"></path>
                    <path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Customizable Packages</h3>
                <p className="text-muted-foreground">
                  Mix and match different types of shoots, edits, and add-ons to
                  create your perfect package.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <path d="M12 2H2v10h10V2Z"></path>
                    <path d="M22 12h-4v4h4v-4Z"></path>
                    <path d="M6 22v-4"></path>
                    <path d="M18 22v-4"></path>
                    <path d="M12 22v-4"></path>
                    <path d="M12 12v4"></path>
                    <path d="M6 12v4"></path>
                    <path d="M18 12v4"></path>
                    <path d="M18 2v6"></path>
                    <path d="M12 6h6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Transparent Pricing</h3>
                <p className="text-muted-foreground">
                  See exactly what you're paying for with real-time pricing
                  updates as you build your package.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    <path d="m14.5 9-5 5"></path>
                    <path d="m9.5 9 5 5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Quality Guaranteed</h3>
                <p className="text-muted-foreground">
                  All our services come with a satisfaction guarantee and
                  unlimited revisions within scope.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-muted">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-[800px] space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to create your custom package?
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Our custom builder makes it easy to select exactly what you need
                for your content creation journey.
              </p>
              <div className="flex justify-center mt-6">
                <Link href="/custom-builder">
                  <Button size="lg">
                    Start Building Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ELEVN 11. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 md:gap-6">
            {/* <Link
              href="/terms"
              className="text-xs md:text-sm text-muted-foreground hover:underline underline-offset-4"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-xs md:text-sm text-muted-foreground hover:underline underline-offset-4"
            >
              Privacy
            </Link> */}
            <Link
              href="tel:+918058890919"
              className="text-xs md:text-sm text-muted-foreground hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
