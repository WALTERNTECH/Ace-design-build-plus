/* =============================================================
   PROJECT COST ESTIMATOR — RATE CARD

   IMPORTANT, FOR ACE TO SET
   -------------------------
   These are indicative Nairobi build-cost bands expressed in KES per
   square foot of gross floor area, covering construction only. They are
   starting values so the tool is usable on day one — they are NOT a
   quotation and they are not ACE's audited rates.

   Replace the numbers below with your own QS-verified rates. Everything
   the estimator shows is derived from this file: nothing is hard-coded
   in the UI, so editing here updates the whole tool.

   Every output is deliberately presented as a RANGE, never a single
   figure, because a real cost plan depends on the site, the soil, the
   spec and the programme.
============================================================= */

export interface Band {
  low: number;
  high: number;
}

/** Base construction cost, KES per square foot of gross floor area. */
export const BUILD_TYPES: {
  id: string;
  label: string;
  hint: string;
  rate: Band;
  unit: "sqft" | "unit";
}[] = [
  {
    id: "residential-standard",
    label: "Residential — standard",
    hint: "Family home, conventional finishes",
    rate: { low: 3200, high: 4800 },
    unit: "sqft",
  },
  {
    id: "residential-premium",
    label: "Residential — premium villa",
    hint: "High-spec private residence",
    rate: { low: 5200, high: 8500 },
    unit: "sqft",
  },
  {
    id: "apartments",
    label: "Apartment development",
    hint: "Multi-unit residential block",
    rate: { low: 4200, high: 6500 },
    unit: "sqft",
  },
  {
    id: "commercial",
    label: "Commercial / office",
    hint: "Grade-A offices, retail, mixed-use",
    rate: { low: 4800, high: 7800 },
    unit: "sqft",
  },
  {
    id: "interior-fitout",
    label: "Interior fit-out only",
    hint: "Shell already built",
    rate: { low: 2200, high: 5200 },
    unit: "sqft",
  },
  {
    id: "industrial",
    label: "Industrial / warehouse",
    hint: "Plant, processing, storage",
    rate: { low: 2600, high: 4600 },
    unit: "sqft",
  },
];

/** Finish level multiplies the base rate. */
export const FINISH_LEVELS: { id: string; label: string; hint: string; mult: number }[] = [
  { id: "standard", label: "Standard", hint: "Sound, durable, unshowy", mult: 0.88 },
  { id: "high", label: "High", hint: "Quality joinery and fittings", mult: 1.0 },
  { id: "premium", label: "Premium", hint: "Imported finishes, bespoke millwork", mult: 1.28 },
];

/** Site conditions that materially move a Nairobi build cost. */
export const SITE_FACTORS: { id: string; label: string; hint: string; mult: number }[] = [
  { id: "clear", label: "Clear, serviced plot", hint: "Access and services in place", mult: 1.0 },
  { id: "sloped", label: "Sloped or difficult access", hint: "Retaining works, restricted access", mult: 1.12 },
  { id: "demolition", label: "Requires demolition", hint: "Existing structure to clear", mult: 1.08 },
];

/**
 * Professional services, charged as a percentage of construction cost.
 * Selecting the full design-build package applies the bundled rate rather
 * than the sum of the parts.
 */
export const SERVICES: { id: string; label: string; pct: Band; note: string }[] = [
  { id: "architecture", label: "Architectural design", pct: { low: 3.5, high: 5.0 }, note: "Concept to approved drawings" },
  { id: "structural", label: "Structural engineering", pct: { low: 1.5, high: 2.5 }, note: "Design and certification" },
  { id: "qs", label: "Quantity surveying", pct: { low: 1.0, high: 2.0 }, note: "Cost plan and BOQ" },
  { id: "mep", label: "MEP engineering", pct: { low: 1.5, high: 2.5 }, note: "Services design" },
  { id: "pm", label: "Construction management", pct: { low: 4.0, high: 6.0 }, note: "Delivery and supervision" },
];

/** Taking the whole scope under one contract, rather than piece by piece. */
export const BUNDLE = {
  id: "design-build",
  label: "Full design + build (all disciplines)",
  pct: { low: 11.0, high: 15.0 },
  note: "One contract, one accountable team — typically below the sum of separate appointments",
};

/** Statutory approvals, NCA levy and contingency, as a percentage of works. */
export const ADDITIONS = {
  approvals: { label: "Approvals, levies & statutory fees", pct: { low: 1.5, high: 3.0 } },
  contingency: { label: "Recommended contingency", pct: { low: 5.0, high: 10.0 } },
};

export const AREA_LIMITS = { min: 500, max: 60000, step: 100, default: 2500 };
