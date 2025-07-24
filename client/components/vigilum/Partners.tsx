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

// Countries list with phone codes
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

// Country phone codes mapping
const COUNTRY_PHONE_CODES = {
  "Afghanistan": "+93", "Albania": "+355", "Algeria": "+213", "Argentina": "+54", "Armenia": "+374", "Australia": "+61", "Austria": "+43", "Azerbaijan": "+994",
  "Bahrain": "+973", "Bangladesh": "+880", "Belarus": "+375", "Belgium": "+32", "Bolivia": "+591", "Bosnia and Herzegovina": "+387", "Brazil": "+55", "Bulgaria": "+359",
  "Cambodia": "+855", "Canada": "+1", "Chile": "+56", "China": "+86", "Colombia": "+57", "Costa Rica": "+506", "Croatia": "+385", "Czech Republic": "+420",
  "Denmark": "+45", "Dominican Republic": "+1", "Ecuador": "+593", "Egypt": "+20", "Estonia": "+372", "Ethiopia": "+251",
  "Finland": "+358", "France": "+33", "Georgia": "+995", "Germany": "+49", "Ghana": "+233", "Greece": "+30", "Guatemala": "+502",
  "Honduras": "+504", "Hungary": "+36", "Iceland": "+354", "India": "+91", "Indonesia": "+62", "Iran": "+98", "Iraq": "+964", "Ireland": "+353", "Israel": "+972", "Italy": "+39",
  "Japan": "+81", "Jordan": "+962", "Kazakhstan": "+7", "Kenya": "+254", "Kuwait": "+965", "Latvia": "+371", "Lebanon": "+961", "Lithuania": "+370", "Luxembourg": "+352",
  "Malaysia": "+60", "Mexico": "+52", "Morocco": "+212", "Netherlands": "+31", "New Zealand": "+64", "Nigeria": "+234", "Norway": "+47",
  "Pakistan": "+92", "Panama": "+507", "Peru": "+51", "Philippines": "+63", "Poland": "+48", "Portugal": "+351", "Qatar": "+974",
  "Romania": "+40", "Russia": "+7", "Saudi Arabia": "+966", "Serbia": "+381", "Singapore": "+65", "Slovakia": "+421", "Slovenia": "+386", "South Africa": "+27", "South Korea": "+82", "Spain": "+34", "Sri Lanka": "+94", "Sweden": "+46", "Switzerland": "+41",
  "Thailand": "+66", "Turkey": "+90", "Ukraine": "+380", "United Arab Emirates": "+971", "United Kingdom": "+44", "United States": "+1", "Uruguay": "+598", "Venezuela": "+58", "Vietnam": "+84"
};

const Partners = () => {
  // Contact Form State
  const [fullName, setFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("Lithuania");
  const [countrySearch, setCountrySearch] = useState("Lithuania");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [phonePlaceholder, setPhonePlaceholder] = useState("+370");
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
  const [isStudent, setIsStudent] = useState(false);
  const fileInputRef = useRef(null);
  const recaptchaRef = useRef(null);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFullName = (name) => {
    const words = name.trim().split(/\s+/);
    return words.length >= 2 && words.every(word => word.length > 0);
  };

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

  const handleCountrySearch = (e) => {
    setCountrySearch(e.target.value);
    setShowCountryDropdown(true);
  };

  const selectCountry = (selectedCountry) => {
    setCountry(selectedCountry);
    setCountrySearch(selectedCountry);
    setShowCountryDropdown(false);

    // Update phone placeholder based on selected country
    const countryCode = COUNTRY_PHONE_CODES[selectedCountry];
    if (countryCode) {
      setPhonePlaceholder(countryCode);
    }
  };

  const filteredCountries = COUNTRIES.filter(country =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

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
    setCountry("Lithuania");
    setCountrySearch("Lithuania");
    setShowCountryDropdown(false);
    setPhonePlaceholder("+370");
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
              {/* Main Headline */}
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
                  href="mailto:network@vigilum.com"
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
                  network@vigilum.com
                </a>

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
                    Collaboration Intake
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

                  <div className="relative">
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={countrySearch}
                      onChange={handleCountrySearch}
                      onFocus={() => setShowCountryDropdown(true)}
                      placeholder="Search for a country..."
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                      required
                    />

                    {/* Country Dropdown */}
                    {showCountryDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((countryName) => (
                            <div
                              key={countryName}
                              onClick={() => selectCountry(countryName)}
                              className="px-3 py-2 text-white hover:bg-green-600 cursor-pointer transition-colors"
                            >
                              {countryName}
                            </div>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-gray-400">
                            No countries found
                          </div>
                        )}
                      </div>
                    )}

                    {/* Close dropdown when clicking outside */}
                    {showCountryDropdown && (
                      <div
                        className="fixed inset-0 z-0"
                        onClick={() => setShowCountryDropdown(false)}
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Phone (Optional)
                    </label>
                    <div className="flex">
                      {/* Country Code Box */}
                      <div className="flex items-center px-3 py-3 bg-green-600 border border-green-500 rounded-l-lg text-white font-mono text-sm font-medium">
                        {phonePlaceholder || "+1"}
                      </div>
                      {/* Phone Input */}
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 p-3 bg-gray-800 border border-gray-600 border-l-0 rounded-r-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                        placeholder=""
                      />
                    </div>
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

                  {/* Project Description */}
                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Describe Your Initiative, Challenge, or Collaboration Interest *
                    </label>
                    <div className="relative">
                      <textarea
                        value={projectDescription}
                        onChange={(e) => {
                          if (e.target.value.length <= 4000) {
                            setProjectDescription(e.target.value);
                          }
                        }}
                        placeholder="Please provide as much relevant structural detail as possible regarding your institution, scenario, and objectives..."
                        rows={6}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white resize-none focus:border-green-500 focus:outline-none transition-colors"
                        required
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                        {projectDescription.length}/4000
                      </div>
                    </div>
                    <div className="text-gray-400 text-xs leading-relaxed mt-2">
                      Vigilum is in advanced development. Inquiries are reviewed for research and pilot collaboration. Direct product demonstrations are not available.
                    </div>
                  </div>



                  {/* Verification and Privacy */}
                  <div className="space-y-6">
                    {/* Privacy Policy - Enterprise Grade */}
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="privacy-check"
                          checked={privacyAccepted}
                          onChange={(e) => setPrivacyAccepted(e.target.checked)}
                          className="w-4 h-4 bg-gray-800 border border-gray-600 rounded focus:ring-green-500 focus:ring-2 mt-0.5"
                          required
                        />
                        <label htmlFor="privacy-check" className="text-gray-300 text-sm leading-relaxed">
                          I confirm that I have read and fully understood the Vigilum{" "}
                          <button
                            type="button"
                            onClick={() => setShowPrivacyModal(true)}
                            className="text-green-400 hover:text-green-300 transition-colors"
                            style={{ fontSize: "inherit", fontWeight: "normal", textTransform: "none" }}
                          >
                            Privacy Policy
                          </button>{" "}
                          and Data Use Statement, and expressly consent to the processing of my information as described therein.
                        </label>
                      </div>
                      <div className="text-gray-400 leading-relaxed pl-7" style={{ fontSize: "10px" }}>
                        By submitting this inquiry, I authorize Vigilum to collect, store, and process my personal and institutional data for the purposes of partnership evaluation, product research, compliance analytics, and operational communication, in accordance with the Vigilum Privacy Policy and applicable international data protection laws (including GDPR).
                      </div>
                    </div>



                  </div>

                  {/* Submit Button - Centered with balanced spacing */}
                  <div className="flex justify-center mb-4" style={{ marginTop: "32px" }}>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !privacyAccepted}
                      className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ textTransform: "none" }}
                    >
                      {isSubmitting ? "Sending..." : "Send an Inquiry"}
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
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Vigilum Privacy Policy and Data Use Statement</h3>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="text-gray-300 space-y-6 text-sm leading-relaxed">

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">1. Data Collection</h4>
                  <p>We collect the following data when you submit an inquiry:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Contact information (name, business email, phone number)</li>
                    <li>Professional details (job title, company/institution, country)</li>
                    <li>Project descriptions and inquiries</li>
                    <li>Technical logs (IP address, browser type, submission timestamp)</li>
                    <li>reCAPTCHA verification data</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">2. Data Purpose</h4>
                  <p>Your data is processed for the following purposes:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Institutional engagement and stakeholder communication</li>
                    <li>Product research and development analytics</li>
                    <li>Compliance monitoring and reporting</li>
                    <li>Security and fraud prevention</li>
                    <li>Legal and regulatory compliance</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">3. Data Storage and Security</h4>
                  <p>We implement enterprise-grade security measures:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li><strong>Retention:</strong> Data retained for 7 years or as required by law</li>
                    <li><strong>Location:</strong> Stored in secure, encrypted databases in the US and EU</li>
                    <li><strong>Security:</strong> AES-256 encryption, SOC 2 compliant infrastructure</li>
                    <li><strong>Access:</strong> Restricted to authorized personnel only</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">4. Data Sharing</h4>
                  <p className="text-green-400 font-medium">We never sell your data.</p>
                  <p className="mt-2">Limited sharing occurs only for:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Institutional engagement and partnership development</li>
                    <li>Legal compliance when required by law</li>
                    <li>Trusted service providers under strict data processing agreements</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">5. Your Rights (GDPR & International Standards)</h4>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><strong>Access:</strong> Request copies of your data</li>
                    <li><strong>Rectification:</strong> Correct inaccurate information</li>
                    <li><strong>Erasure:</strong> Request deletion of your data</li>
                    <li><strong>Portability:</strong> Receive your data in machine-readable format</li>
                    <li><strong>Objection:</strong> Opt-out of processing for specific purposes</li>
                    <li><strong>Restriction:</strong> Limit how we process your data</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">6. Contact Information</h4>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p><strong>Data Protection Officer:</strong></p>
                    <p className="text-green-400 font-mono">privacy@vigilum.com</p>
                    <p className="mt-2"><strong>Postal Address:</strong></p>
                    <p>Vigilum Data Protection<br/>
                    Columbia University MARS-REERS Program<br/>
                    New York, NY 10027, USA</p>
                  </div>
                </section>

                <section className="text-xs text-gray-400 border-t border-gray-600 pt-4">
                  <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Governing Law:</strong> New York State, USA | EU GDPR Compliant</p>
                  <p><strong>Policy Version:</strong> 2.1</p>
                </section>

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
