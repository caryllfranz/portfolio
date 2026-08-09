import { skillGroups } from "@/lib/content";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";

/**
 * One row per category: label in the left column, a dense wrapping tag list in
 * the right. No tiles, no bullets, no proficiency bars — the row is the only
 * structure, so the section stays short as categories grow.
 */
export function Skills() {
  return (
    <Section id="skills">
      <Reveal>
        <SectionHeading label="Skills" title="What I work with" />
      </Reveal>

      <div className="divide-y divide-border border-t border-border">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 50}>
            <div className="grid gap-2 py-5 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-8">
              <h3 className="label pt-1 text-muted-foreground">
                {group.title}
              </h3>

              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-card px-2 py-1 font-mono text-xs leading-relaxed text-foreground/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
