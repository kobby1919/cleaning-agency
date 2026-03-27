import { useState } from "react";
import CTABanner from "../components/CTABanner";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import WhyUs from "../components/WhyUs";
import BookingModal from "../components/BookingModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openBooking = (serviceName = "") => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  return (
    <main>
        <Hero onBook={openBooking} />
        <Services onBook={openBooking} />
        <WhyUs />
        <Testimonials />
        <CTABanner onBook={openBooking} />
        <BookingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          preSelectedService={selectedService}
        />
    </main>
  )
}