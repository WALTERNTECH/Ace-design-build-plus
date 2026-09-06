import { Cta, PageHead } from "../components/Blocks";

const GROUPS = [
  {
    id: "general",
    n: "01",
    label: "General",
    title: "About the firm",
    qs: [
      {
        q: "What is ACE Design + Build Partners?",
        a: "ACE — Adaptive City Ecosystems Ltd — is an integrated design-build firm offering architectural design, structural and MEP engineering, construction management and premium interior fit-out across East Africa. All disciplines are staffed in-house.",
      },
      {
        q: "Where are you located?",
        a: "Our office is on Tebere Crescent Road, Nairobi, Kenya. We deliver projects across Kenya and into neighbouring East African countries, and have masterplanned industrial facilities as far as the Horn of Africa.",
      },
      {
        q: "What types of projects do you handle?",
        a: "Residential developments, commercial buildings, mixed-use projects, office spaces, hospitality, schools, luxury interiors and industrial facilities. Our current load runs from a five-bedroom private villa to a 42,000 sq ft commercial complex.",
      },
      {
        q: "Are you licensed and registered?",
        a: "Yes. ACE holds NCA Category 4 registration and our professionals are registered or affiliated with AAK, IEK, ACMK, KABCEC and BORAQS. We provide registration numbers and certificates on request for any due-diligence process.",
      },
    ],
  },
  {
    id: "process",
    n: "02",
    label: "Our Process",
    title: "How a project runs",
    qs: [
      {
        q: "How does your project workflow operate?",
        a: "Five stages: consultation and feasibility, design and approvals, costing and contract, construction, then handover and support. You always know which stage you are in and what has to close before the next one opens.",
      },
      {
        q: "Do you assist with approvals?",
        a: "Yes. We handle planning approvals, construction permits and regulatory documentation. Our architects are AAK-registered, which is what allows drawings to be signed and stamped for statutory submission.",
      },
      {
        q: "Do you provide project timelines?",
        a: "Every project is issued with a structured programme, a milestone plan and a reporting framework. If a milestone is going to slip, you hear it from us before it slips — not at handover.",
      },
      {
        q: "Can I build from abroad?",
        a: "Yes — our Diaspora Real Estate programme is built for exactly that. You get monthly photographic and written progress reports, drawdowns released against verified completed work, and one named contact throughout.",
      },
    ],
  },
  {
    id: "cost",
    n: "03",
    label: "Cost",
    title: "Budget and pricing",
    qs: [
      {
        q: "How much will my project cost?",
        a: "Use our cost estimator for an indicative range in a couple of minutes — it shows construction works, professional fees, statutory costs and contingency separately. A firm figure requires a measured bill of quantities from our BORAQS-registered quantity surveyors.",
      },
      {
        q: "Is the estimator a quotation?",
        a: "No. It is an indicative range built from Nairobi market cost bands. Real cost depends on soil and survey results, specification, material selection, programme and market rates at the time of tender.",
      },
      {
        q: "Do you provide cost estimates?",
        a: "Yes. Our quantity surveyors produce feasibility estimates, cost plans, bills of quantities and procurement reporting at every stage — so the contract price rests on measured work rather than a guess.",
      },
      {
        q: "How are variations priced?",
        a: "Against the agreed bill of quantities, with the cost impact issued in writing before the work proceeds. Because design and construction sit in the same firm, most variations that come from drawing conflicts simply do not arise.",
      },
    ],
  },
  {
    id: "site",
    n: "04",
    label: "Construction",
    title: "On site",
    qs: [
      {
        q: "How do you ensure quality on site?",
        a: "Experienced site engineers, scheduled inspections, documented reporting and strict construction standards — under a PMP®-certified construction manager working to ACMK's code of professional conduct.",
      },
      {
        q: "Can you manage large-scale projects?",
        a: "Yes. NCA Category 4 registration authorises us to self-perform large-scale building works, and we currently run four major sites concurrently including an 18-storey tower and a 42,000 sq ft commercial complex.",
      },
      {
        q: "How do you handle site safety?",
        a: "A Zero Harm culture enforced daily through strict HSE standards. Our KABCEC membership also places us under negotiated Collective Bargaining Agreements, which protects both our workers and our clients' legal exposure.",
      },
      {
        q: "How long does an interior fit-out take?",
        a: "Typically 8–12 weeks, depending on scope, material procurement lead times and site readiness. We will tell you which of those three is the binding constraint on your particular job.",
      },
    ],
  },
];

export default function Faq() {
  return (
    <>
      <PageHead
        crumb="FAQ"
        eyebrow="Questions"
        title={
          <>
            The things clients <br />
            ask us first.
          </>
        }
        lead="If your question is not here, call us. We would rather answer it directly than have you guess."
      />

      <section className="section">
        <div className="wrap">
          <div className="doc">
            <nav className="doc-nav" aria-label="FAQ categories">
              {GROUPS.map((g) => (
                <a key={g.id} href={`#${g.id}`}>
                  {g.n} — {g.label}
                </a>
              ))}
            </nav>

            <div>
              {GROUPS.map((g) => (
                <div key={g.id} id={g.id} style={{ marginBottom: 52 }}>
                  <span className="eyebrow">
                    {g.n} — {g.label}
                  </span>
                  <h2 className="t-h3" style={{ margin: "14px 0 20px" }}>
                    {g.title}
                  </h2>
                  <div className="faq">
                    {g.qs.map((item) => (
                      <details key={item.q}>
                        <summary>
                          {item.q}
                          <span className="faq-sign" />
                        </summary>
                        <p className="faq-a">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Still Have Questions"
        title={<>Ask us directly.</>}
        note="Speak with the ACE team and we will walk you through your next project — including whether we are the right firm for it."
        primary={{ to: "/contact", label: "Contact Us" }}
        secondary={{ to: "/estimator", label: "Estimate the Cost" }}
      />
    </>
  );
}
