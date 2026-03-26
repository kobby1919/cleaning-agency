import CTABanner from "../components/CTABanner";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import WhyUs from "../components/WhyUs";

export default function Home() {
  return (
    <main>
        <Hero />
        <Services />
        <WhyUs />
        <Testimonials />
        <CTABanner />
    </main>
  )
}