import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { sendContactForm } from "@/lib/emailService";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Mail,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Users,
  Building,
  Shield,
} from "lucide-react";

// Countries list
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Bulgaria",
  "Cambodia", "Canada", "Chile", "China", "Colombia", "Costa Rica", "Croatia", "Czech Republic",
  "Denmark", "Dominican Republic", "Ecuador", "Egypt", "Estonia", "Ethiopia",
  "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Guatemala",
  "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia", "Lebanon", "Lithuania", "Luxembourg",
  "Malaysia", "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway",
  "Pakistan", "Panama", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland",
  "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Venezuela", "Vietnam"
];

const Partners = () => {
  // Contact Form State
  const [fullName, setFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [projectDescription, setProjectDescription] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [scrollIntensity, setScrollIntensity] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [robotVerified, setRobotVerified] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const fileInputRef = useRef(null);
  const recaptchaRef = useRef(null);

  // TODO: Replace with your actual Google reCAPTCHA site key to remove "test purposes only" message
  // Current key is Google's test key - get your own from: https://www.google.com/recaptcha/admin
  const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const intensity = Math.min(scrollY * 0.001, 0.5); // Cap at 0.5 for subtle effect
      setScrollIntensity(intensity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setRobotVerified(!!token);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken("");
    setRobotVerified(false);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const maxSize = 20 * 1024 * 1024; // 20MB in bytes

    const validFiles = [];
    const invalidFiles = [];

    files.forEach((file) => {
      if (file.size > maxSize) {
        invalidFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      setError(
        `File(s) too large: ${invalidFiles.join(", ")}. Maximum size is 20MB per file.`
      );
      return;
    }

    setAttachedFiles([...attachedFiles, ...validFiles]);
    setError("");
  };

  const removeFile = (indexToRemove) => {
    setAttachedFiles(attachedFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Send contact form using email service
      await sendContactForm({
        fullName,
        businessEmail,
        phone,
        jobTitle,
        company,
        country,
        projectDescription,
        attachedFiles,
      });

      setIsSubmitted(true);
      resetForm();
    } catch (error) {
      console.error("Error sending form:", error);
      setError("Failed to send message. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFullName("");
    setBusinessEmail("");
    setPhone("");
    setJobTitle("");
    setCompany("");
    setCountry("");
    setProjectDescription("");
    setAttachedFiles([]);
    setError("");
    setRobotVerified(false);
    setRecaptchaToken("");
    setPrivacyAccepted(false);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  // Auto-reset success message after 5 seconds
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <div
      style={{
        background: "radial-gradient(circle, #0C2017 0%, #10291C 100%)",
      }}
    >
      {/* STAKEHOLDERS SECTION */}
      <section className="py-24" aria-labelledby="stakeholders-heading">
        <div className="mx-auto px-16" style={{ maxWidth: "1280px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* StakeholderHeroBlock - Left Side */}
            <motion.div
              className="flex flex-col"
              style={{
                flexBasis: "48%",
                minWidth: "320px",
                gap: "36px",
                height: "fit-content"
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* 1. Micro-label */}
              <div
                className="font-mono font-bold"
                style={{
                  fontSize: "14px",
                  letterSpacing: "0.12em",
                  color: "#7BFF9C"
                }}
              >
                STAKEHOLDERS
              </div>

              {/* 2. H2 Headline */}
              <h2
                className="font-semibold leading-tight"
                style={{
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: "clamp(2.4rem, 3.4vw, 3rem)",
                  color: "#EAF8E2"
                }}
              >
                Shape Tomorrow's Governance
              </h2>

              {/* 3. Story Capsule */}
              <p
                className="leading-relaxed"
                style={{
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: "16px",
                  color: "#EAF8E2",
                  lineHeight: "1.6"
                }}
              >
                Vigilum converts the hidden architecture of laws, tenders, and influence into real-time foresight, revealing risks before they harden into policy failure. By modeling intent—not just compliance—we empower ministries, multilaterals, and ESG investors to pre-empt systemic loss. Born at Columbia's MARS-REERS program, our platform transforms oversight from reaction to anticipation.
              </p>

              {/* 4. Founder Quote */}
              <div className="space-y-2">
                <p
                  className="italic leading-relaxed"
                  style={{
                    fontFamily: "IBM Plex Sans, sans-serif",
                    fontSize: "16px",
                    color: "#EAF8E2",
                    lineHeight: "1.6"
                  }}
                >
                  "We discovered that corruption isn't a breach—it's a design pattern. When you expose the pattern, systems can self-correct. That is structural foresight."
                </p>
                <p
                  className="font-medium"
                  style={{
                    fontFamily: "IBM Plex Sans, sans-serif",
                    fontSize: "14px",
                    color: "#EAF8E2"
                  }}
                >
                  — Adam Kovarskas, Founder
                </p>
              </div>

              {/* 5. Divider */}
              <div
                className="mt-6"
                style={{
                  width: "48px",
                  height: "2px",
                  backgroundColor: "#1B3C2D"
                }}
              />

              {/* 6. Pillar Duo */}
              <div className="space-y-8">
                {/* Enterprise Solutions */}
                <div className="flex items-start" style={{ gap: "16px" }}>
                  <Briefcase
                    className="flex-shrink-0 mt-1"
                    style={{
                      width: "32px",
                      height: "32px",
                      color: "#7BFF9C"
                    }}
                    aria-label="Enterprise Solutions icon"
                  />
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{
                        fontFamily: "IBM Plex Sans, sans-serif",
                        fontSize: "18px",
                        color: "#EAF8E2"
                      }}
                    >
                      Enterprise Solutions
                    </h3>
                    <p
                      style={{
                        fontFamily: "IBM Plex Sans, sans-serif",
                        fontSize: "14px",
                        color: "#EAF8E2",
                        lineHeight: "1.5"
                      }}
                    >
                      Embed Vigilum engines inside procurement, ESG, or audit workflows for live integrity diagnostics.
                    </p>
                  </div>
                </div>

                {/* Strategic Partnerships */}
                <div className="flex items-start" style={{ gap: "16px" }}>
                  <Users
                    className="flex-shrink-0 mt-1"
                    style={{
                      width: "32px",
                      height: "32px",
                      color: "#7BFF9C"
                    }}
                    aria-label="Strategic Partnerships icon"
                  />
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{
                        fontFamily: "IBM Plex Sans, sans-serif",
                        fontSize: "18px",
                        color: "#EAF8E2"
                      }}
                    >
                      Strategic Partnerships
                    </h3>
                    <p
                      style={{
                        fontFamily: "IBM Plex Sans, sans-serif",
                        fontSize: "14px",
                        color: "#EAF8E2",
                        lineHeight: "1.5"
                      }}
                    >
                      Co-create pilots, research, or integrity labs that stress-test governance at scale.
                    </p>
                  </div>
                </div>
              </div>

              {/* 7. Micro-CTAs */}
              <div className="space-y-3">
                <a
                  href="mailto:info@vigilum.com"
                  className="block transition-colors duration-150"
                  style={{
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "#7BFF9C",
                    textDecoration: "none"
                  }}
                  onMouseEnter={(e) => e.target.style.color = "#B1FFC8"}
                  onMouseLeave={(e) => e.target.style.color = "#7BFF9C"}
                >
                  info@vigilum.com
                </a>
                <div className="flex space-x-4">
                  <a
                    href="mailto:student@vigilum.com"
                    className="transition-colors duration-150"
                    style={{
                      fontFamily: "IBM Plex Mono, monospace",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "#7BFF9C",
                      textDecoration: "none"
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#B1FFC8"}
                    onMouseLeave={(e) => e.target.style.color = "#7BFF9C"}
                  >
                    student@vigilum.com
                  </a>
                  <span style={{ color: "#7BFF9C" }}>|</span>
                  <a
                    href="mailto:civil@vigilum.com"
                    className="transition-colors duration-150"
                    style={{
                      fontFamily: "IBM Plex Mono, monospace",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "#7BFF9C",
                      textDecoration: "none"
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#B1FFC8"}
                    onMouseLeave={(e) => e.target.style.color = "#7BFF9C"}
                  >
                    civil@vigilum.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form Container */}
            <div className="space-y-6">
              {/* Success Message */}
              {isSubmitted && (
                <motion.div
                  className="p-4 bg-green-900/30 border border-green-700 rounded-lg flex items-center space-x-3"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-green-300 font-mono text-sm">
                    Stakeholder inquiry sent successfully! We'll get back to you soon.
                  </span>
                </motion.div>
              )}

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-lg"
                style={{
                  background: "rgba(16, 32, 28, 0.95)",
                  border: "1px solid rgba(0,255,204,0.15)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                  backdropFilter: "blur(10px)",
                }}
              >
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Briefcase className="w-6 h-6 text-green-400" />
                  <h3 className="text-2xl font-bold text-white font-display">
                    Stakeholder Inquiry
                  </h3>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-red-300 font-mono text-sm">{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Personal Information - Single Column */}
                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Company/Institution *
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Tell us about your project *
                    </label>
                    <div className="relative">
                      <textarea
                        value={projectDescription}
                        onChange={(e) => {
                          if (e.target.value.length <= 4000) {
                            setProjectDescription(e.target.value);
                          }
                        }}
                        placeholder="Describe your project, collaboration needs, institutional requirements, or stakeholder engagement opportunities..."
                        rows={6}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white resize-none focus:border-green-500 focus:outline-none transition-colors"
                        required
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                        {projectDescription.length}/4000
                      </div>
                    </div>
                  </div>



                  {/* Verification and Privacy */}
                  <div className="space-y-6">
                    {/* Google reCAPTCHA */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-green-400">
                        Security Verification *
                      </label>
                      <div className="space-y-3">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={RECAPTCHA_SITE_KEY}
                          onChange={handleRecaptchaChange}
                          onExpired={handleRecaptchaExpired}
                          theme="dark"
                          size="normal"
                        />
                        {robotVerified && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center space-x-2 text-green-400"
                          >
                            <Shield className="w-4 h-4" />
                            <span className="text-sm font-medium">Verified ✓</span>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Privacy Policy */}
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="privacy-check"
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        className="w-4 h-4 bg-gray-800 border border-gray-600 rounded focus:ring-green-500 focus:ring-2 mt-0.5"
                        required
                      />
                      <label htmlFor="privacy-check" className="text-gray-300 text-sm">
                        I agree to the{" "}
                        <button
                          type="button"
                          onClick={() => setShowPrivacyModal(true)}
                          className="text-green-400 hover:text-green-300 underline transition-colors"
                        >
                          Privacy Policy
                        </button>{" "}
                        and consent to data processing for stakeholder communication purposes.
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !robotVerified || !privacyAccepted}
                      className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Stakeholder Inquiry"}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Privacy Policy</h3>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="text-gray-300 space-y-4">
                <p className="text-sm">
                  <strong>Vigilum Privacy Policy - Stakeholder Communications</strong>
                </p>
                <p className="text-sm">
                  This privacy policy outlines how we handle information collected through our stakeholder
                  inquiry form and communications.
                </p>
                <p className="text-sm">
                  <strong>Data Collection:</strong> We collect personal and professional information you
                  provide including name, email, phone, job title, company, country, and project details.
                </p>
                <p className="text-sm">
                  <strong>Data Use:</strong> Information is used solely for stakeholder communication,
                  project evaluation, and institutional collaboration purposes.
                </p>
                <p className="text-sm">
                  <strong>Data Protection:</strong> All data is encrypted, securely stored, and not shared
                  with third parties without explicit consent.
                </p>
                <p className="text-sm">
                  <strong>Contact:</strong> For privacy inquiries, contact privacy@vigilum.com
                </p>
                <p className="text-xs text-gray-400 mt-4">
                  [Full privacy policy will be available soon]
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setShowPrivacyModal(false)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Partners;
