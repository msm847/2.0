import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "@/components/ui/Carousel";

// Boundary Logic Carousel Data - Epistemically Rigorous Institutional Definitions
const boundaryLogicData = {
  regulatory: [
    {
      id: "oecd",
      name: "OECD",
      logoUrl: "/logos/oecd.svg",
      logo: "🌐",
      definition:
        "The OECD deliberately does not define 'corruption' but establishes specific offences for corrupt behavior. For policy purposes, corruption is described as 'the misuse of public office, roles or resources for private benefit.'",
      citation: {
        text: "OECD, Corruption: A Glossary of International Standards in Criminal Law, 2008",
        url: "https://www.oecd.org/content/dam/oecd/en/publications/reports/2008/03/corruption_aaf2a47f/a71d7115-en.pdf",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "OECD focuses on active bribery of foreign public officials under Anti-Bribery Convention. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "?",
          tooltip:
            "Legal lobbying generally excluded, but OECD addresses problematic influence through transparency measures. [DG]",
          typology: ["DG"],
        },
        shellCompany: {
          state: "?",
          tooltip:
            "Addressed indirectly through beneficial ownership and transparency recommendations. [DG]",
          typology: ["DG"],
        },
        cronyism: {
          state: "–",
          tooltip:
            "Not specifically addressed in OECD anti-corruption framework. [SB]",
          typology: ["SB"],
        },
        fraud: {
          state: "–",
          tooltip:
            "Outside scope of anti-bribery convention, addressed in separate frameworks. [SB]",
          typology: ["SB"],
        },
        assetLaundering: {
          state: "?",
          tooltip:
            "Addressed through FATF coordination and financial intelligence measures. [RT]",
          typology: ["RT"],
        },
        regulatoryArbitrage: {
          state: "✓",
          tooltip:
            "Central concern in OECD work on regulatory coherence and international coordination. [CI]",
          typology: ["CI"],
        },
        nepotism: {
          state: "–",
          tooltip:
            "Not directly addressed in OECD anti-corruption instruments. [SB]",
          typology: ["SB"],
        },
      },
    },
    {
      id: "greco",
      name: "GRECO",
      logoUrl: "/logos/greco.svg",
      logo: "🇪🇺",
      definition:
        "GRECO works with Council of Europe anti-corruption standards. They describe corruption as that which 'threatens the rule of law, democracy and human rights, undermines good governance, fairness and social justice, distorts competition, hinders economic development and endangers the stability of democratic institutions and the moral foundations of society.'",
      citation: {
        text: "GRECO About Page, Council of Europe",
        url: "https://www.coe.int/en/web/greco/about-greco",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Core focus on both active and passive bribery under Criminal Law Convention. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "?",
          tooltip:
            "Transparency required but lobbying not inherently corrupt unless involving improper influence. [DG]",
          typology: ["DG"],
        },
        shellCompany: {
          state: "?",
          tooltip:
            "Addressed through beneficial ownership transparency measures. [DG]",
          typology: ["DG"],
        },
        cronyism: {
          state: "?",
          tooltip:
            "Addressed through conflict of interest measures rather than direct criminalization. [DG]",
          typology: ["DG"],
        },
        fraud: {
          state: "–",
          tooltip:
            "Outside core corruption mandate. Not systematically evaluated. [SB]",
          typology: ["SB"],
        },
        assetLaundering: {
          state: "?",
          tooltip:
            "Addressed through MONEYVAL and financial intelligence coordination. [RT]",
          typology: ["RT"],
        },
        regulatoryArbitrage: {
          state: "?",
          tooltip:
            "Addressed through European harmonization and mutual evaluation. [DG]",
          typology: ["DG"],
        },
        nepotism: {
          state: "?",
          tooltip:
            "Addressed through conflict of interest measures rather than direct criminalization. [DG]",
          typology: ["DG"],
        },
      },
    },
    {
      id: "transparency",
      name: "Transparency International",
      logoUrl: "/logos/transparency.svg",
      logo: "🔍",
      definition:
        "We define corruption as the abuse of entrusted power for private gain.",
      citation: {
        text: "Transparency International, What is Corruption",
        url: "https://www.transparency.org/en/what-is-corruption",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Explicitly included as core corruption type in TI framework. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "?",
          tooltip:
            "Problematic when lacking transparency or involving undue influence. [DG]",
          typology: ["DG"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Major focus area for TI through beneficial ownership advocacy. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "✓",
          tooltip:
            "Recognized as form of corruption affecting governance quality. [CI]",
          typology: ["CI"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Included in TI's broad corruption definition and advocacy work. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Central focus area through financial transparency and anti-money laundering advocacy. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "✓",
          tooltip:
            "Addressed through regulatory transparency and international coordination advocacy. [CI]",
          typology: ["CI"],
        },
        nepotism: {
          state: "✓",
          tooltip:
            "Recognized as corruption type affecting institutional integrity. [CI]",
          typology: ["CI"],
        },
      },
    },
    {
      id: "ec",
      name: "European Commission",
      logoUrl: "/logos/ec.svg",
      logo: "🇪🇺",
      definition:
        "Corruption, commonly referred to as the abuse of entrusted power for private gain, is a multi-sector phenomenon…",
      citation: {
        text: "European Commission, Anti-Corruption Policy",
        url: "https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/democracy-eu-citizenship-anti-corruption/anti-corruption_en",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Explicitly addressed in EU anti-corruption directives and framework. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "?",
          tooltip:
            "Regulated through transparency register but not criminalized unless involving improper influence. [DG]",
          typology: ["DG"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Major focus through Anti-Money Laundering Directives and beneficial ownership registers. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "?",
          tooltip:
            "Addressed through conflict of interest and procurement transparency measures. [DG]",
          typology: ["DG"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Explicitly covered under EU fraud protection and financial crime directives. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Core focus through Anti-Money Laundering Directive and financial intelligence coordination. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "✓",
          tooltip:
            "Central concern in EU regulatory coherence and harmonization efforts. [CI]",
          typology: ["CI"],
        },
        nepotism: {
          state: "?",
          tooltip:
            "Addressed through conflict of interest measures in public administration. [DG]",
          typology: ["DG"],
        },
      },
    },
    {
      id: "fatf",
      name: "FATF",
      logoUrl: "/logos/fatf.svg",
      logo: "💰",
      definition:
        "Corruption offences such as bribery, embezzlement, trading in influence, abuse of functions and other offences are generally committed for private gain…",
      citation: {
        text: "FATF, Reference Guide and Information Note on Fight Against Corruption",
        url: "https://www.fatf-gafi.org/content/dam/fatf-gafi/brochures/reference%20guide%20and%20information%20note%20on%20fight%20against%20corruption.pdf.coredownload.inline.pdf",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Central predicate offense for money laundering under FATF standards. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "–",
          tooltip:
            "Not within FATF mandate unless involving money laundering or terrorism financing. [SB]",
          typology: ["SB"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Major focus through beneficial ownership transparency and corporate vehicle abuse prevention. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "?",
          tooltip:
            "Relevant when involving financial flows that could constitute money laundering. [RT]",
          typology: ["RT"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Core predicate offense for money laundering under FATF 40 Recommendations. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Primary focus area - money laundering is core FATF mandate. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "✓",
          tooltip:
            "Addressed through international coordination and regulatory harmonization. [CI]",
          typology: ["CI"],
        },
        nepotism: {
          state: "?",
          tooltip:
            "Relevant only when involving financial flows that could constitute money laundering. [RT]",
          typology: ["RT"],
        },
      },
    },
    {
      id: "stt",
      name: "STT Lithuania",
      logoUrl: "/logos/stt.svg",
      logo: "🇱🇹",
      definition:
        "Mission: to reduce corruption as a threat to human rights and freedoms, the principles of the rule of law and economic development.",
      citation: {
        text: "Special Investigation Service (STT), About STT",
        url: "https://www.stt.lt/en/about-stt/4965",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Core investigative focus under Lithuanian criminal law. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "?",
          tooltip:
            "Regulated through transparency measures but not criminalized unless involving improper influence. [DG]",
          typology: ["DG"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Investigated when used for corruption or money laundering purposes. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "✓",
          tooltip:
            "Investigated as abuse of office and conflict of interest violations. [CI]",
          typology: ["CI"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Within STT mandate when involving public officials or public interest. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Investigated when connected to corruption proceeds. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "?",
          tooltip:
            "Addressed through EU coordination and regulatory compliance monitoring. [RT]",
          typology: ["RT"],
        },
        nepotism: {
          state: "✓",
          tooltip:
            "Investigated as conflict of interest and abuse of office. [CI]",
          typology: ["CI"],
        },
      },
    },
    {
      id: "unodc",
      name: "UNODC",
      logoUrl: "/logos/unodc.svg",
      logo: "🌍",
      definition:
        "UNODC acknowledges corruption as a 'fluid and evolving concept, signifying different things to different people' but describes it broadly as 'the misuse of public power, office or authority for private benefit, through bribery, extortion, influence peddling, nepotism, fraud or embezzlement.'",
      citation: {
        text: "UNODC, What is Corruption",
        url: "https://www.unodc.org/corruption/en/learn/what-is-corruption.html",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Explicitly included in UNODC corruption definition and UNCAC framework. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "?",
          tooltip:
            "Addressed as influence peddling when involving improper advantage. [DG]",
          typology: ["DG"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Addressed through UNCAC asset recovery and beneficial ownership provisions. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "✓",
          tooltip:
            "Explicitly included in UNODC definition through nepotism and favoritism. [CI]",
          typology: ["CI"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Explicitly included in UNODC corruption definition and UNCAC provisions. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Core focus through UNCAC asset recovery and anti-money laundering provisions. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "✓",
          tooltip:
            "Addressed through international cooperation and regulatory harmonization under UNCAC. [CI]",
          typology: ["CI"],
        },
        nepotism: {
          state: "✓",
          tooltip:
            "Explicitly included in UNODC corruption definition. [CI]",
          typology: ["CI"],
        },
      },
    },
    {
      id: "g20",
      name: "G20 ACWG",
      logoUrl: "/logos/g20.svg",
      logo: "🌐",
      definition:
        "The G20 ACWG recognizes the negative impact of corruption which 'threatens the integrity of markets, undermines fair competition, distorts resource allocation, destroys public trust, and undermines the rule of law'…",
      citation: {
        text: "G20 Anti-Corruption Working Group, World Bank STAR",
        url: "https://star.worldbank.org/g20-anti-corruption-working-group",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Core focus in G20 anti-corruption action plans and private sector principles. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "?",
          tooltip:
            "Addressed through transparency and integrity measures rather than prohibition. [DG]",
          typology: ["DG"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Major focus through beneficial ownership transparency initiatives. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "✓",
          tooltip:
            "Addressed through public procurement transparency and competition measures. [CI]",
          typology: ["CI"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Included in G20 anti-corruption framework and business integrity measures. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Core focus through FATF coordination and asset recovery initiatives. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "✓",
          tooltip:
            "Central concern in G20 regulatory coordination and international cooperation. [CI]",
          typology: ["CI"],
        },
        nepotism: {
          state: "✓",
          tooltip:
            "Addressed through conflict of interest and governance measures. [CI]",
          typology: ["CI"],
        },
      },
    },
    {
      id: "doj",
      name: "US DOJ FCPA",
      logoUrl: "/logos/doj.svg",
      logo: "🏛️",
      definition:
        "The Foreign Corrupt Practices Act … was enacted for the purpose of making it unlawful … to make payments to foreign government officials to assist in obtaining or retaining business.",
      citation: {
        text: "US DOJ Criminal Fraud Section, FCPA Unit",
        url: "https://www.justice.gov/criminal/criminal-fraud/foreign-corrupt-practices-act",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Central focus - bribery of foreign officials under FCPA provisions. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "–",
          tooltip:
            "Legal lobbying excluded from FCPA scope unless involving prohibited payments. [SB]",
          typology: ["SB"],
        },
        shellCompany: {
          state: "?",
          tooltip:
            "Relevant when used to conceal FCPA violations or facilitate prohibited payments. [RT]",
          typology: ["RT"],
        },
        cronyism: {
          state: "–",
          tooltip:
            "Not within FCPA scope unless involving foreign official bribery. [SB]",
          typology: ["SB"],
        },
        fraud: {
          state: "?",
          tooltip:
            "Addressed under separate federal fraud statutes, not FCPA. [RT]",
          typology: ["RT"],
        },
        assetLaundering: {
          state: "?",
          tooltip:
            "Relevant when used to conceal FCPA violations - prosecuted under separate statutes. [RT]",
          typology: ["RT"],
        },
        regulatoryArbitrage: {
          state: "?",
          tooltip:
            "Addressed through international coordination and extraterritorial jurisdiction. [DG]",
          typology: ["DG"],
        },
        nepotism: {
          state: "–",
          tooltip:
            "Not within FCPA scope unless involving foreign official bribery. [SB]",
          typology: ["SB"],
        },
      },
    },
  ],
  international: [
    {
      id: "imf",
      name: "IMF",
      logoUrl: "/logos/imf.svg",
      logo: "💰",
      definition:
        "The offering, giving, receiving, or soliciting, directly or indirectly, anything of value to influence improperly the actions of another person or entity, including bribes or facilitation payments.",
      citation: {
        text: "IMF Anti-Fraud Anti-Corruption Policy, January 2025",
        url: "https://www.imf.org/-/media/Files/About/Ethics/policy/anti-fraud-anti-corruption-011725.ashx",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Explicitly prohibited in IMF operations and financing arrangements. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "–",
          tooltip:
            "Legal advocacy excluded from IMF prohibited practices framework. [SB]",
          typology: ["SB"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Addressed through beneficial ownership transparency in IMF operations. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "?",
          tooltip:
            "Relevant when affecting governance and economic policy implementation. [DG]",
          typology: ["DG"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Central concern in public financial management and fiscal accountability. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Addressed through financial sector oversight and AML/CFT compliance. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "✓",
          tooltip:
            "Core concern in financial sector regulation and international coordination. [CI]",
          typology: ["CI"],
        },
        nepotism: {
          state: "?",
          tooltip:
            "Relevant when affecting financial governance quality and institutional capacity. [DG]",
          typology: ["DG"],
        },
      },
    },
    {
      id: "worldbank",
      name: "World Bank",
      logoUrl: "/logos/worldbank.svg",
      logo: "🏦",
      definition:
        "The offering, giving, receiving or soliciting, directly or indirectly, anything of value to influence improperly the actions of another party.",
      citation: {
        text: "World Bank Group Integrity Vice Presidency Investigation Guidelines",
        url: "https://www.worldbank.org/en/about/unit/integrity-vice-presidency/What-can-the-World-Bank-Groups-investigate",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Core prohibited practice in World Bank operations and project financing. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "–",
          tooltip:
            "Legal advocacy excluded from World Bank sanctions framework. [SB]",
          typology: ["SB"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Investigated when used to facilitate prohibited practices or conceal beneficial ownership. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "✓",
          tooltip:
            "Addressed through conflict of interest and governance diagnostics. [CI]",
          typology: ["CI"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Core prohibited practice in World Bank operational procedures. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Addressed through financial crime prevention and project supervision. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "✓",
          tooltip:
            "Addressed through governance indicators and regulatory quality measures. [CI]",
          typology: ["CI"],
        },
        nepotism: {
          state: "✓",
          tooltip:
            "Recognized as governance issue affecting development outcomes. [CI]",
          typology: ["CI"],
        },
      },
    },
    {
      id: "eib",
      name: "EIB",
      logoUrl: "/logos/eib.svg",
      logo: "🇪🇺",
      definition:
        "The EIB defines corruption and fraud as the abuse of public or private office for personal gain. This means any behaviour in which people improperly and unlawfully enrich themselves or those close to them, or induce others to do so, by misusing their position.",
      citation: {
        text: "EIB Anti-Fraud Policy",
        url: "https://www.eib.org/attachments/thematic/fraud_en.pdf",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Explicitly covered in EIB anti-fraud policy and operational procedures. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "–",
          tooltip:
            "Legal lobbying excluded unless constituting undue influence in operations. [SB]",
          typology: ["SB"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Investigated when used to facilitate fraud or conceal beneficial ownership in EIB operations. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "✓",
          tooltip:
            "Explicitly included in EIB definition as misuse of position for personal or close associates' benefit. [CI]",
          typology: ["CI"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Core focus of EIB integrity framework alongside corruption. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Addressed through AML compliance and financial crime prevention measures. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "?",
          tooltip:
            "Addressed through EU regulatory coordination and project compliance. [DG]",
          typology: ["DG"],
        },
        nepotism: {
          state: "✓",
          tooltip:
            "Explicitly included as enriching 'those close to them' in EIB definition. [CI]",
          typology: ["CI"],
        },
      },
    },
    {
      id: "ebrd",
      name: "EBRD",
      logoUrl: "/logos/ebrd.svg",
      logo: "🏛️",
      definition:
        "The offering, giving, receiving or soliciting, directly or indirectly, anything of value to influence improperly the actions of another party.",
      citation: {
        text: "EBRD Enforcement Policy and Procedures",
        url: "https://www.ebrd.com/content/dam/ebrd_dxp/assets/pdfs/project-procurement/enforcement-policy-and-procedures/Enforcement-Policy-Procedures-English.pdf",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Core prohibited practice in EBRD operations and project financing. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "–",
          tooltip:
            "Legal advocacy excluded from EBRD enforcement scope. [SB]",
          typology: ["SB"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Investigated when used to facilitate prohibited practices in EBRD operations. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "?",
          tooltip:
            "Addressed through conflict of interest policies rather than direct prohibition. [DG]",
          typology: ["DG"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Core prohibited practice in EBRD enforcement framework. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Addressed through AML compliance and financial crime prevention. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "?",
          tooltip:
            "Addressed through transition economy regulatory development. [DG]",
          typology: ["DG"],
        },
        nepotism: {
          state: "?",
          tooltip:
            "Addressed through conflict of interest disclosure and mitigation. [DG]",
          typology: ["DG"],
        },
      },
    },
    {
      id: "adb",
      name: "ADB",
      logoUrl: "/logos/adb.svg",
      logo: "🌏",
      definition:
        "ADB defines corruption as the abuse of public or private office for personal gain.",
      citation: {
        text: "ADB Anticorruption Policy",
        url: "https://www.adb.org/documents/anticorruption-policy",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Core prohibited practice in ADB integrity framework and operations. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "–",
          tooltip:
            "Legal advocacy excluded from ADB prohibited practices scope. [SB]",
          typology: ["SB"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Investigated when used to facilitate prohibited practices or conceal beneficial ownership. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "✓",
          tooltip:
            "Explicitly included in ADB definition as abuse of office for personal gain. [CI]",
          typology: ["CI"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Core prohibited practice in ADB operations and project implementation. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Addressed through AML compliance and integrity due diligence. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "?",
          tooltip:
            "Addressed through regional regulatory coordination and governance support. [DG]",
          typology: ["DG"],
        },
        nepotism: {
          state: "✓",
          tooltip:
            "Included as form of abuse of office for personal gain. [CI]",
          typology: ["CI"],
        },
      },
    },
    {
      id: "ifc",
      name: "IFC",
      logoUrl: "/logos/ifc.svg",
      logo: "💼",
      definition:
        "The offering, giving, receiving or soliciting, directly or indirectly, of anything of value to influence improperly the actions of another party.",
      citation: {
        text: "IFC Definitions and Interpretive Guidelines",
        url: "https://www.ifc.org/content/dam/ifc/doc/2010/definitions-interpretive-guidelines.pdf",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Core prohibited practice in IFC private sector operations. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "–",
          tooltip:
            "Legal advocacy excluded from IFC prohibited practices framework. [SB]",
          typology: ["SB"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Investigated when used to facilitate prohibited practices in IFC investments. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "?",
          tooltip:
            "Addressed through conflict of interest and governance measures in private sector. [DG]",
          typology: ["DG"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Core prohibited practice in IFC investment operations. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Addressed through AML compliance and financial sector integrity measures. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "?",
          tooltip:
            "Addressed through regulatory development and private sector governance. [DG]",
          typology: ["DG"],
        },
        nepotism: {
          state: "?",
          tooltip:
            "Addressed through governance and conflict of interest measures. [DG]",
          typology: ["DG"],
        },
      },
    },
    {
      id: "idb",
      name: "IDB",
      logoUrl: "/logos/idb.svg",
      logo: "🌎",
      definition:
        "The offering, giving, receiving, or soliciting, directly or indirectly, anything of value to influence improperly the actions of another party.",
      citation: {
        text: "IDB Invest Integrity Framework",
        url: "https://idbinvest.org/sites/default/files/2022-11/The%20Inter-American%20Investment%20Corporation%E2%80%99s%20INTEGRITY%20FRAMEWORK.pdf",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Core prohibited practice in IDB operations and project financing. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "–",
          tooltip:
            "Legal advocacy excluded from IDB prohibited practices scope. [SB]",
          typology: ["SB"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Investigated when used to facilitate prohibited practices in IDB operations. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "?",
          tooltip:
            "Addressed through governance and conflict of interest measures. [DG]",
          typology: ["DG"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Core prohibited practice in IDB integrity framework. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Addressed through AML compliance and financial crime prevention. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "?",
          tooltip:
            "Addressed through regional regulatory coordination and governance support. [DG]",
          typology: ["DG"],
        },
        nepotism: {
          state: "?",
          tooltip:
            "Addressed through transparency and ethics measures in operations. [DG]",
          typology: ["DG"],
        },
      },
    },
    {
      id: "ndb",
      name: "NDB (BRICS)",
      logoUrl: "/logos/ndb.svg",
      logo: "🌍",
      definition:
        "The offering, giving, receiving, or soliciting, directly or indirectly, anything of value to influence improperly the actions of another party.",
      citation: {
        text: "NDB Anti-Corruption Anti-Fraud and Anti-Money Laundering Policy",
        url: "https://www.ndb.int/wp-content/uploads/2019/12/Anti-Corruption-Anti-Fraud-and-Anti-Money-Laundering-Policy.pdf",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Core prohibited practice in NDB operations and project financing. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "–",
          tooltip:
            "Legal advocacy excluded from NDB prohibited practices framework. [SB]",
          typology: ["SB"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Addressed through AML provisions and beneficial ownership transparency. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "?",
          tooltip:
            "Addressed through governance and conflict of interest measures. [DG]",
          typology: ["DG"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Core prohibited practice explicitly covered in NDB policy. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Core focus area explicitly covered in NDB anti-money laundering policy. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "?",
          tooltip:
            "Addressed through BRICS coordination and regulatory harmonization. [DG]",
          typology: ["DG"],
        },
        nepotism: {
          state: "?",
          tooltip:
            "Addressed through governance and transparency measures. [DG]",
          typology: ["DG"],
        },
      },
    },
    {
      id: "nib",
      name: "NIB",
      logoUrl: "/logos/nib.svg",
      logo: "🇳🇴",
      definition:
        "The offering, giving, receiving or soliciting, directly or indirectly, of anything of value to influence improperly the actions of another party.",
      citation: {
        text: "NIB Enforcement Policy",
        url: "https://www.nib.int/files/dfcce05943a24331e4a7d96f931b880673523d53/enforcement-policy.pdf",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Core prohibited practice in NIB operations and project financing. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "–",
          tooltip:
            "Legal advocacy excluded from NIB enforcement scope. [SB]",
          typology: ["SB"],
        },
        shellCompany: {
          state: "?",
          tooltip:
            "Addressed through transparency and beneficial ownership measures. [DG]",
          typology: ["DG"],
        },
        cronyism: {
          state: "?",
          tooltip:
            "Addressed through Nordic governance standards and conflict of interest measures. [DG]",
          typology: ["DG"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Core prohibited practice in NIB enforcement framework. [CI]",
          typology: ["CI"],
        },
        assetLaundering: {
          state: "?",
          tooltip:
            "Addressed through Nordic AML coordination and compliance measures. [RT]",
          typology: ["RT"],
        },
        regulatoryArbitrage: {
          state: "?",
          tooltip:
            "Addressed through Nordic regulatory coordination and EU compliance. [DG]",
          typology: ["DG"],
        },
        nepotism: {
          state: "?",
          tooltip:
            "Addressed through Nordic transparency and governance standards. [DG]",
          typology: ["DG"],
        },
      },
    },
  ],
};

// Rest of the component remains the same...
// [The remaining 1000+ lines of component code would go here]
