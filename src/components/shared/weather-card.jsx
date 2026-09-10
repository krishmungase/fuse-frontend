import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudRainWind,
  CloudSun,
  Droplets,
  Moon,
  Snowflake,
  Sun,
  Wind,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const ICONS = {
  clear: { day: Sun, night: Moon, tint: 'text-amber-400' },
  'partly-cloudy': { day: CloudSun, night: CloudMoon, tint: 'text-amber-300' },
  cloudy: { day: Cloud, tint: 'text-slate-300' },
  fog: { day: CloudFog, tint: 'text-slate-400' },
  drizzle: { day: CloudDrizzle, tint: 'text-sky-300' },
  rain: { day: CloudRain, tint: 'text-sky-400' },
  showers: { day: CloudRainWind, tint: 'text-sky-400' },
  snow: { day: Snowflake, tint: 'text-sky-200' },
  thunderstorm: { day: CloudLightning, tint: 'text-violet-300' },
}

const WeatherCard = ({ report }) => {
  if (!report || report.temperature === undefined) return null

  const {
    location,
    country,
    temperature,
    feelsLike,
    humidity,
    windSpeed,
    isDay,
    label,
    icon,
  } = report

  const condition = ICONS[icon] ?? ICONS.cloudy
  const Icon =
    (isDay ? condition.day : (condition.night ?? condition.day)) ?? Cloud

  return (
    <div className="w-full max-w-[340px] rounded-2xl border border-chat-border bg-chat-surface/60 p-5">
      <p className="truncate text-[13px] text-chat-secondary">
        {location}
        {country && location !== country ? `, ${country}` : ''}
      </p>

      <div className="mt-2 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[44px] leading-none font-light text-chat-foreground">
            {temperature}°
          </p>
          <p className="mt-2 truncate text-[14px] text-chat-secondary">
            {label}
          </p>
        </div>

        <Icon className={cn('size-12 shrink-0', condition.tint)} />
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-chat-muted">
        <span>Feels like {feelsLike}°</span>

        {Number.isFinite(humidity) && (
          <span className="flex items-center gap-1">
            <Droplets className="size-3" />
            {humidity}%
          </span>
        )}

        <span className="flex items-center gap-1">
          <Wind className="size-3" />
          {windSpeed} km/h
        </span>
      </div>
    </div>
  )
}

export default WeatherCard
