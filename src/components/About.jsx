import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Quote } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

const STORY_MILESTONES = [
  { year: "2018", title: "The Beginning", desc: "Founded by Emmanuel Baba out of a simple belief — that every home deserves to be treated with the same care and precision as a five-star hotel." },
  { year: "2020", title: "First Major Contract", desc: "Secured our first large post-construction cleaning contract with a residential developer in East Legon, cleaning 24 newly built units." },
  { year: "2022", title: "Team Expansion", desc: "Grew from 3 to 12 trained staff. Introduced our signature quality-check system — every job is reviewed before sign-off." },
  { year: "2024", title: "Premium Rebrand", desc: "Rebranded as Baba and Co, reflecting our growth into a full-service premium cleaning agency trusted by homeowners, businesses, and developers." },
];

const VALUES = [
  { icon: "✦", title: "Excellence First", desc: "We do not cut corners. Every surface, every corner, every time — we hold ourselves to a standard that clients notice and remember." },
  { icon: "🤝", title: "Trust and Transparency", desc: "No hidden charges. No surprises. We communicate clearly, show up when we say we will, and deliver exactly what we promise." },
  { icon: "🌿", title: "Eco-Conscious", desc: "We use professional-grade, environmentally responsible cleaning products that are safe for your family, pets, and the planet." },
  { icon: "❤️", title: "Genuine Care", desc: "We treat every home as if it were our own. That level of personal care is what keeps our clients coming back, and referring us to others." },
];

const TEAM = [
  {
    name: "Emmanuel Baba",
    role: "Founder & CEO",
    img: "/images/team/baba.jpg",
    bio: "With over 6 years in the cleaning industry, Emmanuel built Baba and Co from the ground up with a vision to bring premium cleaning standards to Accra. His obsession with quality is the heartbeat of the company.",
  },
  {
    name: "Akosua Frimpong",
    role: "Operations Manager",
    img: "/images/team/akosua.jpg",
    bio: "Akosua oversees all scheduling, logistics, and quality assurance. Her meticulous eye for detail ensures every job meets Baba and Co standards before the team leaves a site.",
  },
  {
    name: "Kofi Mensah",
    role: "Head of Post-Construction",
    img: "/images/team/kofi.jpg",
    bio: "Kofi leads our specialist post-construction team. With a background in civil works, he understands construction sites better than anyone — and knows exactly what it takes to transform them.",
  },
  {
    name: "Abena Darko",
    role: "Client Relations",
    img: "/images/team/abena.jpg",
    bio: "Abena is the friendly voice behind every booking. She works closely with clients to understand their needs, ensure smooth communication, and follow up on every completed job.",
  },
];

const WHY_NUMBERS = [
  { value: "2,400+", label: "Homes and Offices Cleaned" },
  { value: "98%",    label: "Client Satisfaction Rate" },
  { value: "6 yrs",  label: "Years in Business" },
  { value: "12",     label: "Trained Professionals" },
];

const CERTIFICATIONS = [
  "Fully Insured and Bonded",
  "Background-Checked Staff",
  "Eco-Certified Products",
  "Health and Safety Trained",
  "Professional Equipment",
  "Satisfaction Guaranteed",
];

export default function About({ onBook }) {
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="about-page">

      <section className="about-hero">
        <div className="about-hero-bg" />
        <div className="about-hero-container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="about-hero-content"
          >
            <motion.div variants={fadeUp} className="sp-hero-label">
              <div className="sp-hero-label-dot" />
              Our Story
            </motion.div>

            <motion.h1 variants={fadeUp} className="about-hero-heading">
              Cleaning Done With <br />
              <em>Purpose and Pride.</em>
            </motion.h1>

            <motion.p variants={fadeUp} className="about-hero-sub">
              Baba and Co was born from a simple belief — that a clean space changes everything.
              It changes how you feel, how you work, and how you live. We built this company
              to be the team you can trust with the spaces that matter most.
            </motion.p>

            <motion.div variants={fadeUp} className="about-hero-ctas">
              <button onClick={() => scrollTo("#our-story")} className="cta-btn-primary">
                Read Our Story <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollTo("#team")} className="sp-hero-call">
                Meet the Team
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="about-numbers">
        {WHY_NUMBERS.map((n, i) => (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={"about-number" + (i < WHY_NUMBERS.length - 1 ? " about-number--border" : "")}
          >
            <span className="about-number-value">{n.value}</span>
            <span className="about-number-label">{n.label}</span>
          </motion.div>
        ))}
      </section>

      <section id="our-story" className="about-story">
        <div className="about-story-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="about-story-text"
          >
            <motion.div variants={fadeUp} className="services-label">
              <div className="services-label-line" />
              <span>How We Started</span>
              <div className="services-label-line" />
            </motion.div>

            <motion.h2 variants={fadeUp} className="about-section-heading">
              From One Van to <br />
              <em>Accra's Trusted Name</em>
            </motion.h2>

            <motion.div variants={fadeUp} className="about-story-body">
              <p>It started with one van, three people, and an unshakeable belief that cleaning deserved to be taken seriously. Emmanuel Baba had spent years watching cleaning services cut corners, rush jobs, and leave clients disappointed. He knew he could do better.</p>
              <p>In 2018, Baba and Co was founded — not just as a cleaning company, but as a commitment to quality. We showed up on time, communicated clearly, and treated every client's home with the respect it deserved.</p>
              <p>Word spread quickly. Within a year, we were the go-to team for post-construction cleans in Accra's growing real estate market. By 2022, we had expanded to a team of 12 trained professionals and introduced our signature quality-check system.</p>
              <p>Today, Baba and Co serves homeowners, property managers, businesses, and developers across Accra and beyond. The van is still there — but now there are many more beside it.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="about-founder-quote">
              <Quote size={24} className="about-quote-icon" />
              <p className="about-quote-text">
                A clean home is not a luxury — it is a foundation. Everything good in life starts in a space that feels right. That is what we give people.
              </p>
              <p className="about-quote-author">— Emmanuel Baba, Founder</p>
            </motion.div>
          </motion.div>

          <div className="about-timeline">
            {STORY_MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="about-timeline-item"
              >
                <div className="about-timeline-year">{m.year}</div>
                <div className="about-timeline-content">
                  <h4 className="about-timeline-title">{m.title}</h4>
                  <p className="about-timeline-desc">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-values-top-line" />
        <div className="about-values-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-values-header"
          >
            <div className="services-label" style={{ color: "var(--gold-400)" }}>
              <div className="services-label-line" style={{ background: "var(--gold-400)" }} />
              <span>What We Stand For</span>
              <div className="services-label-line" style={{ background: "var(--gold-400)" }} />
            </div>
            <h2 className="about-values-heading">
              The Principles That <br />
              <em>Drive Every Clean</em>
            </h2>
            <p className="about-values-sub">
              These are not just words on a wall. They are the standards we hold ourselves to on every single job, without exception.
            </p>
          </motion.div>

          <div className="about-values-grid">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="about-value-card"
              >
                <span className="about-value-icon">{v.icon}</span>
                <div className="about-value-line" />
                <h3 className="about-value-title">{v.title}</h3>
                <p className="about-value-desc">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="about-team">
        <div className="about-team-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-team-header"
          >
            <div className="services-label">
              <div className="services-label-line" />
              <span>The People Behind It</span>
              <div className="services-label-line" />
            </div>
            <h2 className="about-section-heading">
              Meet the Team That <br />
              <em>Makes It Happen</em>
            </h2>
            <p className="about-team-sub">
              Every member of our team is carefully selected, thoroughly trained, and genuinely passionate about doing great work.
            </p>
          </motion.div>

          <div className="about-team-grid">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="about-team-card"
              >
                <div className="about-team-photo-wrap">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="about-team-photo"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="about-team-photo-placeholder">
                    <span>{member.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                </div>
                <div className="about-team-info">
                  <h3 className="about-team-name">{member.name}</h3>
                  <p className="about-team-role">{member.role}</p>
                  <div className="about-team-divider" />
                  <p className="about-team-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-certs">
        <div className="about-certs-top-line" />
        <div className="about-certs-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-certs-header"
          >
            <div className="services-label" style={{ color: "var(--gold-400)" }}>
              <div className="services-label-line" style={{ background: "var(--gold-400)" }} />
              <span>Our Credentials</span>
              <div className="services-label-line" style={{ background: "var(--gold-400)" }} />
            </div>
            <h2 className="about-certs-heading">
              You are in <em>Safe Hands</em>
            </h2>
            <p className="about-certs-sub">
              Every standard we meet is another reason to trust us with your home.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="about-certs-grid"
          >
            {CERTIFICATIONS.map((cert) => (
              <div key={cert} className="about-cert-item">
                <CheckCircle2 size={18} className="about-cert-icon" />
                <span>{cert}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta-blob about-cta-blob--top" />
        <div className="about-cta-blob about-cta-blob--bottom" />
        <div className="about-cta-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="about-cta-inner"
          >
            <div className="cta-line" />
            <h2 className="cta-heading">Ready to Work <em>With Us?</em></h2>
            <p className="cta-subtext">
              Join over 2,400 satisfied clients who trust Baba and Co to keep their spaces immaculate.
            </p>
            <div className="cta-buttons">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onBook?.()}
                className="cta-btn-primary"
              >
                Book a Cleaning <ArrowRight size={16} />
              </motion.button>
              <a href="/services" className="sp-hero-call">View Services</a>
            </div>
            <div className="cta-line" />
          </motion.div>
        </div>
      </section>

    </div>
  );
}
