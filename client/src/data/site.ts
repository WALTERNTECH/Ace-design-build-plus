/** Single source of truth for site content. Editing copy means editing here,
 *  not hunting through JSX. */

export const COMPANY = {
  name: "ACE",
  legal: "ACE — Adaptive City Ecosystems Ltd",
  tagline: "Adaptive City Ecosystems",
  phone: "+254 726 314 608",
  phoneHref: "tel:+254726314608",
  email: "acedesignbuildplus@gmail.com",
  address: "Tebere Crescent Road",
  city: "Nairobi, Kenya",
  hours: "Monday – Friday, 8:00 – 17:30 EAT",
  founded: 2020,
} as const;

export type ProjectCategory = "residential" | "commercial" | "interior";

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  categoryLabel: string;
  image: string;
  status: "progress" | "delivered";
  statusLabel: string;
  flagship?: boolean;
  summary: string;
  facts: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    slug: "emerald-heights",
    name: "Emerald Heights",
    category: "residential",
    categoryLabel: "Luxury Residential · Karen, Nairobi",
    image: "/img/proj-1.jpg",
    status: "progress",
    statusLabel: "In Progress",
    flagship: true,
    summary:
      "A 24-unit luxury residence with rooftop gardens, an infinity pool, smart-home integration and premium interior fit-out throughout. Architecture, structural engineering and interiors were all delivered in-house. The interior finishing phase is now underway.",
    facts: [
      { label: "units", value: "24" },
      { label: "location", value: "Karen" },
      { label: "handover", value: "Q4 2026" },
      { label: "delivery", value: "Full ACE" },
    ],
  },
  {
    slug: "sora-business-complex",
    name: "Sora Business Complex",
    category: "commercial",
    categoryLabel: "Commercial · Westlands, Nairobi",
    image: "/img/proj-2.jpg",
    status: "progress",
    statusLabel: "In Progress",
    summary:
      "42,000 sq ft of Grade-A commercial space with a glass curtain-wall facade, lobby atrium, basement parking and rooftop conferencing suite. Facade 100% installed; interior fit-outs underway.",
    facts: [
      { label: "area", value: "42,000 sq ft" },
      { label: "handover", value: "Aug 2026" },
    ],
  },
  {
    slug: "xyz-apartments",
    name: "XYZ Apartments",
    category: "residential",
    categoryLabel: "Urban Residential · Kilimani",
    image: "/img/proj-3.jpg",
    status: "progress",
    statusLabel: "In Progress",
    summary:
      "An 18-storey residential tower with rooftop decks installed, and balcony glazing plus external plaster works in their final stages. 80% of units pre-sold off-plan.",
    facts: [
      { label: "floors", value: "18" },
      { label: "pre-sold", value: "80%" },
    ],
  },
  {
    slug: "westlands-commercial",
    name: "Westlands Commercial",
    category: "commercial",
    categoryLabel: "Commercial · Westlands",
    image: "/img/proj-4.jpg",
    status: "progress",
    statusLabel: "In Progress",
    summary:
      "Foundation and reinforced concrete framing 100% complete. MEP rough-ins are underway, followed by facade cladding installation.",
    facts: [
      { label: "structure", value: "Complete" },
      { label: "delivery", value: "2026" },
    ],
  },
  {
    slug: "karen-private-villa",
    name: "Karen Private Villa",
    category: "residential",
    categoryLabel: "Private Residential · Karen",
    image: "/img/proj-5.jpg",
    status: "delivered",
    statusLabel: "Delivered",
    summary:
      "A five-bedroom private villa handed over two weeks ahead of programme — on time, on budget, with no compromise on finish quality.",
    facts: [
      { label: "bedrooms", value: "5" },
      { label: "handed over", value: "Mar 2026" },
    ],
  },
  {
    slug: "south-b-hq-fitout",
    name: "Corporate HQ Fit-Out",
    category: "interior",
    categoryLabel: "Commercial Interior · South B",
    image: "/img/proj-6.jpg",
    status: "delivered",
    statusLabel: "Delivered",
    summary:
      "6,000 sq ft of open-plan corporate office with integrated acoustic ceilings, custom millwork, a full AV-enabled boardroom and premium reception.",
    facts: [
      { label: "area", value: "6,000 sq ft" },
      { label: "handed over", value: "Oct 2025" },
    ],
  },
  {
    slug: "parklands-office-block",
    name: "Parklands Office Block",
    category: "commercial",
    categoryLabel: "Commercial · Parklands, Nairobi",
    image: "/img/proj-7.jpg",
    status: "delivered",
    statusLabel: "Delivered",
    summary:
      "ACE's first Grade-A commercial office block — 12,000 sq ft of premium space that established our reputation in Nairobi's commercial market.",
    facts: [
      { label: "area", value: "12,000 sq ft" },
      { label: "handed over", value: "2021" },
    ],
  },
];

export interface Discipline {
  n: string;
  icon: string;
  title: string;
  blurb: string;
  points: string[];
  anchor: string;
}

export const DISCIPLINES: Discipline[] = [
  {
    n: "01",
    icon: "architecture",
    anchor: "architecture",
    title: "Architectural Design",
    blurb:
      "Concept through to authority-approved drawings, stamped by AAK-registered architects and coordinated against structure before it leaves the office.",
    points: [
      "Concept development and site planning",
      "BIM and Revit modelling",
      "Planning approvals and statutory submissions",
      "3D visualisation and construction documentation",
    ],
  },
  {
    n: "02",
    icon: "structural",
    anchor: "structural",
    title: "Structural Engineering",
    blurb:
      "Reinforced concrete and steel systems designed for safety and buildability, with calculations certified by IEK-affiliated engineers.",
    points: [
      "Foundation and substructure design",
      "Reinforced concrete and steel structures",
      "Seismic analysis and structural assessment",
      "Certified engineering reports",
    ],
  },
  {
    n: "03",
    icon: "construction",
    anchor: "construction",
    title: "Construction Management",
    blurb:
      "NCA Category 4 registered to self-perform large-scale building works, run by a PMP®-certified manager under ACMK codes of practice.",
    points: [
      "Site supervision and programme management",
      "Procurement and subcontractor coordination",
      "Transparent cost reporting and valuations",
      "Quality assurance and site safety",
    ],
  },
  {
    n: "04",
    icon: "interior",
    anchor: "fitout",
    title: "Interior Fit-Out",
    blurb:
      "Corporate and residential interiors delivered to a written specification rather than a mood board — held by the firm that built the shell.",
    points: [
      "Office and corporate fit-outs",
      "Custom millwork and acoustic ceilings",
      "Lighting design and furniture planning",
      "Premium finishing works and handover",
    ],
  },
  {
    n: "05",
    icon: "diaspora",
    anchor: "diaspora",
    title: "Diaspora Real Estate",
    blurb:
      "Build in Nairobi from abroad. Documented progress, drawdowns released against verified work, and one named contact throughout.",
    points: [
      "Monthly photographic and written progress reports",
      "Drawdowns released against verified completed work",
      "Land acquisition and due-diligence support",
      "A single named point of contact",
    ],
  },
  {
    n: "06",
    icon: "industrial",
    anchor: "masterplanning",
    title: "Industrial Masterplanning",
    blurb:
      "Plant and processing facilities planned around throughput, logistics and secure value chains — with the civils to build them.",
    points: [
      "Functional zoning and site logistics",
      "Production core and systems integration",
      "Phased technical expansion",
      "Site preparation, foundations and commissioning",
    ],
  },
];

export const CREDENTIALS = [
  {
    acronym: "NCA",
    state: "Category 4",
    name: "National Construction Authority",
    desc: "The mandatory state regulator. Category 4 authorises ACE to self-perform large-scale building works across Kenya, and is verifiable on the Authority's public contractor register.",
  },
  {
    acronym: "AAK",
    state: "Registered",
    name: "Architectural Association of Kenya",
    desc: "Every ACE architect holds current AAK registration — required by law to sign and stamp architectural drawings for regulatory submission.",
  },
  {
    acronym: "IEK",
    state: "Affiliated",
    name: "Institution of Engineers of Kenya",
    desc: "Structural, civil and MEP engineers on the ACE team are IEK-affiliated, meeting the national professional engineering standard.",
  },
  {
    acronym: "ACMK",
    state: "Member",
    name: "Association of Construction Managers of Kenya",
    desc: "Project management operates under ACMK's professional code — nationally recognised standards for reporting discipline and client obligation.",
  },
  {
    acronym: "KABCEC",
    state: "Member",
    name: "Kenya Association of Building & Civil Engineering Contractors",
    desc: "Membership places ACE under negotiated Collective Bargaining Agreements and standard Conditions of Contract for building works.",
  },
  {
    acronym: "BORAQS",
    state: "Registered",
    name: "Board of Registration of Architects & Quantity Surveyors",
    desc: "Our quantity surveyors are BORAQS-registered, so bills of quantities and valuations carry professional standing.",
  },
];

export const NAV = [
  { to: "/", label: "Home", n: "01" },
  { to: "/about", label: "About", n: "02" },
  { to: "/services", label: "Services", n: "03" },
  { to: "/work", label: "Projects", n: "04" },
  { to: "/estimator", label: "Estimator", n: "05" },
  { to: "/journal", label: "Journal", n: "06" },
  { to: "/contact", label: "Contact", n: "07" },
];
