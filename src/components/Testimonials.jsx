import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Abena Mensah",
    role: "Homeowner, East Legon",
    initials: "AM",
    rating: 5,
    text: "Baba & Co transformed our newly built home after construction. The level of detail and care they put in was outstanding — every surface spotless, every corner attended to. I couldn't believe it was the same house.",
  },
  {
    name: "Kwame Boateng",
    role: "Property Manager, Airport Hills",
    initials: "KB",
    rating: 5,
    text: "I manage multiple properties and Baba & Co is the only cleaning service I trust for move-in and move-out cleans. They are reliable, professional, and the results speak for themselves. My tenants always comment on the cleanliness.",
  },
  {
    name: "Efua Darko",
    role: "Business Owner, Osu",
    initials: "ED",
    rating: 5,
    text: "We hired them for our office and it has been a fantastic experience. They come on schedule, work quietly and efficiently, and our workspace has never looked better. Highly recommend for commercial spaces.",
  },
  {
    name: "Nana Ama Asante",
    role: "Homeowner, Tema",
    initials: "NA",
    rating: 5,
    text: "The deep clean they did on our home before Christmas was exceptional. Every appliance, every tile, every surface. My husband and I were genuinely impressed. We've now signed up for monthly maintenance.",
  },
  {
    name: "Samuel Ofori",
    role: "Real Estate Developer",
    initials: "SO",
    rating: 5,
    text: "As a developer, post-construction cleaning is always a headache. Baba & Co took that headache away completely. Fast, thorough, and professional. They are now my go-to for every project handover.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoplay]);

  const prev = () => { setAutoplay(false); setCurrent(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); };
  const next = () => { setAutoplay(false); setCurrent(prev => (prev + 1) % TESTIMONIALS.length); };

  const t = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="testimonials-section">

      {/* Gold top line */}
      <div className="testimonials-top-line" />

      <div className="testimonials-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="testimonials-header"
        >
          <div className="services-label">
            <div className="services-label-line" />
            <span>Client Stories</span>
            <div className="services-label-line" />
          </div>
          <h2 className="testimonials-heading">
            What Our Clients <br />
            <em>Say About Us</em>
          </h2>
        </motion.div>

        {/* Card + arrows */}
        <div className="testimonials-card-wrap">

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="testimonials-card"
            >
              {/* Big decorative quote */}
              <span className="testimonials-quote">"</span>

              {/* Stars */}
              <div className="testimonials-stars">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--gold-400)" color="var(--gold-400)" />
                ))}
              </div>

              {/* Text */}
              <p className="testimonials-text">{t.text}</p>

              {/* Author */}
              <div className="testimonials-author">
                <div className="testimonials-avatar">{t.initials}</div>
                <div>
                  <p className="testimonials-name">{t.name}</p>
                  <p className="testimonials-role">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Desktop arrows */}
          <button onClick={prev} className="testimonials-arrow testimonials-arrow--left">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="testimonials-arrow testimonials-arrow--right">
            <ChevronRight size={20} />
          </button>

        </div>

        {/* Mobile arrows */}
        <div className="testimonials-mobile-arrows">
          <button onClick={prev} className="testimonials-arrow-mobile">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="testimonials-arrow-mobile">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="testimonials-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAutoplay(false); setCurrent(i); }}
              className={`testimonials-dot ${i === current ? "testimonials-dot--active" : ""}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
