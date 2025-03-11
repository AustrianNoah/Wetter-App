import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Wind } from "lucide-react"

interface ForecastProps {
  data: any
}

export function Forecast({ data }: ForecastProps) {
  if (!data || !data.list) return null

  const getWeatherIcon = (weatherId: number) => {
    // Map OpenWeather condition codes to Lucide icons
    if (weatherId >= 200 && weatherId < 300) return <CloudLightning size={32} />
    if (weatherId >= 300 && weatherId < 400) return <CloudDrizzle size={32} />
    if (weatherId >= 500 && weatherId < 600) return <CloudRain size={32} />
    if (weatherId >= 600 && weatherId < 700) return <CloudSnow size={32} />
    if (weatherId >= 700 && weatherId < 800) return <CloudFog size={32} />
    if (weatherId === 800) return <Sun size={32} />
    if (weatherId > 800) return <Cloud size={32} />
    return <Wind size={32} />
  }

  // Add the translation function (same as in weather-display.tsx)
  const translateWeatherDescription = (description: string) => {
    const translations: Record<string, string> = {
      "clear sky": "Klarer Himmel",
      "few clouds": "Wenige Wolken",
      "scattered clouds": "Vereinzelte Wolken",
      "broken clouds": "Aufgelockerte Bewölkung",
      "overcast clouds": "Bedeckt",
      "light rain": "Leichter Regen",
      "moderate rain": "Mäßiger Regen",
      "heavy intensity rain": "Starker Regen",
      "very heavy rain": "Sehr starker Regen",
      "extreme rain": "Extremer Regen",
      "freezing rain": "Gefrierender Regen",
      "light intensity shower rain": "Leichter Schauerregen",
      "shower rain": "Schauerregen",
      "heavy intensity shower rain": "Starker Schauerregen",
      "ragged shower rain": "Unregelmäßiger Schauerregen",
      "light snow": "Leichter Schnee",
      snow: "Schnee",
      "heavy snow": "Starker Schnee",
      sleet: "Schneeregen",
      "light shower sleet": "Leichter Schneeregenschauer",
      "shower sleet": "Schneeregenschauer",
      "light rain and snow": "Leichter Regen und Schnee",
      "rain and snow": "Regen und Schnee",
      "light shower snow": "Leichter Schneeschauer",
      "shower snow": "Schneeschauer",
      "heavy shower snow": "Starker Schneeschauer",
      mist: "Nebel",
      smoke: "Rauch",
      haze: "Dunst",
      "sand/dust whirls": "Sand-/Staubwirbel",
      fog: "Nebel",
      sand: "Sand",
      dust: "Staub",
      "volcanic ash": "Vulkanasche",
      squalls: "Sturmböen",
      tornado: "Tornado",
      "thunderstorm with light rain": "Gewitter mit leichtem Regen",
      "thunderstorm with rain": "Gewitter mit Regen",
      "thunderstorm with heavy rain": "Gewitter mit starkem Regen",
      "light thunderstorm": "Leichtes Gewitter",
      thunderstorm: "Gewitter",
      "heavy thunderstorm": "Starkes Gewitter",
      "ragged thunderstorm": "Unregelmäßiges Gewitter",
      "thunderstorm with light drizzle": "Gewitter mit leichtem Nieselregen",
      "thunderstorm with drizzle": "Gewitter mit Nieselregen",
      "thunderstorm with heavy drizzle": "Gewitter mit starkem Nieselregen",
      "light intensity drizzle": "Leichter Nieselregen",
      drizzle: "Nieselregen",
      "heavy intensity drizzle": "Starker Nieselregen",
      "light intensity drizzle rain": "Leichter Nieselregen",
      "drizzle rain": "Nieselregen",
      "heavy intensity drizzle rain": "Starker Nieselregen",
      "shower rain and drizzle": "Schauerregen und Nieselregen",
      "heavy shower rain and drizzle": "Starker Schauerregen und Nieselregen",
      "shower drizzle": "Nieselschauer",
    }

    return translations[description] || description
  }

  // Group forecast data by day
  const dailyForecasts = data.list.reduce((acc: any, item: any) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("de-DE", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })

    if (!acc[date]) {
      acc[date] = {
        date,
        temps: [],
        icons: [],
        descriptions: [],
      }
    }

    acc[date].temps.push(item.main.temp)
    acc[date].icons.push(item.weather[0].id)
    acc[date].descriptions.push(item.weather[0].description)

    return acc
  }, {})

  // Get daily summary (average temp, most common weather condition)
  const dailySummary = Object.values(dailyForecasts).map((day: any) => {
    const avgTemp = Math.round(day.temps.reduce((sum: number, temp: number) => sum + temp, 0) / day.temps.length)

    // Find most common weather condition
    const iconCounts = day.icons.reduce((acc: any, icon: number) => {
      acc[icon] = (acc[icon] || 0) + 1
      return acc
    }, {})

    const mostCommonIcon = Object.keys(iconCounts).reduce((a, b) => (iconCounts[a] > iconCounts[b] ? a : b))

    // Find most common description
    const descCounts = day.descriptions.reduce((acc: any, desc: string) => {
      acc[desc] = (acc[desc] || 0) + 1
      return acc
    }, {})

    const mostCommonDesc = Object.keys(descCounts).reduce((a, b) => (descCounts[a] > descCounts[b] ? a : b))
    const translatedDesc = translateWeatherDescription(mostCommonDesc)

    return {
      date: day.date,
      avgTemp,
      icon: Number.parseInt(mostCommonIcon),
      description: translatedDesc,
    }
  })

  // Take only the first 5 days
  const fiveDayForecast = dailySummary.slice(0, 5)

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {fiveDayForecast.map((day: any, index: number) => (
        <Card key={index}>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="font-medium mb-2">{day.date}</div>
            {getWeatherIcon(day.icon)}
            <div className="text-2xl font-bold my-2">{day.avgTemp}°C</div>
            <div className="text-sm text-center capitalize text-muted-foreground">
              {translateWeatherDescription(day.description)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

