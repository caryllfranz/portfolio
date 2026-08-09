import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Contact, SiteFooter } from "@/components/sections/contact";
import { Certifications } from "@/components/sections/certifications";
import { AssistantWidget } from "@/components/assistant-widget";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
        {/* After Contact per the brief; the footer stays the closing element. */}
        <Certifications />
      </main>

      <SiteFooter />
      <AssistantWidget />
    </>
  );
}
