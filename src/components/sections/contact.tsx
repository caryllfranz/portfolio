import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { profile } from "@/lib/content";
import { Container } from "@/components/section";
import { Reveal } from "@/components/reveal";

const roles = ["AI Engineering", "Data Engineering", "Machine Learning"];

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "in/caryllfmc",
    href: profile.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "caryllfranz",
    href: profile.github,
    icon: GithubIcon,
    external: true,
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: profile.resume,
    icon: ArrowUpRight,
    download: true,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-border py-16 sm:py-20"
    >
      <Container>
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Get in touch
          </h2>

          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            Available for opportunities in {roles[0]}, {roles[1]}, and{" "}
            {roles[2]}. Based in {profile.location}, and{" "}
            {profile.availability.toLowerCase()}.
          </p>

          <ul className="mt-9 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {channels.map(
              ({ label, value, href, icon: Icon, external, download }) => (
                <li key={label} className="bg-background">
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    {...(download ? { download: true } : {})}
                    className="group flex items-center justify-between gap-4 p-5 transition-colors duration-200 hover:bg-card-hover sm:p-6"
                  >
                    <span className="flex min-w-0 items-center gap-3.5">
                      <Icon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                      <span className="min-w-0">
                        <span className="label block text-muted-foreground/70">
                          {label}
                        </span>
                        <span className="mt-1.5 block truncate text-sm text-foreground/85">
                          {value}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                  </a>
                </li>
              ),
            )}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <Container>
        <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </Container>
    </footer>
  );
}
