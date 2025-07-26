import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "@/components/ui/Carousel";

// Data for the institutional definitions
const institutionalData = {
  groups: [
    {
      id: "government",
      name: "Government / State",
      description:
        "Major international and national authorities, each with their own official definition of corruption.",
      emblem: "🏛️",
      institutions: [
        {
          name: "European Commission",
          logo: "🇪🇺",
          definition:
            "Corruption is any abuse of power for private gain, undermining good governance, rule of law, and fair competition.",
          source: "European Commission, official website",
          includes: [
            "Bribery",
            "Abuse of office",
            "Private gain",
            "Public/private sector",
          ],
          excludes: [
            "Lobbying (unless illegal)",
            "Legal influence",
            "Conflict of interest (unless leads to abuse)",
            "Fraud (unless linked)",
          ],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "included",
            influencePeddling: "excluded",
            lobbying: "excluded",
            conflictOfInterest: "excluded",
            fraud: "excluded",
          },
        },
        {
          name: "US Department of Justice",
          logo: "🇺🇸",
          definition:
            "The offering, giving, receiving, or soliciting of anything of value to influence the actions of an official in the discharge of public or commercial duties.",
          source: "DOJ, official website",
          includes: [
            "Bribery",
            "Public officials",
            "Commercial duties",
            "Value exchange",
          ],
          excludes: [
            "Abuse of power (unless bribery)",
            "Private sector (unless official)",
            "Lobbying",
            "Conflict of interest",
          ],
          tags: {
            bribery: "included",
            abuseOfPower: "excluded",
            privateSector: "included",
            influencePeddling: "excluded",
            lobbying: "excluded",
            conflictOfInterest: "excluded",
            fraud: "excluded",
          },
        },
        {
          name: "OECD",
          logo: "🌐",
          definition:
            "Corruption is the abuse of public or private office for personal gain.",
          source: "OECD, official website",
          includes: [
            "Bribery",
            "Abuse of power",
            "Private sector",
            "Personal gain",
          ],
          excludes: [
            "Influence peddling",
            "Lobbying",
            "Conflict of interest",
            "Fraud",
          ],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "included",
            influencePeddling: "excluded",
            lobbying: "excluded",
            conflictOfInterest: "excluded",
            fraud: "excluded",
          },
        },
        {
          name: "GRECO",
          logo: "⚖️",
          definition:
            "Corruption means an act or omission contrary to duties of office, undertaken with intent to derive personal or group benefit.",
          source: "GRECO, official website",
          includes: [
            "Bribery",
            "Abuse of power",
            "Private sector",
            "Influence peddling",
          ],
          excludes: [
            "Lobbying (unless illegal)",
            "Conflict of interest",
            "Fraud",
          ],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "included",
            influencePeddling: "included",
            lobbying: "excluded",
            conflictOfInterest: "excluded",
            fraud: "excluded",
          },
        },
      ],
    },
    {
      id: "financial",
      name: "International Financial",
      description:
        "Leading global financial institutions with their corruption frameworks.",
      emblem: "🏦",
      institutions: [
        {
          name: "World Bank",
          logo: "🌍",
          definition:
            "Corruption is the abuse of public office for private gain, including fraud, embezzlement, and misappropriation.",
          source: "World Bank, official website",
          includes: [
            "Bribery",
            "Fraud",
            "Embezzlement",
            "Misappropriation",
            "Public office",
          ],
          excludes: [
            "Private sector corruption",
            "Lobbying",
            "Conflict of interest",
          ],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "excluded",
            influencePeddling: "excluded",
            lobbying: "excluded",
            conflictOfInterest: "excluded",
            fraud: "included",
          },
        },
        {
          name: "IMF",
          logo: "💰",
          definition:
            "Corruption is the abuse of public power for private benefit, including bribery, embezzlement, and fraud.",
          source: "IMF, official website",
          includes: [
            "Bribery",
            "Embezzlement",
            "Fraud",
            "Public power",
            "Private benefit",
          ],
          excludes: [
            "Private sector",
            "Lobbying",
            "Conflict of interest",
            "Influence peddling",
          ],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "excluded",
            influencePeddling: "excluded",
            lobbying: "excluded",
            conflictOfInterest: "excluded",
            fraud: "included",
          },
        },
        {
          name: "European Investment Bank",
          logo: "🏛️",
          definition:
            "Corruption includes any abuse of entrusted power for private gain, encompassing bribery, fraud, and embezzlement.",
          source: "EIB, official website",
          includes: [
            "Bribery",
            "Fraud",
            "Embezzlement",
            "Entrusted power",
            "Private gain",
          ],
          excludes: ["Lobbying", "Conflict of interest", "Influence peddling"],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "ambiguous",
            influencePeddling: "excluded",
            lobbying: "excluded",
            conflictOfInterest: "excluded",
            fraud: "included",
          },
        },
        {
          name: "UNODC",
          logo: "🌐",
          definition:
            "Corruption is a complex social, political and economic phenomenon that affects all countries, involving bribery, embezzlement, fraud, and abuse of power.",
          source: "UNODC, official website",
          includes: [
            "Bribery",
            "Embezzlement",
            "Fraud",
            "Abuse of power",
            "All countries",
          ],
          excludes: ["Lobbying (unless illegal)", "Conflict of interest"],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "included",
            influencePeddling: "ambiguous",
            lobbying: "excluded",
            conflictOfInterest: "excluded",
            fraud: "included",
          },
        },
      ],
    },
    {
      id: "corporate",
      name: "Private / Corporate",
      description:
        "Major corporations and business organizations defining corruption in commercial contexts.",
      emblem: "🏢",
      institutions: [
        {
          name: "Siemens AG",
          logo: "⚡",
          definition:
            "Corruption includes bribery, kickbacks, facilitation payments, and any abuse of position for personal or company benefit.",
          source: "Siemens AG, compliance guidelines",
          includes: [
            "Bribery",
            "Kickbacks",
            "Facilitation payments",
            "Abuse of position",
            "Company benefit",
          ],
          excludes: [
            "Lobbying",
            "Conflict of interest (unless leads to corruption)",
            "Fraud (separate category)",
          ],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "included",
            influencePeddling: "ambiguous",
            lobbying: "excluded",
            conflictOfInterest: "ambiguous",
            fraud: "excluded",
          },
        },
        {
          name: "Deloitte",
          logo: "📊",
          definition:
            "Corruption encompasses bribery, fraud, money laundering, and any improper use of position or information for personal gain.",
          source: "Deloitte, compliance framework",
          includes: [
            "Bribery",
            "Fraud",
            "Money laundering",
            "Improper use of position",
            "Personal gain",
          ],
          excludes: [
            "Lobbying",
            "Conflict of interest (unless leads to corruption)",
          ],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "included",
            influencePeddling: "included",
            lobbying: "excluded",
            conflictOfInterest: "ambiguous",
            fraud: "included",
          },
        },
        {
          name: "Shell",
          logo: "🛢️",
          definition:
            "Corruption is the abuse of entrusted power for private gain, including bribery, facilitation payments, and kickbacks.",
          source: "Shell, code of conduct",
          includes: [
            "Bribery",
            "Facilitation payments",
            "Kickbacks",
            "Entrusted power",
            "Private gain",
          ],
          excludes: [
            "Lobbying",
            "Conflict of interest",
            "Fraud (separate offense)",
          ],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "included",
            influencePeddling: "excluded",
            lobbying: "excluded",
            conflictOfInterest: "excluded",
            fraud: "excluded",
          },
        },
        {
          name: "World Economic Forum",
          logo: "🌐",
          definition:
            "Corruption is the misuse of public or private power for personal gain, undermining trust, fairness, and sustainable development.",
          source: "WEF, anti-corruption principles",
          includes: [
            "Misuse of power",
            "Public and private",
            "Personal gain",
            "Trust undermining",
          ],
          excludes: [
            "Lobbying (unless illegal)",
            "Conflict of interest (unless leads to misuse)",
          ],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "included",
            influencePeddling: "ambiguous",
            lobbying: "excluded",
            conflictOfInterest: "ambiguous",
            fraud: "ambiguous",
          },
        },
      ],
    },
    {
      id: "civil",
      name: "Civil Society / NGO",
      description:
        "Leading transparency and anti-corruption organizations with their definitions.",
      emblem: "🤝",
      institutions: [
        {
          name: "Transparency International",
          logo: "🔍",
          definition:
            "Corruption is the abuse of entrusted power for private gain.",
          source: "Transparency International, official website",
          includes: [
            "Abuse of power",
            "Entrusted power",
            "Private gain",
            "All sectors",
          ],
          excludes: [
            "Lobbying (depends on context)",
            "Conflict of interest (case by case)",
          ],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "included",
            influencePeddling: "ambiguous",
            lobbying: "ambiguous",
            conflictOfInterest: "ambiguous",
            fraud: "excluded",
          },
        },
        {
          name: "OCCRP",
          logo: "📰",
          definition:
            "Corruption includes bribery, embezzlement, fraud, money laundering, nepotism, and abuse of power for personal or political gain.",
          source: "OCCRP, investigative framework",
          includes: [
            "Bribery",
            "Embezzlement",
            "Fraud",
            "Money laundering",
            "Nepotism",
            "Political gain",
          ],
          excludes: ["Lobbying (unless illegal)"],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "included",
            influencePeddling: "included",
            lobbying: "excluded",
            conflictOfInterest: "included",
            fraud: "included",
          },
        },
        {
          name: "Global Witness",
          logo: "👁️",
          definition:
            "Corruption encompasses bribery, embezzlement, abuse of power, and any misuse of position for personal, political, or commercial advantage.",
          source: "Global Witness, investigative reports",
          includes: [
            "Bribery",
            "Embezzlement",
            "Abuse of power",
            "Commercial advantage",
            "Political advantage",
          ],
          excludes: ["Lobbying (unless involves bribery)"],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "included",
            influencePeddling: "included",
            lobbying: "excluded",
            conflictOfInterest: "ambiguous",
            fraud: "ambiguous",
          },
        },
        {
          name: "ICIJ",
          logo: "📊",
          definition:
            "Corruption includes bribery, money laundering, tax evasion, embezzlement, and systematic abuse of power for private benefit.",
          source: "ICIJ, investigative methodology",
          includes: [
            "Bribery",
            "Money laundering",
            "Tax evasion",
            "Embezzlement",
            "Systematic abuse",
          ],
          excludes: [
            "Lobbying",
            "Conflict of interest (unless leads to corruption)",
          ],
          tags: {
            bribery: "included",
            abuseOfPower: "included",
            privateSector: "included",
            influencePeddling: "included",
            lobbying: "excluded",
            conflictOfInterest: "ambiguous",
            fraud: "included",
          },
        },
      ],
    },
  ],
};

const tagLabels = {
  bribery: "Bribery",
  abuseOfPower: "Abuse of Power",
  privateSector: "Private Sector",
  influencePeddling: "Influence Peddling",
  lobbying: "Lobbying",
  conflictOfInterest: "Conflict of Interest",
  fraud: "Fraud",
};

const tagTooltips = {
  lobbying:
    "Lobbying is legal in most jurisdictions unless it involves illegal payments or abuse of office.",
  conflictOfInterest:
    "Conflict of interest is often a risk factor rather than corruption itself, unless it leads to abuse.",
  fraud:
    "Fraud may be treated as a separate crime or included within corruption definitions depending on the institution.",
};

const TagPill = ({ tag, status, label }) => {
  const getTagStyle = (status) => {
    switch (status) {
      case "included":
        return {
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          borderColor: "rgba(34, 197, 94, 0.6)",
          color: "#10B981",
        };
      case "excluded":
        return {
          backgroundColor: "rgba(107, 114, 128, 0.2)",
          borderColor: "rgba(107, 114, 128, 0.6)",
          color: "#9CA3AF",
        };
      case "ambiguous":
        return {
          backgroundColor: "rgba(245, 158, 11, 0.2)",
          borderColor: "rgba(245, 158, 11, 0.6)",
          color: "#F59E0B",
        };
      default:
        return {
          backgroundColor: "rgba(107, 114, 128, 0.2)",
          borderColor: "rgba(107, 114, 128, 0.6)",
          color: "#9CA3AF",
        };
    }
  };

  const style = getTagStyle(status);

  return (
    <span
      className="tag-pill"
      style={{
        ...style,
        padding: "3px 8px",
        borderRadius: "10px",
        border: "1px solid",
        fontSize: "10px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.4px",
        cursor: tagTooltips[tag] ? "help" : "default",
        whiteSpace: "nowrap",
      }}
      title={tagTooltips[tag]}
    >
      {status === "included" ? "✓" : status === "excluded" ? "–" : "?"} {label}
    </span>
  );
};

const InstitutionCarousel = ({
  institutions,
  isActive = false,
  onCycleComplete = () => {},
  shouldReset = false,
}) => {
  // Convert institutions to carousel format
  const carouselItems = institutions.map((institution, index) => ({
    id: index,
    title: institution.name,
    description: institution.definition,
    icon: (
      <div
        style={{
          fontSize: "24px",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {institution.logo}
      </div>
    ),
    institution: institution, // Keep full institution data for rendering
  }));

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Carousel
        items={carouselItems}
        baseWidth={350}
        autoplay={isActive}
        autoplayDelay={3000}
        pauseOnHover={false}
        loop={false}
        onCycleComplete={onCycleComplete}
        shouldReset={shouldReset}
        customRender={(item) => (
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "4px",
            }}
          >
            {/* Header with logo space and institution info */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  width: "56px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(157, 230, 198, 0.1)",
                  borderRadius: "10px",
                  flexShrink: 0,
                }}
              >
                {item.institution.logo}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#FFFFFF",
                    margin: "0 0 6px 0",
                    lineHeight: "1.2",
                    letterSpacing: "0.3px",
                  }}
                >
                  {item.institution.name}
                </h4>
                <p
                  style={{
                    fontSize: "10px",
                    color: "#9CA3AF",
                    margin: "0",
                    fontWeight: "500",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Source: {item.institution.source}
                </p>
              </div>
            </div>

            {/* Definition text */}
            <div
              style={{
                flex: 1,
                marginBottom: "16px",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontStyle: "italic",
                  color: "#E5E5E5",
                  lineHeight: "1.5",
                  margin: "0",
                  fontWeight: "400",
                  textAlign: "left",
                }}
              >
                "{item.institution.definition}"
              </p>
            </div>

            {/* Tags at bottom */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginTop: "auto",
                paddingTop: "12px",
                borderTop: "1px solid rgba(157, 230, 198, 0.1)",
              }}
            >
              {Object.entries(item.institution.tags).map(([tag, status]) => (
                <TagPill
                  key={tag}
                  tag={tag}
                  status={status}
                  label={tagLabels[tag]}
                />
              ))}
            </div>
          </div>
        )}
      />
    </div>
  );
};

const InstitutionCard = ({ institution }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(16, 32, 28, 0.8)",
        border: "1px solid rgba(157, 230, 198, 0.2)",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(157, 230, 198, 0.1)",
            borderRadius: "8px",
          }}
        >
          {institution.logo}
        </div>
        <div style={{ flex: 1 }}>
          <h4
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#FFFFFF",
              margin: "0 0 8px 0",
            }}
          >
            {institution.name}
          </h4>
          <p
            style={{
              fontSize: "14px",
              fontStyle: "italic",
              color: "#E5E5E5",
              lineHeight: "1.5",
              margin: "0 0 8px 0",
            }}
          >
            "{institution.definition}"
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "#9CA3AF",
              margin: "0",
            }}
          >
            Source: {institution.source}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {Object.entries(institution.tags).map(([tag, status]) => (
          <TagPill key={tag} tag={tag} status={status} label={tagLabels[tag]} />
        ))}
      </div>
    </div>
  );
};

const CorruptionDefinitions = ({ onNavigate }) => {
  const [showCompareAll, setShowCompareAll] = useState(false);
  const [activeCarousel, setActiveCarousel] = useState(0);
  const [carouselCycles, setCarouselCycles] = useState([0, 0, 0, 0]); // Track cycles for each carousel
  const [allCarouselsReset, setAllCarouselsReset] = useState(false);

  const handleCarouselComplete = (carouselIndex) => {
    // Move to next carousel when current one completes a full cycle
    if (carouselIndex === activeCarousel) {
      if (activeCarousel === 3) {
        // If last carousel completed, trigger synchronized reset
        setAllCarouselsReset(true);
        setTimeout(() => {
          setAllCarouselsReset(false);
          // Add extra delay before starting first carousel to avoid jarring transition
          setTimeout(() => {
            setActiveCarousel(0); // Start sequence again from first carousel
          }, 800); // Additional delay for smooth restart
        }, 500); // Brief pause for visual effect
      } else {
        // Move to next carousel
        setActiveCarousel((prev) => prev + 1);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: "40px 32px",
        marginTop: "32px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "left", marginBottom: "48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.5rem)",
              fontWeight: "600",
              color: "#9DE6C6",
              margin: "0",
              fontFamily: "var(--font-display)",
            }}
          >
            What is Corruption?
          </h2>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => onNavigate && onNavigate("Economic")}
              style={{
                backdropFilter: "blur(20px) saturate(180%)",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 8px 32px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#E5E5E5",
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              Economic
            </button>
            <button
              onClick={() => onNavigate && onNavigate("Social")}
              style={{
                backdropFilter: "blur(20px) saturate(180%)",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 8px 32px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#E5E5E5",
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              Social
            </button>
          </div>
        </div>
        <p
          style={{
            fontSize: "18px",
            color: "#9DE6C6",
            margin: "0 0 8px 0",
            fontStyle: "italic",
          }}
        >
          Every institution defines corruption in its own terms.
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#E5E5E5",
            maxWidth: "800px",
            margin: "0",
            lineHeight: "1.6",
          }}
        >
          Explore how the world's leading authorities describe and classify
          corruption.
        </p>
      </div>

      {/* Group Sections in Grid Layout */}
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto auto",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* Top Row: First 2 groups only */}
          {institutionalData.groups.slice(0, 2).map((group, index) => (
            <div
              key={group.id}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* Group Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "16px",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    width: "52px",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(157, 230, 198, 0.1)",
                    borderRadius: "10px",
                  }}
                >
                  {group.emblem}
                </div>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#9DE6C6",
                    margin: "0",
                    fontFamily: "var(--font-display)",
                    textAlign: "center",
                  }}
                >
                  {group.name}
                </h3>
              </div>

              {/* Institution Carousel */}
              <InstitutionCarousel
                institutions={group.institutions}
                isActive={activeCarousel === index}
                onCycleComplete={() => handleCarouselComplete(index)}
                shouldReset={allCarouselsReset}
              />
            </div>
          ))}

          {/* Top Right: Compare All Button */}
          <div
            style={{
              gridColumn: "3",
              gridRow: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setShowCompareAll(true)}
              style={{
                backgroundColor: "rgba(157, 230, 198, 0.1)",
                border: "1px solid rgba(157, 230, 198, 0.3)",
                borderRadius: "25px",
                padding: "16px 24px",
                color: "#9DE6C6",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(157, 230, 198, 0.2)";
                e.target.style.borderColor = "rgba(157, 230, 198, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(157, 230, 198, 0.1)";
                e.target.style.borderColor = "rgba(157, 230, 198, 0.3)";
              }}
            >
              Compare All Definitions
            </button>
          </div>

          {/* Bottom Center: Private/Corporate (3rd group) */}
          <div
            style={{
              gridColumn: "2",
              gridRow: "2",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Group Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  width: "52px",
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(157, 230, 198, 0.1)",
                  borderRadius: "10px",
                }}
              >
                {institutionalData.groups[2].emblem}
              </div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#9DE6C6",
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  textAlign: "center",
                }}
              >
                {institutionalData.groups[2].name}
              </h3>
            </div>

            {/* Institution Carousel */}
            <InstitutionCarousel
              institutions={institutionalData.groups[2].institutions}
              isActive={activeCarousel === 2}
              onCycleComplete={() => handleCarouselComplete(2)}
              shouldReset={allCarouselsReset}
            />
          </div>

          {/* Bottom Right: Civil Society/NGO (4th group) */}
          <div
            style={{
              gridColumn: "3",
              gridRow: "2",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Group Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  width: "52px",
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(157, 230, 198, 0.1)",
                  borderRadius: "10px",
                }}
              >
                {institutionalData.groups[3].emblem}
              </div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#9DE6C6",
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  textAlign: "center",
                }}
              >
                {institutionalData.groups[3].name}
              </h3>
            </div>

            {/* Institution Carousel */}
            <InstitutionCarousel
              institutions={institutionalData.groups[3].institutions}
              isActive={activeCarousel === 3}
              onCycleComplete={() => handleCarouselComplete(3)}
              shouldReset={allCarouselsReset}
            />
          </div>
        </div>
      </div>

      {/* Compare All Modal */}
      <AnimatePresence>
        {showCompareAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
            onClick={() => setShowCompareAll(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                backgroundColor: "#10201C",
                borderRadius: "20px",
                padding: "32px",
                maxWidth: "1200px",
                maxHeight: "90vh",
                overflow: "auto",
                width: "100%",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <h3 style={{ fontSize: "24px", color: "#9DE6C6", margin: 0 }}>
                  All Institutional Definitions
                </h3>
                <button
                  onClick={() => setShowCompareAll(false)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#9DE6C6",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                  gap: "20px",
                }}
              >
                {institutionalData.groups.flatMap((group) =>
                  group.institutions.map((institution, index) => (
                    <InstitutionCard
                      key={`${group.id}-${index}`}
                      institution={institution}
                    />
                  )),
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CorruptionDefinitions;
