import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    icon: "🏗️",
    title: "Post-Construction Cleaning",
    tagline: "From site to spotless.",
    desc: "We handle the heavy aftermath of construction — removing dust, debris, paint residue, and cement stains to leave your newly built space pristine and move-in ready.",
    includes: [
      "Dust & debris removal",
      "Paint & cement spot cleaning",
      "Window & glass polishing",
      "Floor scrubbing & finishing",
      "Fixture & fitting wipe-down",
    ],
    featured: true,
  },
  {
    icon: "✨",
    title: "Deep Cleaning",
    tagline: "Every corner. No exceptions.",
    desc: "A thorough top-to-bottom clean that goes beyond the surface — tackling built-up grime, hidden dust, and neglected areas for a truly fresh home.",
    includes: [
      "Inside appliances & cabinets",
      "Grout & tile scrubbing",
      "Skirting boards & vents",
      "Behind furniture cleaning",
      "Bathroom deep sanitisation",
    ],
    featured: false,
  },
  {
    icon: "🗓️",
    title: "Regular Maintenance",
    tagline: "Clean home, every week.",
    desc: "Scheduled weekly or monthly visits to keep your home consistently clean without the hassle. We work around your routine so you never have to think about it.",
    includes: [
      "Dusting & vacuuming",
      "Kitchen & bathroom cleaning",
      "Floor mopping & polishing",
      "Rubbish removal",
      "Flexible scheduling",
    ],
    featured: false,
  },
  {
    icon: "📦",
    title: "Move-In / Move-Out",
    tagline: "Leave it better than you found it.",
    desc: "Whether you're arriving or departing, we ensure the space is immaculate. Perfect for landlords, tenants, and property managers.",
    includes: [
      "Full property clean-through",
      "Inside cupboards & drawers",
      "Wall marks & scuff removal",
      "Oven & fridge deep clean",
      "End-of-tenancy ready",
    ],
    featured: false,
  },
  {
    icon: "🏢",
    title: "Office & Commercial",
    tagline: "Professional spaces deserve professional care.",
    desc: "We keep your workplace clean, hygienic, and presentable — because a clean office is a productive office. Available for daily, weekly or one-off cleans.",
    includes: [
      "Workstations & common areas",
      "Toilets & kitchen sanitisation",
      "Reception & meeting rooms",
      "Bin emptying & restocking",
      "After-hours availability",
    ],
    featured: false,
  },
  {
    icon: "🪟",
    title: "Specialised Cleaning",
    tagline: "The details others miss.",
    desc: "Targeted cleaning for specific needs — carpets, upholstery, windows, and more. Ideal as a standalone service or as an add-on to any booking.",
    includes: [
      "Carpet & rug shampooing",
      "Sofa & upholstery cleaning",
      "Interior & exterior windows",
      "Pressure washing",
      "Curtain & blind cleaning",
    ],
    featured: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function Services() {
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="services" className="services-section">

      {/* Background */}
      <div className="services-bg" />

      <div className="services-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="services-header"
        >
          <div className="services-label">
            <div className="services-label-line" />
            <span>What We Offer</span>
            <div className="services-label-line" />
          </div>
          <h2 className="services-heading">
            Cleaning Services <br />
            <em>Tailored to You</em>
          </h2>
          <p className="services-subtext">
            From post-construction to regular upkeep — we bring the same level of care,
            precision, and premium finish to every job we take on.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="services-grid">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className={`service-card ${service.featured ? "service-card--featured" : ""}`}
            >
              {/* Featured tag */}
              {service.featured && (
                <div className="service-card-tag">Most Requested</div>
              )}

              {/* Icon */}
              <div className="service-card-icon">{service.icon}</div>

              {/* Title + tagline */}
              <div className="service-card-titles">
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-tagline">{service.tagline}</p>
              </div>

              {/* Description */}
              <p className="service-card-desc">{service.desc}</p>

              {/* Divider */}
              <div className="service-card-divider" />

              {/* Includes list */}
              <ul className="service-card-list">
                {service.includes.map((item) => (
                  <li key={item} className="service-card-list-item">
                    <span className="service-card-check">✦</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => scrollTo("#contact")}
                className="service-card-cta"
              >
                Book This Service
                <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="services-bottom-cta"
        >
          <p className="services-bottom-text">
            Not sure which service you need?
          </p>
          <button
            onClick={() => scrollTo("#contact")}
            className="hero-btn-primary"
          >
            Get a Free Consultation <ArrowRight size={16} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
