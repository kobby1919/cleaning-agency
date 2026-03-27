import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, CheckCircle2, ChevronDown } from "lucide-react";

const STATS = [
  { value: "2,400+", label: "Homes Cleaned" },
  { value: "98%",    label: "Satisfaction Rate" },
  { value: "6 yrs",  label: "In Business" },
];

const BADGES = [
  "Eco-Friendly Products",
  "Background-Checked Staff",
  "Insured & Bonded",
];

export default function HeroCentered({ onBook }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" ref={ref} className="hero hero--centered">

      {/* Background blobs */}
      <div className="hero-blob-1" />
      <div className="hero-blob-2" />
      <div className="hero-blob-3" />

      {/* Gold shimmer lines */}
      <div className="hero-shimmer-lines" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="hero-shimmer-line"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.3 + i * 0.15, ease: "easeOut" }}
            style={{ top: `${12 + i * 14}%` }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <svg className="hero-grid-svg" aria-hidden="true">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--navy-700)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="hero-content hero-content--centered">

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-top-badge"
        >
          <div className="hero-top-badge-dot" />
          <span>Accra's Premier Cleaning Service</span>
          <div className="hero-stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} fill="var(--gold-500)" color="var(--gold-500)" />
            ))}
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="hero-heading hero-heading--centered"
        >
          We Clean So You <br />
          <em>Don't Have To.</em>
        </motion.h1>

        {/* Gold divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-gold-divider"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="hero-subtitle hero-subtitle--centered"
        >
          Professional cleaning for newly built and existing homes — using premium products,
          trained staff, and an obsessive attention to every detail.
        </motion.p>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="hero-trust-badges hero-trust-badges--centered"
        >
          {BADGES.map(b => (
            <span key={b} className="hero-trust-badge">
              <CheckCircle2 size={13} color="var(--gold-500)" strokeWidth={2.5} />
              {b}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="hero-ctas hero-ctas--centered"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onBook?.()}
            className="hero-btn-primary"
          >
            Book a Cleaning <ArrowRight size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#services")}
            className="hero-btn-outline"
          >
            Our Services
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="hero-stats"
        >
          {STATS.map(s => (
            <div key={s.label} className="hero-stat">
              <div className="hero-stat-value">{s.value}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="hero-scroll-cue"
        >
          <ChevronDown size={22} color="var(--gold-400)" />
        </motion.div>

      </motion.div>
    </section>
  );
}
