import { Link } from "react-router-dom";
import { Cta, CredStrip, Credentials, DisciplineCard, Head, ProjectCard, Ticks } from "../components/Blocks";
import { Reveal } from "../components/Layout";
import { IconArrow } from "../components/Icon";
import { DISCIPLINES, PROJECTS } from "../data/site";

export default function Home() {
  const lead = PROJECTS[0];
  const rest = PROJECTS.slice(1, 5);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-in">
              <span className="eyebrow">Nairobi, Kenya — Established 2020</span>
              <h1 className="t-hero">
                Design and build, under one <span className="hero-mark">accountable</span> team.
              </h1>
              <p className="lead">
                Architecture, structural engineering, interior fit-out and construction management
                held under a single contract — so drawings, structure and site never disagree, and
                the responsibility never moves.
              </p>
              <div className="actions" style={{ marginTop: 6 }}>
                <Link to="/work" className="btn">
                  Selected Work <IconArrow />
                </Link>
                <Link to="/estimator" className="btn btn-line">
                  Estimate My Project
                </Link>
              </div>
            </div>

            <Reveal className="hero-media">
              <img
                src="/img/hero-slide-1.jpg"
                alt="An ACE project under construction in Nairobi"
                width={270}
                height={148}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <CredStrip />

      {/* ---------- POSITIONING ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <Reveal className="split-text">
              <span className="eyebrow">The ACE Approach</span>
              <h2 className="t-h2">One firm. Four disciplines. One contract.</h2>
              <p className="body">
                Most projects lose time in the gaps between consultants — the architect waiting on
                the engineer, the contractor pricing a drawing nobody coordinated. We removed the
                gaps by keeping the disciplines under one roof and one line of accountability.
              </p>
              <Ticks
                items={[
                  "Drawings, structural calculations and site works coordinated internally, not across three firms.",
                  "One point of responsibility from first brief to final handover — no gap for blame to sit in.",
                  "Costs carried against a single programme, so variations surface early rather than at handover.",
                ]}
              />
              <Link to="/about" className="link-a">
                How We Work <IconArrow size={14} />
              </Link>
            </Reveal>

            <Reveal className="split-media">
              <img src="/img/proj-4.jpg" alt="ACE site works in progress, Westlands, Nairobi" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- DISCIPLINES ---------- */}
      <section className="section band">
        <div className="wrap">
          <Head
            eyebrow="What We Do"
            title="Six disciplines, one delivery team."
            note="Take the whole scope or a single stage. Most clients start with one and hand us the rest once they have seen how the programme holds."
          />
          <div className="disc-grid">
            {DISCIPLINES.map((d) => (
              <DisciplineCard key={d.n} {...d} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SELECTED WORK ---------- */}
      <section className="section">
        <div className="wrap">
          <Head
            eyebrow="Selected Work"
            title="The record, project by project."
            note="Luxury residential in Karen, Grade-A commercial in Westlands, corporate fit-outs in South B. Each entry lists what was built and when it was handed over."
          />
          <div className="proj-grid">
            <ProjectCard project={lead} lead />
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <div className="mt-lg">
            <Link to="/work" className="btn btn-line">
              View All Projects <IconArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- ESTIMATOR TEASER ---------- */}
      <section className="section band">
        <div className="wrap">
          <div className="split">
            <Reveal className="split-text">
              <span className="eyebrow">Project Cost Estimator</span>
              <h2 className="t-h2">What will it actually cost?</h2>
              <p className="body">
                Most people ask that first and get a evasive answer. Set your building type, area,
                finish level and site conditions, and our estimator returns an indicative budget
                range built from the same cost structure our quantity surveyors use — broken down
                into works, fees, statutory costs and contingency.
              </p>
              <Ticks
                items={[
                  "A range rather than a single figure, because that is the honest answer.",
                  "Every component shown openly, including the contingency.",
                  "Carry the result straight into an enquiry if you want it firmed up.",
                ]}
              />
              <Link to="/estimator" className="btn">
                Open the Estimator <IconArrow />
              </Link>
            </Reveal>

            <Reveal className="split-media">
              <img src="/img/proj-1.jpg" alt="Emerald Heights residential development, Karen" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- CREDENTIALS ---------- */}
      <section className="section">
        <div className="wrap">
          <Head
            eyebrow="Regulated · Certified · Accountable"
            title="Credentials you can check yourself."
            note="ACE operates inside the full regulatory framework of Kenya's built environment. Registration numbers and certificates are provided on request for any due-diligence process."
          />
          <Credentials />
          <div className="mt-lg">
            <Link to="/contact" className="link-a">
              Request Our Credentials <IconArrow size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Start Here"
        title={<>Tell us what you are building.</>}
        note="Send the brief, the site or just the idea. We will come back with the disciplines it needs, an honest programme and what it takes to start."
        primary={{ to: "/contact", label: "Start a Project" }}
        secondary={{ to: "tel:+254726314608", label: "+254 726 314 608", external: true }}
      />
    </>
  );
}
