import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Cta, PageHead, Ticks } from "../components/Blocks";
import { Reveal } from "../components/Layout";
import { IconArrow } from "../components/Icon";
import { COMPANY } from "../data/site";

type State = "idle" | "sending" | "ok" | "bad";

const SERVICES = [
  "Architectural Design",
  "Structural Engineering",
  "Construction Management",
  "Interior Fit-Out",
  "Diaspora Real Estate",
  "Industrial Masterplanning",
  "Full Design + Build",
];

const TYPES = ["Residential", "Commercial", "Industrial", "Mixed Use Development"];
const BUDGETS = ["Under KES 5 Million", "KES 5M – 15M", "KES 15M – 50M", "Over KES 50 Million"];
const TIMELINES = ["As soon as possible", "Within 1–3 months", "Within 6 months", "Still planning"];

export default function Contact() {
  const [params] = useSearchParams();
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");
  const [brief, setBrief] = useState("");

  /* An estimate handed over from the cost estimator arrives as ?brief=… */
  useEffect(() => {
    const b = params.get("brief");
    if (b) setBrief(b + "\n\n");
  }, [params]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const data = (await res.json().catch(() => ({ ok: res.ok }))) as { ok?: boolean; error?: string };

      if (res.ok && data.ok) {
        form.reset();
        setBrief("");
        setState("ok");
        setMsg("Thank you — your enquiry has reached the ACE team. We reply within one business day.");
      } else {
        setState("bad");
        setMsg(
          data.error ||
            `We could not send that just now. Please call ${COMPANY.phone} or email ${COMPANY.email}.`,
        );
      }
    } catch {
      setState("bad");
      setMsg(`Network error. Please call ${COMPANY.phone} or email ${COMPANY.email}.`);
    }
  }

  return (
    <>
      <PageHead
        crumb="Contact"
        eyebrow="Contact ACE"
        title={
          <>
            Tell us what <br />
            you are building.
          </>
        }
        lead="A detailed brief or a rough idea — either is enough to start. The more you can tell us about the site and the budget, the more useful our first reply will be."
      />

      <section className="section">
        <div className="wrap">
          <div className="split" style={{ alignItems: "start" }}>
            {/* ---------- DETAILS ---------- */}
            <Reveal className="split-text">
              <span className="eyebrow">Direct Contact</span>
              <h2 className="t-h3">Reach us directly.</h2>

              <dl className="crow">
                <div className="crow-item">
                  <dt>Call</dt>
                  <dd>
                    <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
                  </dd>
                </div>
                <div className="crow-item">
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                  </dd>
                </div>
                <div className="crow-item">
                  <dt>Office</dt>
                  <dd>
                    {COMPANY.address}
                    <em>{COMPANY.city}</em>
                  </dd>
                </div>
                <div className="crow-item">
                  <dt>Hours</dt>
                  <dd>{COMPANY.hours}</dd>
                </div>
              </dl>

              <span className="eyebrow" style={{ marginTop: 8 }}>
                What Happens Next
              </span>
              <Ticks
                items={[
                  "We reply within one business day, from a named person rather than an inbox.",
                  "If it is a fit, we arrange a site visit or a call to walk through the brief.",
                  "You get an honest view of scope, programme and cost before anything is signed.",
                ]}
              />

              <p className="small">
                Want a budget figure first?{" "}
                <Link to="/estimator" style={{ borderBottom: "2px solid var(--green)" }}>
                  Try the cost estimator
                </Link>
                .
              </p>
            </Reveal>

            {/* ---------- FORM ---------- */}
            <Reveal>
              <span className="eyebrow">Enquiry Form</span>
              <h2 className="t-h3" style={{ margin: "16px 0 26px" }}>
                Send us your brief.
              </h2>

              <form onSubmit={onSubmit} noValidate>
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="first_name">First Name *</label>
                    <input id="first_name" name="first_name" required autoComplete="given-name" />
                  </div>
                  <div className="field">
                    <label htmlFor="last_name">Last Name *</label>
                    <input id="last_name" name="last_name" required autoComplete="family-name" />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email Address *</label>
                    <input id="email" name="email" type="email" required autoComplete="email" />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" />
                  </div>
                  <div className="field field-wide">
                    <label htmlFor="company">Company / Organisation</label>
                    <input id="company" name="company" autoComplete="organization" />
                  </div>
                  <div className="field field-wide">
                    <label htmlFor="service">Service of Interest *</label>
                    <select id="service" name="service" required defaultValue="">
                      <option value="" disabled>
                        Select a service
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="project_type">Project Type *</label>
                    <select id="project_type" name="project_type" required defaultValue="">
                      <option value="" disabled>
                        Select a type
                      </option>
                      {TYPES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="budget">Indicative Budget</label>
                    <select id="budget" name="budget" defaultValue="">
                      <option value="">Prefer not to say</option>
                      {BUDGETS.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="location">Site Location / Area</label>
                    <input id="location" name="location" placeholder="e.g. Karen, Nairobi" />
                  </div>
                  <div className="field">
                    <label htmlFor="timeline">Preferred Start</label>
                    <select id="timeline" name="timeline" defaultValue="">
                      <option value="">Select a timeframe</option>
                      {TIMELINES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field field-wide">
                    <label htmlFor="message">Tell Us About Your Project *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={7}
                      required
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      placeholder="The site, what you want to build, and anything already decided — drawings, approvals, budget."
                    />
                  </div>
                </div>

                <div style={{ marginTop: 24 }}>
                  <button type="submit" className="btn" disabled={state === "sending"}>
                    {state === "sending" ? "Sending…" : "Send Enquiry"}
                    {state !== "sending" && <IconArrow />}
                  </button>
                </div>

                {(state === "ok" || state === "bad") && (
                  <p className={`note ${state === "ok" ? "note-ok" : "note-bad"}`} role="status">
                    {msg}
                  </p>
                )}

                <p className="small" style={{ marginTop: 14 }}>
                  We use your details only to respond to this enquiry. See our{" "}
                  <Link to="/privacy" style={{ borderBottom: "2px solid var(--green)" }}>
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Due Diligence"
        title={<>Need our credentials first?</>}
        note="We provide registration numbers and certificates for NCA, AAK, IEK, ACMK, KABCEC and BORAQS on request — before you commit to anything."
        primary={{ to: "/work#credentials", label: "View Credentials" }}
        secondary={{ to: COMPANY.phoneHref, label: COMPANY.phone, external: true }}
      />
    </>
  );
}
