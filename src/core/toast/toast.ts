// src/core/toast/toast.ts
export type ToastVariant = "success" | "error" | "info";

export type ToastOptions = {
  variant?: ToastVariant;
  title?: string;
  message: string;
  durationMs?: number; // default 3000
};

let container: HTMLElement | null = null;

function ensureContainer() {
  if (container) return container;

  const el = document.createElement("div");
  el.id = "toast-root";

  // Tailwind: bottom-right, stack, spacing, high z-index
  el.className =
    "fixed bottom-4 right-4 z-[9999] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2 pointer-events-none";

  // Accessibility: screen readers get updates
  el.setAttribute("aria-live", "polite");
  el.setAttribute("aria-relevant", "additions");

  document.body.appendChild(el);
  container = el;
  return el;
}

function getVariantBorder(variant: ToastVariant) {
  switch (variant) {
    case "success":
      return "border-emerald-500/40";
    case "error":
      return "border-red-500/45";
    case "info":
    default:
      return "border-blue-500/40";
  }
}

function getDefaultTitle(variant: ToastVariant) {
  switch (variant) {
    case "success":
      return "Success";
    case "error":
      return "Error";
    case "info":
    default:
      return "Info";
  }
}

function createToastElement(opts: Required<ToastOptions> & { variant: ToastVariant }) {
  const toast = document.createElement("div");

  // Base styles (Tailwind)
  const base =
    "pointer-events-auto rounded-xl border bg-zinc-950/90 text-white shadow-lg backdrop-blur " +
    "px-3 py-3 " +
    "opacity-0 translate-y-2 transition duration-200 ease-out";

  toast.className = `${base} ${getVariantBorder(opts.variant)}`;
  toast.setAttribute("role", opts.variant === "error" ? "alert" : "status");

  // Header (title + close)
  const header = document.createElement("div");
  header.className = "mb-1 flex items-center justify-between gap-3";

  const title = document.createElement("div");
  title.className = "text-sm font-semibold leading-tight";
  title.textContent = opts.title?.trim() ? opts.title : getDefaultTitle(opts.variant);

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className =
    "grid h-7 w-7 place-items-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition";
  closeBtn.setAttribute("aria-label", "Close notification");
  closeBtn.textContent = "×";

  header.appendChild(title);
  header.appendChild(closeBtn);

  const body = document.createElement("div");
  body.className = "text-sm leading-snug text-white/90";
  body.textContent = opts.message;

  toast.appendChild(header);
  toast.appendChild(body);

  const remove = () => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-2");

    const onEnd = () => {
      toast.removeEventListener("transitionend", onEnd);
      toast.remove();
    };
    toast.addEventListener("transitionend", onEnd);

    // fallback
    window.setTimeout(() => toast.remove(), 500);
  };

  closeBtn.addEventListener("click", remove);
  window.setTimeout(remove, opts.durationMs);

  // animate in
  requestAnimationFrame(() => {
    toast.classList.add("opacity-100", "translate-y-0");
  });

  return toast;
}

export function showToast(options: ToastOptions) {
  const root = ensureContainer();

  const opts: Required<ToastOptions> & { variant: ToastVariant } = {
    variant: options.variant ?? "info",
    title: options.title ?? "",
    message: options.message,
    durationMs: options.durationMs ?? 3000,
  };

  const toast = createToastElement(opts);
  root.appendChild(toast);
}

// Convenience API
export const toast = {
  success(message: string, title = "Watchlist") {
    showToast({ variant: "success", title, message, durationMs: 2500 });
  },
  info(message: string, title = "Watchlist") {
    showToast({ variant: "info", title, message, durationMs: 3000 });
  },
  error(message: string, title = "Error") {
    showToast({ variant: "error", title, message, durationMs: 4000 });
  },
};
