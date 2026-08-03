import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/chrome";
import { capabilities, repo, roles, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Clinton Brown — senior e-commerce full stack developer in Murfreesboro, TN. 13 years in web development, 8+ on Shopify and Shopify Plus.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <section className="shell case-header">
        <Link href="/" className="back-link">
          ← Home
        </Link>
        <h1>Thirteen years of shipping commerce, mostly on Shopify.</h1>
        <div className="prose" style={{ marginTop: "2rem" }}>
          <p>
            I am a senior e-commerce full stack developer in {site.location},
            working remotely. Eight of my thirteen years have been on Shopify and
            Shopify Plus — Liquid themes, the Admin and Storefront APIs, custom
            apps, Checkout Extensibility — and the rest across React, Next.js,
            Node.js and Laravel for merchants and SaaS teams.
          </p>
          <p>
            The work I am best at sits between the storefront and the systems
            behind it: catalog and inventory sync, webhook reliability, Core Web
            Vitals, technical SEO, and the conversion-rate work that decides
            whether traffic a merchant paid for turns into orders. Enough of my
            time has gone into production hotfixes that I would rather catch a
            problem in review than at 2am.
          </p>
          <p>
            I work closely with merchants, designers and product managers, and I
            write things down — estimates, decision records, runbooks — because
            the person picking the store up in six months is usually not me.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/#contact">
            Get in touch
            <ArrowRight />
          </Link>
          <a
            className="btn btn-ghost"
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <ArrowUpRight />
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
        </div>
      </section>

      <section className="shell section" aria-labelledby="experience">
        <h2 className="section-label" id="experience">
          Experience
        </h2>
        <div className="role-list">
          {roles.map((r) => (
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

      <section className="shell section" aria-labelledby="education">
        <h2 className="section-label" id="education">
          Education & open source
        </h2>
        <div className="role-list">
          <article className="role">
            <p className="role-when">Aug 2009 — May 2013</p>
            <div>
              <p className="role-title">B.S. Computer Science</p>
              <p className="role-org">
                Middle Tennessee State University · Murfreesboro, TN
              </p>
            </div>
          </article>
          <article className="role">
            <p className="role-when">Open source</p>
            <div>
              <p className="role-title">Shopify Headless Perf Lab</p>
              <p className="role-org">
                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                  github.com/Seedh0922/shopify-headless-perf-lab
                </a>
              </p>
              <p className="role-note">
                Hydrogen storefront on the Oxygen worker runtime, shipped in two
                modes so the performance claim is a command anyone can re-run:
                LCP −47%, Total Blocking Time 143 ms → 4 ms, transfer −34%.
                Lighthouse budgets run on every pull request and block
                regressions at review time.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
