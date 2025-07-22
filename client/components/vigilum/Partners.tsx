import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { sendContactForm } from "@/lib/emailService";
import {
  Mail,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Users,
  Building,
} from "lucide-react";

const Partners = () => {
  // Contact Form State
  const [fullName, setFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [scrollIntensity, setScrollIntensity] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [robotVerified, setRobotVerified] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const intensity = Math.min(scrollY * 0.001, 0.5); // Cap at 0.5 for subtle effect
      setScrollIntensity(intensity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    setPrivacyAccepted(false);
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
        backgroundColor: "#1C2722", // Fallback background
        background: `linear-gradient(90deg,
          rgba(28, 39, 34, ${1 - scrollIntensity * 0.3}) 0%,
          rgba(52, 79, 64, ${1 - scrollIntensity * 0.2}) 100%)`,
        transition: "background 0.2s ease-out",
      }}
    >
      {/* STAKEHOLDERS SECTION */}
      <section className="py-20" aria-labelledby="stakeholders-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2
                className="text-white font-display mb-6"
                style={{
                  fontSize: "48px",
                  lineHeight: "60px",
                  fontWeight: "400",
                }}
              >
                STAKEHOLDERS
              </h2>
              <div className="max-w-2xl mx-auto">
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Connect with institutional stakeholders and collaborative networks for structural
                  governance intelligence and strategic implementation.
                </p>
                <div className="flex items-center justify-center space-x-8 text-sm text-green-400">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Enterprise Solutions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Strategic Partnerships</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>info@vigilum.com</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Success Message */}
            {isSubmitted && (
              <motion.div
                className="mb-8 p-4 bg-green-900/30 border border-green-700 rounded-lg flex items-center justify-center space-x-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-green-300 font-mono">
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

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Attachments (Optional)
                    </label>
                    <div
                      className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">
                        Click to upload files or drag and drop
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Max 20MB per file
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                    />

                    {/* Attached Files */}
                    {attachedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {attachedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-800 rounded border border-gray-600"
                          >
                            <span className="text-white text-sm truncate">
                              {file.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Verification and Privacy */}
                  <div className="space-y-4">
                    {/* Robot Verification */}
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="robot-check"
                        checked={robotVerified}
                        onChange={(e) => setRobotVerified(e.target.checked)}
                        className="w-4 h-4 bg-gray-800 border border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <label htmlFor="robot-check" className="text-gray-300 text-sm">
                        I am not a robot
                      </label>
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
      </section>
    </div>
  );
};

export default Partners;
