import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/chrome";
import { projects } from "@/lib/site";

/*
  Selected work as a numbered index rather than a wall of cards.

  On a pointer device each row is a line of type — number, title, one headline
  number — and the screenshot lifts in on hover, so the section reads first as a
  clean editorial list and reveals the work as you move through it. On touch and
  narrow screens the same markup falls back to a stacked row with the thumbnail
  shown inline, so nothing depends on hover. No JavaScript: the reveal is one
  CSS transition per row.
*/
export function WorkIndex() {
  return (
    <ol className="windex">
      {projects.map((p, i) => {
        const href = p.caseStudy ?? p.live ?? p.code ?? "#";
        const stat = p.results[0];
        return (
          <li className="windex-row" key={p.slug}>
            <Link href={href} className="windex-link" aria-label={p.name}>
              <span className="windex-num">{String(i + 1).padStart(2, "0")}</span>

              <span className="windex-main">
                <span className="windex-head">
                  <span className="windex-title">{p.name}</span>
                  <span className="windex-kicker">{p.kicker}</span>
                </span>
                <span className="windex-line">{p.oneLiner}</span>
              </span>

              {p.image && (
                <span className="windex-preview">
                  <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 52rem) 20rem, 100vw" />
                </span>
              )}

              <span className="windex-right">
                {stat && (
                  <span className="windex-metric">
                    <b>{stat.value}</b>
                    {stat.label}
                  </span>
                )}
                <span className="windex-arrow" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
