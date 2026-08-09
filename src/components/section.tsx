import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/**
 * Section shell: optional mono label + hairline rule, then the title.
 * Eyebrows are rationed to a few sections per page, so the label is optional.
 */
export function SectionHeading({
  label,
  title,
  description,
  id,
}: {
  label?: string;
  title?: string;
  description?: string;
  id?: string;
}) {
  return (
    <div className="mb-8 sm:mb-10">
      {label ? (
        <div className="flex items-center gap-3">
          <span className="label text-muted-foreground">{label}</span>
          <span aria-hidden className="h-px flex-1 bg-border" />
        </div>
      ) : null}

      {title ? (
        <h2
          id={id}
          className="mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-[1.75rem]"
        >
          {title}
        </h2>
      ) : null}

      {description ? (
        <p className="mt-2.5 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 border-t border-border py-14 sm:py-16",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
