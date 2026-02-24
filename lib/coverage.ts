export type CoveragePoint = {
  municipality: string;
  lng: number;
  lat: number;
};

export const COVERAGE_POINTS: CoveragePoint[] = [
  { municipality: "Medellin", lng: -75.5636, lat: 6.2518 },
  { municipality: "Envigado", lng: -75.5864, lat: 6.167 },
  { municipality: "Sabaneta", lng: -75.6167, lat: 6.1515 },
  { municipality: "Bello", lng: -75.5569, lat: 6.3373 },
  { municipality: "Itagui", lng: -75.611, lat: 6.1719 },
  { municipality: "La Estrella", lng: -75.6434, lat: 6.1578 },
  { municipality: "Caldas", lng: -75.6405, lat: 6.0911 },
  { municipality: "Copacabana", lng: -75.508, lat: 6.3466 },
  { municipality: "Girardota", lng: -75.4488, lat: 6.3773 },
  { municipality: "Rionegro", lng: -75.3764, lat: 6.1535 },
  { municipality: "La Ceja", lng: -75.4335, lat: 6.0313 },
  { municipality: "Marinilla", lng: -75.3364, lat: 6.1739 },
];

const COVERAGE_POINT_MAP = new Map(
  COVERAGE_POINTS.map((point) => [point.municipality.toLowerCase(), point]),
);

export function getCoveragePoint(municipality: string) {
  const point = COVERAGE_POINT_MAP.get(municipality.trim().toLowerCase());

  if (point) {
    return point;
  }

  return COVERAGE_POINT_MAP.get("medellin")!;
}

export const DEFAULT_COVERAGE_CENTER = { lng: -75.5647, lat: 6.2518 };
