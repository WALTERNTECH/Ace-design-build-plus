import { Cta, Head, PageHead, Ticks } from "../components/Blocks";
import { Reveal } from "../components/Layout";
import { DISCIPLINE_ICONS } from "../components/Icon";
import { DISCIPLINES } from "../data/site";

/** Each discipline gets a supporting photograph as well as its icon, so the
 *  section reads as work rather than as a list. */
const IMAGES: Record<string, { src: string; alt: string }> = {
  architecture: { src: "/img/proj-1.jpg", alt: "Emerald Heights, an ACE architectural project in Karen" },
  structural: { src: "/img/proj-4.jpg", alt: "Reinforced concrete frame on an ACE site in Westlands" },
  construction: { src: "/img/proj-2.jpg", alt: "Sora Business Complex under construction, Westlands" },
  interior: { src: "/img/proj-6.jpg", alt: "Grade-A corporate interior fit-out by ACE, South B" },
  diaspora: { src: "/img/proj-5.jpg", alt: "Completed private villa in Karen delivered by ACE" },
  industrial: { src: "/img/proj-3.jpg", alt: "Large-scale ACE development project" },
};

const STAGES = [
  {
    n: "STAGE 01",
    title: "Consultation",
    body: "Project briefing, site analysis and feasibility. We establish what the site can carry and what the budget can reach before anyone draws anything.",
  },
  {
    n: "STAGE 02",
    title: "Design & Approvals",
    body: "Concept through to detailed drawings, structural coordination and statutory approvals — submitted under AAK and IEK registration.",
  },
  {
    n: "STAGE 03",
    title: "Costing & Contract",
    body: "Bills of quantities and a cost plan from our BORAQS-registered surveyors, so the contract price rests on measured work rather than an estimate.",
  },
  {
    n: "STAGE 04",
    title: "Construction",
    body: "Execution under a PMP®-certified manager, with programme tracking, procurement, quality assurance and monthly cost reporting.",
  },
  {
    n: "STAGE 05",
    title: "Handover & Support",
    body: "Snagging, commissioning, as-built documentation and a defects liability period — the project is not closed until the paperwork is.",
  },
];

export default function Services() {
  return (
    <>
      <PageHead
        crumb="Services"
        eyebrow="What We Do"
        title={
          <>
            Six disciplines. <br />
            One delivery team.
          </>
        }
        lead="Take the whole scope or a single stage. Every discipline below is staffed in-house and licensed under a recognised professional body, so the work never passes through a firm we do not control."
      />

      {DISCIPLINES.map((d, i) => {
        const Ico = DISCIPLINE_ICONS[d.icon];
        const img = IMAGES[d.icon];
        return (
          <section
            key={d.n}
            id={d.anchor}
            className={`section${i % 2 === 1 ? " band" : ""}`}
          >
            <div className="wrap">
              <div className={`split${i % 2 === 1 ? " split-flip" : ""}`}>
                <Reveal className="split-text">
                  <div className="disc-ico">{Ico && <Ico size={26} />}</div>
                  <span className="eyebrow">Service {d.n}</span>
                  <h2 className="t-h2">{d.title}</h2>
                  <p className="body">{d.blurb}</p>
                  <Ticks items={d.points} />
                </Reveal>

                <Reveal className="split-media">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* ---------- PROCESS ---------- */}
      <section className="section line-top">
        <div className="wrap">
          <Head
            eyebrow="How We Deliver"
            title="Five stages, one programme."
            note="The same sequence on every project, whether it is a private villa or a 42,000 sq ft commercial block. You always know which stage you are in."
          />
          <div className="steps">
            {STAGES.map((s) => (
              <Reveal key={s.n} className="step">
                <span className="step-n">{s.n}</span>
                <h3 className="t-h4">{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Ready To Build"
        title={<>Start with a conversation.</>}
        note="Tell us the scope and we will tell you which of the six disciplines it actually needs — including the ones you may not need to pay for."
        primary={{ to: "/contact", label: "Request a Quote" }}
        secondary={{ to: "/estimator", label: "Estimate the Cost" }}
      />
    </>
  );
}
