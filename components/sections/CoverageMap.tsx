"use client";

import { useEffect, useRef, useState } from "react";
import {
  COVERAGE_POINTS,
  DEFAULT_COVERAGE_CENTER,
  getCoveragePoint,
} from "@/lib/coverage";

type CoverageMapProps = {
  selectedMunicipality: string;
  onMunicipalitySelect: (municipality: string) => void;
};

type MapboxMap = import("mapbox-gl").Map;

function updateMarkerState(
  markerElements: Record<string, HTMLButtonElement>,
  selectedMunicipality: string,
) {
  const selected = selectedMunicipality.toLowerCase();

  Object.entries(markerElements).forEach(([municipality, element]) => {
    const isActive = municipality === selected;
    element.style.backgroundColor = isActive ? "#ea580c" : "#ffffff";
    element.style.borderColor = isActive ? "#c2410c" : "#cbd5e1";
    element.style.transform = isActive ? "scale(1.12)" : "scale(1)";
  });
}

export default function CoverageMap({
  selectedMunicipality,
  onMunicipalitySelect,
}: CoverageMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const markerElementsRef = useRef<Record<string, HTMLButtonElement>>({});
  const selectHandlerRef = useRef(onMunicipalitySelect);
  const selectedMunicipalityRef = useRef(selectedMunicipality);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    selectHandlerRef.current = onMunicipalitySelect;
  }, [onMunicipalitySelect]);

  useEffect(() => {
    selectedMunicipalityRef.current = selectedMunicipality;
  }, [selectedMunicipality]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!token) {
      setMapError(true);
      return;
    }

    let mapInstance: MapboxMap | null = null;
    let cancelled = false;

    const initMap = async () => {
      try {
        const mapboxModule = await import("mapbox-gl");
        const mapboxgl = mapboxModule.default;

        if (cancelled || !containerRef.current) {
          return;
        }

        mapboxgl.accessToken = token;

        mapInstance = new mapboxgl.Map({
          container: containerRef.current,
          style: "mapbox://styles/mapbox/light-v11",
          center: [DEFAULT_COVERAGE_CENTER.lng, DEFAULT_COVERAGE_CENTER.lat],
          zoom: 9.9,
          pitch: 34,
          bearing: -8,
          antialias: true,
          attributionControl: false,
        });

        mapRef.current = mapInstance;
        mapInstance.addControl(
          new mapboxgl.NavigationControl({ showCompass: false }),
          "top-right",
        );

        mapInstance.on("load", () => {
          const map = mapInstance;

          if (!map) {
            return;
          }

          const markerElements: Record<string, HTMLButtonElement> = {};

          COVERAGE_POINTS.forEach((point) => {
            const markerButton = document.createElement("button");
            markerButton.type = "button";
            markerButton.title = point.municipality;
            markerButton.setAttribute(
              "aria-label",
              `Seleccionar ${point.municipality}`,
            );
            markerButton.style.width = "14px";
            markerButton.style.height = "14px";
            markerButton.style.borderRadius = "999px";
            markerButton.style.borderWidth = "2px";
            markerButton.style.borderStyle = "solid";
            markerButton.style.boxShadow = "0 4px 10px rgba(15,23,42,0.2)";
            markerButton.style.transition =
              "transform 180ms ease, background-color 180ms ease, border-color 180ms ease";
            markerButton.style.cursor = "pointer";

            markerButton.addEventListener("click", () => {
              selectHandlerRef.current(point.municipality);
            });

            markerElements[point.municipality.toLowerCase()] = markerButton;

            new mapboxgl.Marker({
              element: markerButton,
              anchor: "center",
            })
              .setLngLat([point.lng, point.lat])
              .addTo(map);
          });

          markerElementsRef.current = markerElements;
          updateMarkerState(markerElements, selectedMunicipalityRef.current);
          setMapReady(true);
        });
      } catch {
        setMapError(true);
      }
    };

    initMap();

    return () => {
      cancelled = true;
      if (mapInstance) {
        mapInstance.remove();
      }
      mapRef.current = null;
      markerElementsRef.current = {};
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !mapReady) {
      return;
    }

    const point = getCoveragePoint(selectedMunicipality);

    map.flyTo({
      center: [point.lng, point.lat],
      zoom: 11.1,
      speed: 0.65,
      curve: 1.2,
      essential: true,
    });

    updateMarkerState(markerElementsRef.current, selectedMunicipality);
  }, [selectedMunicipality, mapReady]);

  if (mapError) {
    return (
      <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-center text-sm text-slate-600">
        No fue posible cargar el mapa interactivo en este momento.
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200">
      <div
        ref={containerRef}
        className="h-[360px] w-full bg-slate-100 md:h-[420px]"
        aria-label="Mapa de cobertura en Medellin y Valle de Aburra"
      />
      {!mapReady ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 text-sm font-medium text-slate-600 backdrop-blur-[1px]">
          Cargando mapa de cobertura...
        </div>
      ) : null}
    </div>
  );
}
