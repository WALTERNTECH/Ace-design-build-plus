import { Cta, Head, PageHead } from "../components/Blocks";
import { Reveal } from "../components/Layout";

const VALUES = [
  { n: "01", t: "Precision", d: "Every measurement, budget line and structural calculation is verified before execution." },
  { n: "02", t: "Innovation", d: "BIM 360, Revit and digital coordination let us resolve clashes before construction begins." },
  { n: "03", t: "Integrity", d: "Open books, transparent costing and honest programmes — including when the honest answer is bad news." },
  { n: "04", t: "Partnership", d: "Your project becomes our portfolio, and therefore our responsibility." },
  { n: "05", t: "Sustainability", d: "Climate-responsive design and long-term operational efficiency guide every decision." },
  { n: "06", t: "Safety", d: "A Zero Harm culture enforced daily through strict HSE standards on every site." },
];

const GOLD = [
  { n: "01", t: "Systems Integration", d: "Managed the interface between factory specifications and local site realities, so the 25 TPH ball mill and recovery circuits integrated without rework." },
  { n: "02", t: "Functional Zoning", d: "Site laid out around throughput and logistics — production core, secure value chain, support and personnel zones placed against how material actually moves." },
  { n: "03", t: "Site & Foundations", d: "Site preparation and foundation works engineered for the ball mill groundwork and the 2,000-ton CIL circuit installation." },
  { n: "04", t: "Commissioning", d: "Phased technical expansion planned from commissioning through to full production, with capacity to grow without rebuilding the core." },
];

export default function About() {
  return (
    <>
      <PageHead
        crumb="About"
        eyebrow="About ACE"
        title={
          <>
            The split between design and construction is a broken system.
          </>
        }
        lead="We are architects, engineers, quantity surveyors and site managers operating as one firm — with full accountability from concept to completion. ACE was built to close that gap."
      />

      {/* ---------- STORY ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <Reveal className="split-text">
              <span className="eyebrow">Our Story</span>
              <h2 className="t-h2">Founded on a fundamental belief.</h2>
              <p className="body">
                ACE Design + Build Partners was founded in Nairobi in 2020 on a single premise: that
                separating design from construction creates inefficiency, conflict and waste.
              </p>
              <p className="body">
                Traditional procurement pushes architects and contractors into an adversarial
                relationship. One draws it, the other builds it, and when the two do not agree,
                nobody is fully accountable for the result. The client pays for that gap — in
                variations, in delays, and in the time spent refereeing between two firms.
              </p>
              <p className="body">
                Today our multidisciplinary team works across every project type, from luxury
                residential compounds in Karen to industrial masterplans in the Horn of Africa.
              </p>
            </Reveal>

            <Reveal className="split-media">
              <img src="/img/proj-1.jpg" alt="An ACE residential project under construction in Karen, Nairobi" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- QUOTE ---------- */}
      <section className="section band">
        <div className="wrap">
          <Reveal className="stack gap-md" >
            <span className="eyebrow">What It Means In Practice</span>
            <blockquote
              className="t-h2"
              style={{ margin: 0, maxWidth: "20ch", fontWeight: 500 }}
            >
              We eliminated the gap. One team carries your project from the first site visit to the
              final key.
            </blockquote>
            <div className="stack" style={{ gap: 3 }}>
              <span style={{ fontWeight: 600 }}>ACE Design + Build Partners</span>
              <span className="small">Founded by four architects, Nairobi, 2020</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- MISSION + VISION ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="split" style={{ alignItems: "start" }}>
            <Reveal className="split-text">
              <span className="eyebrow">Our Mission</span>
              <h2 className="t-h3">One team. Full accountability. Zero compromise.</h2>
              <p className="body">
                To deliver integrated architecture and construction that is technically excellent,
                economically rational and built to last — measured by what stands at handover, not
                by what was promised at pitch.
              </p>
            </Reveal>

            <Reveal className="split-text">
              <span className="eyebrow">Our Vision</span>
              <h2 className="t-h3">The benchmark design-build firm in East Africa.</h2>
              <p className="body">
                To set the regional standard for engineering excellence, sustainable construction
                and client-first delivery — so that integrated design-build becomes the expectation
                rather than the exception.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- VALUES ---------- */}
      <section className="section band">
        <div className="wrap">
          <Head
            eyebrow="What Drives Us"
            title="Six values. Non-negotiable."
            note="These are the commitments we are willing to be measured against on any project, by any client, at any stage."
          />
          <div className="disc-grid">
            {VALUES.map((v) => (
              <Reveal key={v.n} as="article" className="disc">
                <span className="disc-n">{v.n}</span>
                <h3 className="t-h4">{v.t}</h3>
                <p>{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FLAGSHIP INDUSTRIAL ---------- */}
      <section className="section">
        <div className="wrap">
          <Head
            eyebrow="Flagship — Industrial"
            title="Gold plant masterplan, Awdal region, Somaliland."
            note="Masterplanning and systems integration for a 500 TPD gold processing facility — the clearest test of whether integrated delivery holds up outside a city plot."
          />
          <div className="steps" style={{ marginBottom: 36 }}>
            {[
              { n: "500", l: "TPD Capacity" },
              { n: "25 TPH", l: "Ball Mill Circuit" },
              { n: "2,000T", l: "CIL Circuit" },
              { n: "45", l: "Days To Production" },
            ].map((f) => (
              <Reveal key={f.l} className="step">
                <span className="t-h3">{f.n}</span>
                <span className="step-n">{f.l}</span>
              </Reveal>
            ))}
          </div>
          <div className="disc-grid">
            {GOLD.map((g) => (
              <Reveal key={g.n} as="article" className="disc">
                <span className="disc-n">{g.n}</span>
                <h3 className="t-h4">{g.t}</h3>
                <p>{g.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Work With Us"
        title={<>One team, from brief to key.</>}
        note="If you have a site, a brief or just a decision to make about how to procure a project, we are happy to talk it through before anyone signs anything."
        primary={{ to: "/contact", label: "Start a Project" }}
        secondary={{ to: "/work", label: "Selected Work" }}
      />
    </>
  );
}
