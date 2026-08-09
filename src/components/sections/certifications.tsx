import { certifications } from "@/lib/content";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";

/** Plain name/issuer rows on hairlines. No icons, no badges. */
export function Certifications() {
  return (
    <Section id="certifications">
      <Reveal>
        <SectionHeading label="Certifications" />
      </Reveal>

      <Reveal>
        <ul className="divide-y divide-border border-t border-border">
          {certifications.map((cert) => (
            <li
              key={`${cert.name}-${cert.issuer}`}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5 text-sm"
            >
              <span className="text-foreground/85">{cert.name}</span>
              <span className="text-muted-foreground">{cert.issuer}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
