import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CREDENTIALS, type Project } from "../data/site";
import { IconArrow, IconCheck, DISCIPLINE_ICONS } from "./Icon";
import { Reveal } from "./Layout";

/* ---------- page header ---------- */
export function PageHead({
  crumb,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumb: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="phead">
      <div className="wrap phead-in">
        <div className="crumb">
          <Link to="/">Home</Link> <span>/</span> <span>{crumb}</span>
        </div>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="t-hero">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/* ---------- section header ---------- */
export function Head({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: ReactNode;
  note?: string;
}) {
  return (
    <div className="head">
      <div className="head-main">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="t-h2">{title}</h2>
      </div>
      {note && <p className="lead head-note">{note}</p>}
    </div>
  );
}

/* ---------- credential strip ---------- */
export function CredStrip() {
  return (
    <div className="creds-strip">
      <div className="wrap creds-strip-in">
        <span className="creds-strip-lab">Registered with</span>
        <div className="creds-strip-list">
          <span>NCA Category 4</span>
          <span>AAK</span>
          <span>IEK</span>
          <span>ACMK</span>
          <span>KABCEC</span>
          <span>BORAQS</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- project card ---------- */
export function ProjectCard({
  project,
  lead = false,
}: {
  project: Project;
  lead?: boolean;
}) {
  return (
    <Reveal as="article" className={`proj${lead ? " proj-lead" : ""}`}>
      <div className="proj-media">
        <img src={project.image} alt={`${project.name} — ${project.categoryLabel}`} loading="lazy" />
        <div className="proj-tags">
          {project.flagship && <span className="tag-pill is-green">Flagship</span>}
          <span className={`tag-pill${project.status === "delivered" ? " is-white" : ""}`}>
            {project.statusLabel}
          </span>
        </div>
      </div>
      <div className="proj-body">
        <span className="proj-cat">{project.categoryLabel}</span>
        <h3 className={lead ? "t-h3" : "t-h4"}>{project.name}</h3>
        <p className={lead ? "body" : "small"}>{project.summary}</p>
        <div className="proj-facts">
          {project.facts.map((f) => (
            <span key={f.label}>
              <b>{f.value}</b> {f.label}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- discipline card ---------- */
export function DisciplineCard({
  n,
  icon,
  title,
  blurb,
  anchor,
}: {
  n: string;
  icon: string;
  title: string;
  blurb: string;
  anchor: string;
}) {
  const Ico = DISCIPLINE_ICONS[icon];
  return (
    <Reveal as="article" className="disc">
      <div className="disc-ico">{Ico && <Ico size={26} />}</div>
      <span className="disc-n">{n}</span>
      <h3 className="t-h4">{title}</h3>
      <p>{blurb}</p>
      <Link to={`/services#${anchor}`} className="disc-more">
        Explore <IconArrow size={13} />
      </Link>
    </Reveal>
  );
}

/* ---------- credentials grid ---------- */
export function Credentials() {
  return (
    <div className="cred-grid">
      {CREDENTIALS.map((c) => (
        <div key={c.acronym} className="cred">
          <div className="cred-top">
            <span className="cred-ac">{c.acronym}</span>
            <span className="cred-state">{c.state}</span>
          </div>
          <div className="cred-name">{c.name}</div>
          <p>{c.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- tick list ---------- */
export function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="ticks">
      {items.map((t) => (
        <li key={t}>
          <IconCheck />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- CTA band ---------- */
export function Cta({
  eyebrow,
  title,
  note,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: ReactNode;
  note: string;
  primary: { to: string; label: string };
  secondary?: { to: string; label: string; external?: boolean };
}) {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="cta">
          <div className="cta-l">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="t-h2">{title}</h2>
          </div>
          <div className="cta-r">
            <p className="lead" style={{ margin: 0 }}>
              {note}
            </p>
            <div className="actions">
              <Link to={primary.to} className="btn">
                {primary.label} <IconArrow />
              </Link>
              {secondary &&
                (secondary.external ? (
                  <a href={secondary.to} className="btn btn-line">
                    {secondary.label}
                  </a>
                ) : (
                  <Link to={secondary.to} className="btn btn-line">
                    {secondary.label}
                  </Link>
                ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
