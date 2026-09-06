import { useState, type FormEvent } from "react";
import { Cta, Head, PageHead } from "../components/Blocks";
import { Reveal } from "../components/Layout";
import { IconArrow } from "../components/Icon";
import { COMPANY } from "../data/site";

const UPDATES = [
  {
    img: "/img/proj-2.jpg",
    project: "Sora Business Complex",
    place: "Westlands",
    title: "Facade complete, fit-outs underway",
    body: "The glass curtain wall is 100% installed across all elevations. Interior fit-out has begun on the lower floors while the rooftop conferencing suite is framed out.",
  },
  {
    img: "/img/proj-4.jpg",
    project: "Westlands Commercial",
    place: "Westlands",
    title: "Structural phase 100% complete",
    body: "Foundation and reinforced concrete framing are signed off by our IEK-affiliated engineers. MEP rough-ins are underway ahead of facade cladding.",
  },
  {
    img: "/img/proj-3.jpg",
    project: "XYZ Apartments",
    place: "Kilimani",
    title: "Rooftop decks installed, 80% pre-sold",
    body: "Rooftop decks are in and balcony glazing is in its final stage. Eighty per cent of units are now pre-sold off-plan, ahead of the sales programme.",
  },
  {
    img: "/img/proj-1.jpg",
    project: "Emerald Heights",
    place: "Karen",
    title: "Interior fit-out phase underway",
    body: "All 24 units have moved into interior finishing. Smart-home first fix is complete and the rooftop garden waterproofing has passed inspection.",
  },
  {
    img: "/img/proj-5.jpg",
    project: "Karen Private Villa",
    place: "Delivered",
    title: "Handed over two weeks early",
    body: "The five-bedroom residence was handed over ahead of programme and on budget. Snagging closed within the first week of occupation.",
  },
  {
    img: "/img/proj-6.jpg",
    project: "Corporate HQ",
    place: "South B",
    title: "Grade-A fit-out showcase",
    body: "6,000 sq ft delivered with acoustic ceilings, custom millwork and a full AV-enabled boardroom — our interior division's reference project.",
  },
];

const INSIGHTS = [
  {
    n: "01",
    t: "Design-build vs traditional procurement",
    d: "Why splitting design from construction creates variations, and what changes when one firm carries both. Includes where traditional procurement is still the better choice.",
  },
  {
    n: "02",
    t: "Five questions to ask a contractor before signing",
    d: "The checks that separate a registered contractor from a confident one — NCA category, professional registrations, cost transparency and how variations get priced.",
  },
  {
    n: "03",
    t: "Passive design for Nairobi's climate",
    d: "Orientation, shading and cross-ventilation decisions that cut running costs for the life of a building — most of them free if made early enough.",
  },
  {
    n: "04",
    t: "Understanding construction costs in Kenya",
    d: "How a cost plan is actually built up, what a bill of quantities does and does not guarantee, and why the cheapest tender is often the most expensive build.",
  },
];

type State = "idle" | "sending" | "ok" | "bad";

export default function Journal() {
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");

  async function subscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const data = (await res.json().catch(() => ({ ok: res.ok }))) as { ok?: boolean; error?: string };

      if (res.ok && data.ok) {
        form.reset();
        setState("ok");
        setMsg("You are subscribed — a confirmation is on its way to your inbox.");
      } else {
        setState("bad");
        setMsg(data.error || `That did not go through. Please email ${COMPANY.email} and we will add you manually.`);
      }
    } catch {
      setState("bad");
      setMsg(`Network error. Please email ${COMPANY.email} and we will add you manually.`);
    }
  }

  return (
    <>
      <PageHead
        crumb="Journal"
        eyebrow="Journal"
        title={
          <>
            What is happening <br />
            on our sites.
          </>
        }
        lead="Progress from live projects, and what we have learned building in Nairobi — written for clients who want to understand the decisions, not just see the render."
      />

      <section className="section">
        <div className="wrap">
          <Head
            eyebrow="Site Updates"
            title="From the sites, this quarter."
            note="Where each active project actually stands. We publish progress whether or not it is ahead of programme."
          />
          <div className="posts">
            {UPDATES.map((u) => (
              <Reveal key={u.title} as="article" className="post">
                <div className="post-media">
                  <img src={u.img} alt={`${u.project} — ${u.title}`} loading="lazy" />
                </div>
                <div className="post-kick">
                  <span>{u.project}</span>
                  <i />
                  <span>{u.place}</span>
                </div>
                <h3 className="t-h4">{u.title}</h3>
                <p>{u.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <Head
            eyebrow="What We Know"
            title="Worth reading before you build."
            note="The questions clients wish they had asked earlier — answered without the sales pitch."
          />
          <div className="disc-grid">
            {INSIGHTS.map((i) => (
              <Reveal key={i.n} as="article" className="disc">
                <span className="disc-n">{i.n}</span>
                <h3 className="t-h4">{i.t}</h3>
                <p>{i.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SUBSCRIBE ---------- */}
      <section className="section">
        <div className="wrap">
          <Reveal className="cta">
            <div className="cta-l">
              <span className="eyebrow">Newsletter</span>
              <h2 className="t-h2">Project updates, once a month.</h2>
            </div>
            <div className="cta-r">
              <p className="lead" style={{ margin: 0 }}>
                Site progress, completed handovers and practical writing on building in Kenya. No
                sales sequences — you can leave whenever you like.
              </p>
              <form onSubmit={subscribe} noValidate style={{ display: "flex", flexWrap: "wrap", gap: 11, alignItems: "flex-end" }}>
                <div className="field" style={{ flex: "1 1 240px" }}>
                  <label htmlFor="subEmail">Email Address</label>
                  <input id="subEmail" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
                </div>
                <button type="submit" className="btn" disabled={state === "sending"}>
                  {state === "sending" ? "Sending…" : "Subscribe"}
                  {state !== "sending" && <IconArrow />}
                </button>
              </form>
              {(state === "ok" || state === "bad") && (
                <p className={`note ${state === "ok" ? "note-ok" : "note-bad"}`} role="status" style={{ marginTop: 0 }}>
                  {msg}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <Cta
        eyebrow="Start Here"
        title={<>Building something soon?</>}
        note="Get an indicative budget in two minutes, or send us the brief and we will come back with a realistic programme."
        primary={{ to: "/estimator", label: "Estimate the Cost" }}
        secondary={{ to: "/contact", label: "Start a Project" }}
      />
    </>
  );
}
