import { NextRequest, NextResponse } from "next/server";
import { getCoveragePoint } from "@/lib/coverage";

export const revalidate = 600;

export async function GET(request: NextRequest) {
  const municipality = request.nextUrl.searchParams.get("municipio") || "Medellin";
  const point = getCoveragePoint(municipality);
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, message: "weather_service_unavailable" },
      { status: 200 },
    );
  }

  try {
    const weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather");
    weatherUrl.searchParams.set("lat", String(point.lat));
    weatherUrl.searchParams.set("lon", String(point.lng));
    weatherUrl.searchParams.set("appid", apiKey);
    weatherUrl.searchParams.set("units", "metric");
    weatherUrl.searchParams.set("lang", "es");

    const weatherResponse = await fetch(weatherUrl, {
      next: { revalidate: 600 },
    });

    if (!weatherResponse.ok) {
      return NextResponse.json(
        { ok: false, message: "weather_upstream_error" },
        { status: 200 },
      );
    }

    const weatherData = await weatherResponse.json();

    return NextResponse.json({
      ok: true,
      municipality: point.municipality,
      temperature: Math.round(weatherData?.main?.temp ?? 0),
      feelsLike: Math.round(weatherData?.main?.feels_like ?? 0),
      humidity: weatherData?.main?.humidity ?? null,
      description: weatherData?.weather?.[0]?.description ?? "",
      icon: weatherData?.weather?.[0]?.icon ?? null,
      updatedAt: weatherData?.dt
        ? new Date(weatherData.dt * 1000).toISOString()
        : new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "weather_fetch_failed" },
      { status: 200 },
    );
  }
}
