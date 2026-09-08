import path from "node:path";
import fs from "node:fs";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { initMailer, mailDisabledReason, mailReady, sendMail } from "./mailer";

const app = express();
const PORT = Number(process.env.PORT || 8080);
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || process.env.MAIL_USERNAME || "";

app.set("trust proxy", 1);
app.use(
  helmet({
    // The SPA loads Google Fonts; everything else stays same-origin.
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
);
app.use(compression());
app.use(cors({ origin: true }));
app.use(express.json({ limit: "64kb" }));

/* Forms are the only write path — keep them cheap to abuse. */
const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many submissions. Please try again shortly." },
});

/* ---------------- validation ---------------- */

const enquirySchema = z.object({
  first_name: z.string().trim().min(1).max(80),
  last_name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  project_type: z.string().trim().max(80).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  timeline: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(4000),
});

const subscribeSchema = z.object({
  email: z.string().trim().email().max(160),
});

const dash = (v?: string) => (v && v.length ? v : "-");

/* ---------------- API ---------------- */

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, mail: mailReady() });
});

app.post("/api/enquiry", formLimiter, async (req, res) => {
  const parsed = enquirySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "Please check the form and try again." });
  }
  const d = parsed.data;

  if (!mailReady() || !COMPANY_EMAIL) {
    console.error(`[enquiry] not sent — ${mailDisabledReason() || "COMPANY_EMAIL missing"}`, {
      from: d.email,
    });
    return res.status(503).json({
      ok: false,
      error: "Our mail service is temporarily unavailable. Please call us and we will pick it up directly.",
    });
  }

  const body = `NEW PROJECT ENQUIRY

CONTACT
  Name:     ${d.first_name} ${d.last_name}
  Email:    ${d.email}
  Phone:    ${dash(d.phone)}
  Company:  ${dash(d.company)}

PROJECT
  Service:   ${dash(d.service)}
  Type:      ${dash(d.project_type)}
  Budget:    ${dash(d.budget)}
  Location:  ${dash(d.location)}
  Start:     ${dash(d.timeline)}

MESSAGE
${d.message}
`;

  try {
    await sendMail({
      to: COMPANY_EMAIL,
      subject: `New Enquiry — ${d.first_name} ${d.last_name} (${d.service || "unspecified"})`,
      text: body,
      replyTo: d.email,
    });

    // The acknowledgement must never fail the request: the enquiry is already in.
    sendMail({
      to: d.email,
      subject: "ACE Design + Build Partners — we have your enquiry",
      text: `Hello ${d.first_name},

Thank you for contacting ACE Design + Build Partners. Your enquiry has reached
our team and we will respond within one business day.

If it is urgent, call us on +254 726 314 608.

Regards,
ACE — Adaptive City Ecosystems Ltd
Nairobi, Kenya
`,
    }).catch((err) => console.error("[enquiry] auto-reply failed:", err.message));

    return res.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] send failed:", (err as Error).message);
    return res.status(502).json({
      ok: false,
      error: "We could not send that just now. Please call +254 726 314 608.",
    });
  }
});

app.post("/api/subscribe", formLimiter, async (req, res) => {
  const parsed = subscribeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }
  const { email } = parsed.data;

  if (!mailReady() || !COMPANY_EMAIL) {
    return res.status(503).json({ ok: false, error: "Subscriptions are temporarily unavailable." });
  }

  try {
    await sendMail({
      to: COMPANY_EMAIL,
      subject: "New newsletter subscriber",
      text: `New subscriber: ${email}`,
      replyTo: email,
    });

    sendMail({
      to: email,
      subject: "Welcome to the ACE newsletter",
      text: `Thank you for subscribing to ACE Design + Build Partners.

Once a month you will receive project updates, completed handovers and
practical writing on building in Kenya.

ACE — Adaptive City Ecosystems Ltd
Nairobi, Kenya
`,
    }).catch((err) => console.error("[subscribe] welcome failed:", err.message));

    return res.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] send failed:", (err as Error).message);
    return res.status(502).json({ ok: false, error: "That did not go through. Please try again." });
  }
});

/* ---------------- static SPA ---------------- */

const clientDir = path.resolve(__dirname, "../../client/dist");

if (fs.existsSync(clientDir)) {
  app.use(
    express.static(clientDir, {
      maxAge: "1y",
      setHeaders: (res, filePath) => {
        // The shell must never be cached, or deploys go unseen.
        if (filePath.endsWith("index.html")) res.setHeader("Cache-Control", "no-cache");
      },
    }),
  );

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    // Same no-cache rule the static middleware applies to index.html at "/".
    // Without it sendFile emits "public, max-age=0" and a phone can hold a
    // stale shell pointing at a bundle from a previous deploy.
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(path.join(clientDir, "index.html"));
  });
} else {
  console.warn(`[static] no client build at ${clientDir} — API only`);
}

app.use((req, res) => res.status(404).json({ ok: false, error: `Not found: ${req.path}` }));

initMailer();
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[ace] listening on :${PORT}`);
});
