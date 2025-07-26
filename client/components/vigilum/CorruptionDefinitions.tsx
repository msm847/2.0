import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "@/components/ui/Carousel";

// Boundary Logic Carousel Data
const boundaryLogicData = {
  regulatory: [
    {
      id: 'doj',
      name: 'US DOJ',
      logo: '🏛️',
      definition: 'The offering, giving, receiving, or soliciting of anything of value to influence the actions of an official in the discharge of public or commercial duties.',
      citation: { text: 'DOJ, Foreign Corrupt Practices Act Resource Guide, 2020', url: 'https://www.justice.gov/criminal-fraud/file/1292051/download' },
      tags: {
        bribery: { state: '✓', tooltip: 'Explicitly included in FCPA definition as core violation.' },
        lobbying: { state: '–', tooltip: 'Lobbying excluded unless it constitutes direct bribery payment.' },
        privateSector: { state: '?', tooltip: 'Private sector corruption recognized only when affecting government officials.' },
        influencePeddling: { state: '✓', tooltip: 'Covered under FCPA when involving government officials.' },
        conflictOfInterest: { state: '–', tooltip: 'Not directly addressed in criminal statutes.' },
        fraud: { state: '✓', tooltip: 'Covered under separate federal fraud statutes.' },
        embezzlement: { state: '✓', tooltip: 'Covered when involving public funds or officials.' },
        nepotism: { state: '–', tooltip: 'Not criminalized unless involving bribery.' }
      }
    },
    {
      id: 'oecd',
      name: 'OECD',
      logo: '🌐',
      definition: 'The active bribery of foreign public officials, as well as the failure to prevent such bribery by persons associated with a commercial organization.',
      citation: { text: 'OECD Anti-Bribery Convention, 1997', url: 'https://www.oecd.org/corruption/oecdantibriberyconvention.htm' },
      tags: {
        bribery: { state: '✓', tooltip: 'Central focus on active bribery of foreign officials.' },
        lobbying: { state: '?', tooltip: 'Lobbying only problematic when crossing into bribery territory.' },
        privateSector: { state: '–', tooltip: 'Focus limited to public sector bribery.' },
        influencePeddling: { state: '✓', tooltip: 'Included when involving foreign public officials.' },
        conflictOfInterest: { state: '?', tooltip: 'Addressed in recommendations but not binding.' },
        fraud: { state: '–', tooltip: 'Not central to anti-bribery framework.' },
        embezzlement: { state: '–', tooltip: 'Outside scope of bribery convention.' },
        nepotism: { state: '–', tooltip: 'Not addressed in convention framework.' }
      }
    },
    {
      id: 'greco',
      name: 'GRECO',
      logo: '🇪🇺',
      definition: 'Criminal or disciplinary offences of corruption, comprising active and passive bribery, abuse of functions, and related offences.',
      citation: { text: 'GRECO, Evaluation Reports, 2019', url: 'https://www.coe.int/en/web/greco' },
      tags: {
        bribery: { state: '✓', tooltip: 'Core focus on both active and passive bribery.' },
        lobbying: { state: '?', tooltip: 'Transparency required but not inherently corrupt.' },
        privateSector: { state: '✓', tooltip: 'Private sector bribery explicitly addressed.' },
        influencePeddling: { state: '✓', tooltip: 'Covered under trading in influence provisions.' },
        conflictOfInterest: { state: '✓', tooltip: 'Addressed in public ethics recommendations.' },
        fraud: { state: '–', tooltip: 'Outside core corruption mandate.' },
        embezzlement: { state: '✓', tooltip: 'Included in abuse of functions category.' },
        nepotism: { state: '?', tooltip: 'Addressed through conflict of interest measures.' }
      }
    },
    {
      id: 'fcn',
      name: 'UN FCAC',
      logo: '🌍',
      definition: 'Solicitation or acceptance by a public official of an undue advantage and the offering or granting of an undue advantage to a public official.',
      citation: { text: 'UN Convention Against Corruption, 2003', url: 'https://www.unodc.org/unodc/en/corruption/uncac.html' },
      tags: {
        bribery: { state: '✓', tooltip: 'Comprehensive bribery provisions for public and private sectors.' },
        lobbying: { state: '–', tooltip: 'Not explicitly addressed in convention text.' },
        privateSector: { state: '✓', tooltip: 'Private sector bribery covered in Article 21.' },
        influencePeddling: { state: '✓', tooltip: 'Trading in influence covered in Article 18.' },
        conflictOfInterest: { state: '?', tooltip: 'Addressed in preventive measures chapters.' },
        fraud: { state: '✓', tooltip: 'Fraud against public sector covered.' },
        embezzlement: { state: '✓', tooltip: 'Embezzlement explicitly criminalized.' },
        nepotism: { state: '?', tooltip: 'Addressed through public sector ethics provisions.' }
      }
    }
  ],
  international: [
    {
      id: 'worldbank',
      name: 'World Bank',
      logo: '🏦',
      definition: 'The abuse of public office for private gain, including both grand and petty corruption, and capture of the state by elites and private interests.',
      citation: { text: 'World Bank, Helping Countries Combat Corruption, 1997', url: 'https://openknowledge.worldbank.org/handle/10986/11957' },
      tags: {
        bribery: { state: '✓', tooltip: 'Explicitly included as core corruption type.' },
        lobbying: { state: '?', tooltip: 'Problematic when it constitutes state capture.' },
        privateSector: { state: '✓', tooltip: 'Private sector corruption explicitly recognized.' },
        influencePeddling: { state: '✓', tooltip: 'Covered under state capture framework.' },
        conflictOfInterest: { state: '✓', tooltip: 'Addressed in governance and procurement standards.' },
        fraud: { state: '✓', tooltip: 'Included in financial crime prevention.' },
        embezzlement: { state: '✓', tooltip: 'Explicitly included in corruption typology.' },
        nepotism: { state: '✓', tooltip: 'Recognized as form of corruption affecting governance.' }
      }
    },
    {
      id: 'imf',
      name: 'IMF',
      logo: '💰',
      definition: 'The abuse of public office for private gain, with emphasis on fiscal corruption and misuse of public resources.',
      citation: { text: 'IMF, The Role of the IMF in Governance Issues, 1997', url: 'https://www.imf.org/external/pubs/ft/exrp/govern/govern.pdf' },
      tags: {
        bribery: { state: '✓', tooltip: 'Included when affecting fiscal governance.' },
        lobbying: { state: '–', tooltip: 'Generally not within IMF mandate unless affecting fiscal policy.' },
        privateSector: { state: '?', tooltip: 'Relevant only when affecting public financial management.' },
        influencePeddling: { state: '?', tooltip: 'Addressed when impacting economic governance.' },
        conflictOfInterest: { state: '✓', tooltip: 'Critical in financial sector oversight.' },
        fraud: { state: '✓', tooltip: 'Central concern in public financial management.' },
        embezzlement: { state: '✓', tooltip: 'Core focus in public resource management.' },
        nepotism: { state: '?', tooltip: 'Relevant when affecting financial governance quality.' }
      }
    },
    {
      id: 'ebrd',
      name: 'EBRD',
      logo: '🏛️',
      definition: 'Improper use of official position for personal or private advantage in connection with EBRD operations.',
      citation: { text: 'EBRD, Enforcement Policy and Procedures, 2020', url: 'https://www.ebrd.com/integrity-compliance.html' },
      tags: {
        bribery: { state: '✓', tooltip: 'Prohibited in all EBRD-financed projects.' },
        lobbying: { state: '–', tooltip: 'Not within EBRD enforcement scope.' },
        privateSector: { state: '✓', tooltip: 'Private sector conduct covered in project finance.' },
        influencePeddling: { state: '✓', tooltip: 'Improper influence prohibited in operations.' },
        conflictOfInterest: { state: '✓', tooltip: 'Strictly regulated in procurement and operations.' },
        fraud: { state: '✓', tooltip: 'Fraudulent practices covered in enforcement.' },
        embezzlement: { state: '✓', tooltip: 'Misappropriation prohibited in project funds.' },
        nepotism: { state: '?', tooltip: 'Addressed through conflict of interest policies.' }
      }
    },
    {
      id: 'adb',
      name: 'ADB',
      logo: '🌏',
      definition: 'Offering, giving, receiving, or soliciting of anything of value to influence improperly the actions of another party.',
      citation: { text: 'ADB, Anticorruption and Integrity Policy, 2020', url: 'https://www.adb.org/documents/anticorruption-integrity-policy' },
      tags: {
        bribery: { state: '✓', tooltip: 'Core violation in ADB integrity framework.' },
        lobbying: { state: '–', tooltip: 'Outside ADB operational mandate.' },
        privateSector: { state: '✓', tooltip: 'Private sector operations covered.' },
        influencePeddling: { state: '✓', tooltip: 'Improper influence explicitly prohibited.' },
        conflictOfInterest: { state: '✓', tooltip: 'Covered in integrity and procurement policies.' },
        fraud: { state: '✓', tooltip: 'Fraudulent practice prohibited in operations.' },
        embezzlement: { state: '✓', tooltip: 'Misappropriation covered in enforcement.' },
        nepotism: { state: '?', tooltip: 'Addressed through transparency and ethics measures.' }
      }
    }
  ]
};

const termDefinitions = {
  bribery: {
    title: 'How Bribery Is Defined Across Institutions',
    analysis: 'Bribery definitions converge on quid pro quo exchanges but diverge on scope, actors, and enforcement thresholds. This creates jurisdictional gaps enabling regulatory arbitrage.',
    consequence: 'Definitional boundaries determine prosecutorial scope and enable legal extraction through excluded channels.'
  },
  lobbying: {
    title: 'How Lobbying Is Defined Across Institutions',
    analysis: 'Lobbying treatment varies from legal advocacy to corruption risk depending on institutional mandate. Most systems exclude lobbying unless tied to direct payment, creating systematic blindspots.',
    consequence: 'Boundary divergence on lobbying produces compliance illusions and enables extraction through legal advocacy routes.'
  },
  privateSector: {
    title: 'How Private Sector Corruption Is Defined Across Institutions',
    analysis: 'Private sector corruption recognition depends on institutional scope and mandate. Regulatory bodies focus on public sector interface while financial institutions recognize broader private corruption.',
    consequence: 'Sectoral boundary differences create enforcement gaps and enable risk migration between public and private domains.'
  },
  influencePeddling: {
    title: 'How Influence Peddling Is Defined Across Institutions',
    analysis: 'Influence peddling boundaries vary between direct trading and broader access monetization. International frameworks are more comprehensive than domestic enforcement.',
    consequence: 'Definitional gaps enable influence extraction through legal channels excluded from enforcement scope.'
  }
};

// Boundary Logic Carousel Component
const BoundaryLogicCarousel = () => {
  const [activeGroup, setActiveGroup] = useState('regulatory');
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState('bribery');

  const currentData = boundaryLogicData[activeGroup];
  const groupTheme = {
    regulatory: {
      primary: '#163821',
      secondary: '#10B981',
      background: 'linear-gradient(135deg, #163821, #0B1E16)',
      cardBg: '#FFFFFF'
    },
    international: {
      primary: '#4F6B94',
      secondary: '#60A5FA',
      background: 'linear-gradient(135deg, #4F6B94, #2D3748)',
      cardBg: '#F8FAFC'
    }
  };

  const theme = groupTheme[activeGroup];
  const allTerms = ['bribery', 'lobbying', 'privateSector', 'influencePeddling', 'conflictOfInterest', 'fraud', 'embezzlement', 'nepotism'];

  const getTagColor = (state) => {
    switch(state) {
      case '✓': return '#10B981';
      case '–': return '#9CA3AF';
      case '?': return '#F59E0B';
      default: return '#9CA3AF';
    }
  };

  const InstitutionCard = ({ institution, isActive }) => (
    <motion.div
      style={{
        background: theme.cardBg,
        borderRadius: '16px',
        padding: '24px',
        border: `2px solid ${isActive ? theme.secondary : 'transparent'}`,
        boxShadow: isActive ? `0 8px 32px ${theme.secondary}33` : '0 4px 16px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        minWidth: '380px',
        transform: isActive ? 'scale(1.02)' : 'scale(1)',
        opacity: isActive ? 1 : 0.9,
        transition: 'all 0.3s ease'
      }}
      whileHover={{ scale: isActive ? 1.02 : 1.01 }}
      onClick={() => setSelectedCard(selectedCard === institution.id ? null : institution.id)}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'flex-start' }}>
        <div style={{
          fontSize: '40px',
          padding: '8px',
          background: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {institution.logo}
        </div>
        <div style={{ textAlign: 'right', flex: 1, marginLeft: '16px' }}>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: theme.primary }}>{institution.name}</h4>
        </div>
      </div>

      {/* Definition */}
      <blockquote style={{
        fontSize: '16px',
        fontStyle: 'italic',
        color: '#374151',
        margin: '16px 0',
        padding: '16px',
        background: '#F9FAFB',
        borderLeft: `4px solid ${theme.secondary}`,
        borderRadius: '8px',
        lineHeight: '1.5'
      }}>
        "{institution.definition}"
      </blockquote>

      {/* Citation */}
      <p style={{
        fontSize: '10px',
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        margin: '8px 0 16px 0',
        fontFamily: 'monospace'
      }}>
        {institution.citation.text}
      </p>

      {/* Tags Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
        {allTerms.map(term => {
          const tag = institution.tags[term];
          return (
            <div
              key={term}
              style={{
                padding: '4px 6px',
                borderRadius: '6px',
                border: `2px solid ${getTagColor(tag.state)}`,
                background: tag.state === '✓' ? `${getTagColor(tag.state)}22` : 'transparent',
                color: getTagColor(tag.state),
                fontSize: '10px',
                fontWeight: '600',
                textAlign: 'center',
                cursor: 'pointer',
                textTransform: 'capitalize',
                position: 'relative'
              }}
              title={tag.tooltip}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTerm(term);
              }}
            >
              {tag.state} {term.replace(/([A-Z])/g, ' $1').trim().replace('Private Sector', 'Private')}
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      background: theme.background,
      borderRadius: '24px',
      padding: '32px',
      transition: 'all 0.4s ease'
    }}>
      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        marginBottom: '32px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '8px',
        backdropFilter: 'blur(10px)'
      }}>
        <button
          onClick={() => setActiveGroup('regulatory')}
          style={{
            flex: 1,
            padding: '16px 24px',
            background: activeGroup === 'regulatory' ? groupTheme.regulatory.primary : 'transparent',
            color: activeGroup === 'regulatory' ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Regulatory/Judicial
        </button>
        <button
          onClick={() => setActiveGroup('international')}
          style={{
            flex: 1,
            padding: '16px 24px',
            background: activeGroup === 'international' ? groupTheme.international.primary : 'transparent',
            color: activeGroup === 'international' ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          International Financial/Multilateral
        </button>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Carousel Section */}
        <div>
          <div style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            paddingBottom: '16px',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'thin'
          }}>
            {currentData.map(institution => (
              <div key={institution.id} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
                <InstitutionCard
                  institution={institution}
                  isActive={selectedCard === institution.id}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Analytics Panel */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          height: 'fit-content'
        }}>
          {/* Term Picker */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{
              margin: '0 0 16px 0',
              fontSize: '14px',
              fontWeight: '600',
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Boundary Analysis
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['bribery', 'lobbying', 'privateSector', 'influencePeddling'].map(term => (
                <button
                  key={term}
                  onClick={() => setSelectedTerm(term)}
                  style={{
                    padding: '8px 12px',
                    border: `2px solid ${selectedTerm === term ? theme.secondary : '#E5E7EB'}`,
                    background: selectedTerm === term ? `${theme.secondary}22` : 'transparent',
                    color: selectedTerm === term ? theme.primary : '#6B7280',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {term.replace(/([A-Z])/g, ' $1').trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Analysis Content */}
          <div>
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '18px',
              fontWeight: '700',
              color: theme.primary,
              lineHeight: '1.3'
            }}>
              {termDefinitions[selectedTerm]?.title || 'Term Analysis'}
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#374151',
              marginBottom: '16px'
            }}>
              {termDefinitions[selectedTerm]?.analysis || 'Analysis of how this term is defined across institutions.'}
            </p>

            <div style={{
              padding: '16px',
              background: '#F3F4F6',
              borderRadius: '8px',
              borderLeft: `4px solid ${theme.secondary}`
            }}>
              <p style={{
                fontSize: '12px',
                fontWeight: '600',
                color: theme.primary,
                margin: '0 0 4px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Structural Consequence
              </p>
              <p style={{
                fontSize: '13px',
                color: '#4B5563',
                margin: 0,
                lineHeight: '1.4'
              }}>
                {termDefinitions[selectedTerm]?.consequence || 'Boundary effects on risk recognition and transfer.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Systemic Note */}
      <div style={{
        marginTop: '32px',
        padding: '20px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontSize: '24px' }}>⚡</div>
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: 'rgba(255,255,255,0.9)',
          fontWeight: '500',
          maxWidth: '600px',
          lineHeight: '1.5'
        }}>
          Institutional boundaries are not technicalities—they determine what can be prosecuted, managed, or ignored.
          Vigilum models how these definitions produce blindspots and transfer structural risk.
        </p>
      </div>
    </div>
  );
};

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
          logo: "🇪��",
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
      <div style={{ textAlign: "left", marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "12px",
          }}
        >
          <div style={{ maxWidth: "50%" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 2.5rem)",
                fontWeight: "600",
                color: "#9DE6C6",
                margin: "0 0 12px 0",
                fontFamily: "var(--font-display)",
              }}
            >
              What is Corruption?
            </h2>
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
                margin: "0",
                lineHeight: "1.6",
                whiteSpace: "nowrap",
              }}
            >
              Explore how the world's leading authorities describe and classify
              corruption.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              onClick={() => onNavigate && onNavigate("Social")}
              style={{
                backdropFilter: "blur(20px) saturate(180%)",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 8px 32px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#E5E5E5",
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
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
              Explore the Consequences of Corruption
            </button>
            <button
              onClick={() => setShowCompareAll(true)}
              style={{
                backgroundColor: "rgba(157, 230, 198, 0.1)",
                border: "1px solid rgba(157, 230, 198, 0.3)",
                borderRadius: "8px",
                padding: "12px 24px",
                color: "#9DE6C6",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textAlign: "center",
                fontFamily: "var(--font-display)",
                letterSpacing: "1px",
                textTransform: "uppercase",
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
        </div>
      </div>

      {/* Boundary Logic Carousel System */}
      <BoundaryLogicCarousel />

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
