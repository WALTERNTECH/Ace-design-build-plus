import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHead, Head } from "../components/Blocks";
import { Reveal } from "../components/Layout";
import { IconArrow, IconCheck } from "../components/Icon";
import {
  ADDITIONS,
  AREA_LIMITS,
  BUILD_TYPES,
  BUNDLE,
  FINISH_LEVELS,
  SERVICES,
  SITE_FACTORS,
  type Band,
} from "../data/rates";

const kes = (n: number) => {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `KES ${m.toLocaleString("en-KE", { maximumFractionDigits: m < 10 ? 1 : 0 })}M`;
  }
  return `KES ${Math.round(n).toLocaleString("en-KE")}`;
};

const band = (b: Band) => ({ low: b.low, high: b.high });

export default function Estimator() {
  const [typeId, setTypeId] = useState(BUILD_TYPES[0].id);
  const [area, setArea] = useState(AREA_LIMITS.default);
  const [finishId, setFinishId] = useState("high");
  const [siteId, setSiteId] = useState("clear");
  const [bundled, setBundled] = useState(true);
  const [picked, setPicked] = useState<string[]>(["architecture", "pm"]);

  const result = useMemo(() => {
    const type = BUILD_TYPES.find((t) => t.id === typeId)!;
    const finish = FINISH_LEVELS.find((f) => f.id === finishId)!;
    const site = SITE_FACTORS.find((s) => s.id === siteId)!;

    const mult = finish.mult * site.mult;
    const works = {
      low: type.rate.low * mult * area,
      high: type.rate.high * mult * area,
    };

    const feePct = bundled
      ? band(BUNDLE.pct)
      : picked.reduce(
          (acc, id) => {
            const s = SERVICES.find((x) => x.id === id);
            if (s) {
              acc.low += s.pct.low;
              acc.high += s.pct.high;
            }
            return acc;
          },
          { low: 0, high: 0 },
        );

    const fees = {
      low: (works.low * feePct.low) / 100,
      high: (works.high * feePct.high) / 100,
    };
    const approvals = {
      low: (works.low * ADDITIONS.approvals.pct.low) / 100,
      high: (works.high * ADDITIONS.approvals.pct.high) / 100,
    };

    const subtotal = {
      low: works.low + fees.low + approvals.low,
      high: works.high + fees.high + approvals.high,
    };
    const contingency = {
      low: (subtotal.low * ADDITIONS.contingency.pct.low) / 100,
      high: (subtotal.high * ADDITIONS.contingency.pct.high) / 100,
    };

    const total = {
      low: subtotal.low + contingency.low,
      high: subtotal.high + contingency.high,
    };

    return {
      type,
      works,
      fees,
      feePct,
      approvals,
      contingency,
      total,
      perSqft: { low: total.low / area, high: total.high / area },
    };
  }, [typeId, area, finishId, siteId, bundled, picked]);

  const toggleService = (id: string) =>
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  /** Hand the estimate to the enquiry form so the team sees the same numbers. */
  const enquiryHref = useMemo(() => {
    const type = BUILD_TYPES.find((t) => t.id === typeId)!;
    const finish = FINISH_LEVELS.find((f) => f.id === finishId)!;
    const summary = [
      `Estimate request — ${type.label}`,
      `Gross area: ${area.toLocaleString()} sq ft`,
      `Finish level: ${finish.label}`,
      `Scope: ${bundled ? BUNDLE.label : picked.join(", ") || "not specified"}`,
      `Indicative range: ${kes(result.total.low)} – ${kes(result.total.high)}`,
    ].join("\n");
    return `/contact?brief=${encodeURIComponent(summary)}`;
  }, [typeId, area, finishId, bundled, picked, result]);

  return (
    <>
      <PageHead
        crumb="Cost Estimator"
        eyebrow="Project Cost Estimator"
        title={
          <>
            Know the order of <br />
            magnitude, before <br />
            you commit.
          </>
        }
        lead="Set the shape of your project and get an indicative construction budget in Kenyan shillings — built from the same cost structure our quantity surveyors use. It is a range, not a quotation, and it is free."
      />

      <section className="section">
        <div className="wrap">
          <div className="est">
            {/* ---------- INPUTS ---------- */}
            <div className="est-form">
              <div className="est-group">
                <span className="est-legend">01 — What are you building?</span>
                <div className="chips">
                  {BUILD_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`chip${typeId === t.id ? " on" : ""}`}
                      onClick={() => setTypeId(t.id)}
                      title={t.hint}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <p className="tiny">{BUILD_TYPES.find((t) => t.id === typeId)!.hint}</p>
              </div>

              <div className="est-group">
                <span className="est-legend">02 — Gross floor area</span>
                <div className="range-row">
                  <label htmlFor="area" className="small">
                    Total built area
                  </label>
                  <span className="range-val">{area.toLocaleString()} sq ft</span>
                </div>
                <input
                  id="area"
                  type="range"
                  min={AREA_LIMITS.min}
                  max={AREA_LIMITS.max}
                  step={AREA_LIMITS.step}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                />
                <p className="tiny">
                  Roughly {Math.round(area * 0.0929).toLocaleString()} m². Drag to adjust, or{" "}
                  <Link to="/contact" style={{ borderBottom: "2px solid var(--green)" }}>
                    ask us to measure it
                  </Link>
                  .
                </p>
              </div>

              <div className="est-group">
                <span className="est-legend">03 — Finish level</span>
                <div className="chips">
                  {FINISH_LEVELS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      className={`chip${finishId === f.id ? " on" : ""}`}
                      onClick={() => setFinishId(f.id)}
                      title={f.hint}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <p className="tiny">{FINISH_LEVELS.find((f) => f.id === finishId)!.hint}</p>
              </div>

              <div className="est-group">
                <span className="est-legend">04 — Site conditions</span>
                <div className="chips">
                  {SITE_FACTORS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className={`chip${siteId === s.id ? " on" : ""}`}
                      onClick={() => setSiteId(s.id)}
                      title={s.hint}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="est-group">
                <span className="est-legend">05 — Which disciplines do you need?</span>
                <div className="chips">
                  <button
                    type="button"
                    className={`chip${bundled ? " on" : ""}`}
                    onClick={() => setBundled(true)}
                  >
                    {BUNDLE.label}
                  </button>
                  <button
                    type="button"
                    className={`chip${!bundled ? " on" : ""}`}
                    onClick={() => setBundled(false)}
                  >
                    Select individually
                  </button>
                </div>

                {bundled ? (
                  <p className="tiny">{BUNDLE.note}</p>
                ) : (
                  <>
                    <div className="chips" style={{ marginTop: 4 }}>
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          className={`chip${picked.includes(s.id) ? " on" : ""}`}
                          onClick={() => toggleService(s.id)}
                          title={s.note}
                        >
                          {picked.includes(s.id) && <IconCheck size={12} />} {s.label}
                        </button>
                      ))}
                    </div>
                    {picked.length === 0 && (
                      <p className="tiny">Select at least one discipline to include professional fees.</p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* ---------- OUTPUT ---------- */}
            <div className="est-out">
              <div className="est-figure">
                <span className="est-label">Indicative total project cost</span>
                <span className="est-range">
                  {kes(result.total.low)} – {kes(result.total.high)}
                </span>
                <span className="est-sub">
                  Around {kes(result.perSqft.low)}–{kes(result.perSqft.high)} per sq ft, all in
                </span>
              </div>

              <div className="est-bd">
                <div className="est-bd-row">
                  <span>Construction works</span>
                  <b>
                    {kes(result.works.low)} – {kes(result.works.high)}
                  </b>
                </div>
                <div className="est-bd-row">
                  <span>
                    Professional fees ({result.feePct.low.toFixed(1)}–{result.feePct.high.toFixed(1)}%)
                  </span>
                  <b>
                    {kes(result.fees.low)} – {kes(result.fees.high)}
                  </b>
                </div>
                <div className="est-bd-row">
                  <span>{ADDITIONS.approvals.label}</span>
                  <b>
                    {kes(result.approvals.low)} – {kes(result.approvals.high)}
                  </b>
                </div>
                <div className="est-bd-row">
                  <span>{ADDITIONS.contingency.label}</span>
                  <b>
                    {kes(result.contingency.low)} – {kes(result.contingency.high)}
                  </b>
                </div>
              </div>

              <p className="est-disc">
                <strong>This is an indicative range, not a quotation.</strong> Real cost depends on
                soil and survey results, specification, material selection, programme and prevailing
                market rates at the time of tender. A firm figure requires a measured bill of
                quantities from our BORAQS-registered quantity surveyors — which we prepare as part
                of Stage 03.
              </p>

              <div className="actions">
                <Link to={enquiryHref} className="btn">
                  Get a Real Quote <IconArrow />
                </Link>
                <a href="tel:+254726314608" className="btn btn-line">
                  Talk It Through
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="section band">
        <div className="wrap">
          <Head
            eyebrow="How This Is Calculated"
            title="No black box."
            note="The estimator applies the same build-up a quantity surveyor uses. Here is exactly what sits behind the number."
          />
          <div className="steps">
            <Reveal className="step">
              <span className="step-n">01</span>
              <h3 className="t-h4">Base rate</h3>
              <p>A cost per square foot for your building type, drawn from Nairobi market bands for construction works.</p>
            </Reveal>
            <Reveal className="step">
              <span className="step-n">02</span>
              <h3 className="t-h4">Finish &amp; site</h3>
              <p>Multipliers for specification level and for site conditions such as slope, access or demolition.</p>
            </Reveal>
            <Reveal className="step">
              <span className="step-n">03</span>
              <h3 className="t-h4">Professional fees</h3>
              <p>A percentage of works for the disciplines you select — lower when taken as one design-build contract.</p>
            </Reveal>
            <Reveal className="step">
              <span className="step-n">04</span>
              <h3 className="t-h4">Statutory costs</h3>
              <p>Approvals, levies and regulatory fees that apply to any permitted build in Kenya.</p>
            </Reveal>
            <Reveal className="step">
              <span className="step-n">05</span>
              <h3 className="t-h4">Contingency</h3>
              <p>A held sum for the unknowns. We show it openly rather than burying it in the rate.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
