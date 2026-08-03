import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/chrome";
import type { Project } from "@/lib/site";

/*
  A compact, fixed-shape card: thumbnail, title, one line, one headline number,
  and the links. Every card is the same height, so the Featured work section
  grows sideways into a grid rather than downward into an endless scroll — the
  whole point of the redesign. The long write-up and the full metric set live on
  the case study, reached from the title or the image.
*/
export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  const primary = project.caseStudy ?? project.live ?? project.code ?? "#";
  const stat = project.results[0];

  return (
    <article className={`pcard${project.status === "in-progress" ? " pcard-pending" : ""}`}>
      {project.image ? (
        <Link href={primary} className="pcard-shot" aria-label={project.name} tabIndex={-1}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 48rem) 33rem, 100vw"
            priority={priority}
          />
        </Link>
      ) : (
        <div className="pcard-shot pcard-empty" aria-hidden="true">
          <span>Shipping soon</span>
        </div>
      )}

      <div className="pcard-body">
        <p className="pcard-kicker">{project.kicker}</p>
        <h3 className="pcard-title">
          <Link href={primary}>{project.name}</Link>
        </h3>
        <p className="pcard-line">{project.oneLiner}</p>

        <div className="pcard-foot">
          {stat && (
            <span className="pcard-stat">
              <b>{stat.value}</b>
              {stat.label}
            </span>
          )}
          <span className="pcard-links">
            {project.caseStudy && <Link href={project.caseStudy}>Case study</Link>}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                Live
                <ArrowUpRight />
              </a>
            )}
            {project.code && (
              <a href={project.code} target="_blank" rel="noopener noreferrer">
                Source
                <ArrowUpRight />
              </a>
            )}
          </span>
        </div>
      </div>
    </article>
  );
}
