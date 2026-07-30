import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/chrome";
import { StatTiles } from "@/components/figures";
import { capabilities, repo, roles, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="shell hero">
        <p className="hero-eyebrow">
          <span>{site.title}</span>
          <span className="sep" aria-hidden="true" />
          <span>{site.location}</span>
          <span className="sep" aria-hidden="true" />
          <span>{site.availability}</span>
        </p>

        <h1>
          I build ecommerce storefronts that stay fast{" "}
          <span className="quiet">
            — and I hand over the measurement, not a screenshot.
          </span>
        </h1>

        <p className="hero-sub">
          {site.summary} Most performance claims cannot be checked by the person
          reading them. Mine ship as a repository you can clone and a command you
          can run.
        </p>

        <div className="hero-actions">
          <Link className="btn btn-primary" href="/work/shopify-headless-perf-lab">
            See the evidence
            <ArrowRight />
          </Link>
          <a className="btn btn-ghost" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
      </section>

      <section className="shell section" aria-labelledby="measured">
        <h2 className="section-label" id="measured">
          Measured, not asserted
        </h2>
        <StatTiles />
        <p className="kpi-caption">
          The same Shopify storefront, shipped in two modes and measured by one
          command on the homepage route — mobile, applied throttling at 4× CPU on
          Slow 4G, median of three runs. Nothing here was typed by hand; the
          numbers are generated into the repository and regenerate on your machine.
        </p>
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
            runtime, shipped in two modes: one built the way it should go out, one
            carrying six regressions that real app-heavy themes have. One script
            measures both, so the difference between them is an observation
            instead of a claim. Lighthouse budgets then run on every pull request
            and block the ones that break them.
          </p>
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
          Next up: an order and inventory sync service with a harness that proves
          duplicate, out-of-order and half-failed webhooks cannot corrupt stock
          levels.
        </p>
      </section>

      <section className="shell section" aria-labelledby="how">
        <h2 className="section-label" id="how">
          How I work
        </h2>
        <div className="prose">
          <p>
            <strong>Performance is a budget, not a sprint.</strong> A store gets
            slow one reasonable request at a time — a reviews app in January, a
            popup in March, an upsell widget in May. Nobody measures any of them,
            and by December nobody can say which one did it. I put the cost on the
            pull request that introduces it, while it is still one line to revert.
          </p>
          <p>
            <strong>Decisions get written down.</strong> Every project I own
            carries short decision records that name what was given up. Checkout
            stays on Shopify because PCI scope is not worth owning; the demo runs
            on a public mock API because a repository nobody can run is a
            screenshot gallery. Being able to say what a choice cost is the part
            that transfers between teams.
          </p>
          <p>
            <strong>Unflattering results stay in.</strong> One of the six levers
            in my own comparison does not move its metric, and the report says so
            rather than quietly dropping the row. Measurement is only worth
            anything if it is allowed to disagree with you.
          </p>
        </div>
      </section>

      <section className="shell section" aria-labelledby="capabilities">
        <h2 className="section-label" id="capabilities">
          Capabilities
        </h2>
        <div className="cap-grid">
          {capabilities.map((c) => (
            <div className="cap" key={c.heading}>
              <h3>{c.heading}</h3>
              <p>{c.body}</p>
            </div>
          ))}
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
            I am open to senior ecommerce engineering roles, remote from{" "}
            {site.location}. The fastest way to judge whether I am worth an
            interview is to open the repository below and run the command in its
            README.
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
            GitHub repository
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
