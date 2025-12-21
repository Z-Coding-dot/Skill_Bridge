import { type RefObject, useEffect } from "react";

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      if (!el.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler, enabled]);
}
