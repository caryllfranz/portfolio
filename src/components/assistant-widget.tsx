"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; text: string };

// const SUGGESTIONS = [
//   "What data science projects has he built?",
//   "How does he approach modeling?",
//   "Download resume",
// ];

const RESUME_PATH = "/caryll_cv.pdf";

/** The API replies with this sentinel when the user asks for the CV. */
const DOWNLOAD_TOKEN = "DOWNLOAD_RESUME";

function downloadResume() {
  const link = document.createElement("a");
  link.href = RESUME_PATH;
  link.download = "Caryll_Franz_Carino_CV.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Curious about Caryll? Ask away  I promise I know what I’ve built. 😌",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  /**
   * Autofocus opens the virtual keyboard, which on a phone covers most of the
   * screen before the user has read anything. Only focus where there is room
   * for a keyboard alongside the panel.
   */
  useEffect(() => {
    if (!open) return;
    if (window.matchMedia("(min-width: 640px)").matches) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /**
   * The panel covers the viewport on phones, so the page behind it must not
   * scroll underneath. Locking <body> is scoped to the sheet breakpoint; on
   * larger screens the panel floats and the page stays usable.
   */
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(max-width: 639px)");
    if (!mq.matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      const reply: string = data.reply ?? "";

      if (reply.trim().includes(DOWNLOAD_TOKEN)) {
        downloadResume();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Started the resume download for you." },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong reaching the assistant. Try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop, phones only: the panel dominates the screen there, so the
          page behind it should read as dismissed rather than merely covered.
          Hidden from assistive tech — tap-to-dismiss is a pointer affordance,
          and the header's close button plus Escape are the real controls. */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 sm:hidden"
        />
      )}

      <div
        className={cn(
          "fixed z-50 flex flex-col items-end gap-3",
          // Phones: pin to every edge so the panel can fill the screen.
          // The safe-area insets keep the composer clear of the home indicator.
          "inset-x-0 bottom-0 top-auto",
          "pb-[max(1.25rem,env(safe-area-inset-bottom))]",
          "pl-[max(1.25rem,env(safe-area-inset-left))]",
          "pr-[max(1.25rem,env(safe-area-inset-right))]",
          // Larger screens: back to a corner-anchored floating widget.
          "sm:inset-auto sm:right-6 sm:bottom-6 sm:p-0",
        )}
      >
        {open && (
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio assistant"
            className={cn(
              "flex w-full flex-col overflow-hidden rounded-xl border border-border",
              "bg-popover shadow-xl shadow-black/5 dark:shadow-black/40",
              // dvh (not vh) so the sheet tracks the visible viewport as mobile
              // browser chrome collapses and the keyboard opens.
              "h-[min(32rem,calc(100dvh-6.5rem))]",
              "sm:h-[min(30rem,calc(100dvh-8rem))] sm:w-96",
            )}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-foreground/40"
                />
                <span className="text-sm font-medium">Portfolio assistant</span>
              </div>
              {/* 44px hit area on touch, tightened back to the compact icon
                  button once a mouse is likely. */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="-mr-1.5 size-11 text-muted-foreground sm:-mr-1 sm:size-7"
              >
                <X className="size-4 sm:size-3.5" />
              </Button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <p
                    className={cn(
                      "max-w-[85%] text-pretty rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                      // Long URLs and identifiers would otherwise force the
                      // bubble wider than the panel on a narrow screen.
                      "break-words",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground/85",
                    )}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start" aria-live="polite">
                  <span className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                    Thinking…
                  </span>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <label htmlFor="assistant-input" className="sr-only">
                Ask about Caryll&apos;s work
              </label>
              {/* 16px on mobile: iOS Safari zooms the page in on focus for any
                  font-size below that, and never zooms back out. */}
              <input
                id="assistant-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                autoComplete="off"
                enterKeyHint="send"
                className="min-w-0 flex-1 bg-transparent px-1 text-base outline-none placeholder:text-muted-foreground sm:text-sm"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="size-10 shrink-0 sm:size-7"
              >
                <ArrowUp className="size-4 sm:size-3.5" />
              </Button>
            </form>
          </div>
        )}

        {!open && (
          <Button
            onClick={() => setOpen(true)}
            className="h-11 gap-2 rounded-full px-4 shadow-lg shadow-black/10 sm:h-10 dark:shadow-black/40"
          >
            <MessageSquare className="size-4" />
            Ask AI
          </Button>
        )}
      </div>
    </>
  );
}
