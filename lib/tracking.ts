export type TrackingPayload = Record<string, string | number | boolean | null | undefined>;

export function track(eventName: string, payload: TrackingPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const eventPayload = {
    event: eventName,
    ...payload,
  };

  if (process.env.NODE_ENV !== "production") {
    // Dev-only visibility for QA without requiring analytics vendors.
    console.log("[track]", eventPayload);
  }

  const win = window as Window & { dataLayer?: Array<Record<string, unknown>> };

  if (Array.isArray(win.dataLayer)) {
    win.dataLayer.push(eventPayload);
  }
}
