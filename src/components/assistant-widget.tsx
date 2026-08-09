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

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Close on Escape, and keep focus inside the panel while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Portfolio assistant"
          className={cn(
            "flex w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-border",
            "bg-popover shadow-xl shadow-black/5 dark:shadow-black/40",
            "h-[min(30rem,calc(100dvh-8rem))]",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span aria-hidden className="size-1.5 rounded-full bg-foreground/40" />
              <span className="text-sm font-medium">Portfolio assistant</span>
            </div>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="text-muted-foreground"
            >
              <X className="size-3.5" />
            </Button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
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

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-3">
              {/* {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="rounded-md border border-border px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {s}
                </button>
              ))} */}
            </div>
          )}

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
            <input
              id="assistant-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              size="icon-sm"
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <ArrowUp className="size-3.5" />
            </Button>
          </form>
        </div>
      )}

      {!open && (
        <Button
          onClick={() => setOpen(true)}
          className="h-10 gap-2 rounded-full px-4 shadow-lg shadow-black/10 dark:shadow-black/40"
        >
          <MessageSquare className="size-4" />
          Ask AI
        </Button>
      )}
    </div>
  );
}
