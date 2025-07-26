import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "@/components/ui/Carousel";

// Boundary Logic Carousel Data - Epistemically Rigorous Institutional Definitions
const boundaryLogicData = {
  regulatory: [
    {
      id: 'doj',
      name: 'US DOJ',
      logoUrl: '/logos/doj.svg',
      logo: '🏛️',
      definition: 'The offering, giving, receiving, or soliciting of anything of value to influence the actions of an official in the discharge of public or commercial duties.',
      citation: {
        text: 'DOJ, Foreign Corrupt Practices Act Resource Guide, 2020, p.7',
        url: 'https://www.justice.gov/criminal-fraud/file/1292051/download'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Explicitly included under the Foreign Corrupt Practices Act. [CI]', typology: ['CI'] },
        lobbying: { state: '–', tooltip: 'Lobbying is not classified as corruption unless linked to illegal payment (see FCPA Guidance, 2020). This boundary enables legal influence operations outside anti-corruption prosecution. [DG]', typology: ['DG'] },
        privateSector: { state: '?', tooltip: 'Private sector corruption only recognized by DOJ when it affects foreign officials or involves government procurement.', typology: ['RT'] },
        influencePeddling: { state: '✓', tooltip: 'Covered under FCPA when involving government officials or foreign public officials.', typology: ['CI'] },
        conflictOfInterest: { state: '–', tooltip: 'Not directly addressed in federal criminal statutes unless constituting bribery.', typology: ['SB'] },
        fraud: { state: '✓', tooltip: 'Covered under separate federal fraud statutes when involving government programs.', typology: ['RT'] },
        embezzlement: { state: '✓', tooltip: 'Covered when involving public funds, officials, or federal programs.', typology: ['RT'] },
        nepotism: { state: '–', tooltip: 'Not criminalized unless involving quid pro quo or bribery elements.', typology: ['SB'] }
      }
    },
    {
      id: 'oecd',
      name: 'OECD',
      logoUrl: '/logos/oecd.svg',
      logo: '🌐',
      definition: 'The active bribery of foreign public officials, as well as the failure to prevent such bribery by persons associated with a commercial organization.',
      citation: {
        text: 'OECD Anti-Bribery Convention, Article 1, 1997',
        url: 'https://www.oecd.org/corruption/oecdantibriberyconvention.htm'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Central focus on active bribery of foreign officials under Article 1.', typology: ['CI'] },
        lobbying: { state: '?', tooltip: 'Lobbying is only problematic when crossing into bribery territory (OECD Guidelines, 2011). Legal advocacy remains excluded.', typology: ['DG'] },
        privateSector: { state: '��', tooltip: 'OECD Convention focus limited to public sector bribery. Private-to-private corruption outside scope.', typology: ['SB'] },
        influencePeddling: { state: '✓', tooltip: 'Included when involving foreign public officials (Article 1 interpretation).', typology: ['CI'] },
        conflictOfInterest: { state: '?', tooltip: 'Addressed in Recommendation but not binding convention obligations.', typology: ['DG'] },
        fraud: { state: '–', tooltip: 'Not central to anti-bribery framework. Outside convention scope.', typology: ['SB'] },
        embezzlement: { state: '–', tooltip: 'Outside scope of bribery convention. No criminalization requirement.', typology: ['SB'] },
        nepotism: { state: '–', tooltip: 'Not addressed in convention framework. Left to domestic discretion.', typology: ['SB'] }
      }
    },
    {
      id: 'greco',
      name: 'GRECO',
      logoUrl: '/logos/greco.svg',
      logo: '🇪🇺',
      definition: 'Criminal or disciplinary offences of corruption, comprising active and passive bribery, abuse of functions, and related offences.',
      citation: {
        text: 'GRECO, Evaluation Methodology, Article 2, 2019',
        url: 'https://www.coe.int/en/web/greco/evaluation-procedure'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Core focus on both active and passive bribery under Criminal Law Convention.', typology: ['CI'] },
        lobbying: { state: '?', tooltip: 'Transparency required but lobbying not inherently corrupt unless involving improper influence.', typology: ['DG'] },
        privateSector: { state: '✓', tooltip: 'Private sector bribery explicitly addressed in Additional Protocol Article 7.', typology: ['CI'] },
        influencePeddling: { state: '✓', tooltip: 'Covered under "trading in influence" provisions (Article 12).', typology: ['CI'] },
        conflictOfInterest: { state: '✓', tooltip: 'Addressed in public ethics recommendations and evaluation reports.', typology: ['RT'] },
        fraud: { state: '–', tooltip: 'Outside core corruption mandate. Not systematically evaluated.', typology: ['SB'] },
        embezzlement: { state: '✓', tooltip: 'Included in "abuse of functions" category under Article 10.', typology: ['RT'] },
        nepotism: { state: '?', tooltip: 'Addressed through conflict of interest measures rather than direct criminalization.', typology: ['DG'] }
      }
    },
    {
      id: 'uncac',
      name: 'UN UNCAC',
      logoUrl: '/logos/un.svg',
      logo: '🌍',
      definition: 'Solicitation or acceptance by a public official of an undue advantage and the offering or granting of an undue advantage to a public official.',
      citation: {
        text: 'UN Convention Against Corruption, Article 15, 2003',
        url: 'https://www.unodc.org/documents/brussels/UN_Convention_Against_Corruption.pdf'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Comprehensive bribery provisions for public (Article 15) and private sectors (Article 21).', typology: ['CI'] },
        lobbying: { state: '–', tooltip: 'Not explicitly addressed in convention text. Legal advocacy generally excluded.', typology: ['SB'] },
        privateSector: { state: '✓', tooltip: 'Private sector bribery covered in Article 21 as mandatory criminalization.', typology: ['CI'] },
        influencePeddling: { state: '✓', tooltip: 'Trading in influence covered in Article 18 with mandatory criminalization.', typology: ['CI'] },
        conflictOfInterest: { state: '?', tooltip: 'Addressed in preventive measures (Chapter II) but not criminal provisions.', typology: ['DG'] },
        fraud: { state: '✓', tooltip: 'Fraud against public administration covered under Article 17.', typology: ['RT'] },
        embezzlement: { state: '✓', tooltip: 'Embezzlement explicitly criminalized in Article 17.', typology: ['RT'] },
        nepotism: { state: '?', tooltip: 'Addressed through public sector ethics provisions rather than direct criminalization.', typology: ['DG'] }
      }
    },
    {
      id: 'uk-bribery',
      name: 'UK Bribery Act',
      logoUrl: '/logos/uk.svg',
      logo: '🇬🇧',
      definition: 'Offering, promising or giving a financial or other advantage to another person, and requesting, agreeing to receive or accepting a financial or other advantage.',
      citation: {
        text: 'UK Bribery Act 2010, Sections 1-2',
        url: 'https://www.legislation.gov.uk/ukpga/2010/23/contents'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Comprehensive coverage including active, passive, and failure to prevent bribery.', typology: ['CI'] },
        lobbying: { state: '–', tooltip: 'Legal lobbying excluded unless constituting improper influence or advantage.', typology: ['DG'] },
        privateSector: { state: '✓', tooltip: 'Private sector bribery fully covered under Sections 1-2.', typology: ['CI'] },
        influencePeddling: { state: '✓', tooltip: 'Covered under general bribery provisions when involving improper influence.', typology: ['CI'] },
        conflictOfInterest: { state: '–', tooltip: 'Not directly criminalized unless involving bribery elements.', typology: ['SB'] },
        fraud: { state: '–', tooltip: 'Covered under separate Fraud Act 2006, not Bribery Act.', typology: ['SB'] },
        embezzlement: { state: '–', tooltip: 'Outside Bribery Act scope. Covered under other legislation.', typology: ['SB'] },
        nepotism: { state: '–', tooltip: 'Not specifically criminalized unless involving bribery or advantage.', typology: ['SB'] }
      }
    },
    {
      id: 'transparency',
      name: 'Transparency Intl',
      logoUrl: '/logos/ti.svg',
      logo: '🔍',
      definition: 'The abuse of entrusted power for private gain, encompassing grand, petty and political corruption.',
      citation: {
        text: 'Transparency International, Anti-Corruption Glossary, 2023',
        url: 'https://www.transparency.org/en/corruptionary'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Explicitly included as core form of corruption across all contexts.', typology: ['CI'] },
        lobbying: { state: '?', tooltip: 'Problematic when lacking transparency or involving undue influence (TI Policy Position, 2015).', typology: ['DG'] },
        privateSector: { state: '✓', tooltip: 'Private sector corruption explicitly recognized in definition and measurement.', typology: ['CI'] },
        influencePeddling: { state: '✓', tooltip: 'Covered under political corruption and access monetization.', typology: ['CI'] },
        conflictOfInterest: { state: '✓', tooltip: 'Recognized as corruption risk requiring management and disclosure.', typology: ['RT'] },
        fraud: { state: '✓', tooltip: 'Included when involving abuse of entrusted power for private gain.', typology: ['RT'] },
        embezzlement: { state: '✓', tooltip: 'Classic example of abuse of entrusted power in TI framework.', typology: ['RT'] },
        nepotism: { state: '✓', tooltip: 'Recognized as form of political and administrative corruption.', typology: ['RT'] }
      }
    },
    {
      id: 'fcpa',
      name: 'SEC FCPA',
      logoUrl: '/logos/sec.svg',
      logo: '📊',
      definition: 'Payments to foreign officials to assist in obtaining or retaining business or securing any improper advantage.',
      citation: {
        text: 'SEC, Foreign Corrupt Practices Act Guidance, 2020',
        url: 'https://www.sec.gov/spotlight/foreign-corrupt-practices-act.shtml'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Core FCPA violation with both anti-bribery and accounting provisions.', typology: ['CI'] },
        lobbying: { state: '–', tooltip: 'Legal lobbying explicitly excluded from FCPA scope (SEC Guidance, 2012).', typology: ['DG'] },
        privateSector: { state: '?', tooltip: 'Only covers private sector when involving foreign officials or government business.', typology: ['RT'] },
        influencePeddling: { state: '✓', tooltip: 'Covered when involving foreign officials or securing government business.', typology: ['CI'] },
        conflictOfInterest: { state: '–', tooltip: 'Not within FCPA scope unless involving prohibited payments.', typology: ['SB'] },
        fraud: { state: '?', tooltip: 'Accounting fraud covered under books and records provisions.', typology: ['RT'] },
        embezzlement: { state: '–', tooltip: 'Outside FCPA scope unless involving foreign official payments.', typology: ['SB'] },
        nepotism: { state: '–', tooltip: 'Not covered unless involving improper payments to foreign officials.', typology: ['SB'] }
      }
    },
    {
      id: 'canada-cfpoa',
      name: 'Canada CFPOA',
      logoUrl: '/logos/canada.svg',
      logo: '🍁',
      definition: 'Giving or offering a loan, reward, advantage or benefit of any kind to a foreign public official as consideration for cooperation, assistance, exercise of influence or an act or omission.',
      citation: {
        text: 'Corruption of Foreign Public Officials Act, Section 3, 1998',
        url: 'https://laws-lois.justice.gc.ca/eng/acts/c-45.2/'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Focus on bribery of foreign public officials under Section 3.', typology: ['CI'] },
        lobbying: { state: '–', tooltip: 'Legal lobbying activities excluded from CFPOA scope.', typology: ['DG'] },
        privateSector: { state: '–', tooltip: 'Limited to foreign public officials. Private-to-private excluded.', typology: ['SB'] },
        influencePeddling: { state: '✓', tooltip: 'Covered when involving foreign public officials and improper influence.', typology: ['CI'] },
        conflictOfInterest: { state: '–', tooltip: 'Not within CFPOA mandate unless involving prohibited payments.', typology: ['SB'] },
        fraud: { state: '–', tooltip: 'Outside CFPOA scope. Covered under Criminal Code provisions.', typology: ['SB'] },
        embezzlement: { state: '–', tooltip: 'Not covered unless involving foreign public official bribery.', typology: ['SB'] },
        nepotism: { state: '–', tooltip: 'Outside CFPOA scope unless involving foreign public officials.', typology: ['SB'] }
      }
    }
  ],
  international: [
    {
      id: 'worldbank',
      name: 'World Bank',
      logoUrl: '/logos/worldbank.svg',
      logo: '🏦',
      definition: 'The abuse of public office for private gain, including both grand and petty corruption, and capture of the state by elites and private interests.',
      citation: {
        text: 'World Bank, Helping Countries Combat Corruption, 1997, Chapter 1',
        url: 'https://openknowledge.worldbank.org/handle/10986/11957'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Explicitly included as core corruption type in Bank operational policies.', typology: ['CI'] },
        lobbying: { state: '?', tooltip: 'Problematic when it constitutes state capture or undermines governance (WB 2017 Framework).', typology: ['DG'] },
        privateSector: { state: '✓', tooltip: 'Private sector corruption explicitly recognized in governance indicators.', typology: ['CI'] },
        influencePeddling: { state: '✓', tooltip: 'Covered under state capture framework and governance diagnostics.', typology: ['CI'] },
        conflictOfInterest: { state: '✓', tooltip: 'Addressed in governance and procurement standards across operations.', typology: ['RT'] },
        fraud: { state: '✓', tooltip: 'Included in financial crime prevention and project supervision.', typology: ['RT'] },
        embezzlement: { state: '✓', tooltip: 'Explicitly included in Bank corruption typology and sanctions framework.', typology: ['RT'] },
        nepotism: { state: '✓', tooltip: 'Recognized as form of corruption affecting governance quality.', typology: ['RT'] }
      }
    },
    {
      id: 'imf',
      name: 'IMF',
      logoUrl: '/logos/imf.svg',
      logo: '💰',
      definition: 'The abuse of public office for private gain, with emphasis on fiscal corruption and misuse of public resources.',
      citation: {
        text: 'IMF, The Role of the IMF in Governance Issues, 1997, Section II',
        url: 'https://www.imf.org/external/pubs/ft/exrp/govern/govern.pdf'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Included when affecting fiscal governance and macroeconomic stability.', typology: ['CI'] },
        lobbying: { state: '–', tooltip: 'Generally not within IMF mandate unless affecting fiscal policy implementation.', typology: ['SB'] },
        privateSector: { state: '?', tooltip: 'Relevant only when affecting public financial management or fiscal outcomes.', typology: ['RT'] },
        influencePeddling: { state: '?', tooltip: 'Addressed when impacting economic governance and policy implementation.', typology: ['DG'] },
        conflictOfInterest: { state: '✓', tooltip: 'Critical in financial sector oversight and central bank governance.', typology: ['RT'] },
        fraud: { state: '✓', tooltip: 'Central concern in public financial management and fiscal reporting.', typology: ['RT'] },
        embezzlement: { state: '✓', tooltip: 'Core focus in public resource management and fiscal accountability.', typology: ['RT'] },
        nepotism: { state: '?', tooltip: 'Relevant when affecting financial governance quality and institutional capacity.', typology: ['DG'] }
      }
    },
    {
      id: 'ebrd',
      name: 'EBRD',
      logoUrl: '/logos/ebrd.svg',
      logo: '🏛️',
      definition: 'Improper use of official position for personal or private advantage in connection with EBRD operations.',
      citation: {
        text: 'EBRD, Enforcement Policy and Procedures, 2020, Section 2.1',
        url: 'https://www.ebrd.com/integrity-compliance/enforcement-policy.pdf'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Prohibited practice in all EBRD-financed projects and operations.', typology: ['CI'] },
        lobbying: { state: '–', tooltip: 'Not within EBRD enforcement scope unless constituting prohibited practice.', typology: ['SB'] },
        privateSector: { state: '✓', tooltip: 'Private sector conduct covered in project finance and investment operations.', typology: ['CI'] },
        influencePeddling: { state: '✓', tooltip: 'Improper influence prohibited in procurement and project implementation.', typology: ['CI'] },
        conflictOfInterest: { state: '���', tooltip: 'Strictly regulated in procurement and operational procedures.', typology: ['RT'] },
        fraud: { state: '✓', tooltip: 'Fraudulent practices covered in enforcement and sanctions framework.', typology: ['RT'] },
        embezzlement: { state: '✓', tooltip: 'Misappropriation prohibited in project funds and operational resources.', typology: ['RT'] },
        nepotism: { state: '?', tooltip: 'Addressed through conflict of interest policies rather than direct prohibition.', typology: ['DG'] }
      }
    },
    {
      id: 'adb',
      name: 'ADB',
      logoUrl: '/logos/adb.svg',
      logo: '🌏',
      definition: 'Offering, giving, receiving, or soliciting of anything of value to influence improperly the actions of another party.',
      citation: {
        text: 'ADB, Anticorruption and Integrity Policy, 2020, Section 2',
        url: 'https://www.adb.org/sites/default/files/institutional-document/31317/anticorruption-integrity-policy.pdf'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Core violation in ADB integrity framework and sanctions procedures.', typology: ['CI'] },
        lobbying: { state: '–', tooltip: 'Outside ADB operational mandate and enforcement scope.', typology: ['SB'] },
        privateSector: { state: '✓', tooltip: 'Private sector operations covered under integrity due diligence.', typology: ['CI'] },
        influencePeddling: { state: '✓', tooltip: 'Improper influence explicitly prohibited in operational procedures.', typology: ['CI'] },
        conflictOfInterest: { state: '✓', tooltip: 'Covered in integrity and procurement policies across operations.', typology: ['RT'] },
        fraud: { state: '✓', tooltip: 'Fraudulent practice prohibited in operations and project implementation.', typology: ['RT'] },
        embezzlement: { state: '✓', tooltip: 'Misappropriation covered in enforcement and sanctions framework.', typology: ['RT'] },
        nepotism: { state: '?', tooltip: 'Addressed through transparency and ethics measures in procurement.', typology: ['DG'] }
      }
    },
    {
      id: 'iadb',
      name: 'IDB',
      logoUrl: '/logos/iadb.svg',
      logo: '🌎',
      definition: 'Offering, giving, receiving, or soliciting, directly or indirectly, anything of value to influence improperly the actions of another party.',
      citation: {
        text: 'IDB, Policy on Prohibited Practices, 2020, Section II',
        url: 'https://www.iadb.org/en/about-us/policy-prohibited-practices'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Explicitly prohibited in all IDB-financed operations and contracts.', typology: ['CI'] },
        lobbying: { state: '–', tooltip: 'Legal advocacy excluded from prohibited practices framework.', typology: ['SB'] },
        privateSector: { state: '��', tooltip: 'Private sector operations covered under integrity due diligence procedures.', typology: ['CI'] },
        influencePeddling: { state: '✓', tooltip: 'Improper influence covered under prohibited practices policy.', typology: ['CI'] },
        conflictOfInterest: { state: '✓', tooltip: 'Managed through disclosure and mitigation in procurement processes.', typology: ['RT'] },
        fraud: { state: '✓', tooltip: 'Fraudulent practices explicitly prohibited in operational procedures.', typology: ['RT'] },
        embezzlement: { state: '✓', tooltip: 'Misappropriation prohibited in project funds and resource management.', typology: ['RT'] },
        nepotism: { state: '?', tooltip: 'Addressed through conflict of interest and transparency requirements.', typology: ['DG'] }
      }
    },
    {
      id: 'afdb',
      name: 'AfDB',
      logoUrl: '/logos/afdb.svg',
      logo: '🌍',
      definition: 'Offering, giving, receiving, or soliciting, directly or indirectly, of anything of value to influence improperly the actions of another party.',
      citation: {
        text: 'AfDB, Sanctions Procedures, 2020, Annex 1',
        url: 'https://www.afdb.org/en/about-us/organisational-structure/integrity-and-anti-corruption/sanctions-procedures'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Core prohibited practice in AfDB operations and project financing.', typology: ['CI'] },
        lobbying: { state: '–', tooltip: 'Legal advocacy activities excluded from sanctions framework.', typology: ['SB'] },
        privateSector: { state: '✓', tooltip: 'Private sector conduct covered in integrity and due diligence procedures.', typology: ['CI'] },
        influencePeddling: { state: '✓', tooltip: 'Improper influence prohibited in procurement and project implementation.', typology: ['CI'] },
        conflictOfInterest: { state: '✓', tooltip: 'Addressed in procurement guidelines and operational procedures.', typology: ['RT'] },
        fraud: { state: '✓', tooltip: 'Fraudulent practices covered in sanctions and enforcement procedures.', typology: ['RT'] },
        embezzlement: { state: '✓', tooltip: 'Misappropriation prohibited in project resources and fund management.', typology: ['RT'] },
        nepotism: { state: '?', tooltip: 'Managed through conflict of interest disclosure and mitigation.', typology: ['DG'] }
      }
    },
    {
      id: 'eib',
      name: 'EIB',
      logoUrl: '/logos/eib.svg',
      logo: '🇪🇺',
      definition: 'Any active or passive corrupt behavior in relation to EIB operations, including offering, promising, giving, accepting or soliciting an undue advantage.',
      citation: {
        text: 'EIB, Anti-Fraud Policy, 2019, Section 3.1',
        url: 'https://www.eib.org/en/about/accountability/anti-fraud/index.htm'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Explicitly covered in EIB anti-fraud policy and operational procedures.', typology: ['CI'] },
        lobbying: { state: '–', tooltip: 'Legal lobbying excluded unless constituting undue influence in operations.', typology: ['SB'] },
        privateSector: { state: '?', tooltip: 'Private sector corruption only recognized when affecting EIB-financed projects.', typology: ['RT'] },
        influencePeddling: { state: '✓', tooltip: 'Undue influence prohibited in procurement and project evaluation.', typology: ['CI'] },
        conflictOfInterest: { state: '✓', tooltip: 'Covered in professional ethics and operational procedures.', typology: ['RT'] },
        fraud: { state: '✓', tooltip: 'Central focus of EIB anti-fraud policy and investigations.', typology: ['RT'] },
        embezzlement: { state: '✓', tooltip: 'Misappropriation covered in anti-fraud framework and sanctions.', typology: ['RT'] },
        nepotism: { state: '?', tooltip: 'Addressed through conflict of interest and ethics policies.', typology: ['DG'] }
      }
    },
    {
      id: 'aiib',
      name: 'AIIB',
      logoUrl: '/logos/aiib.svg',
      logo: '🏗️',
      definition: 'Offering, giving, receiving, or soliciting, directly or indirectly, anything of value to influence improperly the actions of another party.',
      citation: {
        text: 'AIIB, Policy on Prohibited Practices for Borrowers, 2019',
        url: 'https://www.aiib.org/en/policies-strategies/policies/prohibited-practices.html'
      },
      tags: {
        bribery: { state: '✓', tooltip: 'Core prohibited practice in AIIB-financed projects and operations.', typology: ['CI'] },
        lobbying: { state: '–', tooltip: 'Legal advocacy excluded from prohibited practices framework.', typology: ['SB'] },
        privateSector: { state: '✓', tooltip: 'Private sector operations covered under integrity screening procedures.', typology: ['CI'] },
        influencePeddling: { state: '✓', tooltip: 'Improper influence explicitly prohibited in operational guidelines.', typology: ['CI'] },
        conflictOfInterest: { state: '✓', tooltip: 'Addressed in procurement and operational integrity procedures.', typology: ['RT'] },
        fraud: { state: '���', tooltip: 'Fraudulent practices prohibited in project implementation and financing.', typology: ['RT'] },
        embezzlement: { state: '✓', tooltip: 'Misappropriation covered in prohibited practices and sanctions framework.', typology: ['RT'] },
        nepotism: { state: '?', tooltip: 'Managed through transparency and conflict of interest procedures.', typology: ['DG'] }
      }
    }
  ]
};

// Term Analysis Framework - Structural Boundary Intelligence
const termDefinitions = {
  bribery: {
    title: 'Bribery: Convergence and Divergence Logic',
    analysis: 'Bribery definitions converge on quid pro quo exchange but diverge critically on actor scope, enforcement thresholds, and jurisdictional boundaries. Regulatory frameworks limit bribery to government interfaces while financial institutions recognize broader corrupt exchange networks. This structural divergence creates prosecutorial gaps and enables regulatory arbitrage across boundary systems.',
    consequence: 'Boundary divergence produces legal extraction channels where non-criminalized exchange operates as compliant corruption.'
  },
  lobbying: {
    title: 'Lobbying: The Exclusion Mechanism',
    analysis: 'Lobbying occupies the structural blindspot of anti-corruption frameworks. Most institutions exclude lobbying unless directly tied to illegal payment, creating systematic legal channels for influence monetization. This boundary design enables access-to-power markets while maintaining compliance facades across regulatory architectures.',
    consequence: 'Lobbying exclusion boundaries produce influence extraction systems operating within legal compliance frameworks.'
  },
  privateSector: {
    title: 'Private Sector: Sectoral Boundary Operations',
    analysis: 'Private sector corruption recognition operates through institutional mandate boundaries rather than risk logic. Regulatory bodies focus on government interface corruption while development finance institutions recognize comprehensive private corruption networks. This creates enforcement gaps enabling risk migration between sectoral domains.',
    consequence: 'Sectoral boundaries create regulatory voids where private corruption operates outside institutional recognition systems.'
  },
  influencePeddling: {
    title: 'Influence Peddling: Access Monetization Logic',
    analysis: 'Influence peddling boundaries distinguish between direct trading and broader access monetization, with international frameworks typically more comprehensive than domestic enforcement. This divergence enables influence extraction through legal channels excluded from enforcement scope while maintaining institutional compliance.',
    consequence: 'Influence boundaries enable access-to-power monetization through legally compliant extraction channels.'
  },
  conflictOfInterest: {
    title: 'Conflict of Interest: Management Versus Prevention',
    analysis: 'Conflict of interest operates primarily through disclosure and management rather than prohibition, creating structural acceptance of interest misalignment. Institutional boundaries focus on process compliance rather than elimination, enabling continued operation of conflicted decision-making within managed frameworks.',
    consequence: 'Conflict boundaries normalize interest misalignment through procedural compliance rather than structural prevention.'
  },
  fraud: {
    title: 'Fraud: Scope and Connectivity Logic',
    analysis: 'Fraud boundaries vary significantly across institutional mandates, with some frameworks treating fraud as separate from corruption while others recognize interconnected corrupt networks. This boundary inconsistency creates enforcement gaps where fraudulent practices operate outside anti-corruption recognition systems.',
    consequence: 'Fraud boundary inconsistency enables financial crime networks to operate across institutional recognition gaps.'
  },
  embezzlement: {
    title: 'Embezzlement: Resource Misappropriation Boundaries',
    analysis: 'Embezzlement recognition varies based on resource type and institutional mandate, with comprehensive coverage in development finance but limited recognition in regulatory frameworks focused on influence corruption. This boundary design creates gaps in resource protection across institutional systems.',
    consequence: 'Embezzlement boundaries create resource protection gaps enabling misappropriation outside institutional mandate scope.'
  },
  nepotism: {
    title: 'Nepotism: Relationship-Based Advantage Logic',
    analysis: 'Nepotism operates primarily through conflict of interest and transparency measures rather than direct prohibition, creating structural acceptance of relationship-based advantage systems. Most frameworks manage rather than eliminate nepotistic practices, enabling continued operation within procedural compliance.',
    consequence: 'Nepotism boundaries normalize relationship-based advantage through procedural management rather than systematic prevention.'
  }
};

// Systemic Consequence Generator - Context-Sensitive Analysis
const getSystemicNote = (activeGroup, selectedTerm, selectedCard) => {
  const notes = {
    default: "Institutional boundaries are not technicalities—they determine what can be prosecuted, managed, or ignored. Vigilum renders these boundary operations as system intelligence.",
    regulatory: "Regulatory boundaries create legal extraction channels through systematic exclusion of influence operations, enabling compliant corruption within enforcement frameworks.",
    international: "Development finance boundaries focus on operational compliance while structural corruption networks operate across institutional mandate gaps and jurisdictional voids.",
    bribery_focus: "Bribery boundary convergence masks underlying divergence in scope and enforcement, creating regulatory arbitrage opportunities across jurisdictional systems.",
    lobbying_focus: "Lobbying exclusion boundaries systematically enable influence monetization through legal advocacy channels outside anti-corruption recognition systems.",
    private_focus: "Private sector boundary gaps enable corruption network migration between regulatory domains, operating through institutional mandate limitations."
  };

  if (selectedTerm === 'bribery') return notes.bribery_focus;
  if (selectedTerm === 'lobbying') return notes.lobbying_focus;
  if (selectedTerm === 'privateSector') return notes.private_focus;
  if (activeGroup === 'regulatory') return notes.regulatory;
  if (activeGroup === 'international') return notes.international;
  return notes.default;
};

// Boundary Logic Carousel - Epistemic Intelligence Interface
const BoundaryLogicCarousel = () => {
  const [activeGroup, setActiveGroup] = useState('international');
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState('bribery');
  const [showCompareMode, setShowCompareMode] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(null);

  const currentData = boundaryLogicData[activeGroup];

  // Theme Configuration - Vigilum Brand Tokens
  const groupTheme = {
    regulatory: {
      primary: '#18291B',
      secondary: '#10B981',
      background: 'linear-gradient(135deg, #18291B, #0F1E14)',
      cardBg: '#FFFFFF',
      textPrimary: '#2D3329',
      accent: '#22C55E'
    },
    international: {
      primary: '#465B6E',
      secondary: '#60A5FA',
      background: 'linear-gradient(135deg, #EAEEF2, #465B6E)',
      cardBg: '#F8FAFC',
      textPrimary: '#1E293B',
      accent: '#3B82F6'
    }
  };

  const theme = groupTheme[activeGroup];
  const allTerms = ['bribery', 'lobbying', 'privateSector', 'influencePeddling', 'conflictOfInterest', 'fraud', 'embezzlement', 'nepotism'];

  // Tag State Logic - Boundary Recognition System
  const getTagColor = (state) => {
    switch(state) {
      case '✓': return '#10B981'; // Included
      case '–': return '#9CA3AF'; // Excluded
      case '?': return '#F59E0B'; // Ambiguous
      default: return '#9CA3AF';
    }
  };

  const getTagBackground = (state) => {
    switch(state) {
      case '✓': return 'rgba(16, 185, 129, 0.15)';
      case '–': return 'transparent';
      case '?': return 'rgba(245, 158, 11, 0.15)';
      default: return 'transparent';
    }
  };

  // Institution Card Component - Boundary Object Architecture
  const InstitutionCard = ({ institution, isActive }) => {
    const [expanded, setExpanded] = useState(false);
    const shouldTruncate = institution.definition.length > 180;
    const displayDefinition = expanded || !shouldTruncate
      ? institution.definition
      : institution.definition.substring(0, 150) + '...';

    return (
      <motion.div
        style={{
          background: theme.cardBg,
          borderRadius: '20px',
          padding: '24px',
          border: `2px solid ${isActive ? theme.secondary : 'rgba(0,0,0,0.1)'}`,
          boxShadow: isActive
            ? `0 12px 30px rgba(24,41,27,0.08)`
            : '0 2px 6px rgba(24,41,27,0.04)',
          cursor: 'pointer',
          width: '320px',
          height: expanded ? 'auto' : '470px',
          minHeight: '470px',
          flexShrink: 0,
          transform: isActive ? 'scale(1.04)' : 'scale(1)',
          zIndex: isActive ? 2 : 1,
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative'
        }}
        whileHover={{
          scale: isActive ? 1.04 : 1.01,
          transition: { duration: 0.2 }
        }}
        onClick={() => setSelectedCard(selectedCard === institution.id ? null : institution.id)}
      >
        {/* Logo and Institution Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '12px',
          alignItems: 'flex-start'
        }}>
          <div
            style={{
              fontSize: '32px',
              width: '54px',
              height: '54px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FFFFFF',
              border: '1px solid #D6DBE3',
              borderRadius: '8px',
              padding: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (institution.citation.url) {
                window.open(institution.citation.url, '_blank');
              }
            }}
            title={`View source: ${institution.citation.text}`}
          >
            {institution.logo}
          </div>
          <div style={{
            textAlign: 'right',
            flex: 1,
            marginLeft: '12px'
          }}>
            <h4 style={{
              margin: 0,
              fontSize: '19px',
              fontWeight: 'bold',
              color: theme.textPrimary,
              lineHeight: '24px'
            }}>
              {institution.name}
            </h4>
          </div>
        </div>

        {/* Definition Section */}
        <div style={{ marginTop: '12px' }}>
          <blockquote style={{
            fontSize: '17px',
            fontStyle: 'italic',
            color: theme.textPrimary,
            margin: '0 0 8px 0',
            lineHeight: '26px',
            fontFamily: 'Alliance No2, Helvetica Neue, sans-serif'
          }}>
            "{displayDefinition}"
          </blockquote>

          {shouldTruncate && !expanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(true);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: theme.secondary,
                fontSize: '14px',
                cursor: 'pointer',
                padding: '4px 0',
                textDecoration: 'underline'
              }}
            >
              Show Full ↓
            </button>
          )}

          {/* Citation */}
          <p style={{
            fontSize: '11px',
            color: '#7B8B99',
            fontFamily: 'SF Mono, Monaco, monospace',
            margin: '8px 0 16px 0',
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}>
            {institution.citation.text}
          </p>
        </div>

        {/* Boundary Tag Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '6px',
          marginTop: '12px'
        }}>
          {allTerms.map(term => {
            const tag = institution.tags[term];
            const isHovered = hoveredTag === `${institution.id}-${term}`;
            const isSelected = selectedTerm === term;

            return (
              <div
                key={term}
                style={{
                  height: '26px',
                  minWidth: '74px',
                  maxWidth: '132px',
                  padding: '6px 8px',
                  border: `2px solid ${getTagColor(tag.state)}`,
                  borderRadius: '8px',
                  background: getTagBackground(tag.state),
                  color: getTagColor(tag.state),
                  fontSize: '11px',
                  fontWeight: '600',
                  fontFamily: 'SF Mono, Monaco, monospace',
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: isSelected ? `0 0 8px ${getTagColor(tag.state)}44` : 'none'
                }}
                onMouseEnter={() => setHoveredTag(`${institution.id}-${term}`)}
                onMouseLeave={() => setHoveredTag(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTerm(term);

                  // Animate all similar tags
                  const similarTags = document.querySelectorAll(`[data-term="${term}"]`);
                  similarTags.forEach(el => {
                    el.style.animation = 'none';
                    setTimeout(() => {
                      el.style.animation = 'pulse 0.7s ease-in-out';
                    }, 10);
                  });
                }}
                data-term={term}
                title={tag.tooltip}
              >
                {tag.state} {term.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            );
          })}
        </div>

        {/* Active Card Indicator */}
        {isActive && (
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '5px',
            background: theme.secondary,
            borderRadius: '0 0 18px 18px'
          }} />
        )}
      </motion.div>
    );
  };

  return (
    <div
      style={{
        minWidth: '1100px',
        margin: '0 auto',
        borderRadius: '24px',
        padding: '0',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative'
      }}
    >
      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(0,0,0,0); }
          50% { transform: scale(1.1); box-shadow: 0 0 16px rgba(16, 185, 129, 0.4); }
        }

        .carousel-container::-webkit-scrollbar {
          height: 8px;
        }
        .carousel-container::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        .carousel-container::-webkit-scrollbar-thumb {
          background: ${theme.secondary};
          border-radius: 4px;
        }
      `}</style>

      {/* Navigation Tabs - Positioned Above Carousel */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '16px',
        padding: '8px',
        marginLeft: '80px'
      }}>
        <button
          onClick={() => setActiveGroup('regulatory')}
          style={{
            width: 'auto',
            height: '48px',
            padding: '16px 24px',
            background: 'transparent',
            color: activeGroup === 'regulatory' ? groupTheme.regulatory.secondary : 'rgba(255,255,255,0.68)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: 'Alliance No2, Helvetica Neue, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            borderBottom: activeGroup === 'regulatory' ? `3px solid ${groupTheme.regulatory.secondary}` : '3px solid transparent',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap'
          }}
        >
          REGULATORY / JUDICIAL
        </button>
        <button
          onClick={() => setActiveGroup('international')}
          style={{
            width: 'auto',
            height: '48px',
            padding: '16px 24px',
            background: 'transparent',
            color: activeGroup === 'international' ? groupTheme.international.secondary : 'rgba(255,255,255,0.68)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: 'Alliance No2, Helvetica Neue, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            borderBottom: activeGroup === 'international' ? `3px solid ${groupTheme.international.secondary}` : '3px solid transparent',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap'
          }}
        >
          IFI / MULTILATERAL
        </button>
      </div>

      {/* Main Carousel Panel */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '70% 30%',
        gap: '32px',
        marginBottom: '24px'
      }}>
        {/* Carousel Container */}
        <div style={{ position: 'relative' }}>
          {/* Fade Overlays */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '30px',
            background: `linear-gradient(to right, ${theme.background}, transparent)`,
            zIndex: 3,
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '30px',
            background: `linear-gradient(to left, ${theme.background}, transparent)`,
            zIndex: 3,
            pointerEvents: 'none'
          }} />

          {/* Carousel */}
          <div
            className="carousel-container"
            style={{
              display: 'flex',
              gap: '18px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: '12px',
              scrollbarWidth: 'thin',
              maxWidth: '660px', // 2 cards (320px each) visible with proper spacing
              margin: '0'
            }}
          >
            {currentData.map(institution => (
              <div key={institution.id} style={{ scrollSnapAlign: 'start' }}>
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
          background: '#F6F7F9',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          borderTop: `3px solid ${theme.secondary}`,
          height: '470px',
          overflowY: 'auto',
          transform: 'translateX(-100px) translateY(16px)',
          width: 'calc(100% + 40px)'
        }}>
          {/* Term Navigation Row */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{
              margin: '0 0 16px 0',
              fontSize: '14px',
              fontWeight: '600',
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'SF Mono, Monaco, monospace'
            }}>
              BOUNDARY ANALYSIS
            </h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
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
                    transition: 'all 0.2s ease',
                    fontFamily: 'Alliance No2, Helvetica Neue, sans-serif'
                  }}
                >
                  {term.replace(/([A-Z])/g, ' $1').trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Structural Explanation Block */}
          <div>
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '18px',
              fontWeight: '700',
              color: theme.primary,
              lineHeight: '1.3',
              fontFamily: 'Alliance No2, Helvetica Neue, sans-serif'
            }}>
              {termDefinitions[selectedTerm]?.title || 'Boundary Analysis'}
            </h3>

            <p style={{
              fontSize: '15px',
              lineHeight: '1.4',
              color: '#374151',
              marginBottom: '16px',
              fontFamily: 'SF Mono, Monaco, monospace',
              letterSpacing: '0.01em'
            }}>
              {termDefinitions[selectedTerm]?.analysis || 'Structural analysis of boundary operations.'}
            </p>

            {/* Boundary Consequence Footer */}
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
                letterSpacing: '0.5px',
                fontFamily: 'SF Mono, Monaco, monospace'
              }}>
                STRUCTURAL CONSEQUENCE
              </p>
              <p style={{
                fontSize: '13px',
                color: '#4B5563',
                margin: 0,
                lineHeight: '1.4',
                fontFamily: 'Alliance No2, Helvetica Neue, sans-serif'
              }}>
                {termDefinitions[selectedTerm]?.consequence || 'Boundary effects on recognition and transfer systems.'}
              </p>
            </div>
          </div>
        </div>
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

            {/* Key Insight */}
            <div style={{
              marginTop: '16px',
              marginBottom: '8px'
            }}>
              <p style={{
                margin: 0,
                fontSize: '13px',
                color: '#E5E5E5',
                fontWeight: '400',
                lineHeight: '1.5',
                opacity: 0.8
              }}>
                💡 Institutional boundaries determine what can be prosecuted, managed, or ignored.<br />
                Vigilum models how these definitions produce blindspots and transfer structural risk.
              </p>
            </div>
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
