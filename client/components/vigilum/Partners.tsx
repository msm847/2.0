import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { sendContactForm } from "@/lib/emailService";
import {
  Shield,
  Building,
  Bot,
  GraduationCap,
  Users,
  Scale,
  FileSearch,
  Landmark,
  User,
  Mail,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Briefcase,
} from "lucide-react";

const Partners = () => {
  // Executive Contact Form State
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

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
      setError(`Files too large (max 20MB): ${invalidFiles.join(", ")}`);
      setTimeout(() => setError(""), 5000);
    }

    if (validFiles.length > 0) {
      setAttachedFiles((prev) => [...prev, ...validFiles]);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !company.trim() || !position.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send executive contact form using email service
      await sendContactForm({
        type: "executive",
        fullName,
        company,
        position,
        message,
        files: attachedFiles,
      });

      setIsSubmitted(true);
      setFullName("");
      setCompany("");
      setPosition("");
      setMessage("");
      setAttachedFiles([]);
      setIsFormVisible(false);

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsFormVisible(false);
    setError("");
    setFullName("");
    setCompany("");
    setPosition("");
    setMessage("");
    setAttachedFiles([]);
  };

  return (
    <div style={{
      backgroundColor: "#081912", // Slightly darker than Mission section
      background: "linear-gradient(135deg, #081912 0%, #0A1D16 100%)"
    }}>
      {/* PARTNERS SECTION */}
      <section className="py-20" aria-labelledby="partners-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              className="text-center mb-16 pb-8 text-white font-display"
              style={{
                fontSize: "48px",
                lineHeight: "60px",
                fontWeight: "400"
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              PARTNERS
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
                  Executive contact request sent successfully! We'll get back to you soon.
                </span>
              </motion.div>
            )}

            {/* Partners Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Core Principles Box */}
              <motion.div
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                style={{
                  background: "rgba(16, 32, 28, 0.95)",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,255,204,0.08)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  height: "320px",
                  transition: "all 0.3s ease"
                }}
              >
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4 font-display">
                      Core Principles
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      Foundational guidelines that drive our structural intelligence approach
                    </p>
                  </div>
                  <div className="mt-auto">
                    <button
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-green-400 bg-green-900/20 border border-green-700 rounded-lg hover:bg-green-900/40 transition-all duration-200"
                      onClick={() => window.location.href = "/core-principles"}
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Actors Box */}
              <motion.div
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                style={{
                  background: "rgba(16, 32, 28, 0.95)",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,255,204,0.08)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  height: "320px",
                  transition: "all 0.3s ease"
                }}
              >
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4 font-display">
                      Actors
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      Key stakeholders and institutional players in governance intelligence
                    </p>
                  </div>
                  <div className="mt-auto">
                    <button
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-green-400 bg-green-900/20 border border-green-700 rounded-lg hover:bg-green-900/40 transition-all duration-200"
                      onClick={() => window.location.href = "/actors"}
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Executive Contact Box */}
              <motion.div
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.02, y: -5 }}
                style={{
                  background: "rgba(16, 32, 28, 0.95)",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,255,204,0.08)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  height: "320px",
                  transition: "all 0.3s ease"
                }}
              >
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Briefcase className="w-6 h-6 text-green-400" />
                      <h3 className="text-2xl font-semibold text-white font-display">
                        Executive Contact
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      Direct communication channel for strategic partnerships and enterprise integration
                    </p>
                    <p className="text-green-400 text-sm font-mono mb-6 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      info@vigilum.com
                    </p>
                  </div>
                  <div className="mt-auto">
                    <button
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-green-400 bg-green-900/20 border border-green-700 rounded-lg hover:bg-green-900/40 transition-all duration-200"
                      onClick={() => setIsFormVisible(true)}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Executive Contact Form Modal */}
            {isFormVisible && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) resetForm();
                }}
              >
                <motion.div
                  className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: "linear-gradient(135deg, #0B1E16 0%, #081912 100%)",
                    border: "1px solid rgba(0,255,204,0.15)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
                  }}
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <Briefcase className="w-6 h-6 text-green-400" />
                        <h2 className="text-2xl font-bold text-white font-display">
                          Executive Contact
                        </h2>
                      </div>
                      <button
                        onClick={resetForm}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-center space-x-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <span className="text-red-300 font-mono text-sm">{error}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Required Fields */}
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
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-green-400 mb-2">
                          Position/Title *
                        </label>
                        <input
                          type="text"
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                          required
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-green-400 mb-2">
                          Message *
                        </label>
                        <div className="relative">
                          <textarea
                            value={message}
                            onChange={(e) => {
                              if (e.target.value.length <= 4000) {
                                setMessage(e.target.value);
                              }
                            }}
                            placeholder="Describe your partnership opportunity, integration requirements, or strategic collaboration needs..."
                            rows={6}
                            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white resize-none focus:border-green-500 focus:outline-none transition-colors"
                            required
                          />
                          <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                            {message.length}/4000
                          </div>
                        </div>
                      </div>

                      {/* File Upload */}
                      <div>
                        <label className="block text-sm font-medium text-green-400 mb-2">
                          Attachments (Optional)
                        </label>
                        <div
                          className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-green-500 transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-400 text-sm">Click to upload files (max 20MB each)</p>
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                          />
                        </div>

                        {/* Attached Files */}
                        {attachedFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {attachedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-600"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                    <Upload className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-white text-sm">{file.name}</p>
                                    <p className="text-gray-400 text-xs">{formatFileSize(file.size)}</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-gray-400 hover:text-red-400 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end space-x-4 pt-4">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <Button
                          type="submit"
                          disabled={isSubmitting || !fullName.trim() || !company.trim() || !position.trim() || !message.trim()}
                          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
