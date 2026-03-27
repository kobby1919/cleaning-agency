import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader, Calendar, MapPin, User, Phone, Mail, FileText, ChevronDown } from "lucide-react";
import emailjs from "@emailjs/browser";

// ─── EmailJS Config ───────────────────────────────────────────────────────────
// 1. Sign up at https://emailjs.com (free — 200 emails/month)
// 2. Create a Service (Gmail, Outlook, etc.) → copy Service ID
// 3. Create an Email Template → copy Template ID
// 4. Go to Account → copy Public Key
// Replace the placeholders below with your actual IDs:
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "aBcDeFgHiJkLmN"

// ─── EmailJS Template Variables (use these in your template) ─────────────────
// {{client_name}}        - Full name
// {{client_email}}       - Email address
// {{client_phone}}       - Phone number
// {{service_type}}       - Selected service
// {{preferred_date}}     - Preferred date
// {{preferred_time}}     - Preferred time slot
// {{property_address}}   - Property address
// {{special_notes}}      - Additional notes
// {{submission_date}}    - Auto-generated submission timestamp

const SERVICES = [
  "Post-Construction Cleaning",
  "Deep Cleaning",
  "Regular Maintenance",
  "Move-In / Move-Out Cleaning",
  "Office & Commercial Cleaning",
  "Specialised Cleaning",
];

const TIME_SLOTS = [
  "Morning (8:00 AM – 12:00 PM)",
  "Afternoon (12:00 PM – 4:00 PM)",
  "Evening (4:00 PM – 7:00 PM)",
  "Flexible / Any time",
];

const INITIAL_FORM = {
  client_name:      "",
  client_email:     "",
  client_phone:     "",
  service_type:     "",
  preferred_date:   "",
  preferred_time:   "",
  property_address: "",
  special_notes:    "",
};

export default function BookingModal({ isOpen, onClose, preSelectedService = "" }) {
  const [form,   setForm]   = useState({ ...INITIAL_FORM, service_type: preSelectedService });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  // Sync pre-selected service when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm(f => ({ ...f, service_type: preSelectedService }));
      setStatus("idle");
      setErrors({});
    }
  }, [isOpen, preSelectedService]);

  // Lock body scroll when open
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const validate = () => {
    const e = {};
    if (!form.client_name.trim())      e.client_name      = "Name is required";
    if (!form.client_email.trim())     e.client_email     = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.client_email)) e.client_email = "Invalid email address";
    if (!form.client_phone.trim())     e.client_phone     = "Phone number is required";
    if (!form.service_type)            e.service_type     = "Please select a service";
    if (!form.preferred_date)          e.preferred_date   = "Please choose a date";
    if (!form.preferred_time)          e.preferred_time   = "Please choose a time slot";
    if (!form.property_address.trim()) e.property_address = "Property address is required";
    return e;
  };

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");

    const templateParams = {
      ...form,
      submission_date: new Date().toLocaleString("en-GB", {
        dateStyle: "full", timeStyle: "short",
      }),
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  // Min date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="booking-backdrop"
          />

          <div className="booking-modal-wrap" data-lenis-prevent>
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="booking-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Book a cleaning service"
            >
              {/* Close */}
              <button onClick={onClose} className="booking-close" aria-label="Close">
                <X size={20} />
              </button>

              {status === "success" ? (
                /* ── Success State ── */
                <div className="booking-success">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="booking-success-icon"
                  >
                    <CheckCircle size={48} strokeWidth={1.5} />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="booking-success-title"
                  >
                    Booking Request Sent!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="booking-success-text"
                  >
                    Thank you! We've received your request and will contact you within
                    24 hours to confirm your booking and arrange a site visit for pricing.
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    onClick={onClose}
                    className="booking-success-btn"
                  >
                    Close
                  </motion.button>
                </div>
              ) : (
                /* ── Form State ── */
                <>
                  {/* Header */}
                  <div className="booking-header">
                    <div className="booking-header-label">Professional Cleaning</div>
                    <h2 className="booking-title">Book a Service</h2>
                    <p className="booking-subtitle">
                      Fill in your details and we'll reach out within 24 hours to confirm
                      and arrange a free site visit for pricing.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="booking-form">
                    {/* Row 1 — Name */}
                    <div className="booking-field">
                      <label className="booking-label">
                        <User size={13} /> Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kwame Mensah"
                        value={form.client_name}
                        onChange={e => handleChange("client_name", e.target.value)}
                        className={`booking-input ${errors.client_name ? "error" : ""}`}
                      />
                      {errors.client_name && <span className="booking-error">{errors.client_name}</span>}
                    </div>

                  {/* Row 2 — Email + Phone */}
                  <div className="booking-row">
                    <div className="booking-field">
                      <label className="booking-label">
                        <Mail size={13} /> Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={form.client_email}
                        onChange={e => handleChange("client_email", e.target.value)}
                        className={`booking-input ${errors.client_email ? "error" : ""}`}
                      />
                      {errors.client_email && <span className="booking-error">{errors.client_email}</span>}
                    </div>
                    <div className="booking-field">
                      <label className="booking-label">
                        <Phone size={13} /> Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+233 XX XXX XXXX"
                        value={form.client_phone}
                        onChange={e => handleChange("client_phone", e.target.value)}
                        className={`booking-input ${errors.client_phone ? "error" : ""}`}
                      />
                      {errors.client_phone && <span className="booking-error">{errors.client_phone}</span>}
                    </div>
                  </div>

                  {/* Row 3 — Service */}
                  <div className="booking-field">
                    <label className="booking-label">
                      <ChevronDown size={13} /> Service Required
                    </label>
                    <div className="booking-select-wrap">
                      <select
                        value={form.service_type}
                        onChange={e => handleChange("service_type", e.target.value)}
                        className={`booking-select ${errors.service_type ? "error" : ""}`}
                      >
                        <option value="">Select a service...</option>
                        {SERVICES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="booking-select-icon" />
                    </div>
                    {errors.service_type && <span className="booking-error">{errors.service_type}</span>}
                  </div>

                  {/* Row 4 — Date + Time */}
                  <div className="booking-row">
                    <div className="booking-field">
                      <label className="booking-label">
                        <Calendar size={13} /> Preferred Date
                      </label>
                      <input
                        type="date"
                        min={minDate}
                        value={form.preferred_date}
                        onChange={e => handleChange("preferred_date", e.target.value)}
                        className={`booking-input ${errors.preferred_date ? "error" : ""}`}
                      />
                      {errors.preferred_date && <span className="booking-error">{errors.preferred_date}</span>}
                    </div>
                    <div className="booking-field">
                      <label className="booking-label">
                        <Calendar size={13} /> Preferred Time
                      </label>
                      <div className="booking-select-wrap">
                        <select
                          value={form.preferred_time}
                          onChange={e => handleChange("preferred_time", e.target.value)}
                          className={`booking-select ${errors.preferred_time ? "error" : ""}`}
                        >
                          <option value="">Select time slot...</option>
                          {TIME_SLOTS.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <ChevronDown size={16} className="booking-select-icon" />
                      </div>
                      {errors.preferred_time && <span className="booking-error">{errors.preferred_time}</span>}
                    </div>
                  </div>

                  {/* Row 5 — Address */}
                  <div className="booking-field">
                    <label className="booking-label">
                      <MapPin size={13} /> Property Address
                    </label>
                    <input
                      type="text"
                      placeholder="Street, Area, City"
                      value={form.property_address}
                      onChange={e => handleChange("property_address", e.target.value)}
                      className={`booking-input ${errors.property_address ? "error" : ""}`}
                    />
                    {errors.property_address && <span className="booking-error">{errors.property_address}</span>}
                  </div>

                  {/* Row 6 — Notes */}
                  <div className="booking-field">
                    <label className="booking-label">
                      <FileText size={13} /> Special Notes <span className="booking-optional">(optional)</span>
                    </label>
                    <textarea
                      placeholder="e.g. 3-bedroom apartment, post-renovation, specific areas of concern..."
                      value={form.special_notes}
                      onChange={e => handleChange("special_notes", e.target.value)}
                      className="booking-textarea"
                      rows={3}
                    />
                  </div>

                  {/* Pricing note */}
                  <div className="booking-price-note">
                    <span className="booking-price-icon">💡</span>
                    <p>
                      Pricing is determined after a <strong>free site visit</strong>.
                      We'll contact you to confirm and schedule it — no obligation.
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="booking-submit"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader size={16} className="booking-spinner" />
                        Sending Request...
                      </>
                    ) : (
                      "Send Booking Request"
                    )}
                  </button>

                  {status === "error" && (
                    <p className="booking-submit-error">
                      Something went wrong. Please try again or contact us directly.
                    </p>
                  )}
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
