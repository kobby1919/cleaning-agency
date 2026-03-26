import { motion } from "framer-motion";

const REASONS = [
  {
    icon: "🏆",
    title: "Premium Quality",
    desc: "We use only professional-grade, eco-safe cleaning products — delivering a finish that looks and feels exceptional every time.",
  },
  {
    icon: "🔒",
    title: "Fully Insured & Vetted",
    desc: "Every member of our team is background-checked, trained, and covered — so you can trust us in your home with complete peace of mind.",
  },
  {
    icon: "⚡",
    title: "Reliable & On Time",
    desc: "We show up when we say we will. No excuses, no delays. Your time is valuable and we treat it that way.",
  },
  {
    icon: "💬",
    title: "Tailored to You",
    desc: "No two homes are the same. We listen, adapt, and deliver a cleaning experience built around your specific needs and schedule.",
  },
];

const NUMBERS = [
  { value: "2,400+", label: "Homes Cleaned" },
  { value: "98%",    label: "Satisfaction Rate" },
  { value: "6",      label: "Years in Business" },
  { value: "50+",    label: "Regular Clients" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function WhyUs() {
  return (
    <section id="about" className="whyus-section">

      {/* Top gold line */}
      <div className="whyus-top-line" />

      <div className="whyus-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="whyus-header"
        >
          <div className="services-label">
            <div className="services-label-line" />
            <span>Why Baba & Co</span>
            <div className="services-label-line" />
          </div>
          <h2 className="whyus-heading">
            The Standard Others <br />
            <em>Aspire To</em>
          </h2>
          <p className="whyus-subtext">
            We don't just clean — we care. Here's what sets us apart from
            every other cleaning service in Accra.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="whyus-grid">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="whyus-card"
            >
              <span className="whyus-card-icon">{r.icon}</span>
              <div className="whyus-card-line" />
              <h3 className="whyus-card-title">{r.title}</h3>
              <p className="whyus-card-desc">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Numbers bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="whyus-numbers"
        >
          {NUMBERS.map((n, i) => (
            <div
              key={n.label}
              className={`whyus-number ${i < NUMBERS.length - 1 ? "whyus-number--border" : ""}`}
            >
              <span className="whyus-number-value">{n.value}</span>
              <span className="whyus-number-label">{n.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
