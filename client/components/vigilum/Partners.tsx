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
  Shield,
} from "lucide-react";

// Countries list with phone codes
const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Belarus",
  "Belgium",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Brazil",
  "Bulgaria",
  "Cambodia",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Czech Republic",
  "Denmark",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "Estonia",
  "Ethiopia",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Latvia",
  "Lebanon",
  "Lithuania",
  "Luxembourg",
  "Malaysia",
  "Mexico",
  "Morocco",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Panama",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Serbia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Venezuela",
  "Vietnam",
];

// Country phone codes mapping
const COUNTRY_PHONE_CODES = {
  Afghanistan: "+93",
  Albania: "+355",
  Algeria: "+213",
  Argentina: "+54",
  Armenia: "+374",
  Australia: "+61",
  Austria: "+43",
  Azerbaijan: "+994",
  Bahrain: "+973",
  Bangladesh: "+880",
  Belarus: "+375",
  Belgium: "+32",
  Bolivia: "+591",
  "Bosnia and Herzegovina": "+387",
  Brazil: "+55",
  Bulgaria: "+359",
  Cambodia: "+855",
  Canada: "+1",
  Chile: "+56",
  China: "+86",
  Colombia: "+57",
  "Costa Rica": "+506",
  Croatia: "+385",
  "Czech Republic": "+420",
  Denmark: "+45",
  "Dominican Republic": "+1",
  Ecuador: "+593",
  Egypt: "+20",
  Estonia: "+372",
  Ethiopia: "+251",
  Finland: "+358",
  France: "+33",
  Georgia: "+995",
  Germany: "+49",
  Ghana: "+233",
  Greece: "+30",
  Guatemala: "+502",
  Honduras: "+504",
  Hungary: "+36",
  Iceland: "+354",
  India: "+91",
  Indonesia: "+62",
  Iran: "+98",
  Iraq: "+964",
  Ireland: "+353",
  Israel: "+972",
  Italy: "+39",
  Japan: "+81",
  Jordan: "+962",
  Kazakhstan: "+7",
  Kenya: "+254",
  Kuwait: "+965",
  Latvia: "+371",
  Lebanon: "+961",
  Lithuania: "+370",
  Luxembourg: "+352",
  Malaysia: "+60",
  Mexico: "+52",
  Morocco: "+212",
  Netherlands: "+31",
  "New Zealand": "+64",
  Nigeria: "+234",
  Norway: "+47",
  Pakistan: "+92",
  Panama: "+507",
  Peru: "+51",
  Philippines: "+63",
  Poland: "+48",
  Portugal: "+351",
  Qatar: "+974",
  Romania: "+40",
  Russia: "+7",
  "Saudi Arabia": "+966",
  Serbia: "+381",
  Singapore: "+65",
  Slovakia: "+421",
  Slovenia: "+386",
  "South Africa": "+27",
  "South Korea": "+82",
  Spain: "+34",
  "Sri Lanka": "+94",
  Sweden: "+46",
  Switzerland: "+41",
  Thailand: "+66",
  Turkey: "+90",
  Ukraine: "+380",
  "United Arab Emirates": "+971",
  "United Kingdom": "+44",
  "United States": "+1",
  Uruguay: "+598",
  Venezuela: "+58",
  Vietnam: "+84",
};

const Partners = () => {
  // Contact Form State
  const [fullName, setFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [phonePlaceholder, setPhonePlaceholder] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [scrollIntensity, setScrollIntensity] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [jobTitleSearch, setJobTitleSearch] = useState("");
  const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);
  const [companySearch, setCompanySearch] = useState("");
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const fileInputRef = useRef(null);

  // Common job titles for suggestions
  const COMMON_JOB_TITLES = [
    // Executive Level
    "Chief Executive Officer",
    "Chief Technology Officer",
    "Chief Financial Officer",
    "Chief Operating Officer",
    "Managing Director",
    "Executive Director",
    "General Manager",
    "Vice President",
    "Senior Vice President",

    // Senior Management
    "Senior Director",
    "Director",
    "Assistant Director",
    "Department Head",
    "Division Head",
    "Senior Manager",
    "Operations Manager",
    "Project Manager",
    "Program Manager",
    "Product Manager",

    // Mid-Level Management
    "Manager",
    "Assistant Manager",
    "Team Leader",
    "Team Lead",
    "Section Head",
    "Unit Manager",
    "Supervisor",
    "Coordinator",
    "Senior Coordinator",
    "Program Coordinator",
    "Project Coordinator",

    // Professional/Technical
    "Senior Analyst",
    "Business Analyst",
    "Research Analyst",
    "Policy Analyst",
    "Data Analyst",
    "Financial Analyst",
    "Systems Analyst",
    "Security Analyst",
    "Compliance Analyst",
    "Senior Consultant",
    "Consultant",
    "Advisory Consultant",
    "Management Consultant",
    "Senior Engineer",
    "Engineer",
    "Software Engineer",
    "Systems Engineer",
    "Technical Engineer",
    "Senior Developer",
    "Developer",
    "Software Developer",
    "Web Developer",
    "Application Developer",
    "Senior Specialist",
    "Specialist",
    "Technical Specialist",
    "Subject Matter Specialist",
    "Senior Advisor",
    "Strategic Advisor",
    "Policy Advisor",
    "Technical Advisor",

    // Government/Public Sector
    "Government Official",
    "Public Official",
    "Civil Servant",
    "Public Administrator",
    "Minister",
    "Deputy Minister",
    "Secretary",
    "Under Secretary",
    "Assistant Secretary",
    "Commissioner",
    "Deputy Commissioner",
    "Inspector",
    "Senior Inspector",
    "Investigator",
    "Policy Officer",
    "Program Officer",
    "Administrative Officer",
    "Compliance Officer",
    "Procurement Officer",
    "Contract Officer",
    "Grants Officer",
    "Regulatory Officer",

    // Academic/Research
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Lecturer",
    "Senior Lecturer",
    "Research Fellow",
    "Senior Research Fellow",
    "Postdoctoral Researcher",
    "Senior Researcher",
    "Research Scientist",
    "Principal Investigator",
    "Research Director",
    "PhD Candidate",
    "Graduate Student",
    "Research Assistant",
    "Teaching Assistant",
    "Dean",
    "Associate Dean",
    "Department Chair",
    "Academic Director",

    // Legal/Compliance
    "General Counsel",
    "Legal Counsel",
    "Senior Legal Counsel",
    "Staff Attorney",
    "Associate Attorney",
    "Legal Advisor",
    "Legal Officer",
    "Compliance Officer",
    "Senior Compliance Officer",
    "Audit Manager",
    "Senior Auditor",
    "Internal Auditor",
    "Risk Manager",
    "Risk Analyst",

    // Entry Level/Junior
    "Analyst",
    "Junior Analyst",
    "Associate",
    "Senior Associate",
    "Assistant",
    "Administrative Assistant",
    "Executive Assistant",
    "Program Assistant",
    "Officer",
    "Junior Officer",
    "Staff Officer",
    "Operations Officer",
    "Trainee",
    "Graduate Trainee",
    "Management Trainee",
    "Intern",
    "Fellow",

    // Non-Profit/NGO
    "Program Director",
    "Development Director",
    "Communications Director",
    "Program Manager",
    "Development Manager",
    "Outreach Manager",
    "Community Manager",
    "Program Officer",
    "Development Officer",
    "Communications Officer",
    "Outreach Coordinator",
    "Volunteer Coordinator",
    "Community Outreach Coordinator",
    "Grant Writer",
    "Fundraiser",

    // Finance/Banking
    "Investment Manager",
    "Portfolio Manager",
    "Relationship Manager",
    "Account Manager",
    "Credit Analyst",
    "Investment Analyst",
    "Financial Advisor",
    "Wealth Manager",
    "Underwriter",
    "Loan Officer",
    "Banking Officer",
    "Treasury Analyst",

    // Consulting/Advisory
    "Principal Consultant",
    "Senior Principal",
    "Engagement Manager",
    "Associate Consultant",
    "Junior Consultant",
    "Business Advisor",
    "Strategy Consultant",
    "Implementation Specialist",

    // Operations/Administration
    "Operations Analyst",
    "Business Operations Manager",
    "Administrative Manager",
    "Office Manager",
    "Facilities Manager",
    "Human Resources Manager",
    "HR Specialist",
    "Training Manager",
    "Quality Manager",
    "Process Manager",
    "Records Manager",

    // Technology/IT
    "IT Manager",
    "Technology Manager",
    "Database Administrator",
    "Network Administrator",
    "Security Officer",
    "Information Security Analyst",
    "IT Specialist",
    "Technical Support",
  ];

  // Blacklisted fake entries
  const BLACKLISTED_TITLES = [
    "test",
    "asdf",
    "none",
    "n/a",
    "na",
    "null",
    "undefined",
    "admin",
    "user",
    "temp",
    "temporary",
    "xxx",
    "yyy",
    "zzz",
    "abc",
    "123",
    "fake",
    "false",
    "example",
    "sample",
    "demo",
  ];

  // Top 250+ Universities worldwide
  const TOP_UNIVERSITIES = [
    // United States
    "Harvard University",
    "Stanford University",
    "Massachusetts Institute of Technology",
    "California Institute of Technology",
    "University of Chicago",
    "Princeton University",
    "University of Pennsylvania",
    "Yale University",
    "Columbia University",
    "Northwestern University",
    "Duke University",
    "Johns Hopkins University",
    "Dartmouth College",
    "Brown University",
    "Cornell University",
    "Rice University",
    "University of Notre Dame",
    "Vanderbilt University",
    "Washington University in St. Louis",
    "Georgetown University",
    "University of California Berkeley",
    "University of California Los Angeles",
    "University of Southern California",
    "Carnegie Mellon University",
    "University of Virginia",
    "Tufts University",
    "Wake Forest University",
    "University of Michigan",
    "Boston College",
    "New York University",
    "University of Rochester",
    "Brandeis University",
    "Case Western Reserve University",
    "Tulane University",
    "Boston University",
    "Northeastern University",
    "Rensselaer Polytechnic Institute",
    "University of Miami",
    "University of California San Diego",
    "University of California Davis",
    "University of California Irvine",
    "University of California Santa Barbara",
    "University of North Carolina Chapel Hill",
    "University of Wisconsin Madison",
    "University of Illinois Urbana-Champaign",
    "Georgia Institute of Technology",
    "University of Texas Austin",
    "University of Washington",
    "Ohio State University",
    "Pennsylvania State University",
    "University of Florida",
    "University of Minnesota",
    "Purdue University",
    "Texas A&M University",
    "University of Georgia",
    "Indiana University Bloomington",

    // United Kingdom
    "University of Oxford",
    "University of Cambridge",
    "Imperial College London",
    "London School of Economics",
    "University College London",
    "King's College London",
    "University of Edinburgh",
    "University of Manchester",
    "University of Warwick",
    "University of Bristol",
    "University of Glasgow",
    "University of Southampton",
    "University of Birmingham",
    "University of Sheffield",
    "University of Nottingham",
    "University of Leeds",
    "University of Liverpool",
    "Newcastle University",
    "Cardiff University",
    "Queen's University Belfast",
    "University of York",
    "University of Exeter",
    "University of Bath",
    "Lancaster University",
    "University of Surrey",
    "Loughborough University",
    "University of Leicester",
    "University of East Anglia",
    "University of Reading",
    "Heriot-Watt University",

    // Canada
    "University of Toronto",
    "McGill University",
    "University of British Columbia",
    "University of Alberta",
    "University of Montreal",
    "McMaster University",
    "University of Waterloo",
    "Queen's University",
    "University of Calgary",
    "University of Ottawa",
    "Western University",
    "Dalhousie University",
    "University of Saskatchewan",
    "University of Manitoba",
    "Carleton University",
    "Simon Fraser University",
    "York University",
    "Concordia University",
    "University of Victoria",
    "Memorial University of Newfoundland",

    // Australia
    "University of Melbourne",
    "Australian National University",
    "University of Sydney",
    "University of Queensland",
    "Monash University",
    "University of New South Wales",
    "University of Western Australia",
    "University of Adelaide",
    "University of Technology Sydney",
    "Queensland University of Technology",
    "Macquarie University",
    "Curtin University",
    "Deakin University",
    "Griffith University",
    "La Trobe University",
    "University of South Australia",
    "University of Tasmania",
    "University of Wollongong",
    "Flinders University",

    // Germany
    "Technical University of Munich",
    "Ludwig Maximilian University of Munich",
    "Heidelberg University",
    "Humboldt University of Berlin",
    "Free University of Berlin",
    "RWTH Aachen University",
    "University of Freiburg",
    "University of Göttingen",
    "University of Hamburg",
    "University of Cologne",
    "University of Frankfurt",
    "University of Tübingen",
    "University of Bonn",
    "University of Stuttgart",
    "Technical University of Berlin",
    "University of Münster",
    "University of Würzburg",
    "University of Erlangen-Nuremberg",
    "University of Mainz",

    // France
    "Sorbonne University",
    "École Polytechnique",
    "École Normale Supérieure",
    "University of Paris-Saclay",
    "CentraleSupélec",
    "Sciences Po",
    "École des Ponts ParisTech",
    "University of Strasbourg",
    "University of Lyon",
    "Aix-Marseille University",
    "University of Bordeaux",
    "University of Toulouse",
    "University of Lille",
    "University of Nantes",
    "University of Rennes",
    "University of Montpellier",
    "University of Nice",
    "University of Grenoble",
    "INSA Lyon",
    "École Centrale Lyon",

    // Netherlands
    "University of Amsterdam",
    "Delft University of Technology",
    "Utrecht University",
    "Leiden University",
    "Eindhoven University of Technology",
    "University of Groningen",
    "Erasmus University Rotterdam",
    "Wageningen University",
    "Maastricht University",
    "VU Amsterdam",
    "Radboud University",
    "University of Twente",
    "Tilburg University",
    "Open University Netherlands",
    "HAN University of Applied Sciences",

    // Switzerland
    "ETH Zurich",
    "EPFL",
    "University of Zurich",
    "University of Geneva",
    "University of Basel",
    "University of Bern",
    "University of Lausanne",
    "University of St. Gallen",
    "University of Fribourg",
    "University of Neuchâtel",

    // Sweden
    "Karolinska Institute",
    "KTH Royal Institute of Technology",
    "Stockholm University",
    "University of Gothenburg",
    "Lund University",
    "Uppsala University",
    "Chalmers University of Technology",
    "Linköping University",
    "Umeå University",
    "Swedish University of Agricultural Sciences",

    // Denmark
    "University of Copenhagen",
    "Technical University of Denmark",
    "Aarhus University",
    "Aalborg University",
    "University of Southern Denmark",
    "Copenhagen Business School",
    "Roskilde University",
    "IT University of Copenhagen",

    // Norway
    "University of Oslo",
    "Norwegian University of Science and Technology",
    "University of Bergen",
    "University of Tromsø",
    "Norwegian School of Economics",
    "BI Norwegian Business School",
    "University of Stavanger",
    "University of Agder",

    // Finland
    "University of Helsinki",
    "Aalto University",
    "University of Turku",
    "University of Tampere",
    "University of Oulu",
    "University of Jyväskylä",
    "University of Eastern Finland",
    "Åbo Akademi University",

    // Italy
    "Bocconi University",
    "Sapienza University of Rome",
    "University of Bologna",
    "University of Milan",
    "Politecnico di Milano",
    "University of Padua",
    "University of Florence",
    "University of Naples",
    "University of Turin",
    "University of Pisa",
    "University of Rome Tor Vergata",
    "University of Genoa",
    "University of Bari",
    "University of Palermo",
    "University of Catania",

    // Spain
    "University of Barcelona",
    "Autonomous University of Madrid",
    "Complutense University of Madrid",
    "Pompeu Fabra University",
    "University of Valencia",
    "University of Seville",
    "University of Granada",
    "Polytechnic University of Madrid",
    "University of the Basque Country",
    "University of Santiago de Compostela",
    "University of Zaragoza",
    "University of Salamanca",
    "University of Alcalá",
    "Carlos III University of Madrid",

    // Asia-Pacific
    "National University of Singapore",
    "Nanyang Technological University",
    "University of Hong Kong",
    "Hong Kong University of Science and Technology",
    "Chinese University of Hong Kong",
    "City University of Hong Kong",
    "Seoul National University",
    "KAIST",
    "Yonsei University",
    "Korea University",
    "University of Tokyo",
    "Kyoto University",
    "Osaka University",
    "Tokyo Institute of Technology",
    "Tohoku University",
    "Nagoya University",
    "Kyushu University",
    "Hokkaido University",
    "Waseda University",
    "Keio University",

    // Lithuania
    "Vilnius University",
    "Kaunas University of Technology",
    "Vytautas Magnus University",
    "Vilnius Gediminas Technical University",
    "Lithuanian University of Health Sciences",
    "Mykolas Romeris University",
    "Vilnius University of Applied Sciences",
    "Kaunas University of Applied Sciences",
    "Lithuanian Academy of Music and Theatre",
    "Vilnius Academy of Arts",
    "Lithuanian Sports University",
    "Šiauliai University",
    "Klaipėda University",
    "Aleksandras Stulginskis University",

    // Latvia
    "University of Latvia",
    "Riga Technical University",
    "Latvia University of Life Sciences and Technologies",
    "Riga Stradiņš University",
    "Daugavpils University",
    "Liepāja University",
    "Ventspils University of Applied Sciences",
    "BA School of Business and Finance",
    "Art Academy of Latvia",
    "Jāzeps Vītols Latvian Academy of Music",
    "Latvian Academy of Sport Education",
    "Turība University",
    "RISEBA University of Applied Sciences",

    // Estonia
    "University of Tartu",
    "Tallinn University of Technology",
    "Tallinn University",
    "Estonian University of Life Sciences",
    "Estonian Academy of Arts",
    "Estonian Academy of Music and Theatre",
    "Estonian Maritime Academy",
    "Tallinn Health Care College",
    "Estonian Entrepreneurship University of Applied Sciences",
    "Nord University",

    // Ukraine
    "Taras Shevchenko National University of Kyiv",
    "National Technical University of Ukraine",
    "Lviv Polytechnic National University",
    "Ivan Franko National University of Lviv",
    "V.N. Karazin Kharkiv National University",
    "National University of Kyiv-Mohyla Academy",
    "Kyiv National Economic University",
    "National Aviation University",
    "Odessa National University",
    "Dnipro University of Technology",
    "Sumy State University",
    "Zaporizhzhia National University",
    "Chernivtsi National University",
    "Ternopil National Economic University",
    "Ukrainian Catholic University",
    "Borys Grinchenko Kyiv University",
    "National University of Life and Environmental Sciences of Ukraine",
    "Kharkiv National University of Radio Electronics",
    "National Technical University Kharkiv Polytechnic Institute",
    "Donetsk National University",
    "Poltava University of Economics and Trade",
    "Uzhhorod National University",

    // Poland
    "University of Warsaw",
    "Jagiellonian University",
    "Warsaw University of Technology",
    "AGH University of Science and Technology",
    "University of Wrocław",
    "Adam Mickiewicz University",
    "Gdańsk University of Technology",
    "University of Gdańsk",
    "Nicolaus Copernicus University",
    "Łódź University of Technology",
    "University of Łódź",
    "Silesian University of Technology",
    "University of Silesia",
    "Poznań University of Technology",
    "Wrocław University of Science and Technology",
    "Cracow University of Technology",
    "Medical University of Warsaw",
    "Medical University of Gdańsk",
    "University of Economics in Katowice",
    "Warsaw School of Economics",
    "Kozminski University",
    "SWPS University",
    "Cardinal Stefan Wyszyński University",
    "Catholic University of Lublin",
    "University of Szczecin",
    "West Pomeranian University of Technology",
    "Rzesz��w University of Technology",
    "University of Rzeszów",
    "Maria Curie-Skłodowska University",
    "Lublin University of Technology",
    "Białystok University of Technology",
    "University of Białystok",
    "Opole University",
    "Jan Kochanowski University",
    "Częstochowa University of Technology",
  ];

  // Validation functions
  const validateEmail = (email) => {
    // Basic format check - simplified and more permissive
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    const domain = email.split("@")[1];
    if (!domain) return false;

    // Check for minimum domain structure (must have at least one dot)
    if (!domain.includes(".")) {
      return false;
    }

    // Block only obvious fake patterns
    const fakeDomainPatterns = [
      /test\.test/,
      /fake\.fake/,
      /example\.example/,
      /temp\.temp/,
      /demo\.demo/,
      /sample\.sample/,
    ];

    const lowerEmail = email.toLowerCase();
    for (const pattern of fakeDomainPatterns) {
      if (pattern.test(lowerEmail)) {
        return false;
      }
    }

    return true;
  };

  const validateFullName = (name) => {
    return name.trim().length > 0;
  };

  const validateJobTitle = (title) => {
    const trimmedTitle = title.trim();

    // Check minimum length
    if (trimmedTitle.length < 3) {
      return {
        isValid: false,
        error: "Job title must be at least 3 characters long.",
      };
    }

    // Check format (letters, spaces, hyphens only)
    const formatRegex = /^[a-zA-Z\s\-]+$/;
    if (!formatRegex.test(trimmedTitle)) {
      return {
        isValid: false,
        error: "Job title can only contain letters, spaces, and hyphens.",
      };
    }

    // Check for blacklisted entries
    const lowerTitle = trimmedTitle.toLowerCase();
    if (BLACKLISTED_TITLES.includes(lowerTitle)) {
      return {
        isValid: false,
        error: "Please enter a valid professional job title.",
      };
    }

    // Check minimum word count (2 words) OR minimum character count (3 chars)
    const words = trimmedTitle.split(/\s+/).filter((word) => word.length > 0);
    if (words.length < 2 && trimmedTitle.length < 3) {
      return {
        isValid: false,
        error:
          "Please enter a complete job title (at least 2 words or 3 characters).",
      };
    }

    return { isValid: true, error: null };
  };

  const validateForm = () => {
    const errors = {};

    // Full name validation
    if (!fullName.trim()) {
      errors.fullName = "Full name is required";
    } else if (!validateFullName(fullName)) {
      errors.fullName =
        "Please enter your full name (at least first and last name)";
    }

    // Email validation
    if (!businessEmail.trim()) {
      errors.businessEmail = "Email is required";
    } else if (!validateEmail(businessEmail)) {
      errors.businessEmail = "Please enter a valid email address";
    }

    // Country validation
    if (!country.trim()) {
      errors.country = "Country is required";
    }

    // Company/University validation
    if (!company.trim()) {
      errors.company = isStudent
        ? "University is required"
        : "Company/Institution is required";
    }

    // Job title validation (only for non-students)
    if (!isStudent) {
      if (!jobTitle.trim()) {
        errors.jobTitle = "Job title is required";
      } else {
        const jobTitleValidation = validateJobTitle(jobTitle);
        if (!jobTitleValidation.isValid) {
          errors.jobTitle = jobTitleValidation.error;
        }
      }
    } else if (isStudent && jobTitle.trim().length > 0) {
      // Validate job title if student provided one
      const jobTitleValidation = validateJobTitle(jobTitle);
      if (!jobTitleValidation.isValid) {
        errors.jobTitle = jobTitleValidation.error;
      }
    }

    // Project description validation
    if (!projectDescription.trim()) {
      errors.projectDescription = isStudent
        ? "Please describe your research interest or academic project"
        : "Please describe your initiative, challenge, or collaboration interest";
    }

    // Privacy policy validation
    if (!privacyAccepted) {
      errors.privacyAccepted = "You must accept the privacy policy to continue";
    }

    return errors;
  };

  const isFormValid = () => {
    // Check all required fields (removed reCAPTCHA requirement)
    const hasFullName = fullName.trim() && validateFullName(fullName);
    const hasValidEmail = businessEmail.trim() && validateEmail(businessEmail);
    const hasCountry = country.trim();
    const hasCompany = company.trim();

    // Job title validation: only required for non-students
    const hasJobTitle =
      isStudent || (jobTitle.trim() && validateJobTitle(jobTitle).isValid);

    const hasProjectDescription = projectDescription.trim();
    const hasPrivacyAccepted = privacyAccepted;

    // Debug: log validation status in development
    if (process.env.NODE_ENV === "development") {
      console.log("Form validation status:", {
        hasFullName,
        hasValidEmail,
        hasCountry,
        hasCompany,
        hasJobTitle,
        hasProjectDescription,
        hasPrivacyAccepted,
        isStudent,
      });
    }

    return (
      hasFullName &&
      hasValidEmail &&
      hasCountry &&
      hasCompany &&
      hasJobTitle &&
      hasProjectDescription &&
      hasPrivacyAccepted
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const intensity = Math.min(scrollY * 0.001, 0.5); // Cap at 0.5 for subtle effect
      setScrollIntensity(intensity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleJobTitleSearch = (e) => {
    const value = e.target.value;
    setJobTitle(value);
    setJobTitleSearch(value);
    setShowJobTitleDropdown(value.length > 0);
  };

  const selectJobTitle = (selectedTitle) => {
    setJobTitle(selectedTitle);
    setJobTitleSearch(selectedTitle);
    setShowJobTitleDropdown(false);
  };

  const handleCompanySearch = (e) => {
    const value = e.target.value;
    setCompany(value);
    setCompanySearch(value);
    if (isStudent) {
      setShowUniversityDropdown(value.length > 0);
    }
  };

  const selectUniversity = (selectedUniversity) => {
    setCompany(selectedUniversity);
    setCompanySearch(selectedUniversity);
    setShowUniversityDropdown(false);
  };

  const filteredCountries = COUNTRIES.filter((country) =>
    country.toLowerCase().includes(countrySearch.toLowerCase()),
  );

  const filteredJobTitles = COMMON_JOB_TITLES.filter((title) =>
    title.toLowerCase().includes(jobTitleSearch.toLowerCase()),
  ).slice(0, 8); // Limit to 8 suggestions

  const filteredUniversities = TOP_UNIVERSITIES.filter((university) =>
    university.toLowerCase().includes(companySearch.toLowerCase()),
  ).slice(0, 10); // Limit to 10 suggestions

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
        `File(s) too large: ${invalidFiles.join(", ")}. Maximum size is 20MB per file.`,
      );
      return;
    }

    setAttachedFiles([...attachedFiles, ...validFiles]);
    setError("");
  };

  const removeFile = (indexToRemove) => {
    setAttachedFiles(
      attachedFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Check if form is valid (removed reCAPTCHA requirements)
    if (!isFormValid()) {
      setShowValidationErrors(true);
      if (!privacyAccepted) {
        setError("Please accept the privacy policy to continue.");
      } else {
        setError("Please fill out all required fields to continue.");
      }
      setIsSubmitting(false);
      return;
    }

    setShowValidationErrors(false);

    try {
      // Submit to Netlify Forms
      const formData = new FormData();
      formData.append("form-name", "structural-engagement-intake");
      formData.append("full_name", fullName);
      formData.append("email", businessEmail);
      formData.append("country", country);
      formData.append("phone", phone);
      formData.append("company", company);
      formData.append("job_title", jobTitle);
      formData.append("description", projectDescription);
      formData.append("is_student", isStudent ? "Yes" : "No");

      // Add attached files with proper naming for Netlify
      attachedFiles.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });

      const response = await fetch("/", {
        method: "POST",
        body: formData, // Use FormData directly for file uploads
      });

      if (response.ok) {
        setIsSubmitted(true);
        resetForm();
        alert("Form submitted successfully!"); // Basic success notification
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      setError(
        "Failed to send message. Please try again or contact us directly.",
      );
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
    setPrivacyAccepted(false);
    setIsStudent(false);
    setJobTitleSearch("");
    setShowJobTitleDropdown(false);
    setCompanySearch("");
    setShowUniversityDropdown(false);
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
        background: "radial-gradient(circle, #0a1418 0%, #0d1f1a 100%)",
      }}
    >
      {/* STAKEHOLDERS SECTION */}
      <section className="pt-20 pb-32" aria-labelledby="stakeholders-heading">
        <div className="mx-auto px-16" style={{ maxWidth: "1280px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-8">
            {/* StakeholderHeroBlock - Left Side */}
            <div
              className="flex flex-col"
              style={{
                flexBasis: "48%",
                minWidth: "320px",
                gap: "36px",
                height: "fit-content",
              }}
            >
              {/* Main Headline */}
              <h2
                className="font-semibold leading-tight"
                style={{
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: "clamp(2.4rem, 3.4vw, 3rem)",
                  color: "#E5F3ED",
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
                  lineHeight: "1.6",
                }}
              >
                Systemic risk is a function of structure, not individual intent.
                <br />
                Exposure arises from the way legal, procedural, and contractual
                forms encode discretion, sequence overrides, and fragment
                recognition.
                <br />
                Failure is not an absence of rules, but their
                orchestration–where legal form enables extraction under the
                pretense of oversight.
                <br />
                <br />
                Oversight that does not model system logic operates in hindsight
                by definition. Only the simulation of structural sequence,
                override pathways, and context-dependent interpretation can
                render systemic risk computable at the point of design.
                Structural exposure is a product of system architecture, not
                personal conduct.
                <br />
                <br />
                What you explored above is an early, condensed
                demonstration–structurally isolated from the underlying Vigilum
                system. The interface is intended for preliminary engagement and
                does not reflect the scope or complexity of the operational
                platform in development. Collaboration is open to institutions,
                researchers, and practitioners positioned to contribute to this
                work. All engagements are strictly confidential and directed
                toward the joint development of public-interest oversight
                infrastructure.
              </p>

              {/* 4. Founder Quote */}
              <div className="space-y-2">
                <p
                  className="italic leading-relaxed"
                  style={{
                    fontFamily: "IBM Plex Sans, sans-serif",
                    fontSize: "16px",
                    color: "#EAF8E2",
                    lineHeight: "1.6",
                  }}
                >
                  "When meaning fragments, truth becomes private property–an
                  arena for competing realities. Oversight and justice only work
                  if everyone sees the same facts, at the same time, without
                  distortion."
                </p>
                <p
                  className="font-medium"
                  style={{
                    fontFamily: "IBM Plex Sans, sans-serif",
                    fontSize: "14px",
                    color: "#EAF8E2",
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
                  backgroundColor: "#1B3C2D",
                }}
              />

              {/* 6. Pillar Duo */}
              <div className="space-y-8">
                {/* MAPPING */}
                <div className="flex items-start" style={{ gap: "16px" }}>
                  <svg
                    className="flex-shrink-0 mt-1"
                    style={{
                      width: "48px",
                      height: "48px",
                    }}
                    viewBox="0 0 32 32"
                    fill="none"
                    aria-label="MAPPING icon"
                  >
                    {/* Grid lines */}
                    <g stroke="#7BFF9C" strokeWidth="1" opacity="0.6">
                      <line x1="8" y1="0" x2="8" y2="32" />
                      <line x1="16" y1="0" x2="16" y2="32" />
                      <line x1="24" y1="0" x2="24" y2="32" />
                      <line x1="0" y1="8" x2="32" y2="8" />
                      <line x1="0" y1="16" x2="32" y2="16" />
                      <line x1="0" y1="24" x2="32" y2="24" />
                    </g>
                    {/* Highlighted path */}
                    <path
                      d="M4 4 L12 4 L12 12 L20 12 L20 20 L28 20 L28 28"
                      stroke="#7BFF9C"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Path nodes */}
                    <circle cx="4" cy="4" r="2" fill="#7BFF9C" />
                    <circle cx="12" cy="4" r="2" fill="#7BFF9C" />
                    <circle cx="12" cy="12" r="2" fill="#7BFF9C" />
                    <circle cx="20" cy="12" r="2" fill="#7BFF9C" />
                    <circle cx="20" cy="20" r="2" fill="#7BFF9C" />
                    <circle cx="28" cy="20" r="2" fill="#7BFF9C" />
                    <circle cx="28" cy="28" r="2" fill="#7BFF9C" />
                  </svg>
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{
                        fontFamily: "IBM Plex Sans, sans-serif",
                        fontSize: "18px",
                        color: "#EAF8E2",
                      }}
                    >
                      MAPPING
                    </h3>
                    <p
                      style={{
                        fontFamily: "IBM Plex Sans, sans-serif",
                        fontSize: "14px",
                        color: "#EAF8E2",
                        lineHeight: "1.5",
                      }}
                    >
                      Map the latent geometry of structural risk–how
                      permissions, obligations, and constraints intersect across
                      legal, procedural, and operational planes.
                    </p>
                  </div>
                </div>

                {/* SIMULATION */}
                <div className="flex items-start" style={{ gap: "16px" }}>
                  <svg
                    className="flex-shrink-0 mt-1"
                    style={{
                      width: "48px",
                      height: "48px",
                    }}
                    viewBox="0 0 32 32"
                    fill="none"
                    aria-label="SIMULATION icon"
                  >
                    {/* Horizontal arrow (left to right) */}
                    <g stroke="#7BFF9C" strokeWidth="2" fill="#7BFF9C">
                      <line x1="4" y1="16" x2="28" y2="16" />
                      <polygon points="24,12 28,16 24,20" />
                    </g>

                    {/* Vertical arrow (top to bottom) */}
                    <g stroke="#7BFF9C" strokeWidth="2" fill="#7BFF9C">
                      <line x1="16" y1="4" x2="16" y2="28" />
                      <polygon points="12,24 16,28 20,24" />
                    </g>

                    {/* Diagonal arrow (bottom-left to top-right) */}
                    <g stroke="#7BFF9C" strokeWidth="2" fill="#7BFF9C">
                      <line x1="6" y1="26" x2="26" y2="6" />
                      <polygon points="22,4 26,6 24,10" />
                    </g>

                    {/* Central intersection circle */}
                    <circle
                      cx="16"
                      cy="16"
                      r="3"
                      fill="#7BFF9C"
                      stroke="#7BFF9C"
                      strokeWidth="1"
                    />
                  </svg>
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{
                        fontFamily: "IBM Plex Sans, sans-serif",
                        fontSize: "18px",
                        color: "#EAF8E2",
                      }}
                    >
                      SIMULATION
                    </h3>
                    <p
                      style={{
                        fontFamily: "IBM Plex Sans, sans-serif",
                        fontSize: "14px",
                        color: "#EAF8E2",
                        lineHeight: "1.5",
                      }}
                    >
                      Project how risk amplifies or attenuates as a function of
                      sequence, adjacency, and environmental resonance.
                    </p>
                  </div>
                </div>

                {/* RECOGNITION */}
                <div className="flex items-start" style={{ gap: "16px" }}>
                  <svg
                    className="flex-shrink-0 mt-1"
                    style={{
                      width: "48px",
                      height: "48px",
                    }}
                    viewBox="0 0 32 32"
                    fill="none"
                    aria-label="RECOGNITION icon"
                  >
                    {/* Eye shape - upper half */}
                    <path
                      d="M4 16 C8 8, 24 8, 28 16"
                      stroke="#7BFF9C"
                      strokeWidth="2"
                      fill="none"
                    />
                    {/* Eye shape - lower half */}
                    <path
                      d="M4 16 C8 24, 24 24, 28 16"
                      stroke="#7BFF9C"
                      strokeWidth="2"
                      fill="none"
                    />
                    {/* Iris */}
                    <circle
                      cx="16"
                      cy="16"
                      r="6"
                      stroke="#7BFF9C"
                      strokeWidth="2"
                      fill="none"
                    />
                    {/* Pupil */}
                    <circle cx="16" cy="16" r="3" fill="#7BFF9C" />
                    {/* Cut line through the eye */}
                    <line
                      x1="6"
                      y1="10"
                      x2="26"
                      y2="22"
                      stroke="#7BFF9C"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* Cut separation effect */}
                    <line
                      x1="5"
                      y1="9"
                      x2="25"
                      y2="21"
                      stroke="#1B3C2D"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{
                        fontFamily: "IBM Plex Sans, sans-serif",
                        fontSize: "18px",
                        color: "#EAF8E2",
                      }}
                    >
                      RECOGNITION
                    </h3>
                    <p
                      style={{
                        fontFamily: "IBM Plex Sans, sans-serif",
                        fontSize: "14px",
                        color: "#EAF8E2",
                        lineHeight: "1.5",
                      }}
                    >
                      Diagnose the thresholds where institutional contradiction
                      is neutralized—where facts lose the capacity to generate
                      escalation, and meaning exits the system.
                    </p>
                  </div>
                </div>
              </div>
            </div>

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
                    Stakeholder inquiry sent successfully! We'll get back to you
                    soon.
                  </span>
                </motion.div>
              )}

              {/* Contact Form */}
              <div
                className="rounded-lg"
                style={{
                  background: "rgba(16, 32, 28, 0.95)",
                  border: "1px solid rgba(0,255,204,0.15)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Briefcase className="w-6 h-6 text-green-400" />
                    <h3 className="text-2xl font-bold text-white font-display">
                      Structural Engagement Intake
                    </h3>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-red-300 font-mono text-sm">
                        {error}
                      </span>
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    method="POST"
                    name="structural-engagement-intake"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    encType="multipart/form-data"
                  >
                    {/* Netlify Forms identification */}
                    <input
                      type="hidden"
                      name="form-name"
                      value="structural-engagement-intake"
                    />
                    <input
                      type="hidden"
                      name="bot-field"
                      style={{ display: "none" }}
                    />

                    {/* Personal Information - Single Column */}
                    <div>
                      <label className="block text-sm font-medium text-green-400 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="full_name"
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
                        name="email"
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
                        name="country"
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
                            filteredCountries.map((countryName, index) => (
                              <div
                                key={`country-${index}-${countryName}`}
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
                          {phonePlaceholder}
                        </div>
                        {/* Phone Input */}
                        <input
                          type="tel"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="flex-1 p-3 bg-gray-800 border border-gray-600 border-l-0 rounded-r-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-green-400">
                          {isStudent ? "University *" : "Company/Institution *"}
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="student-check"
                            checked={isStudent}
                            onChange={(e) => {
                              setIsStudent(e.target.checked);
                              setCompany("");
                              setCompanySearch("");
                              setShowUniversityDropdown(false);
                            }}
                            className="w-4 h-4 appearance-none bg-gray-800 border border-gray-600 rounded cursor-pointer focus:ring-green-500 focus:ring-2 checked:bg-gray-800 checked:border-gray-600 relative"
                            style={{
                              backgroundImage: isStudent
                                ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e")`
                                : "none",
                              backgroundSize: "100% 100%",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                          <label
                            htmlFor="student-check"
                            className="text-sm text-gray-300"
                          >
                            Student
                          </label>
                        </div>
                      </div>
                      <input
                        type="text"
                        name="company"
                        value={company}
                        onChange={handleCompanySearch}
                        onFocus={() =>
                          isStudent &&
                          company.length > 0 &&
                          setShowUniversityDropdown(true)
                        }
                        placeholder=""
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                        required
                      />

                      {/* University Dropdown - Only show when student is checked */}
                      {isStudent &&
                        showUniversityDropdown &&
                        filteredUniversities.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                            {filteredUniversities.map((university, index) => (
                              <div
                                key={`university-${index}-${university}`}
                                onClick={() => selectUniversity(university)}
                                className="px-3 py-2 text-white hover:bg-green-600 cursor-pointer transition-colors"
                              >
                                {university}
                              </div>
                            ))}
                          </div>
                        )}

                      {/* Close dropdown when clicking outside */}
                      {isStudent && showUniversityDropdown && (
                        <div
                          className="fixed inset-0 z-0"
                          onClick={() => setShowUniversityDropdown(false)}
                        />
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-green-400 mb-2">
                        Job Title {isStudent ? "(Optional)" : "*"}
                      </label>
                      <input
                        type="text"
                        name="job_title"
                        value={jobTitle}
                        onChange={handleJobTitleSearch}
                        onFocus={() =>
                          setShowJobTitleDropdown(jobTitle.length > 0)
                        }
                        placeholder=""
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                        required={!isStudent}
                      />

                      {/* Job Title Dropdown */}
                      {showJobTitleDropdown && filteredJobTitles.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {filteredJobTitles.map((title, index) => (
                            <div
                              key={`job-title-${index}-${title}`}
                              onClick={() => selectJobTitle(title)}
                              className="px-3 py-2 text-white hover:bg-green-600 cursor-pointer transition-colors"
                            >
                              {title}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Close dropdown when clicking outside */}
                      {showJobTitleDropdown && (
                        <div
                          className="fixed inset-0 z-0"
                          onClick={() => setShowJobTitleDropdown(false)}
                        />
                      )}
                    </div>

                    {/* Project Description */}
                    <div>
                      <label className="block text-sm font-medium text-green-400 mb-2">
                        {isStudent
                          ? "Describe Your Research Interest or Academic Project *"
                          : "Describe Your Initiative, Challenge, or Collaboration Interest *"}
                      </label>
                      <div className="relative">
                        <textarea
                          name="description"
                          value={projectDescription}
                          onChange={(e) => {
                            if (e.target.value.length <= 4000) {
                              setProjectDescription(e.target.value);
                            }
                          }}
                          placeholder={
                            isStudent
                              ? "Share your thesis topic, core methodology, and any governance benchmarks you wish to test or refine..."
                              : "Briefly profile your organization, the oversight challenge at hand, and the kind of expertise or toolset you hope to access..."
                          }
                          rows={6}
                          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white resize-none focus:border-green-500 focus:outline-none transition-colors"
                          required
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                          {projectDescription.length}/4000
                        </div>
                      </div>
                      <div className="text-gray-400 text-xs leading-relaxed mt-2">
                        Vigilum is in advanced development. Inquiries are
                        reviewed for research and pilot collaboration. Direct
                        product demonstrations are not available.
                      </div>
                    </div>

                    {/* Submit Button - Left aligned above privacy */}
                    <div
                      className="flex justify-start mb-6"
                      style={{ marginTop: "24px" }}
                    >
                      <div className="relative group">
                        <Button
                          type="submit"
                          disabled={isSubmitting || !isFormValid()}
                          className="px-12 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ textTransform: "none" }}
                        >
                          {isSubmitting ? "Sending..." : "Submit"}
                        </Button>

                        {/* Tooltip for disabled button */}
                        {!isFormValid() && !isSubmitting && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                            Please fill out all required fields to continue
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Verification and Privacy */}
                    <div className="space-y-4">
                      {/* Privacy Policy - Enterprise Grade */}
                      <div className="space-y-4">
                        <div
                          className={`flex items-center space-x-4 py-2 px-2 rounded-lg transition-colors ${showValidationErrors && !privacyAccepted ? "bg-red-900/20 border border-red-500/50" : ""}`}
                        >
                          <input
                            type="checkbox"
                            id="privacy-check"
                            checked={privacyAccepted}
                            onChange={(e) =>
                              setPrivacyAccepted(e.target.checked)
                            }
                            className="w-4 h-4 appearance-none bg-gray-800 border border-gray-600 rounded cursor-pointer focus:ring-green-500 focus:ring-2 checked:bg-gray-800 checked:border-gray-600 relative flex-shrink-0"
                            style={{
                              backgroundImage: privacyAccepted
                                ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e")`
                                : "none",
                              backgroundSize: "100% 100%",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                            required
                          />
                          <label
                            htmlFor="privacy-check"
                            className="text-gray-300 leading-relaxed"
                            style={{ fontSize: "12px" }}
                          >
                            Please see our{" "}
                            <button
                              type="button"
                              onClick={() => setShowPrivacyModal(true)}
                              className="text-green-400 hover:text-green-300 transition-colors"
                              style={{
                                fontSize: "inherit",
                                fontWeight: "normal",
                                textTransform: "none",
                              }}
                            >
                              Privacy Policy
                            </button>{" "}
                            regarding how we will handle this information.
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>

                  {/* Hidden static form for Netlify Forms detection */}
                  <form
                    name="structural-engagement-intake"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    encType="multipart/form-data"
                    style={{ display: "none" }}
                  >
                    <input
                      type="hidden"
                      name="form-name"
                      value="structural-engagement-intake"
                    />
                    <input type="hidden" name="bot-field" />
                    <input type="text" name="full_name" />
                    <input type="email" name="email" />
                    <input type="text" name="country" />
                    <input type="tel" name="phone" />
                    <input type="text" name="company" />
                    <input type="text" name="job_title" />
                    <textarea name="description"></textarea>
                    <input type="text" name="is_student" />
                    <input type="file" name="file_0" />
                    <input type="file" name="file_1" />
                    <input type="file" name="file_2" />
                  </form>
                </div>
              </div>
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
                <h3 className="text-xl font-bold text-white">
                  Vigilum Privacy Policy Statement for Structural Engagement
                  Intake
                </h3>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="text-gray-300 space-y-6 text-sm leading-relaxed">
                <section>
                  <p>
                    <strong>Effective Date:</strong> July 24, 2025
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    1. Introduction
                  </h4>
                  <p>
                    This Privacy Policy ("Policy") explains how Vigilum U
                    ("Vigilum," "we," "us," or "our") collects, uses, discloses,
                    and protects the personal data you provide when submitting
                    the Structural Engagement Intake form on our website. We are
                    committed to transparency, data minimization, and compliance
                    with applicable international data protection laws,
                    including the EU General Data Protection Regulation (GDPR)
                    and other jurisdictional requirements.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    2. Definitions
                  </h4>
                  <p>
                    For clarity, the following terms have the meanings set out
                    below:
                  </p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>
                      <strong>Personal Data:</strong> Any information relating
                      to an identified or identifiable natural person.
                    </li>
                    <li>
                      <strong>Processing:</strong> Any operation performed on
                      Personal Data (e.g., collection, storage, retrieval, use,
                      disclosure, erasure).
                    </li>
                    <li>
                      <strong>Data Controller:</strong> The entity that
                      determines the purposes and means of Processing.
                    </li>
                    <li>
                      <strong>Data Processor:</strong> A third-party that
                      Processes Personal Data on our behalf.
                    </li>
                    <li>
                      <strong>Data Subject:</strong> An individual whose
                      Personal Data is Processed.
                    </li>
                    <li>
                      <strong>Consent:</strong> A freely given, specific,
                      informed, and unambiguous indication of Data Subject's
                      wishes by which they signify agreement to the Processing
                      of their Personal Data.
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    3. Data Controller & Contact Details
                  </h4>
                  <p>
                    Vigilum UAB
                    <br />
                    Address: ___________________________
                    <br />
                    Email: ___________________________
                    <br />
                    Data Protection Officer (DPO): ___________________________
                    <br />
                    DPO Email: ___________________________
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    4. Categories of Personal Data Collected
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p>
                        <strong>4.1. Directly from You:</strong>
                      </p>
                      <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                        <li>Identifiers (Full Name, Business Email)</li>
                        <li>
                          Professional Information (Company/Institution, Job
                          Title)
                        </li>
                        <li>
                          Contact Details (Country, Phone number—optional)
                        </li>
                        <li>
                          Initiative Details (Description of initiative,
                          challenge, or collaboration interest)
                        </li>
                        <li>Consent Records (checkbox confirmation)</li>
                      </ul>
                    </div>
                    <div>
                      <p>
                        <strong>
                          4.2. Automatically (via cookies and analytics):
                        </strong>
                      </p>
                      <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                        <li>
                          Usage Data (IP address, browser type, pages visited,
                          timestamps)
                        </li>
                        <li>Cookie Identifiers</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    5. Purposes of Processing & Lawful Bases
                  </h4>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left py-2 text-green-400">
                            Purpose
                          </th>
                          <th className="text-left py-2 text-green-400">
                            Lawful Basis (GDPR Art. 6)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="space-y-1">
                        <tr className="border-b border-gray-700">
                          <td className="py-2">Partnership evaluation</td>
                          <td className="py-2">
                            Performance of a contract (Art. 6(1)(b))
                          </td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="py-2">
                            Product research & pilot collaboration
                          </td>
                          <td className="py-2">
                            Legitimate interests (Art. 6(1)(f))
                          </td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="py-2">
                            Compliance analytics & regulatory reporting
                          </td>
                          <td className="py-2">
                            Legal obligation (Art. 6(1)(c))
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2">Operational communication</td>
                          <td className="py-2">
                            Performance of a contract (Art. 6(1)(b))
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-2 text-xs">
                    We ensure that our legitimate-interests assessment balances
                    our needs with your rights.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    6. Data Retention
                  </h4>
                  <p>
                    We retain Personal Data only as long as necessary to fulfill
                    the purposes above, plus any additional period required by
                    law. Retention periods are determined as follows:
                  </p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>
                      <strong>Inquiry records:</strong> 24 months after inquiry
                      closure
                    </li>
                    <li>
                      <strong>Analytics data:</strong> 12 months
                    </li>
                    <li>
                      <strong>Legal compliance logs:</strong> 5 years (or as
                      mandated by applicable law)
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    7. Data Sharing & Recipients
                  </h4>
                  <p>Your Personal Data may be disclosed to:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>
                      Vigilum-affiliated researchers and engineers for analysis
                    </li>
                    <li>
                      Third-party Processors (hosting, security, analytics)
                      under Data Processing Agreements
                    </li>
                    <li>Regulatory authorities when required by law</li>
                  </ul>
                  <p className="mt-2">
                    We require all Processors to implement GDPR-equivalent
                    safeguards (Standard Contractual Clauses or Binding
                    Corporate Rules for international transfers).
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    8. International Transfers
                  </h4>
                  <p>
                    If we transfer data outside the European Economic Area
                    (EEA), we do so under EU-approved mechanisms (Standard
                    Contractual Clauses, adequacy decisions, or Binding
                    Corporate Rules).
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    9. Your Rights
                  </h4>
                  <p>Under the GDPR, you have the right to:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Access and receive a copy of your Personal Data</li>
                    <li>Rectify inaccurate or incomplete data</li>
                    <li>
                      Erase data ("right to be forgotten") under certain
                      conditions
                    </li>
                    <li>
                      Restrict or object to Processing on grounds relating to
                      your situation
                    </li>
                    <li>
                      Data portability where Processing is based on consent or
                      contract
                    </li>
                    <li>
                      Withdraw consent at any time (without affecting prior
                      lawful Processing)
                    </li>
                  </ul>
                  <p className="mt-2">
                    To exercise these rights, contact our DPO at
                    ___________________________. We respond within one month of
                    request receipt.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    10. Consent Mechanism
                  </h4>
                  <p>
                    The Structural Engagement Intake form includes an
                    unchecked-by-default checkbox that links to this Policy.
                    Checking the box constitutes valid GDPR consent. You may
                    withdraw consent at any time by contacting our DPO.
                    Withdrawal does not affect the lawfulness of Processing
                    prior to withdrawal.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    11. Cookies & Tracking
                  </h4>
                  <p>
                    We use cookies and similar tracking technologies to operate
                    and improve our website. Upon your first visit, you will be
                    presented with a cookie consent banner offering granular
                    choices. For details, refer to our Cookie Policy.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    12. Security Measures
                  </h4>
                  <p>
                    We implement appropriate technical and organizational
                    measures, including encryption (AES-256 in transit and at
                    rest), access controls (least-privilege), regular audits,
                    employee training, and incident response procedures to
                    safeguard your data.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    13. Changes to This Policy
                  </h4>
                  <p>
                    We may update this Policy due to legal or operational
                    changes. The "Effective Date" will be updated accordingly.
                    Material changes will be communicated via email to prior
                    inquirers or via a notice on our website.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    14. Contact Us
                  </h4>
                  <p>
                    For questions, complaints, or to exercise your rights,
                    contact:
                  </p>
                  <div className="bg-gray-800 p-4 rounded-lg mt-2">
                    <p>
                      <strong>Data Protection Officer</strong>
                    </p>
                    <p>Email: ___________________________</p>
                    <p>Phone: +370 _____________________</p>
                  </div>
                  <p className="mt-4 text-green-400 font-medium">
                    Your privacy is important to us. Thank you for entrusting
                    Vigilum with your information.
                  </p>
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
