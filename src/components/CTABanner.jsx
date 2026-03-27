import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function CTABanner({ onBook }) {

  return (
    <section className="cta-section">

      {/* Blobs */}
      <div className="cta-blob cta-blob--top" />
      <div className="cta-blob cta-blob--bottom" />

      <div className="cta-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="cta-inner"
        >
          <div className="cta-line" />

          <h2 className="cta-heading">
            Ready for a Spotless <em>Home?</em>
          </h2>

          <p className="cta-subtext">
            Book your clean today and experience the Baba & Co difference.
            First-time clients get a complimentary consultation.
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
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="tel:+233000000000"
              className="cta-btn-outline"
            >
              <Phone size={15} />
              Call Us Now
            </motion.a>
          </div>

          <p className="cta-trust">No contracts. No hidden fees. Just exceptional cleaning.</p>

          <div className="cta-line" />
        </motion.div>
      </div>
    </section>
  );
}
