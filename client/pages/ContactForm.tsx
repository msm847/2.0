import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    actorType: "",
    email: "",
    message: "",
  });
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [messageLength, setMessageLength] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const actorTypes = [
    "Institutional Auditors",
    "Development Organizations",
    "Civic AI Developers",
    "Students & Researchers",
    "Academic Faculty",
    "Regulatory Agencies",
    "ESG & Compliance Analysts",
    "International Finance",
    "Other Parties of Interest",
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleReturn = () => {
    navigate("/vigilum");
    setTimeout(() => {
      const teamSection = document.getElementById("team-section");
      if (teamSection) {
        teamSection.scrollIntoView({ behavior: "instant" });
      }
    }, 100);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "message") {
      if (value.length <= 3000) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setMessageLength(value.length);
        if (errors.message) {
          setErrors((prev) => ({ ...prev, message: "" }));
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        // 20MB
        setErrors((prev) => ({
          ...prev,
          file: "File size must be less than 20MB",
        }));
        e.target.value = "";
      } else {
        setAttachedFile(file);
        setErrors((prev) => ({ ...prev, file: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.actorType) {
      newErrors.actorType = "Please select your actor type";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", { formData, attachedFile });
      alert("Thank you for your submission! We'll get back to you soon.");

      // Reset form
      setFormData({ actorType: "", email: "", message: "" });
      setAttachedFile(null);
      setMessageLength(0);
      const fileInput = document.getElementById(
        "file-upload",
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #25443B 0%, #1A2F29 50%, #10201C 100%)",
        color: "#DAD7C7",
        padding: "40px 20px",
      }}
    >
      {/* Return Button */}
      <button
        onClick={handleReturn}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          backdropFilter: "blur(20px) saturate(1.8)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "12px",
          boxShadow:
            "0 12px 40px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.5) inset, 0 -1px 0 rgba(0, 0, 0, 0.3) inset, 0 0 20px rgba(64, 255, 170, 0.2)",
          color: "rgba(255, 255, 255, 0.9)",
          cursor: "pointer",
          fontSize: "11px",
          fontWeight: "600",
          letterSpacing: "0.275px",
          lineHeight: "17.6px",
          padding: "8px 16px",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        ← Return
      </button>

      <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "80px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "700",
              color: "#40FFAA",
              marginBottom: "16px",
              textShadow: "0 0 30px rgba(64, 255, 170, 0.3)",
            }}
          >
            Contact Forum
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#9DE6C6",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Connect with us for institutional partnerships, technical
            integration, or research collaboration inquiries.
          </p>
        </div>

        {/* Contact Form */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(16, 32, 28, 0.9) 0%, rgba(12, 25, 22, 0.9) 100%)",
            backdropFilter: "blur(20px) saturate(1.8)",
            border: "1px solid rgba(64, 255, 170, 0.2)",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Actor Type Selection */}
            <div style={{ marginBottom: "24px" }}>
              <label
                htmlFor="actorType"
                style={{
                  display: "block",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#40FFAA",
                  marginBottom: "8px",
                }}
              >
                Actor Type *
              </label>
              <select
                id="actorType"
                name="actorType"
                value={formData.actorType}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: `2px solid ${errors.actorType ? "#ef4444" : "rgba(64, 255, 170, 0.3)"}`,
                  backgroundColor: "rgba(16, 32, 28, 0.8)",
                  color: "#DAD7C7",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(64, 255, 170, 0.6)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(64, 255, 170, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.actorType
                    ? "#ef4444"
                    : "rgba(64, 255, 170, 0.3)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <option value="">Select your actor type</option>
                {actorTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.actorType && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {errors.actorType}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div style={{ marginBottom: "24px" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#40FFAA",
                  marginBottom: "8px",
                }}
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: `2px solid ${errors.email ? "#ef4444" : "rgba(64, 255, 170, 0.3)"}`,
                  backgroundColor: "rgba(16, 32, 28, 0.8)",
                  color: "#DAD7C7",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(64, 255, 170, 0.6)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(64, 255, 170, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.email
                    ? "#ef4444"
                    : "rgba(64, 255, 170, 0.3)";
                  e.target.style.boxShadow = "none";
                }}
              />
              {errors.email && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message Text Area */}
            <div style={{ marginBottom: "24px" }}>
              <label
                htmlFor="message"
                style={{
                  display: "block",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#40FFAA",
                  marginBottom: "8px",
                }}
              >
                Message * ({messageLength}/3000)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Please describe your inquiry, partnership interest, or collaboration proposal..."
                rows={8}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: `2px solid ${errors.message ? "#ef4444" : "rgba(64, 255, 170, 0.3)"}`,
                  backgroundColor: "rgba(16, 32, 28, 0.8)",
                  color: "#DAD7C7",
                  fontSize: "14px",
                  outline: "none",
                  resize: "vertical",
                  minHeight: "120px",
                  fontFamily: "inherit",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(64, 255, 170, 0.6)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(64, 255, 170, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.message
                    ? "#ef4444"
                    : "rgba(64, 255, 170, 0.3)";
                  e.target.style.boxShadow = "none";
                }}
              />
              {errors.message && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {errors.message}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div style={{ marginBottom: "32px" }}>
              <label
                htmlFor="file-upload"
                style={{
                  display: "block",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#40FFAA",
                  marginBottom: "8px",
                }}
              >
                Attachment (Max 20MB)
              </label>
              <div
                style={{
                  border: "2px dashed rgba(64, 255, 170, 0.3)",
                  borderRadius: "12px",
                  padding: "24px",
                  textAlign: "center",
                  backgroundColor: "rgba(16, 32, 28, 0.4)",
                  transition: "all 0.3s ease",
                }}
              >
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                />
                <label
                  htmlFor="file-upload"
                  style={{
                    cursor: "pointer",
                    color: "#9DE6C6",
                    fontSize: "14px",
                    display: "block",
                  }}
                >
                  {attachedFile ? (
                    <>
                      <span style={{ color: "#40FFAA", fontWeight: "600" }}>
                        ✓ {attachedFile.name}
                      </span>
                      <br />
                      <span style={{ fontSize: "12px", opacity: 0.7 }}>
                        ({(attachedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        style={{
                          fontSize: "24px",
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        📎
                      </span>
                      Click to attach a file or drag and drop
                      <br />
                      <span style={{ fontSize: "12px", opacity: 0.7 }}>
                        PDF, DOC, TXT, or Image files (Max 20MB)
                      </span>
                    </>
                  )}
                </label>
              </div>
              {errors.file && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {errors.file}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px 24px",
                borderRadius: "12px",
                border: "1px solid rgba(64, 255, 170, 0.4)",
                backgroundColor: "rgba(64, 255, 170, 0.1)",
                color: "#40FFAA",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(64, 255, 170, 0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(64, 255, 170, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(64, 255, 170, 0.1)";
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            padding: "24px",
            background: "rgba(64, 255, 170, 0.05)",
            border: "1px solid rgba(64, 255, 170, 0.1)",
            borderRadius: "12px",
          }}
        >
          <p
            style={{ fontSize: "14px", color: "#9DE6C6", marginBottom: "8px" }}
          >
            Direct Email
          </p>
          <p style={{ fontSize: "16px", color: "#40FFAA", fontWeight: "600" }}>
            info@vigilum.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
