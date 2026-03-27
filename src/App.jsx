import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";

// ── Lenis smooth scroll ───────────────────────────────────────────────────────
// Install: npm install lenis
//
// Lenis gives you buttery inertia-based scrolling without fighting the browser's
// native scroll events. Framer Motion's whileInView / useScroll hooks work with
// it out of the box because Lenis still fires native scroll events under the hood.

function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,          // scroll duration multiplier — higher = slower/smoother
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      smoothWheel: true,      // smooth mouse wheel
      touchMultiplier: 1.5,   // feel on mobile — keep close to 1 so it doesn't feel floaty
      infinite: false,
    });

    lenisRef.current = lenis;

    // Drive Lenis with requestAnimationFrame — this is the recommended pattern
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}

// ── Scroll to top on route change ────────────────────────────────────────────
// We tell Lenis to jump instantly (no smooth scroll) on route changes so the
// user always starts at the top of a new page, not midway through an animation.

function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (lenisRef.current) {
      // immediate: true bypasses the inertia so page snaps to top instantly
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenisRef]);

  return null;
}

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  const lenisRef = useLenis();

  return (
    <>
      <ScrollToTop lenisRef={lenisRef} />
      <Header />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/about"    element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact"  element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
