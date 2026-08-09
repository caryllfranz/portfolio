import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { profile } from "@/lib/content";
import { Container } from "@/components/section";

const links = [
  { label: "GitHub", href: profile.github, icon: GithubIcon, external: true },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

/**
 * Portrait frame.
 *
 * The crop is pure layout: a 4:5 box with `object-cover` and `object-top`, so
 * the frame trims the bottom rather than the head. No filter, blend mode, or
 * mask touches the image content — the treatment is entirely the container's
 * background, border, and radius.
 */
function Portrait() {
  return (
    <div className="relative mx-auto w-56 shrink-0 sm:w-64 lg:mx-0 lg:ml-auto lg:w-72">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Image
          src={profile.portrait}
          alt={`Portrait of ${profile.displayName}`}
          width={profile.portraitWidth}
          height={profile.portraitHeight}
          priority
          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 16rem, 14rem"
          className="aspect-4/5 w-full object-cover object-top select-none"
        />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          <div className="order-2 lg:order-1">
            {/* The name leads and is the h1 — prominent, but held well below
                display scale so it never dominates the viewport. */}
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-balance sm:text-5xl">
              {profile.displayName}
            </h1>

            {/*
              Tagline as a real blockquote, set in italics at supporting scale.
              Quote glyphs are decorative, so they are hidden from assistive
              tech, which reads the words alone.
            */}
            <blockquote className="mt-5 text-base italic leading-relaxed text-balance text-muted-foreground sm:text-lg">
              <span aria-hidden>&ldquo;</span>
              {profile.quote}
              <span aria-hidden>&rdquo;</span>
            </blockquote>

            {/*
              Emphasis is contrast, not weight: the sentence sits muted and the
              two highlighted phrases step up to full-contrast text, which stays
              quieter than bold at this size.
            */}
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              {profile.intro.map((segment, i) => (
                <span
                  key={i}
                  className={segment.strong ? "text-foreground" : undefined}
                >
                  {segment.text}
                </span>
              ))}
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <Portrait />
          </div>
        </div>

        <div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6 sm:mt-12">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-3.5" />
            {profile.location}
          </span>

          {profile.availability && (
            <span className="text-sm text-muted-foreground">
              {profile.availability}
            </span>
          )}

          {links.map(({ label, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="size-3.5" />
              {label}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
