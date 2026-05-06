"use client";

import { useEffect, useState } from "react";

type TypewriterParagraphProps = {
  text: string;
  /** Milliseconds between each character while typing */
  speed?: number;
  /** Pause with full text visible before restarting (when `repeat` is true) */
  pauseBetweenLoopsMs?: number;
  /** When false, stops after revealing the full text once */
  repeat?: boolean;
  className?: string;
};

export function TypewriterParagraph({
  text,
  speed = 22,
  pauseBetweenLoopsMs = 2400,
  repeat = true,
  className,
}: TypewriterParagraphProps) {
  const [len, setLen] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const clearTimer = (id: number | undefined) => {
      if (id !== undefined) window.clearTimeout(id);
    };

    if (text.length === 0) {
      setLen(0);
      return;
    }

    if (mq.matches) {
      setLen(text.length);
      return;
    }

    let cancelled = false;
    let i = 0;
    let pendingId: number | undefined;

    const cancelAll = () => {
      cancelled = true;
      clearTimer(pendingId);
      pendingId = undefined;
    };

    function onReduceChange() {
      if (!mq.matches) return;
      cancelAll();
      setLen(text.length);
    }
    mq.addEventListener("change", onReduceChange);

    const schedule = (fn: () => void, delay: number) => {
      clearTimer(pendingId);
      pendingId = window.setTimeout(() => {
        pendingId = undefined;
        if (!cancelled) fn();
      }, delay);
    };

    const runLoop = () => {
      if (cancelled) return;
      i = 0;
      setLen(0);

      const typeStep = () => {
        if (cancelled) return;
        if (i >= text.length) {
          if (repeat) {
            schedule(() => {
              if (!cancelled) runLoop();
            }, pauseBetweenLoopsMs);
          }
          return;
        }
        i += 1;
        setLen(i);
        schedule(typeStep, speed);
      };

      schedule(typeStep, speed);
    };

    runLoop();

    return () => {
      cancelAll();
      mq.removeEventListener("change", onReduceChange);
    };
  }, [text, speed, pauseBetweenLoopsMs, repeat]);

  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="whitespace-normal">
        {text.slice(0, len)}
      </span>
    </p>
  );
}
