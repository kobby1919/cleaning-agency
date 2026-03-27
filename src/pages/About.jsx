import { useState } from "react";
import About from "../components/About";
import BookingModal from "../components/BookingModal";

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <About onBook={() => setModalOpen(true)} />
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}