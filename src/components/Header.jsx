import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { name: "Home",         href: "/",              anchor: null },
  { name: "Services",     href: "/services",      anchor: null },
  { name: "About",        href: "/about",         anchor: null },
];

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("/");

  const location  = useLocation();
  const navigate  = useNavigate();
  const isHome    = location.pathname === "/";

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsOpen(false);

    if (link.anchor) {
      // Has anchor — go home first if not already there, then scroll
      if (!isHome) {
        navigate("/");
        setTimeout(() => {
          document.querySelector(link.anchor)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        document.querySelector(link.anchor)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(link.href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isLinkActive = (link) => {
    if (link.anchor) return false;
    if (link.href === "/" && location.pathname === "/") return true;
    if (link.href !== "/" && location.pathname.startsWith(link.href)) return true;
    return false;
  };

  const goToContact = () => {
    setIsOpen(false);
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`navbar ${!isHome || scrolled || isOpen ? "scrolled" : ""}`}
    >
      <div className="navbar-inner">

        {/* Logo */}
        <motion.div whileHover={{ scale: 1.03 }}>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="navbar-logo"
          >
            <div className="navbar-logo-icon">
              <Sparkles size={18} color="#0a1128" />
            </div>
            <span className="navbar-logo-text">
              Baba <span>&</span> Co
            </span>
          </Link>
        </motion.div>

        {/* Desktop links */}
        <div className="navbar-links">
          {NAV_LINKS.map(link => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              whileHover={{ y: -1 }}
              className={`navbar-link ${isLinkActive(link) ? "active" : ""}`}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={goToContact}
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
                  onClick={(e) => handleNavClick(e, link)}
                  className={`navbar-mobile-link ${isLinkActive(link) ? "active" : ""}`}
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={goToContact}
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
