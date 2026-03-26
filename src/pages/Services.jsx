import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, Shield, Star, Phone, ChevronDown, ChevronUp } from "lucide-react";
import BookingModal from "../components/BookingModal";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "post-construction",
    icon: "🏗️",
    title: "Post-Construction Cleaning",
    tagline: "From site to spotless.",
    shortDesc:
      "We handle the heavy aftermath of construction — removing dust, debris, paint residue, and cement stains to leave your newly built space pristine and move-in ready.",
    fullDesc: `Construction leaves behind more than just a finished structure — it leaves layers of fine dust that penetrate every surface, paint splatters on windows and floors, cement residue on tiles, silicone and adhesive remnants on fixtures, and debris in every corner. Standard cleaning simply cannot handle this level of contamination.

Our post-construction team is equipped with industrial-grade tools and specialised cleaning agents specifically formulated to break down construction residue without damaging your new surfaces. We work methodically from top to bottom, ensuring every surface is professionally treated before we leave.

Whether it's a new build, a full renovation, or a single-room fit-out, we deliver a space that is truly move-in ready — not just visually clean, but hygienically clean.`,
    includes: [
      "Fine dust removal from all surfaces, walls, and ceilings",
      "Paint, cement, and adhesive spot cleaning",
      "Window and glass polishing (interior & exterior)",
      "Floor scrubbing, polishing, and finishing",
      "Fixture, fitting, and hardware wipe-down",
      "Debris collection and removal",
      "Grout cleaning and tile polishing",
      "Ventilation and air duct wipe-down",
    ],
    idealFor: ["New builds & developments", "Home renovations", "Commercial fit-outs", "Office refurbishments"],
    duration: "4–12 hours depending on property size",
    featured: true,
    faq: [
      {
        q: "How soon after construction can you clean?",
        a: "We recommend waiting until all trades have fully finished and left the site. We can usually be on-site within 48–72 hours of your request.",
      },
      {
        q: "Do you supply all equipment and products?",
        a: "Yes — we bring everything. Industrial vacuums, specialised cleaning agents, microfibre systems, and all protective equipment.",
      },
    ],
  },
  {
    id: "deep-cleaning",
    icon: "✨",
    title: "Deep Cleaning",
    tagline: "Every corner. No exceptions.",
    shortDesc:
      "A thorough top-to-bottom clean that goes beyond the surface — tackling built-up grime, hidden dust, and neglected areas for a truly fresh home.",
    fullDesc: `A regular clean maintains your home's appearance — a deep clean restores it. Over time, grime accumulates behind appliances, inside cabinet hinges, along skirting boards, inside oven cavities, and in grout lines. It builds invisibly until your home feels perpetually 'not quite clean', no matter how often you tidy.

Our deep clean is a comprehensive, systematic treatment of your entire property. We move furniture, clean behind and underneath it. We empty and clean inside cabinets. We scrub grout lines, degrease oven interiors, descale bathroom fixtures, and treat every surface that regular cleaning skips.

The result is a home that doesn't just look clean — it smells fresh, feels lighter, and actually is clean at a cellular level.`,
    includes: [
      "Inside appliances: oven, fridge, microwave, dishwasher",
      "Inside and behind all cabinets and drawers",
      "Grout scrubbing and tile deep-clean",
      "Skirting boards, door frames, and light switches",
      "Behind and under furniture",
      "Bathroom full descaling and sanitisation",
      "Window sills and interior window frames",
      "Air vents and extractor fan cleaning",
    ],
    idealFor: ["Homes not deep-cleaned in 6+ months", "Pre or post-event cleaning", "Seasonal refresh", "New home takeover"],
    duration: "5–10 hours depending on property size",
    featured: false,
    faq: [
      {
        q: "How often should I get a deep clean?",
        a: "We recommend every 3–6 months, supplemented by regular maintenance cleans in between. Many clients book a deep clean at the start of each season.",
      },
      {
        q: "Do I need to be home during the clean?",
        a: "Not at all. Many clients hand over keys and return to a transformed home. We are fully insured and bonded.",
      },
    ],
  },
  {
    id: "regular-maintenance",
    icon: "🗓️",
    title: "Regular Maintenance",
    tagline: "Clean home, every week.",
    shortDesc:
      "Scheduled weekly or monthly visits to keep your home consistently clean without the hassle. We work around your routine so you never have to think about it.",
    fullDesc: `Consistency is the foundation of a truly clean home. Our regular maintenance service gives you a dedicated cleaning schedule — the same trusted team, the same meticulous standards, every visit.

We build a custom cleaning plan around your home's specific needs and your lifestyle. You tell us your priorities, your schedule, and your preferences — we handle the rest. Over time, our team learns your home intimately: where the dust accumulates fastest, which surfaces need extra attention, what products work best on your floors.

The result is a home that is always guest-ready, always fresh, without you having to lift a finger or think about it.`,
    includes: [
      "Full dusting of all surfaces and furniture",
      "Vacuuming all floors, carpets, and upholstery",
      "Kitchen cleaning: surfaces, hob, and sink",
      "Bathroom cleaning and sanitisation",
      "Floor mopping and polishing",
      "Rubbish removal and bin lining",
      "Bed-making and linen change (on request)",
      "Flexible scheduling: weekly, fortnightly, or monthly",
    ],
    idealFor: ["Busy professionals", "Families with young children", "Rental properties", "Elderly clients"],
    duration: "2–5 hours per visit",
    featured: false,
    faq: [
      {
        q: "Can I pause or reschedule visits?",
        a: "Absolutely. We ask for 48 hours notice for rescheduling. Life happens — we're flexible.",
      },
      {
        q: "Will I always get the same team?",
        a: "We always aim to send the same team. Familiarity with your home means a better, more efficient clean every time.",
      },
    ],
  },
  {
    id: "move-in-out",
    icon: "📦",
    title: "Move-In / Move-Out",
    tagline: "Leave it better than you found it.",
    shortDesc:
      "Whether you're arriving or departing, we ensure the space is immaculate. Perfect for landlords, tenants, and property managers.",
    fullDesc: `Moving is stressful. The last thing you need is to worry about the state of the property you're leaving or the one you're moving into. Our move-in / move-out clean takes that entirely off your plate.

For tenants moving out: we deliver a professional end-of-tenancy standard clean that satisfies even the most particular landlords and inventory clerks, protecting your deposit and your reputation.

For tenants moving in: we deep clean the property before your belongings arrive, so you start your new chapter in a genuinely fresh, hygienic home.

For landlords and property managers: we turn around properties quickly and to a consistent, lettable standard between tenancies — minimising void periods and maximising your rental income.`,
    includes: [
      "Full property clean-through (all rooms)",
      "Inside all cupboards, drawers, and wardrobes",
      "Wall marks, scuffs, and fingerprint removal",
      "Oven and fridge deep clean",
      "Bathroom and toilet descaling and sanitisation",
      "Window cleaning (interior)",
      "Carpet vacuuming and spot treatment",
      "All floors mopped and polished",
    ],
    idealFor: ["Outgoing tenants", "Incoming tenants", "Landlords & letting agents", "Property managers"],
    duration: "4–8 hours depending on property size",
    featured: false,
    faq: [
      {
        q: "Will this help me get my deposit back?",
        a: "Our end-of-tenancy cleans are performed to inventory standard and have an excellent track record with deposit disputes. We can provide a cleaning receipt if needed.",
      },
      {
        q: "How quickly can you schedule a move-out clean?",
        a: "We can often accommodate short-notice bookings within 48–72 hours. Contact us with your move-out date as early as possible.",
      },
    ],
  },
  {
    id: "office-commercial",
    icon: "🏢",
    title: "Office & Commercial",
    tagline: "Professional spaces deserve professional care.",
    shortDesc:
      "We keep your workplace clean, hygienic, and presentable — because a clean office is a productive office. Available for daily, weekly, or one-off cleans.",
    fullDesc: `Your workplace is a direct reflection of your brand. A clean, well-maintained office signals professionalism to clients, boosts employee morale, and reduces sick days caused by bacteria and allergens. A dirty one does the opposite.

Our commercial cleaning team is trained to work in professional environments — discreetly, efficiently, and to a consistently high standard. We offer flexible scheduling including early morning, evening, and weekend slots so our work never interrupts yours.

From a boutique studio to a multi-floor corporate office, we build a bespoke cleaning programme around your specific space, usage patterns, and industry requirements.`,
    includes: [
      "Workstations, desks, and monitors (anti-static clean)",
      "Common areas: reception, corridors, and breakout spaces",
      "Kitchen and staff room deep clean",
      "Toilet and bathroom sanitisation and restocking",
      "Meeting rooms and boardroom preparation",
      "Bin emptying and replacement liners",
      "Floor vacuuming and mopping",
      "After-hours and weekend availability",
    ],
    idealFor: ["Corporate offices", "Retail spaces", "Clinics and healthcare settings", "Studios and creative spaces"],
    duration: "Bespoke schedule — daily, weekly, or monthly",
    featured: false,
    faq: [
      {
        q: "Can you clean outside business hours?",
        a: "Yes. We offer early morning (from 6am), evening, and weekend slots as standard for commercial clients.",
      },
      {
        q: "Are your staff vetted?",
        a: "All team members are background-checked, fully insured, and have signed confidentiality agreements — suitable for sensitive business environments.",
      },
    ],
  },
  {
    id: "specialised",
    icon: "🪟",
    title: "Specialised Cleaning",
    tagline: "The details others miss.",
    shortDesc:
      "Targeted cleaning for specific needs — carpets, upholstery, windows, and more. Ideal as a standalone service or as an add-on to any booking.",
    fullDesc: `Some cleaning tasks require specialist equipment, specialist knowledge, and specialist products. Our specialised cleaning services address the areas that standard cleaning can't properly treat — and that DIY attempts often damage.

Carpet cleaning with professional hot-water extraction removes deep-set dirt, allergens, and odours that vacuuming simply cannot reach. Upholstery cleaning uses fabric-appropriate techniques to refresh sofas and chairs without shrinking or staining. Pressure washing transforms grimy exterior surfaces. Window cleaning with pure water systems delivers streak-free results.

Each specialised service can be booked standalone or added on to any other cleaning package.`,
    includes: [
      "Carpet & rug hot-water extraction shampooing",
      "Sofa and upholstery deep clean",
      "Interior and exterior window cleaning",
      "Pressure washing (driveways, patios, exterior walls)",
      "Curtain and blind cleaning",
      "Mattress sanitisation and deodorising",
      "Hard floor restoration and polishing",
      "Tile and grout restoration",
    ],
    idealFor: ["Allergy sufferers", "Post-pet or post-party clean-up", "Spring or seasonal refresh", "Pre-sale property preparation"],
    duration: "Varies by service — from 1 hour",
    featured: false,
    faq: [
      {
        q: "How long does carpet drying take after shampooing?",
        a: "Typically 4–8 hours depending on carpet thickness and ventilation. We recommend booking on a day when the area can be left undisturbed.",
      },
      {
        q: "Can specialised services be added to my regular clean?",
        a: "Yes — any specialised service can be added as an extra to your regular, deep, or move-in/out clean.",
      },
    ],
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Request a Booking", desc: "Fill in our simple booking form with your details, service type, and preferred date. Takes less than 2 minutes." },
  { step: "02", title: "Free Site Visit", desc: "We visit your property at no charge, assess the scope of work, and provide a clear, transparent quote on the spot." },
  { step: "03", title: "We Get to Work", desc: "On the agreed date, our professional team arrives fully equipped and gets to work — you don't need to lift a finger." },
  { step: "04", title: "Spotless Results", desc: "We do a final walkthrough with you to ensure everything meets our standard. If anything isn't right, we fix it — guaranteed." },
];

const TRUST_POINTS = [
  { icon: <Shield size={20} />, label: "Fully insured & bonded" },
  { icon: <Star size={20} />,   label: "Vetted & trained team" },
  { icon: <Clock size={20} />,  label: "On-time, every time" },
  { icon: <CheckCircle size={20} />, label: "Satisfaction guaranteed" },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: "easeOut" },
  }),
};

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`sp-faq-item ${open ? "open" : ""}`}>
      <button className="sp-faq-question" onClick={() => setOpen(o => !o)}>
        <span>{question}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <AnimateHeight open={open}>
        <p className="sp-faq-answer">{answer}</p>
      </AnimateHeight>
    </div>
  );
}

function AnimateHeight({ open, children }) {
  return (
    <motion.div
      initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Service Card (summary grid at top) ───────────────────────────────────────

function ServiceCard({ service, index, onBook }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`service-card ${service.featured ? "service-card--featured" : ""}`}
    >
      {service.featured && <div className="service-card-tag">Most Requested</div>}
      <div className="service-card-icon">{service.icon}</div>
      <div className="service-card-titles">
        <h3 className="service-card-title">{service.title}</h3>
        <p className="service-card-tagline">{service.tagline}</p>
      </div>
      <p className="service-card-desc">{service.shortDesc}</p>
      <div className="service-card-divider" />
      <ul className="service-card-list">
        {service.includes.slice(0, 5).map(item => (
          <li key={item} className="service-card-list-item">
            <span className="service-card-check">✦</span>
            {item}
          </li>
        ))}
      </ul>
      <button onClick={() => onBook(service.title)} className="service-card-cta">
        Book This Service <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}

// ─── Service Detail (expanded section) ────────────────────────────────────────

function ServiceDetail({ service, index, onBook }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      id={service.id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sp-detail ${isEven ? "sp-detail--even" : "sp-detail--odd"}`}
    >
      <div className="sp-detail-inner">
        {/* Left / Content */}
        <div className="sp-detail-content">
          <div className="sp-detail-eyebrow">
            <span className="sp-detail-icon">{service.icon}</span>
            <span className="sp-detail-tagline">{service.tagline}</span>
          </div>
          <h2 className="sp-detail-title">{service.title}</h2>
          <div className="sp-detail-body">
            {service.fullDesc.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Ideal For */}
          <div className="sp-detail-ideal">
            <span className="sp-detail-ideal-label">Ideal for:</span>
            <div className="sp-detail-ideal-tags">
              {service.idealFor.map(tag => (
                <span key={tag} className="sp-detail-ideal-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="sp-detail-duration">
            <Clock size={14} />
            <span>{service.duration}</span>
          </div>

          <button onClick={() => onBook(service.title)} className="sp-detail-cta">
            Book {service.title} <ArrowRight size={15} />
          </button>
        </div>

        {/* Right / Includes + FAQ */}
        <div className="sp-detail-aside">
          {/* What's included */}
          <div className="sp-detail-includes">
            <h4 className="sp-detail-includes-title">What's Included</h4>
            <ul className="sp-detail-includes-list">
              {service.includes.map(item => (
                <li key={item} className="sp-detail-includes-item">
                  <CheckCircle size={14} className="sp-detail-check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          {service.faq?.length > 0 && (
            <div className="sp-detail-faq">
              <h4 className="sp-detail-faq-title">Common Questions</h4>
              {service.faq.map(faq => (
                <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
              ))}
            </div>
          )}

          {/* Pricing note */}
          <div className="sp-detail-price-note">
            <span>💬</span>
            <div>
              <strong>Transparent Pricing</strong>
              <p>Pricing is confirmed after a free, no-obligation site visit. We assess the scope and give you a clear quote on the spot — no hidden fees.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [modalOpen, setModalOpen]         = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openBooking = (serviceName = "") => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="sp-hero">
        <div className="sp-hero-bg" />
        <div className="sp-hero-container">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="sp-hero-content"
          >
            <div className="sp-hero-label">
              <div className="sp-hero-label-dot" />
              Professional Cleaning Services
            </div>
            <h1 className="sp-hero-heading">
              Every Service, <br />
              <em>Delivered with Precision</em>
            </h1>
            <p className="sp-hero-sub">
              From post-construction clears to regular maintenance — six specialist
              services, one consistent standard of excellence.
            </p>
            <div className="sp-hero-trust">
              {TRUST_POINTS.map(p => (
                <div key={p.label} className="sp-hero-trust-item">
                  {p.icon}
                  <span>{p.label}</span>
                </div>
              ))}
            </div>
            <div className="sp-hero-ctas">
              <button onClick={() => openBooking()} className="hero-btn-primary">
                Book a Service <ArrowRight size={16} />
              </button>
              <a href="tel:+233000000000" className="sp-hero-call">
                <Phone size={15} />
                Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services Summary Grid ── */}
      <section className="services-section">
        <div className="services-bg" />
        <div className="services-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="services-header"
          >
            <div className="services-label">
              <div className="services-label-line" />
              <span>What We Offer</span>
              <div className="services-label-line" />
            </div>
            <h2 className="services-heading">
              Six Services, <br /><em>One Standard</em>
            </h2>
            <p className="services-subtext">
              Choose the service that fits your need — or scroll down for a full
              breakdown of what each service includes.
            </p>
          </motion.div>

          <div className="services-grid">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} onBook={openBooking} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="sp-process">
        <div className="sp-process-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="sp-process-header"
          >
            <div className="services-label">
              <div className="services-label-line" />
              <span>How It Works</span>
              <div className="services-label-line" />
            </div>
            <h2 className="sp-process-heading">
              From Request to <em>Spotless</em>
            </h2>
          </motion.div>

          <div className="sp-process-steps">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="sp-process-step"
              >
                <div className="sp-process-step-num">{step.step}</div>
                <div className="sp-process-connector" />
                <h3 className="sp-process-step-title">{step.title}</h3>
                <p className="sp-process-step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Detailed Service Breakdowns ── */}
      <section className="sp-details">
        <div className="sp-details-header">
          <div className="services-label">
            <div className="services-label-line" />
            <span>In Depth</span>
            <div className="services-label-line" />
          </div>
          <h2 className="sp-details-heading">
            Everything You Need to <em>Know</em>
          </h2>
          <p className="sp-details-sub">
            A full breakdown of every service — what we do, how we do it, and who it's for.
          </p>
        </div>

        {SERVICES.map((service, i) => (
          <ServiceDetail key={service.id} service={service} index={i} onBook={openBooking} />
        ))}
      </section>

      {/* ── Booking CTA Banner ── */}
      <section className="cta-section">
        <div className="cta-blob cta-blob--top" />
        <div className="cta-blob cta-blob--bottom" />
        <div className="cta-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cta-inner"
          >
            <div className="cta-line" />
            <h2 className="cta-heading">
              Ready for a <em>Cleaner Space?</em>
            </h2>
            <p className="cta-subtext">
              Book a service today. We'll visit your property, assess the scope,
              and give you a clear quote — no obligation, no surprises.
            </p>
            <div className="cta-buttons">
              <button onClick={() => openBooking()} className="cta-btn-primary">
                Book Now <ArrowRight size={16} />
              </button>
              <a href="tel:+233000000000" className="cta-btn-outline">
                <Phone size={15} /> Call Us
              </a>
            </div>
            <p className="cta-trust">Free site visit · Transparent pricing · No obligation</p>
          </motion.div>
        </div>
      </section>

      {/* ── Booking Modal ── */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preSelectedService={selectedService}
      />
    </>
  );
}
