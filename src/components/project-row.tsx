import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import type { Project } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button";

/** Tech stack tags. Small and subtle, right-aligned on wide screens. */
function Stack({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {items.map((tech) => (
        <li
          key={tech}
          className="rounded border border-border/70 px-1.5 py-0.5 font-mono text-[0.6875rem] leading-none text-muted-foreground"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}


export function ProjectRow({ project }: { project: Project }) {
  return (
    <div className="grid items-center gap-x-8 gap-y-2 py-5 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_minmax(0,17rem)_auto]">
      <h3 className="font-medium tracking-tight">{project.name}</h3>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {project.blurb}
      </p>

      <Stack
        items={project.stack}
        className="flex flex-wrap gap-1 lg:justify-end"
      />

      <div className="flex flex-wrap items-center gap-1.5 lg:justify-end">
        {/*
          These are links, not buttons, so they are real anchors wearing the
          button styles rather than <Button render={<a/>}>. Base UI's Button
          assumes it renders a <button>: leaving `nativeButton` at its default
          warns, and setting it false silences the warning but stamps
          role="button" onto the anchor, which makes a screen reader announce a
          navigation as a button. buttonVariants gives the same visuals with the
          element semantics intact.
        */}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} on GitHub`}
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <GithubIcon />
            GitHub
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} live demo`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Live
            <ArrowUpRight />
          </a>
        )}
      </div>
    </div>
  );
}
