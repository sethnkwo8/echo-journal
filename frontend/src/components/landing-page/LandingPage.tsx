// frontend/src/components/landing-page/LandingPage.tsx
import { CTA } from "./CTA";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Navbar } from "./Navbar";

export function LandingPage() {
    return (
        <div className="min-h-screen overflow-x-hidden" style={{ background: "#0B0F17" }}>
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <CTA />
            <Footer />
        </div>
    )
}