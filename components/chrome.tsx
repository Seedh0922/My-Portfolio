import Link from "next/link";
import { site } from "@/lib/site";

export function ArrowRight() {
  return (
    <svg
      className="arrow"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{ opacity: 0.55 }}
    >
      <path
        d="M4 8l4-4M4.5 4H8v3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteNav() {
  return (
    <header className="nav">
      <div className="shell nav-inner">
        <Link href="/" className="nav-name">
          {site.name}
        </Link>
        <nav className="nav-links" aria-label="Main">
          <Link href="/#work">Work</Link>
          <Link href="/about">About</Link>
          <a
            className="nav-hide-sm"
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="nav-hide-sm"
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <p>
          {site.name} · {site.location} · {site.availability}
        </p>
        <p style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </p>
      </div>
      <div className="shell" style={{ marginTop: "1.5rem" }}>
        <p className="note">
          Built with Next.js, statically rendered, deployed on Vercel. No web
          fonts, no third-party scripts, no analytics. Mobile Lighthouse: 98–100
          performance, 100 accessibility, 100 SEO, 0.000 layout shift. The
          case-study page sits at 98 because React&rsquo;s hydration bundle
          still loads on a page with nothing to hydrate — worth noting, since
          this site asks to be measured.
        </p>
      </div>
    </footer>
  );
}
