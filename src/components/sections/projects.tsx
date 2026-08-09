import { projects } from "@/lib/content";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ProjectRow } from "@/components/project-row";

/**
 * Horizontal list, one row per project. `divide-y` draws the rule between
 * rows only, so nothing frames the first or last — the list reads as text
 * with separators rather than as a stack of cards.
 *
 * Rows open a dialog rather than linking out, which keeps them uniform whether
 * or not a project has public links; the links live in the dialog.
 */
export function Projects() {
  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading label="Selected work" title="Featured projects" />
      </Reveal>

      <ul className="divide-y divide-border border-t border-border">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Reveal delay={i * 40}>
              <ProjectRow project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
