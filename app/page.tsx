import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/chrome";
import { ProjectCard } from "@/components/project-card";
import { projects, roles, site, stack } from "@/lib/site";

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
          I build and speed up Shopify storefronts — Liquid themes and headless
          front ends on Next.js and Hydrogen, custom apps on the Admin and
          Storefront APIs, and the catalog and order integrations behind them.
          Thirteen years in web development, eight of them on Shopify and
          Shopify Plus.
        </p>

        <div className="hero-actions">
          <Link className="btn btn-primary" href="#work">
            View work
            <ArrowRight />
          </Link>
          <a className="btn btn-ghost" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          {site.resumePdf && (
            <a className="btn btn-ghost" href={site.resumePdf} download>
              Résumé (PDF)
            </a>
          )}
        </div>
      </section>

      <section className="shell section" id="work" aria-labelledby="work-heading">
        <h2 className="section-label" id="work-heading">
          Featured work
        </h2>
        <div className="project-list">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i === 0} />
          ))}
        </div>
      </section>

      <section className="shell section" aria-labelledby="stack-heading">
        <h2 className="section-label" id="stack-heading">
          Stack
        </h2>
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
        <p className="note" style={{ marginTop: "1.5rem" }}>
          The rest — WooCommerce, BigCommerce, Vue, Redis, MongoDB, AWS, Klaviyo,
          GTM, Stripe, ShipStation — is on the{" "}
          <Link href="/about">full background</Link>.
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
            href={site.github}
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
