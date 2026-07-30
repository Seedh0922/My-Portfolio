import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/chrome";
import { ComparisonTable, StatTiles } from "@/components/figures";
import { budgets, levers, repo } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shopify Headless Perf Lab",
  description:
    "A headless Shopify storefront shipped in two modes so the performance claim is a command anyone can re-run: LCP −47%, Total Blocking Time 143 ms → 4 ms, with Lighthouse budgets blocking regressions in CI.",
  alternates: { canonical: "/work/shopify-headless-perf-lab" },
};

export default function CaseStudy() {
  return (
    <>
      <section className="shell case-header">
        <Link className="back-link" href="/#work">
          ← Selected work
        </Link>
        <p className="work-kicker">Open source · Case study</p>
        <h1 style={{ marginTop: "0.75rem" }}>Shopify Headless Perf Lab</h1>
        <p className="hero-sub">
          A headless Shopify storefront on Hydrogen, React Router 7 and the
          Oxygen worker runtime — where every performance claim is a command you
          can re-run rather than a screenshot you have to trust.
        </p>
        <div className="hero-actions">
          <a
            className="btn btn-primary"
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View the repository
            <ArrowUpRight />
          </a>
          <a
            className="btn btn-ghost"
            href={repo.report}
            target="_blank"
            rel="noopener noreferrer"
          >
            Generated report
            <ArrowUpRight />
          </a>
        </div>
      </section>

      <section className="shell section" aria-labelledby="problem">
        <h2 className="section-label" id="problem">
          The problem
        </h2>
        <div className="prose">
          <p>
            Every storefront project claims a performance win.{" "}
            <em>Cut LCP by 22%.</em> The claim is almost always unverifiable, for
            a structural reason: the slow version was a client&rsquo;s production
            site, it is behind a login or has since been replaced, and what
            remains is a screenshot of a Lighthouse score with no way to tell what
            was measured, on what hardware, against what network profile, or how
            many runs were discarded to get it.
          </p>
          <p>
            <strong>A screenshot is an assertion.</strong> I wanted the claim to
            be a reproducible measurement — something a reader can re-run on their
            own machine and get the same shape of answer. That requires a slow
            version that still exists and still runs.
          </p>
        </div>
      </section>

      <section className="shell section" aria-labelledby="approach">
        <h2 className="section-label" id="approach">
          The approach
        </h2>
        <div className="prose" style={{ marginBottom: "2rem" }}>
          <p>
            The same storefront ships in two modes, selected at runtime by an
            environment variable. <code className="inline-code">optimized</code>{" "}
            is how it should go out.{" "}
            <code className="inline-code">baseline</code> re-introduces six
            regressions, each drawn from a pattern that actually shows up on
            app-heavy Shopify themes.
          </p>
          <p>
            All six live in{" "}
            <a href={repo.levers} target="_blank" rel="noopener noreferrer">
              a single table in one file
            </a>
            . That is deliberate. Scattered through components as{" "}
            <code className="inline-code">if (baseline)</code> branches, a reader
            could not audit what was actually being compared, and the comparison
            would be worth as little as the screenshot it replaced.
          </p>
        </div>

        <div className="spec-wrap">
          <table className="spec">
            <thead>
              <tr>
                <th scope="col">Lever</th>
                <th scope="col">optimized</th>
                <th scope="col">baseline</th>
                <th scope="col">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {levers.map((l) => (
                <tr key={l.lever}>
                  <th scope="row">{l.lever}</th>
                  <td>{l.optimized}</td>
                  <td>{l.baseline}</td>
                  <td>{l.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="note" style={{ marginTop: "1.25rem" }}>
          Nothing here is an artificial delay bolted onto the render. The
          third-party script is served by a real route with real latency and real
          main-thread cost, so Lighthouse observes it the same way it would
          observe a reviews widget.
        </p>
      </section>

      <section className="shell section" aria-labelledby="results">
        <h2 className="section-label" id="results">
          The result
        </h2>

        <StatTiles />

        <div style={{ marginTop: "2rem" }}>
          <ComparisonTable />
        </div>

        <div className="prose" style={{ marginTop: "2rem" }}>
          <p>
            Mobile emulation at 4× CPU on Slow 4G, median of three runs per URL,
            on the homepage route. The throttling is <em>applied</em>, not
            Lighthouse&rsquo;s default simulation — simulation replays the trace
            against a modelled network graph and placed first paint after work
            that had really run before it, reporting{" "}
            <code className="inline-code">0 ms</code> of Total Blocking Time in
            both modes while the trace held a 722 ms task from the third-party
            script.
          </p>
          <p>
            <strong>One lever does not show up in the numbers.</strong> The
            baseline emits a hero image with no width, height or aspect ratio, and
            both modes still measure a Cumulative Layout Shift of 0.000 — the mock
            catalog&rsquo;s images are small enough, and a preview server on
            loopback fast enough, that the hero decodes before first paint and
            nothing is ever laid out twice. The lever stays because the budget
            still has to hold against a real image origin, but the report says so
            rather than quietly reporting a win.
          </p>
        </div>

        <figure style={{ margin: "2rem 0 0" }}>
          <pre className="cmd">
            <code>
              <span className="prompt">$ </span>npm run build{"\n"}
              <span className="prompt">$ </span>npm run perf
              {"   "}
              <span className="prompt"># both modes, 3 runs per URL, median</span>
            </code>
          </pre>
          <figcaption className="note" style={{ marginTop: "0.75rem" }}>
            Writes <code className="inline-code">docs/perf/latest.md</code> and{" "}
            <code className="inline-code">latest.json</code>. No Shopify account,
            no API token, no dev store — the storefront runs against a public mock
            Storefront API, so it works on a clean machine and in CI with no
            secrets.
          </figcaption>
        </figure>
      </section>

      <section className="shell section" aria-labelledby="budgets">
        <h2 className="section-label" id="budgets">
          Budgets are enforced, not admired
        </h2>
        <div className="prose" style={{ marginBottom: "2rem" }}>
          <p>
            Lighthouse CI runs on every pull request against fixed thresholds. A
            regression fails the pull request. That is the point —{" "}
            <strong>a budget nobody enforces is a preference.</strong>
          </p>
        </div>

        <div className="spec-wrap">
          <table className="spec">
            <thead>
              <tr>
                <th scope="col">Assertion</th>
                <th scope="col">Threshold</th>
                <th scope="col">Level</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((b) => (
                <tr key={b.assertion}>
                  <th scope="row">{b.assertion}</th>
                  <td>{b.threshold}</td>
                  <td>{b.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose" style={{ marginTop: "2rem" }}>
          <p>
            There is an open pull request in the repository that exists only to be
            rejected. It lazy-loads the hero image and stops reserving its layout
            box — two mistakes that reach production constantly — and CI blocks
            it. It is not merged, so the red check stays where anyone can read it.
          </p>
        </div>
      </section>

      <section className="shell section" aria-labelledby="evidence">
        <h2 className="section-label" id="evidence">
          Check any of it
        </h2>
        <div className="evidence">
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            <span className="evidence-title">
              Repository
              <ArrowUpRight />
            </span>
            <span className="evidence-desc">
              Clone it, run two commands, regenerate the numbers on your own
              hardware.
            </span>
          </a>
          <a href={repo.failingPr} target="_blank" rel="noopener noreferrer">
            <span className="evidence-title">
              The pull request CI blocked
              <ArrowUpRight />
            </span>
            <span className="evidence-desc">
              A deliberate regression, refused by the budget at review time rather
              than found in production.
            </span>
          </a>
          <a href={repo.adr} target="_blank" rel="noopener noreferrer">
            <span className="evidence-title">
              Decision records
              <ArrowUpRight />
            </span>
            <span className="evidence-desc">
              Four of them, each naming what the decision gave up — including
              keeping checkout on Shopify.
            </span>
          </a>
        </div>

        <div className="prose" style={{ marginTop: "2.5rem" }}>
          <p>
            <strong>What this does not prove.</strong> The public mock API is
            read-only, so cart mutations render correctly but no checkout can
            complete, and Customer Accounts, Markets and Functions are not
            exercised. The catalog is small, so nothing here demonstrates
            behaviour at a hundred thousand SKUs. Lab numbers are a pre-merge
            gate, not a substitute for field data. A project that lists no limits
            usually has not looked for them.
          </p>
        </div>
      </section>
    </>
  );
}
