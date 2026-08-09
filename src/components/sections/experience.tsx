import { education, experience } from "@/lib/content";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";

/** Shared two-column timeline row: meta on the left, detail on the right. */
function Row({
  period,
  location,
  title,
  subtitle,
  label,
  children,
}: {
  period: string;
  location?: string;
  title: string;
  subtitle: string;
  label?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 py-7 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:gap-10 sm:py-8">
      <div>
        <p className="font-mono text-xs text-muted-foreground tabular-nums">
          {period}
        </p>
        {location && (
          <p className="mt-1 text-xs text-muted-foreground/70">{location}</p>
        )}
      </div>

      <div>
        {label && <p className="label mb-2 text-muted-foreground/70">{label}</p>}
        <h3 className="text-base font-medium tracking-tight">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}

/**
 * Roles newest-first, with education as the final and oldest entry so the
 * whole history reads as one timeline.
 */
export function Experience() {
  return (
    <Section id="experience">
      <Reveal>
        <SectionHeading label="Experience" title="Where I've worked" />
      </Reveal>

      <div className="divide-y divide-border border-t border-border">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${job.period}`} delay={i * 60}>
            <Row
              period={job.period}
              location={job.location}
              title={job.role}
              subtitle={job.company}
            >
              <ul className="mt-4 space-y-2.5">
                {job.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-pretty text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-px w-3 shrink-0 bg-border"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Row>
          </Reveal>
        ))}

        <Reveal delay={experience.length * 60}>
          <Row
            period={education.period}
            title={education.degree}
            subtitle={education.institution}
            label="Education"
          />
        </Reveal>
      </div>
    </Section>
  );
}
