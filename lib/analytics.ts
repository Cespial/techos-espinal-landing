export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") {
    return;
  }

  const gtag = (
    window as Window & {
      gtag?: (
        command: string,
        eventName: string,
        payload?: Record<string, string | number | boolean | undefined>,
      ) => void;
    }
  ).gtag;

  if (typeof gtag === "function") {
    gtag("event", eventName, params);
  }
}
