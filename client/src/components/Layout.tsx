import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { COMPANY, NAV } from "../data/site";
import { IconArrow, IconMail, IconPhone, IconPin } from "./Icon";

/* ---------- reveal on scroll ---------- */
/* Content is visible by default and only hidden once the observer is live,
   so a scripting failure can never leave the page blank. */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = [className, armed ? "rev" : "", armed && shown ? "in" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref as never} className={cls}>
      {children}
    </Tag>
  );
}

/* ---------- nav ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="nav">
        <div className="nav-in">
          <Link to="/" className="brand" aria-label={`${COMPANY.legal}, home`}>
            <img src="/img/ace-logo.jpeg" alt="" />
            <span>
              <span className="brand-name">{COMPANY.name}</span>
              <span className="brand-sub">{COMPANY.tagline}</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => (isActive ? "on" : undefined)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/contact" className="nav-cta">
            <span className="cta-full">Start a Project</span>
            <span className="cta-short">Enquire</span>
          </Link>

          <button
            className={`burger${open ? " on" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <i />
          </button>
        </div>
      </header>

      <div className={`drawer${open ? " on" : ""}`}>
        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === "/"}>
            <em>{item.n}</em>
            {item.label}
          </NavLink>
        ))}
        <Link to="/contact" className="btn">
          Start a Project <IconArrow />
        </Link>
      </div>
    </>
  );
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link to="/" className="brand" style={{ marginRight: 0 }}>
              <img src="/img/ace-logo.jpeg" alt="" />
              <span>
                <span className="brand-name">{COMPANY.name}</span>
                <span className="brand-sub">{COMPANY.tagline}</span>
              </span>
            </Link>
            <p className="foot-tag">
              Integrated architecture, structural engineering, interior design and
              construction management, delivered by one accountable team. Nairobi,
              Kenya. Established {COMPANY.founded}.
            </p>
            <div className="foot-contact">
              <a href={COMPANY.phoneHref}>
                <IconPhone /> {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`}>
                <IconMail /> {COMPANY.email}
              </a>
              <Link to="/contact">
                <IconPin /> {COMPANY.city}
              </Link>
            </div>
          </div>

          <div>
            <div className="foot-t">Disciplines</div>
            <div className="foot-links">
              <Link to="/services#architecture">Architecture &amp; Design</Link>
              <Link to="/services#structural">Structural Engineering</Link>
              <Link to="/services#construction">Construction Management</Link>
              <Link to="/services#fitout">Interior Fit-Out</Link>
              <Link to="/services#diaspora">Diaspora Real Estate</Link>
              <Link to="/services#masterplanning">Industrial Masterplanning</Link>
            </div>
          </div>

          <div>
            <div className="foot-t">Company</div>
            <div className="foot-links">
              <Link to="/about">About ACE</Link>
              <Link to="/work">Selected Work</Link>
              <Link to="/work#team">Our Team</Link>
              <Link to="/work#credentials">Credentials</Link>
              <Link to="/journal">Journal</Link>
              <Link to="/faq">FAQ</Link>
            </div>
          </div>

          <div>
            <div className="foot-t">Enquiries</div>
            <div className="foot-links">
              <Link to="/estimator">Cost Estimator</Link>
              <Link to="/contact">Start a Project</Link>
              <Link to="/contact">Request Credentials</Link>
              <Link to="/contact">Diaspora Enquiries</Link>
              <Link to="/terms">Terms &amp; Conditions</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="foot-bot">
          <span className="foot-copy">
            © {new Date().getFullYear()} {COMPANY.legal}. All rights reserved.{" "}
            {COMPANY.city}.
          </span>
          <div className="foot-pills">
            {["NCA Cat 4", "AAK", "IEK", "ACMK", "KABCEC", "BORAQS"].map((p) => (
              <span key={p} className="foot-pill">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- scroll restoration ----------
 *
 * Two things this has to survive.
 *
 * 1. `scrollTo({behavior:"instant"})` throws a TypeError on browsers that
 *    predate that enum value (below Chrome 97 / Safari 15.4). Thrown from an
 *    effect with no boundary above it, React 18 unmounts the whole root — the
 *    route changes and the screen goes blank. Never risk it: use the
 *    two-argument form, which every browser has always supported.
 *
 * 2. `html { scroll-behavior: smooth }` would otherwise animate the jump to
 *    the top. Coming home from a long page that means a slow crawl, or
 *    landing clamped at the bottom of a shorter page looking at the footer,
 *    which reads as "the link did nothing". Suspend it for the jump.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    try {
      const target = hash ? document.querySelector(hash) : null;
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 96;
        window.scrollTo(0, Math.max(top, 0));
      } else {
        window.scrollTo(0, 0);
      }
    } catch {
      /* Scrolling must never be able to break navigation. */
    } finally {
      root.style.scrollBehavior = previous;
    }
  }, [pathname, hash]);

  return null;
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollManager />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
