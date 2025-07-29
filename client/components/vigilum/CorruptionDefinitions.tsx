import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "@/components/ui/Carousel";

// Boundary Logic Carousel Data - Epistemically Rigorous Institutional Definitions
const boundaryLogicData = {
  regulatory: [
    {
      id: "oecd",
      name: "OECD",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2F7414deae428c4c088326b2b2dbb6c914?format=webp&width=800",
      logo: "🌐",
      definition:
        "Corruption is generally understood as the intentional abuse of public or private office for undue advantage, including bribery, embezzlement, and related misconduct. The OECD establishes offence-specific standards rather than a single definition, recognizing the diversity of national legal systems.",
      citation: {
        text: "OECD, Corruption: A Glossary of International Standards in Criminal Law, 2008",
        url: "https://www.oecd.org/en/topics/policy-issues/anti-corruption-and-integrity.html",
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
          state: "?",
          tooltip:
            "Not specifically addressed in OECD anti-corruption framework. [SB]",
          typology: ["SB"],
        },
        fraud: {
          state: "✓",
          tooltip:
            "Outside scope of anti-bribery convention, addressed in separate frameworks. [SB]",
          typology: ["SB"],
        },
        assetLaundering: {
          state: "✓",
          tooltip:
            "Addressed through FATF coordination and financial intelligence measures. [RT]",
          typology: ["RT"],
        },
        regulatoryArbitrage: {
          state: "?",
          tooltip:
            "Central concern in OECD work on regulatory coherence and international coordination. [CI]",
          typology: ["CI"],
        },
        nepotism: {
          state: "?",
          tooltip:
            "Not directly addressed in OECD anti-corruption instruments. [SB]",
          typology: ["SB"],
        },
      },
    },
    {
      id: "greco",
      name: "GRECO",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2F4bdc576926184906bd0ebc8ad2da6130?format=webp&width=800",
      logo: "🇪🇺",
      definition:
        "Corruption is conduct by public or private actors who improperly and unlawfully benefit themselves or others through the misuse of entrusted authority. GRECO's standards frame corruption as a systemic threat to rule of law, democracy, and social justice.",
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
          state: "✓",
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
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2Ff42ebbbdb41340ae9cd165528a36e1d9?format=webp&width=800",
      logo: "🔍",
      definition:
        "Corruption is the abuse of entrusted power for private gain, encompassing both grand and petty acts across the public and private sectors. TI specifically includes bribery, nepotism, cronyism, and the manipulation of policy or resources for individual or organizational benefit.",
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
          state: "��",
          tooltip:
            "Recognized as corruption type affecting institutional integrity. [CI]",
          typology: ["CI"],
        },
      },
    },
    {
      id: "ec",
      name: "European Commission",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2Ff42ebbbdb41340ae9cd165528a36e1d9?format=webp&width=800",
      logo: "🇪🇺",
      definition:
        "Corruption is commonly understood as the abuse of entrusted power for private gain, manifesting across multiple sectors and institutional settings. The Commission recognizes the complexity of corruption, including both public and private sector forms, and links it to broader risks for democracy and market integrity.",
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
          state: "✓",
          tooltip:
            "Regulated through transparency register but not criminalized unless involving improper influence. [DG]",
          typology: ["DG"],
        },
        shellCompany: {
          state: "?",
          tooltip:
            "Major focus through Anti-Money Laundering Directives and beneficial ownership registers. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "✓",
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
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2Fd90d804729d2429aa2af488e9a85fa01?format=webp&width=800",
      logo: "����",
      definition:
        "Corruption refers to the misuse of public office or powers for personal benefit, including acts such as bribery, embezzlement, trading in influence, and abuse of functions. FATF focuses on corruption's integration with money laundering and the concealment of illicit proceeds within the financial system.",
      citation: {
        text: "FATF, Reference Guide and Information Note on Fight Against Corruption",
        url: "https://www.fatf-gafi.org/en/topics/corruption.html",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Central predicate offense for money laundering under FATF standards. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "✓",
          tooltip:
            "Not within FATF mandate unless involving money laundering or terrorism financing. [SB]",
          typology: ["SB"],
        },
        shellCompany: {
          state: "?",
          tooltip:
            "Major focus through beneficial ownership transparency and corporate vehicle abuse prevention. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "✓",
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
          state: "–",
          tooltip:
            "Relevant only when involving financial flows that could constitute money laundering. [RT]",
          typology: ["RT"],
        },
      },
    },
    {
      id: "stt",
      name: "STT Lithuania",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2Fa5582b7835c0404596752e71575157c9?format=webp&width=800",
      logo: "🇱🇹",
      definition:
        "Corruption is direct or indirect abuse of official position or powers for personal or third-party benefit by a person holding office in the public or private sector. Lithuanian law includes acts such as bribery, trading in influence, and conflicts of interest under this term.",
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
          state: "?",
          tooltip: "Investigated when connected to corruption proceeds. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "✓",
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
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2F2c460fd7acf5492ab1e8a4edccb8c3c9?format=webp&width=800",
      logo: "🌍",
      definition:
        "Corruption, while lacking a universal definition, is generally described as the misuse of entrusted power for private benefit—including bribery, extortion, nepotism, fraud, and embezzlement. UNODC highlights that the forms and perceptions of corruption vary across legal, cultural, and institutional contexts.",
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
          state: "���",
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
          state: "���",
          tooltip:
            "Addressed through international cooperation and regulatory harmonization under UNCAC. [CI]",
          typology: ["CI"],
        },
        nepotism: {
          state: "✓",
          tooltip: "Explicitly included in UNODC corruption definition. [CI]",
          typology: ["CI"],
        },
      },
    },
    {
      id: "g20",
      name: "G20 ACWG",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2F5a9ed7f1fb364a86a871f7b2d1c86fcc?format=webp&width=800",
      logo: "🌐",
      definition:
        "Corruption is recognized as the abuse of entrusted authority for private gain, posing significant risks to market integrity, fair competition, and public trust. The G20 ACWG emphasizes corruption's systemic impact on governance, economic development, and the rule of law.",
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
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2Fbea7129300cb4e3ea7054aab432a3622?format=webp&width=800",
      logo: "🏛️",
      definition:
        "The Foreign Corrupt Practices Act (FCPA) defines corruption through the prohibition of offering, promising, or paying anything of value to foreign officials to obtain or retain business. The law targets both direct and indirect payments, regardless of motive, if intended to secure improper business advantage.",
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
          state: "–",
          tooltip:
            "Relevant when used to conceal FCPA violations or facilitate prohibited payments. [RT]",
          typology: ["RT"],
        },
        cronyism: {
          state: "?",
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
          state: "–",
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
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2Fd13ace4acefa49238b479c2abc49255d?format=webp&width=800",
      logo: "💰",
      definition:
        "The IMF defines corruption as the offering, giving, receiving, or soliciting, directly or indirectly, anything of value to improperly influence the actions of another person or entity—including bribes, facilitation payments, or similar inducements. This definition applies to any public or private actor whose conduct undermines integrity in financial transactions and governance.",
      citation: {
        text: "IMF Anti-Fraud Anti-Corruption Policy, January 2025",
        url: "https://www.imf.org/en/Topics/governance-and-anti-corruption",
      },
      tags: {
        bribery: {
          state: "✓",
          tooltip:
            "Explicitly prohibited in IMF operations and financing arrangements. [CI]",
          typology: ["CI"],
        },
        lobbying: {
          state: "✓",
          tooltip:
            "Legal advocacy excluded from IMF prohibited practices framework. [SB]",
          typology: ["SB"],
        },
        shellCompany: {
          state: "?",
          tooltip:
            "Addressed through beneficial ownership transparency in IMF operations. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "✓",
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
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2F5ea716e7499346d8923706521145718f?format=webp&width=800",
      logo: "����",
      definition:
        "The World Bank defines corruption as the offering, giving, receiving, or soliciting, directly or indirectly, anything of value to improperly influence the actions of another party. Its policy framework targets all forms of undue influence or personal benefit that compromise fair decision-making in public or private contexts.",
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
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2F409ba1ed70e94d7690619584c21c14c3?format=webp&width=800",
      logo: "🇪🇺",
      definition:
        "The EIB defines corruption as the abuse of public or private office for personal gain, including any conduct where a person improperly or unlawfully enriches themselves or close associates by misusing their position. This standard applies to all parties engaged in EIB-financed projects and activities.",
      citation: {
        text: "EIB Anti-Fraud Policy",
        url: "https://www.eib.org/en/publications/anti-fraud-policy.htm",
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
          state: "?",
          tooltip:
            "Addressed through AML compliance and financial crime prevention measures. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "✓",
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
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2Fa83ad062f4a144c1a0e267e4809a9a85?format=webp&width=800",
      logo: "🏛️",
      definition:
        "The EBRD defines corruption as the offering, giving, receiving, or soliciting, directly or indirectly, anything of value to improperly influence the actions of another party. This definition is enforced throughout EBRD-financed projects to ensure integrity in both public and private sector dealings.",
      citation: {
        text: "EBRD Enforcement Policy and Procedures",
        url: "https://www.ebrd.com/home/who-we-are/strategies-governance-compliance/ebrd-sanctions-system.html",
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
          tooltip: "Legal advocacy excluded from EBRD enforcement scope. [SB]",
          typology: ["SB"],
        },
        shellCompany: {
          state: "✓",
          tooltip:
            "Investigated when used to facilitate prohibited practices in EBRD operations. [CI]",
          typology: ["CI"],
        },
        cronyism: {
          state: "✓",
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
          state: "?",
          tooltip:
            "Addressed through AML compliance and financial crime prevention. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "✓",
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
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2Ff061f91c60ef44018b2fc913e75f31a6?format=webp&width=800",
      logo: "🌏",
      definition:
        "ADB defines corruption as the abuse of public or private office for personal gain, covering any situation where entrusted authority is misused for undue benefit. This applies across all sectors, actors, and forms of development finance in ADB operations.",
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
          state: "?",
          tooltip:
            "Addressed through AML compliance and integrity due diligence. [CI]",
          typology: ["CI"],
        },
        regulatoryArbitrage: {
          state: "✓",
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
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2F7c0fc3c03a5f47fcb0e7e8664824aaa8?format=webp&width=800",
      logo: "💼",
      definition:
        "The IFC defines corruption as the offering, giving, receiving, or soliciting, directly or indirectly, anything of value to improperly influence the actions of another party. This standard governs all IFC-supported transactions and investments, targeting improper inducements in both public and private sectors.",
      citation: {
        text: "IFC Definitions and Interpretive Guidelines",
        url: "https://www.ifc.org/en/about/combating-corruption",
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
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2F96450dcffb7742d9a9b1ade768883238?format=webp&width=800",
      logo: "🌎",
      definition:
        "The IDB defines corruption as the offering, giving, receiving, or soliciting, directly or indirectly, anything of value to improperly influence the actions of another party. This policy applies to all individuals or entities participating in IDB-funded projects or transactions.",
      citation: {
        text: "IDB Invest Integrity Framework",
        url: "https://www.iadb.org/en/who-we-are/how-we-are-organized/departments-offices-and-sectors/office-institutional-integrity",
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
          tooltip: "Core prohibited practice in IDB integrity framework. [CI]",
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
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2Fadea02f00f9c41c49ece1fb58fb19e1f?format=webp&width=800",
      logo: "🌍",
      definition:
        "The NDB (BRICS) defines corruption as the offering, giving, receiving, or soliciting, directly or indirectly, anything of value to improperly influence the actions of another party. The definition is enforced to maintain integrity in all NDB-related operations, contracts, and financial instruments.",
      citation: {
        text: "NDB Anti-Corruption Anti-Fraud and Anti-Money Laundering Policy",
        url: "https://www.ndb.int/wp-content/uploads/2024/10/IEO-CLE-PolicyFramework.pdf",
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
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2Ff18c085594b847b6b29bebe53f9405e5?format=webp&width=800",
      logo: "🇳🇴",
      definition:
        "The NIB defines corruption as the offering, giving, receiving, or soliciting, directly or indirectly, anything of value to improperly influence the actions of another party. This standard applies across all NIB activities and is designed to prevent undue advantage and conflicts of interest in financing and procurement.",
      citation: {
        text: "NIB Enforcement Policy",
        url: "https://www.nib.int/about/integrity-and-compliance",
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
          tooltip: "Legal advocacy excluded from NIB enforcement scope. [SB]",
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

// Term Analysis Framework - Structural Boundary Intelligence
const termDefinitions = {
  bribery: {
    title: "Bribery: Boundary Logic and Structural Substitution",
    analysis:
      'Bribery definitions converge on quid pro quo exchange—something of value offered or received to influence official action. Divergence arises in how law, sector, and jurisdiction define the actors, enforcement thresholds, and scope of liability. Public statutes typically confine bribery to government officials and explicit payments (e.g., a contractor paying a minister), while global finance rules expand to include "facilitation payments" and commissions routed through intermediaries. Regulatory formats permit practices—such as "lobbying" or bundled consultancy fees—that replicate bribery\'s substance but remain legal by design. This divergence enables legal simulation: benefits delivered through shell companies, asset laundering, or policy influence can bypass narrow definitions, erasing the line between criminal and compliant. Boundary gaps create prosecutorial blind spots and regulatory arbitrage, transforming what is criminal in one system into accepted practice in another.',
    consequence:
      "Bribery's legal boundaries are engineered to migrate, not resolve, extraction. As systems narrow the definition to explicit payments and official acts, actors reclassify exchanges, simulate compliance, and shift transactions across regulatory domains. This migration routinizes extractive logic within the system's \"white space,\" rendering anti-bribery law an instrument for formalizing capture rather than constraining it. The result: extraction persists in structure, prosecution is selective, and risk becomes a permanent systemic vector.",
  },
  fraud: {
    title: "Fraud: Deception, Disclosure, and Structural Blindspots",
    analysis:
      'Fraud converges on intentional deception for gain, achieved through misrepresentation, concealment, or omission. Divergence emerges in how materiality, intent, and threshold for criminal enforcement are drawn across jurisdictions and industries. While criminal codes prosecute overt schemes—like false invoicing or asset misappropriation—many legal systems allow structural fraud through regulatory loopholes, creative accounting, or misleading disclosures. Complex financial products and off-balance-sheet vehicles can simulate legitimacy, blurring the distinction between regulatory error and criminal intent. Legal formatting reframes fraud as compliance failure or "market innovation" rather than extraction, allowing systemic risk to accumulate off-ledger. For institutional investors, latent fraud risk becomes reputational tail risk and regulatory exposure long after the act.',
    consequence:
      "Fraud transforms the logic of detection into a probabilistic event—outpacing audits by distributing exposure across actors, channels, and time. Compliance frameworks simulate control but are fragmented by design, allowing extractive maneuvers to pass as routine operations. Systemic fraud is not an exception, but an emergent property: risk migrates through legal seams, and structural vulnerability is recalibrated with each new circumvention.",
  },
  nepotism: {
    title: "Nepotism: Embedded Networks and Discretionary Capture",
    analysis:
      'Nepotism is universally recognized as allocating advantage based on kinship or personal ties, in conflict with meritocratic principles. Divergence arises in how the practice is criminalized, normalized, or left to managerial discretion across sectors and cultures. Public rules may prohibit nepotism in specific offices but leave broad gaps, while private organizations often frame family hiring as trust or tradition. Disclosure, recusal, and "fit and proper" tests simulate integrity but rarely challenge underlying network advantage. In markets where nepotism is normalized, governance signals are distorted and opportunity allocation shifts from open competition to closed networks—especially in family-controlled conglomerates, state enterprises, or emerging market firms.',
    consequence:
      "Nepotism embeds privilege as a logic gate, replacing formal meritocracy with recursive self-reinforcement. By cloaking selection bias as trust or cultural fit, institutions nullify accountability and lock alternative talent out of circulation. Oversight mechanisms are structurally defanged—performance is simulated, but network continuity is guaranteed. Over time, nepotism produces self-insulating systems where exclusion, erosion of trust, and strategic blindness are endemic, not accidental.",
  },
  lobbying: {
    title: "Lobbying: Influence, Transparency, and Regulatory Simulation",
    analysis:
      'Lobbying is formally defined as organized advocacy to shape policy or regulation. Divergence appears in registration standards, definitions of "lobbyist," and scope of disclosure, with critical gaps in capturing indirect and informal channels. In the US, rules narrowly regulate direct contact, while industry associations, think-tanks, "astroturfing" campaigns, and campaign finance operate in the shadows. In the EU, public consultation and policy advice blur the lines between advocacy and extractive influence. Globally, the rise of "proxy advocacy," strategic philanthropy, and revolving-door hires enable sustained access without violating formal rules. Legal formatting performs compliance while structurally enabling policy capture: material risk is created when extractive actors operate via formally legal influence, outpacing oversight and market due diligence.',
    consequence:
      'Lobbying institutionalizes access as the substrate of policy, turning disclosure into simulation and exclusion into process. While formal registration mimics constraint, real influence flows through privileged pathways that fragment recognition and diffuse liability. Policy capture is routinized as "input," allowing extraction logic to be embedded via legal advocacy, shifting the center of power outside public oversight. The system learns to distinguish between "undue influence" and routine engagement only after the risk has propagated.',
  },
  assetLaundering: {
    title: "Asset Laundering: Obfuscation, Integration, and Systemic Risk",
    analysis:
      'Asset laundering converges on the transformation of illicit or opaque gains into legitimate assets. Divergence appears in predicate offenses, documentation standards, and thresholds for tracing beneficial ownership. Classic laundering involves layering transactions—shell companies, trusts, offshore flows���but complex investment vehicles, real estate, and even art markets can serve as legal conduits. Many jurisdictions require only minimal "source of funds" checks, allowing structural flows to evade scrutiny. Simulation occurs when assets derived from compliant but extractive acts (e.g., regulatory capture, procurement distortion) are legitimized through ordinary wealth management. This neutralizes enforcement and allows laundered value to circulate in global capital markets.',
    consequence:
      "Asset laundering turns illicit extraction into a legal asset base, fusing criminal and licit economies through recursive layering and integration. Structural opacity is compounded as laundered assets flow through complex, cross-jurisdictional chains—rendering origin untraceable and deterrence theoretical. Enforcement becomes a matter of downstream detection, long after risk has already been absorbed into the system's productive core.",
  },
  cronyism: {
    title: "Cronyism: Preferential Networks and Market Distortion",
    analysis:
      'Cronyism centers on the preferential allocation of opportunities or resources to favored associates, often subverting meritocratic or competitive processes. Divergence emerges in legal thresholds, sectoral standards, and the extent of tolerated insider networks. Some markets criminalize cronyism in procurement or state contracting, while others normalize partnership selection and strategic alliances. Formal processes may simulate competition while reproducing insider control—through shortlists, selective tenders, or undisclosed relationships. Market competition is distorted as closed networks capture value, rendering entire sectors or economies "uninvestable" for global capital, and embedding fragility into supply chains and institutional performance.',
    consequence:
      'Cronyism weaponizes relational proximity as a structural override, bypassing formal rules with informal power. Favor networks embed themselves in procurement, regulation, and oversight, creating a system where compliance is simulated but outcomes are pre-allocated. By formalizing informality, cronyism engineers a permanent split between official process and operational reality—producing an "insider\'s market" and encoding extraction as routine output.',
  },
  regulatoryArbitrage: {
    title: "Regulatory Arbitrage: Gap Navigation and Legal Engineering",
    analysis:
      'Regulatory arbitrage is defined by the strategic exploitation of inconsistencies, gaps, or slow adaptation in legal regimes. Divergence is found in the clarity of anti-abuse rules, the speed of regulatory adaptation, and the global mobility of capital. Actors recast risk or extraction as compliance through relocation, reclassification, or product redesign—moving financial products, tax structures, or even entire businesses to friendlier jurisdictions. Shadow banking, tax havens, and cross-border structuring exemplify arbitrage as a core system feature, not an anomaly. Regulatory arbitrage triggers "race to the bottom" dynamics, undermining enforcement and creating persistent fragility that regulators struggle to address without global coordination.',
    consequence:
      "Regulatory arbitrage encodes risk migration as a design feature, not a flaw. By sequencing operations to exploit the most permissive regimes, actors transform systemic fragility into routine efficiency. Oversight is disassembled into procedural fragments, with no node able to compute or constrain total exposure. The result is a dynamic equilibrium of non-accountability���where the system's very complexity ensures its continuous circumvention.",
  },
  shellCompany: {
    title:
      "Shell Company Structuring: Opacity, Liability, and Formal Simulation",
    analysis:
      "Shell company structuring refers to the use of legal entities with minimal real operations to facilitate transactions, hold assets, or obscure ownership. Divergence occurs in transparency standards, registration requirements, and how easily underlying actors can be linked to shells. While shells are criminalized when linked to clear predicate offenses, most global systems permit their use for asset protection, privacy, or investment structuring. Beneficial ownership disclosure is frequently weak, and mass incorporation is normalized in cross-border deals, funds, and sovereign wealth vehicles. Shells simulate legitimacy via formal compliance but systematically dissolve liability and origin, embedding opacity and enabling flows from bribery, asset laundering, or regulatory arbitrage.",
    consequence:
      "Opaque entities institutionalize the fracture of responsibility by design. Ownership, control, and asset flows are decoupled from identity, transforming the risk landscape into a multidimensional space where due diligence is always partial and loss is always retroactive. This architecture not only enables extraction to persist untraced, but also provides an off-ledger mechanism for risk absorption—rendering detection episodic and remediation structurally impossible without upstream redesign.",
  },
};

// Systemic Consequence Generator - Context-Sensitive Analysis
const getSystemicNote = (activeGroup, selectedTerm, selectedCard) => {
  const notes = {
    default:
      "Institutional boundaries are not technicalities—they determine what can be prosecuted, managed, or ignored. Vigilum renders these boundary operations as system intelligence.",
    regulatory:
      "Regulatory boundaries create legal extraction channels through systematic exclusion of influence operations, enabling compliant corruption within enforcement frameworks.",
    international:
      "Development finance boundaries focus on operational compliance while structural corruption networks operate across institutional mandate gaps and jurisdictional voids.",
    bribery_focus:
      "Bribery boundary convergence masks underlying divergence in scope and enforcement, creating regulatory arbitrage opportunities across jurisdictional systems.",
    lobbying_focus:
      "Lobbying exclusion boundaries systematically enable influence monetization through legal advocacy channels outside anti-corruption recognition systems.",
    private_focus:
      "Private sector boundary gaps enable corruption network migration between regulatory domains, operating through institutional mandate limitations.",
  };

  if (selectedTerm === "bribery") return notes.bribery_focus;
  if (selectedTerm === "lobbying") return notes.lobbying_focus;
  if (selectedTerm === "privateSector") return notes.private_focus;
  if (activeGroup === "regulatory") return notes.regulatory;
  if (activeGroup === "international") return notes.international;
  return notes.default;
};

// Boundary Logic Carousel - Epistemic Intelligence Interface
const BoundaryLogicCarousel = () => {
  const [activeGroup, setActiveGroup] = useState("international");
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState("bribery");
  const [showCompareMode, setShowCompareMode] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(null);
  const [scrollPosition, setScrollPosition] = useState("start");

  const currentData = boundaryLogicData[activeGroup];

  // Theme Configuration - Vigilum Brand Tokens
  const groupTheme = {
    regulatory: {
      primary: "#18291B",
      secondary: "#059669",
      background: "linear-gradient(135deg, #18291B, #0F1E14)",
      cardBg: "#18291B",
      textPrimary: "#E5F3ED",
      accent: "#059669",
    },
    international: {
      primary: "#465B6E",
      secondary: "#3B82F6",
      background: "linear-gradient(135deg, #EAEEF2, #465B6E)",
      cardBg: "#F8FAFC",
      textPrimary: "#1E293B",
      accent: "#3B82F6",
    },
  };

  const theme = groupTheme[activeGroup];
  const allTerms = [
    "bribery",
    "nepotism",
    "lobbying",
    "shellCompany",
    "cronyism",
    "fraud",
    "assetLaundering",
    "regulatoryArbitrage",
  ];

  // Format term names for display
  const getTermDisplayName = (term) => {
    const nameMap = {
      bribery: "Bribery",
      fraud: "Fraud",
      nepotism: "Nepotism",
      lobbying: "Lobbying",
      assetLaundering: "Asset Laundering",
      cronyism: "Cronyism",
      regulatoryArbitrage: "Regulatory Arbitrage",
      shellCompany: "Opaque Entities",
    };
    return nameMap[term] || term;
  };

  // Tag State Logic - Boundary Recognition System
  const getTagColor = (state) => {
    switch (state) {
      case "✓":
        return "#059669"; // Included - professional green
      case "–":
        return "#6B7280"; // Excluded - muted gray
      case "?":
        return "#D97706"; // Ambiguous - professional amber
      default:
        return "#6B7280";
    }
  };

  const getTagBackground = (state) => {
    switch (state) {
      case "✓":
        return "rgba(16, 185, 129, 0.15)";
      case "–":
        return "transparent";
      case "?":
        return "rgba(245, 158, 11, 0.15)";
      default:
        return "transparent";
    }
  };

  // Institution Card Component - Boundary Object Architecture
  const InstitutionCard = ({ institution, isActive }) => {
    return (
      <motion.div
        style={{
          background:
            activeGroup === "regulatory"
              ? "rgba(16, 185, 129, 0.1)"
              : "rgba(59, 130, 246, 0.1)",
          borderRadius: "20px",
          padding: "24px",
          border: `2px solid ${isActive ? theme.secondary : "rgba(0,0,0,0.1)"}`,
          boxShadow: isActive
            ? `0 12px 30px rgba(24,41,27,0.08)`
            : "0 2px 6px rgba(24,41,27,0.04)",
          cursor: "default",
          width: "320px",
          height: "auto",
          minHeight: "520px",
          flexShrink: 0,
          transform: isActive ? "scale(1.04)" : "scale(1)",
          zIndex: isActive ? 2 : 1,
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
        whileHover={{
          scale: 1,
          transition: { duration: 0.2 },
        }}
      >
        {/* Logo and Institution Header - Horizontal Layout */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
            gap: "15px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#FFFFFF",
              border: "1px solid #D6DBE3",
              borderRadius: "8px",
              padding: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              cursor: "pointer",
              flexShrink: 0,
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (institution.citation.url) {
                window.open(institution.citation.url, "_blank");
              }
            }}
            title={`View source: ${institution.citation.text}`}
          >
            <img
              src={institution.logoUrl}
              alt={`${institution.name} logo`}
              style={{
                height: "80px",
                width: "auto",
                maxWidth: "100%",
                objectFit: "contain",
              }}
              onError={(e) => {
                // Fallback to emoji if image fails to load
                e.target.style.display = "none";
                e.target.parentElement.innerHTML = `<span style="fontSize: 40px">${institution.logo}</span>`;
              }}
            />
          </div>
          <h4
            style={{
              margin: 0,
              fontSize: "19px",
              fontWeight: "bold",
              color: "#FFFFFF",
              lineHeight: "24px",
              textAlign: "center",
            }}
          >
            {institution.name}
          </h4>
        </div>

        {/* Definition Section */}
        <div
          style={{
            marginTop: "12px",
            height: "360px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <blockquote
            style={{
              fontSize: "17px",
              fontStyle: "italic",
              color: "#9DE6C6",
              margin: "0 0 8px 0",
              lineHeight: "26px",
              fontFamily: "Alliance No2, Helvetica Neue, sans-serif",
              flex: 1,
              overflow: "hidden",
            }}
          >
            "{institution.definition}"
          </blockquote>

          {/* Source Link - Fixed at bottom */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "auto",
              paddingTop: "16px",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "#A1B5C1",
                fontFamily: "SF Mono, Monaco, monospace",
              }}
            >
              Source:
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (institution.citation.url) {
                  window.open(institution.citation.url, "_blank");
                }
              }}
              style={{
                background: "none",
                border: "none",
                color: "#9DE6C6",
                fontSize: "12px",
                cursor: "pointer",
                padding: "0",
                textDecoration: "underline",
                fontFamily: "SF Mono, Monaco, monospace",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9DE6C6";
              }}
              title={`View source: ${institution.citation.text}`}
            >
              {institution.citation.text}
              <span style={{ fontSize: "10px" }}>↗</span>
            </button>
          </div>
        </div>

        {/* Spacer to push tags to bottom */}
        <div style={{ flex: 1 }}></div>

        {/* Boundary Tag Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "6px",
            marginTop: "auto",
          }}
        >
          {allTerms.map((term) => {
            const tag = institution.tags[term] || {
              state: "–",
              tooltip: "Not specified in this framework",
              typology: [],
            };
            const isHovered = hoveredTag === `${institution.id}-${term}`;
            const isSelected = selectedTerm === term;

            return (
              <div
                key={term}
                style={{
                  height: "34px",
                  padding: "5px 9px",
                  border: `2px solid ${isSelected ? "#FFFFFF" : getTagColor(tag.state)}`,
                  borderRadius: "6px",
                  background: isSelected
                    ? getTagColor(tag.state)
                    : getTagBackground(tag.state),
                  color: isSelected ? "#FFFFFF" : getTagColor(tag.state),
                  fontSize: "11px",
                  fontWeight: "600",
                  fontFamily: "SF Mono, Monaco, monospace",
                  letterSpacing: "0.02em",
                  textAlign: "center",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "6px",
                  transition: "all 0.2s ease",
                  transform: isSelected ? "scale(1.05)" : "scale(1)",
                  boxShadow: isSelected
                    ? `0 0 12px ${getTagColor(tag.state)}66`
                    : "none",
                }}
                onMouseEnter={() => setHoveredTag(`${institution.id}-${term}`)}
                onMouseLeave={() => setHoveredTag(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTerm(term);

                  // Animate all similar tags
                  const similarTags = document.querySelectorAll(
                    `[data-term="${term}"]`,
                  );
                  similarTags.forEach((el) => {
                    el.style.animation = "none";
                    setTimeout(() => {
                      el.style.animation = "pulse 0.7s ease-in-out";
                    }, 10);
                  });
                }}
                data-term={term}
                title={tag.tooltip}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    width: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {tag.state}
                </span>
                <span
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    fontWeight: "600",
                    whiteSpace: "normal",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    flex: "1",
                    lineHeight: "1.1",
                    textAlign: "left",
                    minWidth: "0",
                  }}
                >
                  {getTermDisplayName(term).toUpperCase().replace(" ", "\n")}
                </span>
              </div>
            );
          })}
        </div>

        {/* Active Card Indicator */}
        {isActive && (
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              height: "5px",
              background: theme.secondary,
              borderRadius: "0 0 18px 18px",
            }}
          />
        )}
      </motion.div>
    );
  };

  return (
    <div
      style={{
        minWidth: "1100px",
        margin: "0 auto",
        borderRadius: "24px",
        padding: "0",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "16px",
          padding: "8px",
          marginLeft: "80px",
        }}
      >
        <button
          onClick={() => setActiveGroup("regulatory")}
          style={{
            width: "auto",
            height: "48px",
            padding: "16px 24px",
            background: "transparent",
            color:
              activeGroup === "regulatory"
                ? groupTheme.regulatory.secondary
                : "rgba(255,255,255,0.68)",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            fontFamily: "Alliance No2, Helvetica Neue, sans-serif",
            cursor: "pointer",
            transition: "all 0.3s ease",
            borderBottom:
              activeGroup === "regulatory"
                ? `3px solid ${groupTheme.regulatory.secondary}`
                : "3px solid transparent",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
          }}
        >
          REGULATORY / JUDICIAL
        </button>
        <button
          onClick={() => setActiveGroup("international")}
          style={{
            width: "auto",
            height: "48px",
            padding: "16px 24px",
            background: "transparent",
            color:
              activeGroup === "international"
                ? groupTheme.international.secondary
                : "rgba(255,255,255,0.68)",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            fontFamily: "Alliance No2, Helvetica Neue, sans-serif",
            cursor: "pointer",
            transition: "all 0.3s ease",
            borderBottom:
              activeGroup === "international"
                ? `3px solid ${groupTheme.international.secondary}`
                : "3px solid transparent",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
          }}
        >
          IFI / MULTILATERAL
        </button>
      </div>

      {/* Main Carousel Panel */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gap: "32px",
          marginBottom: "24px",
        }}
      >
        {/* Carousel Container */}
        <div style={{ position: "relative" }}>
          {/* Fade Overlays */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "30px",
              background: `linear-gradient(to right, ${theme.background}, transparent)`,
              zIndex: 3,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "30px",
              background: `linear-gradient(to left, ${theme.background}, transparent)`,
              zIndex: 3,
              pointerEvents: "none",
            }}
          />

          {/* Dynamic Scroll Indicator */}
          <div style={{
            fontSize: "12px",
            color: "#9CA3AF",
            marginBottom: "8px",
            fontFamily: "monospace",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            height: "20px",
            marginLeft: "15px"
          }}>
            <span style={{ width: "12px", textAlign: "center" }}>
              {(scrollPosition === "middle" || scrollPosition === "end") && "←"}
            </span>
            <span>Scroll</span>
            <span style={{ width: "12px", textAlign: "center" }}>
              {(scrollPosition === "start" || scrollPosition === "middle") && "→"}
            </span>
          </div>

          {/* Carousel */}
          <div
            className="carousel-container"
            style={{
              display: "flex",
              gap: "18px",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBottom: "12px",
              scrollbarWidth: "thin",
              maxWidth: "660px", // 2 cards (320px each) visible with proper spacing
              margin: "0",
            }}
            onScroll={(e) => {
              const container = e.target;
              const scrollLeft = container.scrollLeft;
              const maxScroll = container.scrollWidth - container.clientWidth;

              if (scrollLeft === 0) {
                setScrollPosition("start");
              } else if (scrollLeft >= maxScroll - 5) { // 5px threshold for end
                setScrollPosition("end");
              } else {
                setScrollPosition("middle");
              }
            }}
          >
            {currentData.map((institution) => (
              <div key={institution.id} style={{ scrollSnapAlign: "start" }}>
                <InstitutionCard
                  institution={institution}
                  isActive={selectedCard === institution.id}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Analytics Panel */}
        <div
          style={{
            background: "rgba(29, 51, 40, 0.8)",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            borderTop: `3px solid ${theme.secondary}`,
            borderRight: "1px solid rgba(157, 230, 198, 0.2)",
            borderBottom: "1px solid rgba(157, 230, 198, 0.2)",
            borderLeft: "1px solid rgba(157, 230, 198, 0.2)",
            height: "670px",
            minHeight: "670px",
            overflowY: "auto",
            transform: "translateX(-100px) translateY(16px)",
            width: "calc(100% + 40px)",
            position: "relative",
          }}
        >
          {/* Term Navigation Row */}
          <div style={{ marginBottom: "24px" }}>
            <h4
              style={{
                margin: "0 0 16px 0",
                fontSize: "18px",
                fontWeight: "700",
                color: "#9DE6C6",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontFamily: "SF Mono, Monaco, monospace",
              }}
            >
              BOUNDARY ANALYSIS
            </h4>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {[
                "bribery",
                "nepotism",
                "lobbying",
                "shellCompany",
                "cronyism",
                "fraud",
                "assetLaundering",
                "regulatoryArbitrage",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setSelectedTerm(term)}
                  style={{
                    padding: "8px 12px",
                    border: `2px solid ${selectedTerm === term ? theme.secondary : "rgba(157, 230, 198, 0.3)"}`,
                    background:
                      selectedTerm === term
                        ? `${theme.secondary}22`
                        : "transparent",
                    color: "#FFFFFF",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "500",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    transition: "all 0.2s ease",
                    fontFamily: "Alliance No2, Helvetica Neue, sans-serif",
                  }}
                >
                  {getTermDisplayName(term)}
                </button>
              ))}
            </div>
          </div>

          {/* Structural Explanation Block */}
          <div>
            <h3
              style={{
                margin: "0 0 16px 0",
                fontSize: "18px",
                fontWeight: "700",
                color: "#FFFFFF",
                lineHeight: "1.3",
                fontFamily: "Alliance No2, Helvetica Neue, sans-serif",
                textAlign: "left",
              }}
            >
              {termDefinitions[selectedTerm]?.title || "Boundary Analysis"}
            </h3>

            <p
              style={{
                fontSize: "15px",
                lineHeight: "1.4",
                color: "#A1B5C1",
                marginBottom: "16px",
                fontFamily: "SF Mono, Monaco, monospace",
                letterSpacing: "0.01em",
                textAlign: "left",
              }}
            >
              {termDefinitions[selectedTerm]?.analysis ||
                "Structural analysis of boundary operations."}
            </p>

            {/* Boundary Consequence Footer */}
            <div
              style={{
                padding: "16px",
                background: "rgba(157, 230, 198, 0.1)",
                borderRadius: "8px",
                border: `1px solid rgba(157, 230, 198, 0.3)`,
                marginTop: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#9DE6C6",
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontFamily: "SF Mono, Monaco, monospace",
                  textAlign: "left",
                }}
              >
                STRUCTURAL CONSEQUENCE
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#FFFFFF",
                  margin: 0,
                  lineHeight: "1.5",
                  fontFamily: "Alliance No2, Helvetica Neue, sans-serif",
                  textAlign: "left",
                }}
              >
                {termDefinitions[selectedTerm]?.consequence ||
                  "Boundary effects on recognition and transfer systems."}
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
          logo: "🇪���",
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
          logo: "🏦",
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
          logo: "��",
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
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "16px",
        minHeight: "200px",
        maxWidth: "380px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Logo and Institution Name - Horizontal Layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          gap: "15px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            background: "#FFFFFF",
            border: "1px solid #D6DBE3",
            padding: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            flexShrink: 0,
          }}
        >
          <img
            src={institution.logoUrl}
            alt={`${institution.name} logo`}
            style={{
              height: "80px",
              width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
            }}
            onError={(e) => {
              // Fallback to emoji if image fails to load
              e.target.style.display = "none";
              e.target.parentElement.innerHTML = `<span style="fontSize: 48px">${institution.logo}</span>`;
            }}
          />
        </div>

        <h4
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#FFFFFF",
            margin: "0",
            textAlign: "center",
          }}
        >
          {institution.name}
        </h4>
      </div>

      {/* Left-aligned Definition */}
      <p
        style={{
          fontSize: "15px",
          fontStyle: "italic",
          color: "#E5E5E5",
          lineHeight: "1.6",
          margin: "0",
          textAlign: "left",
          width: "100%",
        }}
      >
        "{institution.definition}"
      </p>
    </div>
  );
};

const CorruptionDefinitions = ({ onNavigate }) => {
  const [showCompareAll, setShowCompareAll] = useState(false);
  const [modalActiveGroup, setModalActiveGroup] = useState("regulatory"); // For modal group selection
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
        padding: "40px 32px 0px 32px",
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
                color: "#FFFFFF",
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
              Explore how global authorities construct–and limit–the boundaries
              of corruption.
            </p>

            {/* Key Insight */}
            <div
              style={{
                marginTop: "16px",
                marginBottom: "8px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#E5E5E5",
                  fontWeight: "400",
                  lineHeight: "1.5",
                  opacity: 0.8,
                }}
              >
                💡 Institutional boundaries determine what can be prosecuted,
                managed, or ignored.
                <br />
                Vigilum models how these definitions produce blindspots and
                transfer structural risk.
              </p>
            </div>
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
                  ��
                </button>
              </div>

              {/* Group Selection Tabs */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "32px",
                  gap: "16px",
                }}
              >
                <button
                  onClick={() => setModalActiveGroup("regulatory")}
                  style={{
                    padding: "12px 24px",
                    background:
                      modalActiveGroup === "regulatory"
                        ? "rgba(16, 185, 129, 0.2)"
                        : "transparent",
                    color:
                      modalActiveGroup === "regulatory" ? "#10B981" : "#9DE6C6",
                    border: `2px solid ${modalActiveGroup === "regulatory" ? "#10B981" : "rgba(157, 230, 198, 0.3)"}`,
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "600",
                    fontFamily: "Alliance No2, Helvetica Neue, sans-serif",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Regulatory / Judicial
                </button>
                <button
                  onClick={() => setModalActiveGroup("international")}
                  style={{
                    padding: "12px 24px",
                    background:
                      modalActiveGroup === "international"
                        ? "rgba(59, 130, 246, 0.2)"
                        : "transparent",
                    color:
                      modalActiveGroup === "international"
                        ? "#3B82F6"
                        : "#9DE6C6",
                    border: `2px solid ${modalActiveGroup === "international" ? "#3B82F6" : "rgba(157, 230, 198, 0.3)"}`,
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "600",
                    fontFamily: "Alliance No2, Helvetica Neue, sans-serif",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  IFI / Multilateral
                </button>
              </div>

              {/* 2x4 Grid Layout */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridTemplateRows: "repeat(2, 1fr)",
                  gap: "20px",
                  maxWidth: "1200px",
                  margin: "0 auto",
                }}
              >
                {boundaryLogicData[modalActiveGroup].map(
                  (institution, index) => (
                    <InstitutionCard
                      key={`${modalActiveGroup}-${index}`}
                      institution={institution}
                      isActive={false}
                    />
                  ),
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
