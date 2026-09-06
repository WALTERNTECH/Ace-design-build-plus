import { useMemo, useState } from "react";
import { Cta, Credentials, Head, PageHead, ProjectCard } from "../components/Blocks";
import { Reveal } from "../components/Layout";
import { IconCheck } from "../components/Icon";
import { PROJECTS, type ProjectCategory } from "../data/site";

type Filter = "all" | ProjectCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "interior", label: "Interiors" },
];

const DIVISIONS = [
  {
    code: "AR",
    div: "Architecture Division",
    title: "Licensed Architects",
    quals: [
      "Registered with the Architectural Association of Kenya (AAK)",
      "Licensed to sign and stamp drawings for regulatory submission",
      "BSc / M.Arch qualified, CPD compliant",
    ],
    note: "Leads every project from concept design through statutory approvals to construction documentation.",
    tags: ["AAK Registered", "Statutory Drawings"],
  },
  {
    code: "SE",
    div: "Structural & Civil",
    title: "Structural Engineers",
    quals: [
      "Affiliated with the Institution of Engineers of Kenya (IEK)",
      "Licensed to certify structural calculations and designs",
      "BSc Civil / Structural Engineering, CPD compliant",
    ],
    note: "Brought in-house so every frame, slab and foundation is engineered and certified under one roof.",
    tags: ["IEK Affiliated", "Structural Cert."],
  },
  {
    code: "QS",
    div: "Cost & Quantity Surveying",
    title: "Quantity Surveyors",
    quals: [
      "Registered with BORAQS",
      "Bills of quantities, cost plans and valuations",
      "BSc Quantity Surveying, CPD compliant",
    ],
    note: "Independently verified cost plans from pre-contract through to final account.",
    tags: ["BORAQS", "Cost Planning"],
  },
  {
    code: "ME",
    div: "MEP Engineering",
    title: "Electrical & Mechanical",
    quals: [
      "Affiliated with the Institution of Engineers of Kenya (IEK)",
      "Licensed electrical installation supervisors",
      "HVAC, plumbing, fire protection and building automation",
    ],
    note: "Designs, coordinates and commissions all MEP systems in-house — from smart-home integration to full BMS.",
    tags: ["IEK Affiliated", "MEP Design"],
  },
  {
    code: "TP",
    div: "Urban & Physical Planning",
    title: "Town & Urban Planners",
    quals: [
      "Registered with the Kenya Institute of Planners (KIP)",
      "Zoning, change of use and development applications",
      "Masterplanning for industrial and mixed-use sites",
    ],
    note: "Handles the planning approvals and functional zoning that decide what a site can actually carry.",
    tags: ["KIP Registered", "Masterplanning"],
  },
  {
    code: "PM",
    div: "Project Management",
    title: "Construction Managers",
    quals: [
      "Members of the Association of Construction Managers of Kenya",
      "NCA licensed for project management operations",
      "PMP® certified, BSc Construction Management / Civil",
    ],
    note: "Every project runs under a PMP®-certified manager working to ACMK's code of professional conduct.",
    tags: ["PMP® Certified", "ACMK Member"],
  },
];

const TIMELINE = [
  {
    year: "2020",
    tag: "Founding",
    title: "ACE — Adaptive City Ecosystems established, Nairobi",
    body: "Founded by four architects with a shared conviction: eliminate the costly fragmentation between architecture, engineering and construction. ACE was built to deliver all three under one accountable team from day one.",
  },
  {
    year: "2021",
    tag: "First Commercial",
    title: "First Grade-A commercial delivery — Parklands Office Block",
    body: "12,000 sq ft of premium office space delivered on time and on budget. The project established our commercial reputation across Nairobi and brought in a new tier of developer clients.",
  },
  {
    year: "2022",
    tag: "Interior Division",
    title: "25 projects, and the Interior Fit-Out Division launched",
    body: "Reaching 25 completed projects, ACE formally launched its Interior Fit-Out Division — enabling true end-to-end delivery from architectural concept through to a fully furnished, handed-over space.",
  },
  {
    year: "2023",
    tag: "Recognition",
    title: "Best Residential Project — Architecture Awards Kenya",
    body: "Our first major industry award, for Karen Ridge Villas — recognised for design excellence, sustainability integration and quality of finish.",
  },
  {
    year: "2024",
    tag: "Diaspora Programme",
    title: "Diaspora Real Estate Programme launched",
    body: "A dedicated programme for Kenyan investors building from abroad: monthly reporting, transparent financial management and remote client access, designed around clients who cannot walk the site.",
  },
  {
    year: "2025",
    tag: "Industrial",
    title: "Gold plant masterplan — Awdal region, Somaliland",
    body: "Masterplanning of a 500 TPD gold processing facility, coordinating systems integration of a 25 TPH ball mill and a 2,000-ton CIL circuit, targeting commissioning to production within 45 days.",
  },
  {
    year: "2026",
    tag: "Today",
    title: "50+ projects, four major sites running concurrently",
    body: "ACE is currently delivering Emerald Heights, Sora Business Complex, XYZ Apartments and the Westlands Commercial Project — the firm's largest concurrent project load to date, across every discipline in-house.",
  },
];

export default function Work() {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <>
      <PageHead
        crumb="Selected Work"
        eyebrow="Our Work"
        title={
          <>
            The record, <br />
            project by project.
          </>
        }
        lead="From luxury residential in Karen to landmark commercial complexes in Westlands. Each entry states what was built, where it stands today and when it was handed over — with nothing rounded up."
      />

      <section className="section" id="projects">
        <div className="wrap">
          <div className="filters" role="group" aria-label="Filter projects by type">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={filter === f.id ? "on" : undefined}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="proj-grid">
            {shown.map((p, i) => (
              <ProjectCard key={p.slug} project={p} lead={i === 0 && filter === "all"} />
            ))}
          </div>

          {shown.length === 0 && <p className="small mt-lg">No projects in this category yet.</p>}
        </div>
      </section>

      {/* ---------- THE PRACTICE ---------- */}
      <section className="section band" id="team">
        <div className="wrap">
          <Head
            eyebrow="The Practice"
            title="Every discipline, licensed in-house."
            note="ACE is built on credentialled professionals. Every division below practises under a recognised professional body and holds the qualifications to prove it."
          />
          <div className="div-grid">
            {DIVISIONS.map((d) => (
              <Reveal key={d.code} as="article" className="divi">
                <div className="divi-top">
                  <span className="divi-code">{d.code}</span>
                  <div>
                    <div className="divi-lab">{d.div}</div>
                    <h3 className="t-h4">{d.title}</h3>
                  </div>
                </div>
                <ul>
                  {d.quals.map((q) => (
                    <li key={q}>
                      <IconCheck size={13} />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
                <p className="small">{d.note}</p>
                <div className="tags">
                  {d.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TIMELINE ---------- */}
      <section className="section" id="journey">
        <div className="wrap">
          <Head
            eyebrow="Our Journey"
            title="Six years, one direction."
            note="The milestones that shaped ACE since founding in Nairobi — each one a capability we added because a project demanded it."
          />
          <div className="tl">
            {TIMELINE.map((t) => (
              <Reveal key={t.year} className="tl-row">
                <div className="tl-yr">
                  {t.year}
                  <em>{t.tag}</em>
                </div>
                <div className="tl-body">
                  <h3 className="t-h4">{t.title}</h3>
                  <p className="body">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CREDENTIALS ---------- */}
      <section className="section band" id="credentials">
        <div className="wrap">
          <Head
            eyebrow="Regulated · Certified · Accountable"
            title="Credentials you can check yourself."
            note="Every registration is current and renewed on schedule. We provide registration numbers and certificates on request for any due-diligence process."
          />
          <Credentials />
        </div>
      </section>

      <Cta
        eyebrow="Next Project"
        title={<>Yours could be the next entry.</>}
        note="Send us the brief or the site. We will tell you which disciplines it needs and what a realistic programme looks like."
        primary={{ to: "/contact", label: "Start a Project" }}
        secondary={{ to: "/estimator", label: "Estimate the Cost" }}
      />
    </>
  );
}
