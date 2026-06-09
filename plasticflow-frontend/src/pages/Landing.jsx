import LandingNavbar from "../components/landing/LandingNavbar";
import LandingHero from "../components/landing/LandingHero";
import LandingAbout from "../components/landing/LandingAbout";
import LandingCapabilities from "../components/landing/LandingCapabilities";
import LandingOperations from "../components/landing/LandingOperations";
import LandingPlantNetwork from "../components/landing/LandingPlantNetwork";
import LandingAnalyticsPreview from "../components/landing/LandingAnalyticsPreview";
import LandingTrustScale from "../components/landing/LandingTrustScale";
import LandingFooter from "../components/landing/LandingFooter";
import useLandingData from "../components/landing/useLandingData";

export default function Landing() {
  const { stats } = useLandingData();

  return (
    <div className="landing-site min-h-screen bg-forest text-cream-soft antialiased">
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingAbout stats={stats} />
        <LandingCapabilities />
        <LandingOperations stats={stats} />
        <LandingPlantNetwork />
        <LandingAnalyticsPreview />
        <LandingTrustScale stats={stats} />
      </main>
      <LandingFooter />
    </div>
  );
}
