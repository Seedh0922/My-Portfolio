import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/chrome";
import type { Project } from "@/lib/site";

export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  const inProgress = project.status === "in-progress";

  return (
    <article className={`project${inProgress ? " project-pending" : ""}`}>
      {project.image ? (
        <Link
          href={project.caseStudy ?? project.code ?? "#"}
          className="project-shot"
          aria-label={`${project.name} — case study`}
        >
          {/*
            `fill` rather than width/height: next/image writes inline sizing
            styles that outrank a class selector, so object-fit never applies
            and a tall screenshot renders as a whole page shrunk to fit.
          */}
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 62rem) 22rem, 100vw"
            priority={priority}
          />
        </Link>
      ) : (
        <div className="project-shot project-shot-empty" aria-hidden="true">
          <span>Shipping soon</span>
        </div>
      )}

      <div className="project-body">
        <p className="work-kicker">{project.kicker}</p>
        <h3>{project.name}</h3>
        <p className="project-blurb">{project.blurb}</p>

        {project.results.length > 0 && (
          <ul className="result-row">
            {project.results.map((r) => (
              <li key={r.label}>
                <span className="result-value">{r.value}</span>
                <span className="result-label">{r.label}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="tag-row">
          {project.stack.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className="project-links">
          {project.live && (
            <a
              className="btn btn-primary btn-sm"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo
              <ArrowUpRight />
            </a>
          )}
          {project.caseStudy && (
            <Link className="btn btn-ghost btn-sm" href={project.caseStudy}>
              Case study
              <ArrowRight />
            </Link>
          )}
          {project.code && (
            <a
              className="btn btn-ghost btn-sm"
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
              <ArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
