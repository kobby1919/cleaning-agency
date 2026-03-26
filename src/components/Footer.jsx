import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Globe, Link as LinkIcon, Rss, Video, ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const QUOTE = {
  text: "Cleanliness is not a luxury — it is a quiet confidence, a standard that speaks before you do.",
  attr: "Baba & Co.",
};

const QUICK_LINKS = [
  { name: "Home",         href: "/",         anchor: null },
  { name: "Services",     href: "/services", anchor: null },
  { name: "About Us",     href: "/about",    anchor: null },
  { name: "Contact",      href: "/contact",  anchor: null },
];

const SERVICE_LINKS = [
  { name: "Post-Construction",  href: "/services", anchor: "#post-construction" },
  { name: "Deep Cleaning",      href: "/services", anchor: "#deep-cleaning" },
  { name: "Regular Maintenance",href: "/services", anchor: "#regular-maintenance" },
  { name: "Move-In / Move-Out", href: "/services", anchor: "#move-in-out" },
  { name: "Office & Commercial",href: "/services", anchor: "#office-commercial" },
  { name: "Specialised",        href: "/services", anchor: "#specialised" },
];

const SOCIALS = [
  { icon: <Globe size={17} />, label: "Instagram", href: "#" },
  { icon: <LinkIcon size={17} />, label: "Facebook",  href: "#" },
  { icon: <Rss size={17} />, label: "Twitter",   href: "#" },
  { icon: <Video size={17} />, label: "YouTube",   href: "#" },
];

export default function Footer() {
  const navigate = useNavigate();

  const handleLink = (e, href, anchor) => {
    e.preventDefault();
    if (anchor) {
      navigate(href);
      setTimeout(() => {
        document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">

      {/* ── Gold top line ── */}
      <div className="footer-top-line" />

      {/* ── Main grid ── */}
      <div className="footer-main">

        {/* Col 1 — Brand */}
        <div className="footer-brand">
          <Link
            to="/"
            onClick={e => { e.preventDefault(); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="footer-logo"
          >
            <div className="footer-logo-icon">
              <Sparkles size={16} color="#0a1128" />
            </div>
            <span className="footer-logo-text">Baba <em>&</em> Co</span>
          </Link>

          <p className="footer-brand-desc">
            Premium cleaning services across Greater Accra.
            Post-construction, deep cleans, regular maintenance,
            and everything in between — delivered to an uncompromising standard.
          </p>

          {/* Quote */}
          <blockquote className="footer-quote">
            <span className="footer-quote-mark">"</span>
            <p className="footer-quote-text">{QUOTE.text}</p>
            <cite className="footer-quote-attr">— {QUOTE.attr}</cite>
          </blockquote>

          {/* Contact mini */}
          <div className="footer-contact-mini">
            <a href="tel:+233000000000" className="footer-contact-item">
              <Phone size={13} /> +233 XX XXX XXXX
            </a>
            <a href="mailto:hello@babaandco.com" className="footer-contact-item">
              <Mail size={13} /> hello@babaandco.com
            </a>
            <span className="footer-contact-item">
              <MapPin size={13} /> Accra, Ghana
            </span>
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links">
            {QUICK_LINKS.map(l => (
              <li key={l.name}>
                <a
                  href={l.href}
                  onClick={e => handleLink(e, l.href, l.anchor)}
                  className="footer-link"
                >
                  <ArrowRight size={12} className="footer-link-arrow" />
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Services */}
        <div className="footer-col">
          <h4 className="footer-col-title">Our Services</h4>
          <ul className="footer-links">
            {SERVICE_LINKS.map(l => (
              <li key={l.name}>
                <a
                  href={l.href}
                  onClick={e => handleLink(e, l.href, l.anchor)}
                  className="footer-link"
                >
                  <ArrowRight size={12} className="footer-link-arrow" />
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Social + CTA */}
        <div className="footer-col">
          <h4 className="footer-col-title">Follow Us</h4>
          <p className="footer-social-desc">
            Behind-the-scenes cleans, before &amp; afters, and tips for a
            spotless home — find us online.
          </p>
          <div className="footer-socials">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} aria-label={s.label} className="footer-social-btn">
                {s.icon}
              </a>
            ))}
          </div>

          {/* Mini CTA */}
          <div className="footer-cta-card">
            <p className="footer-cta-label">Ready to book?</p>
            <Link
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="footer-cta-btn"
            >
              Get a Free Quote <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span className="footer-copyright">
            © {new Date().getFullYear()} Baba & Co. All rights reserved.
          </span>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <span className="footer-bottom-sep">·</span>
            <a href="#" className="footer-bottom-link">Terms of Service</a>
          </div>
          <span className="footer-made">
            Made with care in Accra 🇬🇭
          </span>
        </div>
      </div>

    </footer>
  );
}
