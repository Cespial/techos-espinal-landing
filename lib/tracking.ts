export type TrackingPayload = Record<string, string | number | boolean | null | undefined>;

export function track(eventName: string, payload: TrackingPayload = {}) {
  try {
    if (typeof window === "undefined") {
      return;
    }

    const win = window as Window & { dataLayer?: Array<Record<string, unknown>> };

    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({ event: eventName, ...payload });
    }

    if (process.env.NODE_ENV !== "production") {
      console.log("[track]", eventName, payload);
    }
  } catch {
    // Silent fallback to avoid breaking conversion flows.
  }
}
