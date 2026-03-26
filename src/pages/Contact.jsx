import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, ArrowRight, Send,
  CheckCircle, Loader, MessageSquare, Globe,
  Link, Rss
} from "lucide-react";
import emailjs from "@emailjs/browser";

// ── Same EmailJS config as BookingModal ───────────────────────────────────────
// Create a separate "contact" template in EmailJS and paste its ID here
const EMAILJS_SERVICE_ID        = "YOUR_SERVICE_ID";
const EMAILJS_CONTACT_TEMPLATE  = "YOUR_CONTACT_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY        = "YOUR_PUBLIC_KEY";

// ── Data ──────────────────────────────────────────────────────────────────────
const CONTACT_METHODS = [
  {
    icon: <Phone size={20} />,
    label: "Phone",
    value: "+233 XX XXX XXXX",
    sub: "Mon – Sat, 7am – 6pm",
    href: "tel:+233000000000",
  },
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "hello@babaandco.com",
    sub: "We reply within 24 hours",
    href: "mailto:hello@babaandco.com",
  },
  {
    icon: <MapPin size={20} />,
    label: "Location",
    value: "Accra, Ghana",
    sub: "Serving Greater Accra & beyond",
    href: null,
  },
  {
    icon: <Clock size={20} />,
    label: "Hours",
    value: "Mon – Sat: 7am – 6pm",
    sub: "Sunday: by arrangement",
    href: null,
  },
];

const FAQS = [
  {
    q: "How quickly can you respond to a booking?",
    a: "We typically confirm all bookings within 4–6 hours during business hours. Urgent or same-day requests — give us a call directly.",
  },
  {
    q: "Do you service areas outside Accra?",
    a: "Yes — we serve Greater Accra and surrounding areas. For locations further afield, get in touch and we'll advise on availability.",
  },
  {
    q: "What happens after I send a message?",
    a: "Our team will review your enquiry and reach back out within 24 hours via your preferred contact — email or phone — to discuss next steps.",
  },
  {
    q: "Is there a minimum contract for regular cleans?",
    a: "No minimum contract. You can start, pause, or stop regular maintenance cleans at any time with 48 hours notice.",
  },
];

const SUBJECTS = [
  "General Enquiry",
  "Request a Quote",
  "Book a Service",
  "Regular Maintenance",
  "Commercial / Office",
  "Feedback or Complaint",
  "Other",
];

const INITIAL_FORM = {
  from_name:    "",
  from_email:   "",
  from_phone:   "",
  subject:      "",
  message:      "",
};

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: "easeOut" },
  }),
};

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className={`cp-faq-item ${open ? "open" : ""}`}
      layout
    >
      <button className="cp-faq-q" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <span className={`cp-faq-chevron ${open ? "open" : ""}`}>↓</span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <p className="cp-faq-a">{a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function ContactPage() {
  const [form,   setForm]   = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.from_name.trim())  e.from_name  = "Name is required";
    if (!form.from_email.trim()) e.from_email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.from_email)) e.from_email = "Invalid email";
    if (!form.subject)           e.subject    = "Please select a subject";
    if (!form.message.trim())    e.message    = "Message is required";
    return e;
  };

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CONTACT_TEMPLATE,
        { ...form, sent_at: new Date().toLocaleString("en-GB") },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contact-page">

      {/* ── Hero ── */}
      <section className="cp-hero">
        <div className="cp-hero-bg" />
        <div className="cp-hero-container">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="cp-hero-content"
          >
            <div className="cp-hero-label">
              <div className="cp-hero-label-dot" />
              Get in Touch
            </div>
            <h1 className="cp-hero-heading">
              Let's Talk About <br />
              <em>Your Space</em>
            </h1>
            <p className="cp-hero-sub">
              Have a question, want a quote, or just want to know more?
              We're here. Send us a message and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Methods ── */}
      <section className="cp-methods">
        <div className="cp-methods-container">
          {CONTACT_METHODS.map((m, i) => (
            <motion.div
              key={m.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="cp-method-card"
            >
              <div className="cp-method-icon">{m.icon}</div>
              <div className="cp-method-text">
                <span className="cp-method-label">{m.label}</span>
                {m.href ? (
                  <a href={m.href} className="cp-method-value">{m.value}</a>
                ) : (
                  <span className="cp-method-value">{m.value}</span>
                )}
                <span className="cp-method-sub">{m.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Main Content: Form + FAQs ── */}
      <section className="cp-main">
        <div className="cp-main-container">

          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="cp-form-wrap"
          >
            <div className="cp-form-header">
              <div className="cp-form-header-icon">
                <MessageSquare size={20} />
              </div>
              <div>
                <h2 className="cp-form-title">Send a Message</h2>
                <p className="cp-form-sub">We'll get back to you within 24 hours</p>
              </div>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="cp-form-success"
              >
                <div className="cp-form-success-icon">
                  <CheckCircle size={40} strokeWidth={1.5} />
                </div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll be in touch within 24 hours.</p>
                <button onClick={() => setStatus("idle")} className="cp-form-success-btn">
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="cp-form">

                {/* Name + Phone */}
                <div className="cp-form-row">
                  <div className="cp-form-field">
                    <label className="cp-form-label">Full Name</label>
                    <input
                      type="text"
                      placeholder="Kwame Mensah"
                      value={form.from_name}
                      onChange={e => handleChange("from_name", e.target.value)}
                      className={`cp-form-input ${errors.from_name ? "error" : ""}`}
                    />
                    {errors.from_name && <span className="cp-form-error">{errors.from_name}</span>}
                  </div>
                  <div className="cp-form-field">
                    <label className="cp-form-label">Phone <span className="cp-form-optional">(optional)</span></label>
                    <input
                      type="tel"
                      placeholder="+233 XX XXX XXXX"
                      value={form.from_phone}
                      onChange={e => handleChange("from_phone", e.target.value)}
                      className="cp-form-input"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="cp-form-field">
                  <label className="cp-form-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.from_email}
                    onChange={e => handleChange("from_email", e.target.value)}
                    className={`cp-form-input ${errors.from_email ? "error" : ""}`}
                  />
                  {errors.from_email && <span className="cp-form-error">{errors.from_email}</span>}
                </div>

                {/* Subject */}
                <div className="cp-form-field">
                  <label className="cp-form-label">Subject</label>
                  <div className="cp-form-select-wrap">
                    <select
                      value={form.subject}
                      onChange={e => handleChange("subject", e.target.value)}
                      className={`cp-form-select ${errors.subject ? "error" : ""}`}
                    >
                      <option value="">What's this about?</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <span className="cp-form-select-arrow">↓</span>
                  </div>
                  {errors.subject && <span className="cp-form-error">{errors.subject}</span>}
                </div>

                {/* Message */}
                <div className="cp-form-field">
                  <label className="cp-form-label">Message</label>
                  <textarea
                    placeholder="Tell us what you need — service type, property size, any specific requirements..."
                    value={form.message}
                    onChange={e => handleChange("message", e.target.value)}
                    className={`cp-form-textarea ${errors.message ? "error" : ""}`}
                    rows={5}
                  />
                  {errors.message && <span className="cp-form-error">{errors.message}</span>}
                </div>

                {status === "error" && (
                  <p className="cp-form-submit-error">
                    Something went wrong. Please try again or call us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="cp-form-submit"
                >
                  {status === "loading" ? (
                    <><Loader size={16} className="cp-spinner" /> Sending...</>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </button>

              </form>
            )}
          </motion.div>

          {/* Right — FAQs + map strip */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
            className="cp-aside"
          >

            {/* Quick FAQs */}
            <div className="cp-faq-wrap">
              <h3 className="cp-aside-title">Common Questions</h3>
              {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </div>

            {/* Response promise card */}
            <div className="cp-promise-card">
              <div className="cp-promise-icon">⚡</div>
              <div>
                <strong>Fast Response, Always</strong>
                <p>
                  Every message is read by a real person on our team.
                  We respond to all enquiries within 24 hours — usually much sooner.
                </p>
              </div>
            </div>

            {/* Socials strip */}
            <div className="cp-socials-card">
              <p className="cp-socials-label">Follow Our Work</p>
              <div className="cp-socials-row">
                <a href="#" aria-label="Instagram" className="cp-social-link">
                  <Globe size={18} />
                  <span>Instagram</span>
                </a>
                <a href="#" aria-label="Facebook" className="cp-social-link">
                  <Link size={18} />
                  <span>Facebook</span>
                </a>
                <a href="#" aria-label="Twitter" className="cp-social-link">
                  <Rss size={18} />
                  <span>Twitter / X</span>
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
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
              Ready to Book <em>Today?</em>
            </h2>
            <p className="cta-subtext">
              Skip the form — call us directly and we'll have you booked in within minutes.
            </p>
            <div className="cta-buttons">
              <a href="tel:+233000000000" className="cta-btn-primary">
                <Phone size={16} /> Call Us Now
              </a>
              <a href="mailto:hello@babaandco.com" className="cta-btn-outline">
                <Mail size={15} /> Email Us
              </a>
            </div>
            <p className="cta-trust">Free site visit · No obligation · 24hr response</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
