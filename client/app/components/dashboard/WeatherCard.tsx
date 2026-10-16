import { useEffect, useState } from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  MapPin,
  Sun,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type WeatherData = {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};

type WeatherCardProps = {
  location?: string;
  latitude?: number;
  longitude?: number;
};

function getCondition(code: number): {
  label: string;
  Icon: LucideIcon;
  color: string;
} {
  if (code === 0) {
    return {
      label: "Clear",
      Icon: Sun,
      color: "text-amber-300",
    };
  }

  if (code <= 2) {
    return {
      label: "Partly Cloudy",
      Icon: CloudSun,
      color: "text-amber-200",
    };
  }

  if (code === 3) {
    return {
      label: "Cloudy",
      Icon: Cloud,
      color: "text-slate-200",
    };
  }

  if ([45, 48].includes(code)) {
    return {
      label: "Fog",
      Icon: CloudFog,
      color: "text-slate-200",
    };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return {
      label: "Drizzle",
      Icon: CloudDrizzle,
      color: "text-sky-200",
    };
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return {
      label: "Rain",
      Icon: CloudRain,
      color: "text-sky-300",
    };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      label: "Snow",
      Icon: CloudSnow,
      color: "text-cyan-200",
    };
  }

  if (code >= 95) {
    return {
      label: "Storms",
      Icon: CloudLightning,
      color: "text-violet-300",
    };
  }

  return {
    label: "Cloudy",
    Icon: Cloud,
    color: "text-slate-200",
  };
}

function formatDay(date: string, index: number) {
  if (index === 0) return "Today";

  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: "UTC",
  });
}

export default function WeatherCard({
  location = "New York, NY",
  latitude = 40.7128,
  longitude = -74.006,
}: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      setWeather(null);
      setError(null);

      const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: "temperature_2m,apparent_temperature,weather_code",
        daily:
          "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
        temperature_unit: "fahrenheit",
        timezone: "auto",
        forecast_days: "7",
      });

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?${params}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        const data = (await response.json()) as WeatherData;

        if (
          !data.current ||
          !data.daily?.time?.length ||
          !data.daily.temperature_2m_max
        ) {
          throw new Error("Invalid weather data");
        }

        setWeather(data);
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error(err);
        setError("Unable to load forecast.");
      }
    }

    loadWeather();

    return () => controller.abort();
  }, [latitude, longitude]);

  return (
    <section className="h-full overflow-hidden rounded-2xl border border-sky-300/15 bg-gradient-to-br from-[#294B73] via-[#1A3553] to-[#101F34] p-4 text-white sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-wide">Weather</h2>

        <span className="flex items-center gap-1 text-[11px] text-slate-200">
          <MapPin size={12} />
          {location}
        </span>
      </div>

      {error ? (
        <p className="py-8 text-sm text-slate-300">{error}</p>
      ) : !weather ? (
        <p className="animate-pulse py-8 text-sm text-slate-300">
          Loading forecast...
        </p>
      ) : (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5">
          {(() => {
            const current = getCondition(weather.current.weather_code);
            const CurrentIcon = current.Icon;

            return (
              <div className="flex items-center gap-4 lg:w-[150px] lg:shrink-0">
                <CurrentIcon
                  size={39}
                  strokeWidth={1.4}
                  className={current.color}
                />

                <div>
                  <p className="text-4xl font-extralight tracking-tight">
                    {Math.round(weather.current.temperature_2m)}°
                  </p>

                  <p className="text-xs text-slate-200">{current.label}</p>

                  <p className="mt-0.5 text-[10px] text-slate-300">
                    Feels {Math.round(weather.current.apparent_temperature)}°
                  </p>
                </div>
              </div>
            );
          })()}

          <div className="hidden h-20 w-px shrink-0 bg-white/15 lg:block" />

          <div className="min-w-0 flex-1 overflow-x-auto">
            <div className="grid min-w-[420px] grid-cols-7 gap-1">
              {weather.daily.time.slice(0, 7).map((date, index) => {
                const condition = getCondition(
                  weather.daily.weather_code[index],
                );
                const DayIcon = condition.Icon;

                const high = Math.round(
                  weather.daily.temperature_2m_max[index],
                );
                const low = Math.round(weather.daily.temperature_2m_min[index]);

                return (
                  <div
                    key={date}
                    className="flex flex-col items-center gap-2 rounded-lg px-1 py-2 text-center"
                  >
                    <span className="text-[11px] font-semibold text-slate-100">
                      {formatDay(date, index)}
                    </span>

                    <DayIcon size={21} className={condition.color} />

                    <span className="text-xs font-bold">{high}°</span>

                    <span className="text-[11px] text-slate-300">{low}°</span>

                    {weather.daily.precipitation_probability_max[index] > 0 && (
                      <span className="text-[10px] text-sky-200">
                        {weather.daily.precipitation_probability_max[index]}%
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
