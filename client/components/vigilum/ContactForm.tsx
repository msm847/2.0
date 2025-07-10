import { useState, useRef } from "react";
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
  ArrowLeft,
  Mail,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ContactForm = () => {
  const [selectedDemographic, setSelectedDemographic] = useState("");
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const demographics = [
    { id: "auditor", title: "Institutional Auditors", icon: Shield },
    { id: "donor", title: "Development Organizations", icon: Building },
    { id: "civic", title: "Civic AI Developers", icon: Bot },
    { id: "students", title: "Students & Researchers", icon: GraduationCap },
    { id: "professors", title: "Academic Faculty", icon: Users },
    { id: "regulators", title: "Regulatory Agencies", icon: Scale },
    { id: "analysts", title: "ESG & Compliance Analysts", icon: FileSearch },
    { id: "ifi", title: "International Finance", icon: Landmark },
    { id: "other", title: "Other", icon: User },
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedDemographic) {
      setError("Please select your demographic");
      return;
    }

    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send contact form using email service
      await sendContactForm({
        demographic: selectedDemographic,
        message: message,
        files: attachedFiles,
      });

      setIsSubmitted(true);
      setSelectedDemographic("");
      setMessage("");
      setAttachedFiles([]);

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div style={{ backgroundColor: "#0B1E16", minHeight: "100vh" }}>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-900/30 px-3 py-1 rounded-full border border-green-700 mb-4">
              <Mail className="w-3 h-3 text-green-400" />
              <span className="text-xs text-green-300 font-mono uppercase tracking-wider">
                Contact Form
              </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-100 mb-4 font-mono tracking-tight">
              GET IN TOUCH
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Tell us about your structural governance intelligence needs.
            </p>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className="mb-8 p-4 bg-green-900/30 border border-green-700 rounded-lg flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-green-300 font-mono">
                Message sent successfully! We'll get back to you soon.
              </span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-300 font-mono">{error}</span>
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div
              className="rounded-lg p-8 border"
              style={{
                backgroundColor: "rgba(12, 35, 28, 0.85)",
                borderColor: "rgba(0,255,204,0.06)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
              }}
            >
              {/* Demographic Selection */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-green-400 font-mono mb-4">
                  I am a...
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {demographics.map((demo) => {
                    const Icon = demo.icon;
                    return (
                      <button
                        key={demo.id}
                        type="button"
                        onClick={() => setSelectedDemographic(demo.id)}
                        className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                          selectedDemographic === demo.id
                            ? "border-green-500 bg-green-900/30"
                            : "border-gray-700 hover:border-green-600"
                        }`}
                        style={{
                          backgroundColor:
                            selectedDemographic === demo.id
                              ? "rgba(34, 197, 94, 0.15)"
                              : "rgba(12, 35, 28, 0.5)",
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              selectedDemographic === demo.id
                                ? "bg-green-600"
                                : "bg-gray-600"
                            }`}
                          >
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-300 font-mono text-sm">
                            {demo.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Input */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-green-400 font-mono mb-4">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => {
                      if (e.target.value.length <= 3000) {
                        setMessage(e.target.value);
                      }
                    }}
                    placeholder="Tell us about your governance intelligence needs, use case, or questions..."
                    rows={8}
                    className="w-full p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-300 font-mono resize-none focus:border-green-500 focus:outline-none transition-colors"
                    style={{
                      backgroundColor: "rgba(17, 24, 39, 0.5)",
                    }}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500 font-mono">
                    {message.length}/3000
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-green-400 font-mono mb-4">
                  Attachments (Optional)
                </label>
                <div
                  className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-green-600 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 font-mono text-sm mb-1">
                    Click to upload files
                  </p>
                  <p className="text-gray-600 font-mono text-xs">
                    Maximum 20MB per file
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip"
                  />
                </div>

                {/* Attached Files */}
                {attachedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {attachedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg border border-gray-700"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                            <Upload className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-gray-300 font-mono text-sm">
                              {file.name}
                            </p>
                            <p className="text-gray-500 font-mono text-xs">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/vigilum";
                    setTimeout(() => {
                      window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: "smooth",
                      });
                    }, 300);
                  }}
                  className="inline-flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors font-mono cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Team</span>
                </button>

                <Button
                  type="submit"
                  disabled={
                    isSubmitting || !selectedDemographic || !message.trim()
                  }
                  className="bg-green-600 hover:bg-green-700 text-white font-mono px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
