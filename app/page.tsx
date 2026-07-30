import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/chrome";
import { practice, repo, roles, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="shell hero">
        <p className="hero-eyebrow">
          <span>{site.name}</span>
          <span className="sep" aria-hidden="true" />
          <span>{site.location}</span>
          <span className="sep" aria-hidden="true" />
          <span>{site.availability}</span>
        </p>

        <h1>
          Shopify and headless <span className="quiet">commerce engineer</span>
        </h1>

        <p className="hero-sub">
          Thirteen years building for the web, eight of them on Shopify and
          Shopify Plus. I work across the storefront and the systems behind it —
          Liquid themes and headless front ends, custom apps on the Admin and
          Storefront APIs, catalog and order integrations, and the performance
          and CRO work that decides whether traffic turns into orders.
        </p>

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

      <section className="shell section" aria-labelledby="practice">
        <h2 className="section-label" id="practice">
          What I do
        </h2>
        <div className="practice-grid">
          {practice.map((p) => (
            <article className="practice" key={p.heading}>
              <h3>{p.heading}</h3>
              <p className="practice-body">{p.body}</p>
              <p className="practice-proof">{p.proof}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell section" id="work" aria-labelledby="work-heading">
        <h2 className="section-label" id="work-heading">
          Selected work
        </h2>

        <Link className="work-card" href="/work/shopify-headless-perf-lab">
          <span className="work-kicker">Open source · Case study</span>
          <h3>Shopify Headless Perf Lab</h3>
          <p>
            A headless Shopify storefront on Hydrogen and the Oxygen worker
            runtime, built so its performance numbers can be re-run rather than
            taken on trust. The same storefront ships in two modes — one tuned,
            one carrying six regressions that app-heavy themes commonly pick up —
            and a single script measures both. Lighthouse budgets then run on
            every pull request, so a regression is caught at review time.
          </p>
          <ul className="result-row">
            <li>
              <span className="result-value">−47%</span>
              <span className="result-label">Largest Contentful Paint</span>
            </li>
            <li>
              <span className="result-value">143 → 4 ms</span>
              <span className="result-label">Total Blocking Time</span>
            </li>
            <li>
              <span className="result-value">−34%</span>
              <span className="result-label">Transfer size</span>
            </li>
          </ul>
          <div className="tag-row">
            {[
              "Hydrogen",
              "React Router 7",
              "Oxygen",
              "TypeScript",
              "Storefront API",
              "Lighthouse CI",
              "GitHub Actions",
            ].map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          <span className="work-more">
            Read the case study
            <ArrowRight />
          </span>
        </Link>

        <p className="note" style={{ marginTop: "1.5rem" }}>
          In progress: an order and inventory sync service with a harness that
          replays duplicate, out-of-order and half-failed webhooks to show stock
          levels stay correct through all of them.
        </p>
      </section>

      <section className="shell section" aria-labelledby="how">
        <h2 className="section-label" id="how">
          How I work
        </h2>
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

      <section className="shell section" aria-labelledby="experience">
        <h2 className="section-label" id="experience">
          Experience
        </h2>
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

      <section className="shell section" aria-labelledby="contact">
        <h2 className="section-label" id="contact">
          Contact
        </h2>
        <div className="prose">
          <p>
            I am open to senior Shopify and headless commerce roles, remote from{" "}
            {site.location}. Happy to walk through any of the work above, or talk
            about what you are building.
          </p>
        </div>
        <div className="hero-actions" style={{ marginTop: "2rem" }}>
          <a className="btn btn-primary" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a
            className="btn btn-ghost"
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <ArrowUpRight />
          </a>
          <a
            className="btn btn-ghost"
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <ArrowUpRight />
          </a>
        </div>
      </section>
    </>
  );
}
