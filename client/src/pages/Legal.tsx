import { Link } from "react-router-dom";
import { PageHead } from "../components/Blocks";
import { COMPANY } from "../data/site";

/* ---------------- TERMS ---------------- */
export function Terms() {
  const sections = [
    { id: "acceptance", n: "01", t: "Acceptance of Terms" },
    { id: "services", n: "02", t: "Services" },
    { id: "ip", n: "03", t: "Intellectual Property" },
    { id: "liability", n: "04", t: "Limitation of Liability" },
    { id: "payments", n: "05", t: "Payments & Contracts" },
    { id: "law", n: "06", t: "Governing Law" },
  ];

  return (
    <>
      <PageHead crumb="Terms of Use" eyebrow="Legal" title="Terms of Use" lead="The rules and conditions governing your use of the ACE — Adaptive City Ecosystems website and services.">
        <div className="foot-pills" style={{ marginTop: 6 }}>
          <span className="foot-pill">Last updated January 2026</span>
          <span className="foot-pill">Governed by Kenyan Law</span>
        </div>
      </PageHead>

      <section className="section">
        <div className="wrap">
          <div className="doc">
            <nav className="doc-nav" aria-label="Contents">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  {s.n} — {s.t}
                </a>
              ))}
            </nav>

            <div className="prose">
              <h2 id="acceptance">01 — Acceptance of Terms</h2>
              <p>
                By accessing or using the ACE — Adaptive City Ecosystems website and submitting any
                contact or enquiry form, you agree to be bound by these Terms of Use. If you do not
                agree to these terms, please discontinue use of the site.
              </p>
              <p>
                These terms apply to all visitors, clients and users who access our website and
                services. ACE reserves the right to update these terms at any time without prior
                notice — continued use of the site constitutes acceptance of any changes.
              </p>

              <h2 id="services">02 — Services</h2>
              <p>
                {COMPANY.legal} provides integrated architecture, structural engineering, interior
                fit-out and construction management services across Kenya and East Africa.
                Information submitted through any contact form on this website is used solely to
                evaluate, scope and deliver these professional services.
              </p>
              <p>
                All service engagements are governed by a formal written contract agreed between ACE
                and the client prior to commencement of any work. Website content, including any
                figure produced by the cost estimator, is provided for informational purposes only
                and does not constitute a binding service agreement, quotation or offer.
              </p>

              <h2 id="ip">03 — Intellectual Property</h2>
              <p>
                All logos, branding, architectural drawings, project images, design concepts, written
                content and other materials published on this website are the exclusive intellectual
                property of {COMPANY.legal}. All rights are reserved.
              </p>
              <p>
                Unauthorised reproduction, distribution, modification or use of any content from this
                site — in whole or in part — without prior written consent from ACE is strictly
                prohibited and may constitute an infringement of copyright and intellectual property
                law under Kenyan and international statutes.
              </p>
              <p>
                To request permission to use ACE content, <Link to="/contact">contact us directly</Link>.
              </p>

              <h2 id="liability">04 — Limitation of Liability</h2>
              <p>
                ACE strives to ensure all website content is accurate, up to date and complete.
                However, we make no warranties, express or implied, regarding the accuracy,
                completeness or suitability of the information provided.
              </p>
              <p>
                ACE is not liable for any direct, indirect, incidental or consequential damages
                arising from reliance on website content — including cost estimator output — or from
                service delays, interruptions or factors beyond our reasonable control such as force
                majeure events, regulatory changes, supply chain disruptions or third-party failures.
              </p>
              <p>
                Nothing in these terms limits ACE's liability for death, personal injury or fraud
                caused by our negligence.
              </p>

              <h2 id="payments">05 — Payments &amp; Contracts</h2>
              <p>
                All financial transactions between ACE and clients are governed by formal written
                contracts and invoices issued by {COMPANY.legal}. Payment terms, milestone schedules
                and retention amounts are defined within each individual project contract.
              </p>
              <p>
                Submitting an enquiry or contact form on this website does not constitute a binding
                agreement, order or commitment of any kind. No work will commence without a signed
                contract and agreed payment terms in place.
              </p>
              <p>
                ACE reserves the right to suspend or terminate services in the event of non-payment,
                in accordance with the terms set out in the applicable project contract.
              </p>

              <h2 id="law">06 — Governing Law</h2>
              <p>
                These Terms of Use are governed by and construed in accordance with the laws of the
                Republic of Kenya. Any disputes arising from or in connection with these terms, or
                the use of ACE's website and services, shall be subject to the exclusive jurisdiction
                of the Kenyan courts.
              </p>

              <Link to="/contact" className="link-a" style={{ marginTop: 10 }}>
                Have a Question? Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- PRIVACY ---------------- */
export function Privacy() {
  const sections = [
    { id: "intro", t: "Introduction" },
    { id: "collect", t: "Information We Collect" },
    { id: "use", t: "How We Use It" },
    { id: "cookies", t: "Cookies & Analytics" },
    { id: "sharing", t: "Data Sharing" },
    { id: "security", t: "Data Security" },
    { id: "rights", t: "Your Rights" },
    { id: "contact", t: "Contact Us" },
  ];

  return (
    <>
      <PageHead crumb="Privacy Policy" eyebrow="Legal" title="Privacy Policy" lead="How we collect, use and protect your personal information — in compliance with the Kenya Data Protection Act, 2019.">
        <div className="foot-pills" style={{ marginTop: 6 }}>
          <span className="foot-pill">Kenya Data Protection Act 2019</span>
          <span className="foot-pill">Last updated January 2026</span>
        </div>
      </PageHead>

      <section className="section">
        <div className="wrap">
          <div className="doc">
            <nav className="doc-nav" aria-label="Contents">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  {s.t}
                </a>
              ))}
            </nav>

            <div className="prose">
              <h2 id="intro">Introduction</h2>
              <p>
                {COMPANY.legal} values your privacy. This policy explains how we collect, use and
                protect your personal information in compliance with the Kenya Data Protection Act,
                2019.
              </p>

              <h2 id="collect">Information We Collect</h2>
              <p>When you submit an enquiry through this website, we collect only what we need in order to reply usefully:</p>
              <ul>
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company or organisation name</li>
                <li>Project type and service of interest</li>
                <li>Estimated budget and preferred start date</li>
                <li>Project location</li>
                <li>The project details you choose to share in your message</li>
              </ul>
              <p>
                The cost estimator runs entirely in your browser. Nothing you enter into it is sent
                to us unless you choose to carry the result into an enquiry.
              </p>

              <h2 id="use">How We Use Your Information</h2>
              <ul>
                <li>To respond to enquiries and provide design and construction services.</li>
                <li>To prepare quotations and project proposals.</li>
                <li>To communicate updates regarding live projects.</li>
                <li>For internal record-keeping and business analysis.</li>
              </ul>
              <p>
                We do not use your details for automated marketing sequences, and we do not add
                enquiry contacts to our newsletter unless you subscribe to it yourself.
              </p>

              <h2 id="cookies">Cookies &amp; Analytics</h2>
              <p>
                Our website may use cookies to improve user experience and monitor site performance,
                and we may use analytics tools to understand how visitors interact with the site. You
                can disable cookies in your browser settings, though some features may not function
                properly as a result.
              </p>

              <h2 id="sharing">Data Sharing</h2>
              <p>
                We do not sell or rent personal data. Information may be shared with subcontractors
                or partners strictly where it is necessary for project execution. Disclosure may also
                occur where required by Kenyan law or by a regulatory authority.
              </p>

              <h2 id="security">Data Security</h2>
              <p>
                We implement reasonable technical and organisational measures to protect personal
                data. Access is restricted to authorised staff only, and data is retained only as
                long as necessary for business or legal purposes.
              </p>

              <h2 id="rights">Your Rights</h2>
              <p>Under the Kenya Data Protection Act, 2019, you may:</p>
              <ul>
                <li>Request access to the personal data we hold about you.</li>
                <li>Correct or update inaccurate information.</li>
                <li>Request deletion of your data.</li>
                <li>Withdraw consent for data processing at any time.</li>
              </ul>

              <h2 id="contact">Contact Us</h2>
              <p>For questions or requests regarding your data, contact:</p>
              <p>
                <strong>{COMPANY.legal}</strong>
                <br />
                {COMPANY.address}, {COMPANY.city}
                <br />
                Email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                <br />
                Phone: <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- 404 ---------------- */
export function NotFound() {
  return (
    <>
      <PageHead crumb="Not Found" eyebrow="Error 404" title="That page does not exist." lead="The link may be out of date. Everything on the site is reachable from the menu, or start with the work.">
        <div className="actions" style={{ marginTop: 8 }}>
          <Link to="/" className="btn">
            Back to Home
          </Link>
          <Link to="/work" className="btn btn-line">
            Selected Work
          </Link>
        </div>
      </PageHead>
      <section className="section" />
    </>
  );
}
