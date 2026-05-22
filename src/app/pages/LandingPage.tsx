import { useState } from "react";
import { Navbar } from "../components/navbar";
import { Hero } from "../components/hero";
import { FraudSection } from "../components/fraud-section";
import { HowItWorks } from "../components/how-it-works";
import { Features } from "../components/features";
import { ImpactMetrics } from "../components/impact-metrics";
import { Footer } from "../components/footer";
import { StaticDotGrid } from "../components/StaticDotGrid";
import { ScheduleDemoModal, ContactSalesModal } from "../components/Modals";
import { useTheme } from "../context/ThemeContext";

export function LandingPage() {
  const { c } = useTheme();
  const [demoOpen, setDemoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen relative" style={{ background: c.bg }}>
      <StaticDotGrid />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero onWatchDemo={() => {}} />
        <FraudSection />
        <HowItWorks />
        <Features />
        <ImpactMetrics
          onScheduleDemo={() => setDemoOpen(true)}
          onContactSales={() => setContactOpen(true)}
        />
        <Footer />
      </div>

      <ScheduleDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      <ContactSalesModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
