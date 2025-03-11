import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Wind } from "lucide-react"

interface WeatherDisplayProps {
  data: any
}

export function WeatherDisplay({ data }: WeatherDisplayProps) {
  if (!data) return null

  const getWeatherIcon = (weatherId: number) => {
    // Map OpenWeather condition codes to Lucide icons
    // https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId < 300) return <CloudLightning size={64} />
    if (weatherId >= 300 && weatherId < 400) return <CloudDrizzle size={64} />
    if (weatherId >= 500 && weatherId < 600) return <CloudRain size={64} />
    if (weatherId >= 600 && weatherId < 700) return <CloudSnow size={64} />
    if (weatherId >= 700 && weatherId < 800) return <CloudFog size={64} />
    if (weatherId === 800) return <Sun size={64} />
    if (weatherId > 800) return <Cloud size={64} />
    return <Wind size={64} />
  }

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

  const weatherIcon = getWeatherIcon(data.weather[0].id)
  const temp = Math.round(data.main.temp)
  const feelsLike = Math.round(data.main.feels_like)
  const description = data.weather[0].description
  const cityName = data.name
  const country = data.sys.country
  const windSpeed = Math.round(data.wind.speed)
  const humidity = data.main.humidity

  const translatedDescription = translateWeatherDescription(description)

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold mb-2">
        {cityName}, {country}
      </div>

      <div className="flex items-center justify-center mb-4">
        {weatherIcon}
        <div className="text-5xl font-bold ml-4">{temp}°C</div>
      </div>

      <div className="text-xl capitalize mb-6">{translatedDescription}</div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-sm text-muted-foreground">Gefühlt wie</div>
            <div className="text-xl font-semibold">{feelsLike}°C</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-sm text-muted-foreground">Luftfeuchtigkeit</div>
            <div className="text-xl font-semibold">{humidity}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-sm text-muted-foreground">Windgeschwindigkeit</div>
            <div className="text-xl font-semibold">{windSpeed} m/s</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-sm text-muted-foreground">Luftdruck</div>
            <div className="text-xl font-semibold">{data.main.pressure} hPa</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

