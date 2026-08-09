"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { navItems, profile } from "@/lib/content";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const sectionIds = navItems
  .map((item) => item.href.replace("#", ""))
  .filter((id) => id !== "top");

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("top");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the last section whose top has passed the header line wins.
  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-200",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-md text-sm font-medium tracking-tight"
        >
          <span>Caryll Franz</span>
        </a>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mx-1.5 hidden h-4 w-px bg-border md:block" />

          <a
            href={profile.resume}
            download
            className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
          >
            Resume
          </a>

          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Open menu"
                  className="text-muted-foreground md:hidden"
                />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>

            <SheetContent side="right" className="w-72 p-6">
              <SheetTitle className="label text-muted-foreground">
                Navigation
              </SheetTitle>

              <ul className="mt-6 flex flex-col">
                {navItems.map((item) => (
                  <li key={item.href}>
                    {/*
                      A plain anchor that closes the sheet on click, rather than
                      SheetClose rendering one. SheetClose is a button primitive:
                      it either warns about the non-button element or stamps
                      role="button" onto the link, which would have a screen
                      reader announce in-page navigation as a button.
                    */}
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="-mx-2 block rounded-md px-2 py-3 text-base text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-border pt-6">
                <a
                  href={profile.resume}
                  download
                  className="-mx-2 block rounded-md px-2 py-3 text-base text-foreground/80 transition-colors hover:text-foreground"
                >
                  Resume
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
