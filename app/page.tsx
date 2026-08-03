import Link from "next/link";
import { ArrowRight } from "@/components/chrome";
import { ContactPanel } from "@/components/contact-panel";
import { WorkIndex } from "@/components/work-index";
import { roles, site, stack } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* ---- masthead ------------------------------------------------------ */}
      <section className="masthead shell">
        <p className="status">
          <span className="dot" aria-hidden="true" />
          Available for senior roles
          <span className="sep" aria-hidden="true" />
          Remote · {site.location}
        </p>

        <h1 className="masthead-title">
          Shopify &amp; headless <span className="quiet">commerce engineer.</span>
        </h1>

        <p className="masthead-sub">
          I make Shopify and Shopify&nbsp;Plus stores fast, reliable, and easy for
          a marketing team to run — from Liquid themes and headless front ends to
          the custom apps and integrations behind them.
        </p>

        <div className="masthead-meta">
          <span>
            <b>13</b>yrs on the web
          </span>
          <span>
            <b>8+</b>yrs Shopify Plus
          </span>
          <span>
            <b>4</b>open-source labs
          </span>
        </div>

        <div className="hero-actions">
          <Link className="btn btn-primary" href="#work">
            Selected work
            <ArrowRight />
          </Link>
          <a className="btn btn-ghost" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
      </section>

      {/* ---- selected work ------------------------------------------------- */}
      <section className="section shell" id="work" aria-labelledby="work-title">
        <div className="s-head">
          <span className="s-num">
            <b>01</b> / 05
          </span>
          <h2 className="s-title" id="work-title">
            Selected work
          </h2>
          <p className="s-note">
            Four open-source builds. Each ships the same job twice and measures
            the difference, so the numbers are a command you can re-run rather
            than a claim.
          </p>
        </div>
        <WorkIndex />
      </section>

      {/* ---- capabilities -------------------------------------------------- */}
      <section className="section shell" aria-labelledby="stack-title">
        <div className="s-head">
          <span className="s-num">
            <b>02</b> / 05
          </span>
          <h2 className="s-title" id="stack-title">
            Capabilities
          </h2>
          <p className="s-note">
            The tools I reach for first. The rest — WooCommerce, BigCommerce, Vue,
            Redis, MongoDB, AWS, Klaviyo, GTM, Stripe, ShipStation — is on the{" "}
            <Link href="/about">full background</Link>.
          </p>
        </div>
        <dl className="stack-grid">
          {stack.map((g) => (
            <div className="stack-group" key={g.group}>
              <dt>{g.group}</dt>
              <dd>
                <ul className="tag-row" style={{ marginTop: 0 }}>
                  {g.items.map((i) => (
                    <li className="tag" key={i}>
                      {i}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---- approach ------------------------------------------------------ */}
      <section className="section shell" aria-labelledby="how-title">
        <div className="s-head">
          <span className="s-num">
            <b>03</b> / 05
          </span>
          <h2 className="s-title" id="how-title">
            How I work
          </h2>
          <p className="s-note">Three habits that show up in every build.</p>
        </div>
        <div className="prose">
          <p>
            <strong>Performance is a budget, not a sprint.</strong> A storefront
            accumulates cost one reasonable request at a time — a reviews app, a
            popup, an upsell widget. I put the number on the pull request that
            introduces it, so the merchant is choosing between a feature and a
            measured cost while it is still one line to revert.
          </p>
          <p>
            <strong>Decisions get written down.</strong> Short decision records
            for the calls that shaped a build, and runbooks for the failures
            support will meet at 2am. The person picking the store up in six
            months is usually not me.
          </p>
          <p>
            <strong>Risky work ships in phases.</strong> On a replatform I like
            navigation and catalog pages to land and settle before the PDP, so
            there is a working store at every step rather than one launch that
            has to go perfectly.
          </p>
        </div>
      </section>

      {/* ---- experience ---------------------------------------------------- */}
      <section className="section shell" aria-labelledby="exp-title">
        <div className="s-head">
          <span className="s-num">
            <b>04</b> / 05
          </span>
          <h2 className="s-title" id="exp-title">
            Experience
          </h2>
          <p className="s-note">
            The last four roles. Six-role history on the{" "}
            <Link href="/about">full background</Link>.
          </p>
        </div>
        <div className="role-list">
          {roles.slice(0, 4).map((r) => (
            <article className="role" key={r.when}>
              <p className="role-when">{r.when}</p>
              <div>
                <p className="role-title">{r.title}</p>
                <p className="role-org">{r.org}</p>
                <p className="role-note">{r.note}</p>
              </div>
            </article>
          ))}
        </div>
        <p style={{ marginTop: "2rem" }}>
          <Link className="btn btn-ghost" href="/about">
            Full background
            <ArrowRight />
          </Link>
        </p>
      </section>

      {/* ---- contact ------------------------------------------------------- */}
      <section className="section shell cta" id="contact" aria-labelledby="contact-title">
        <div className="s-head">
          <span className="s-num">
            <b>05</b> / 05
          </span>
          <h2 className="s-title" id="contact-title">
            Contact
          </h2>
          <p className="s-note">
            Hiring for a Shopify or headless role, or want a second opinion on a
            store? Send a line or grab a time — whichever is easier.
          </p>
        </div>
        <p className="cta-line">
          Have a storefront that needs to be faster, or a build that needs an
          owner who measures?
        </p>
        <ContactPanel />
      </section>
    </>
  );
}
