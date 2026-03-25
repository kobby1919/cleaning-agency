import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { name: "Home",         href: "#home" },
  { name: "Services",     href: "#services" },
  { name: "About",        href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`navbar ${scrolled ? "scrolled" : ""}`}
    >
      <div className="navbar-inner">

        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
          whileHover={{ scale: 1.03 }}
          className="navbar-logo"
        >
          <div className="navbar-logo-icon">
            <Sparkles size={18} color="#0a1128" />
          </div>
          <span className="navbar-logo-text">
            Baba <span>&</span> Co
          </span>
        </motion.a>

        {/* Desktop links */}
        <div className="navbar-links">
          {NAV_LINKS.map(link => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              whileHover={{ y: -1 }}
              className={`navbar-link ${active === link.href.slice(1) ? "active" : ""}`}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#contact")}
            className="navbar-cta"
          >
            Get a Quote
          </motion.button>
        </div>

        {/* Mobile burger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="navbar-burger"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="navbar-mobile-menu"
          >
            <div className="navbar-mobile-menu-inner">
              {NAV_LINKS.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="navbar-mobile-link"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className="navbar-mobile-cta"
              >
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
