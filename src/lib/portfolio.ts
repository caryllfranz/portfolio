import {
  about,
  certifications,
  education,
  experience,
  focusAreas,
  profile,
  projects,
  skillGroups,
  workflowStages,
} from "@/lib/content";

/**
 * Derived from the same content module the site renders, so the assistant
 * can never describe a version of the portfolio that isn't on screen.
 */
function buildContext(): string {
  const lines: string[] = [];

  lines.push("## Positioning");
  lines.push(profile.name + " - " + profile.disciplines.join(" / "));
  lines.push(profile.headline);
  lines.push(profile.summary);
  lines.push("Location: " + profile.location);
  lines.push("Availability: " + profile.availability);
  lines.push("Current role: " + profile.currentRole);
  lines.push(
    "Education: " +
      education.degree +
      ", " +
      education.institution +
      " (" +
      education.period +
      ")",
  );
  lines.push("Email: " + profile.email);
  lines.push("GitHub: " + profile.github);
  lines.push("LinkedIn: " + profile.linkedin);

  lines.push("\n## About");
  lines.push(about.paragraphs.join("\n\n"));
  lines.push("How he frames his work: " + about.pipeline.join(" -> "));

  lines.push("\n## Workflow");
  for (const s of workflowStages) {
    lines.push("- " + s.label + ": " + s.note);
  }

  lines.push("\n## Projects");
  for (const p of projects) {
    lines.push("### " + p.name + " (" + p.kind + ", " + p.year + ")");
    lines.push("Problem: " + p.problem);
    lines.push("Approach: " + p.solution);
    lines.push("Data: " + p.data);
    lines.push("Method: " + p.method);
    lines.push("Architecture: " + p.architecture.join(" -> "));
    lines.push("Contribution: " + p.contribution);
    lines.push("Stack: " + p.stack.join(", "));
    lines.push("Results: " + p.results.join("; "));
    lines.push("GitHub: " + (p.github ?? "not public"));
    lines.push("Live demo: " + (p.demo ?? "none"));
    lines.push("");
  }

  lines.push("## Experience");
  for (const e of experience) {
    lines.push(
      "### " + e.role + " - " + e.company + " (" + e.period + ", " + e.location + ")",
    );
    for (const b of e.bullets) lines.push("- " + b);
    lines.push("");
  }

  lines.push("## Technical skills");
  for (const g of skillGroups) {
    lines.push(g.title + ": " + g.items.join(", "));
  }
  lines.push(
    "Note: he is positioned as an AI / Data / Machine Learning engineer. Frontend work (Next.js, React Native) supports the systems he builds rather than defining his role.",
  );

  lines.push("\n## Currently focused on");
  for (const f of focusAreas) lines.push("- " + f);

  lines.push("\n## Certifications");
  for (const c of certifications) lines.push("- " + c.name + " (" + c.issuer + ")");

  return lines.join("\n");
}

export const PORTFOLIO_CONTEXT = buildContext();
