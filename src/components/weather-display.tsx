import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Wind } from 'lucide-react'

interface WeatherDisplayProps {
  data: any
}

export function WeatherDisplay({ data }: WeatherDisplayProps) {
  if (!data) return null

  const getWeatherIcon = (weatherId: number, size?: number) => {
    // Responsive icon size
    const iconSize = size || 48;
    
    // Map OpenWeather condition codes to Lucide icons
    // https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId < 300) return <CloudLightning size={iconSize} />
    if (weatherId >= 300 && weatherId < 400) return <CloudDrizzle size={iconSize} />
    if (weatherId >= 500 && weatherId < 600) return <CloudRain size={iconSize} />
    if (weatherId >= 600 && weatherId < 700) return <CloudSnow size={iconSize} />
    if (weatherId >= 700 && weatherId < 800) return <CloudFog size={iconSize} />
    if (weatherId === 800) return <Sun size={iconSize} />
    if (weatherId > 800) return <Cloud size={iconSize} />
    return <Wind size={iconSize} />
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

  const weatherIcon = getWeatherIcon(data.weather[0].id, 64)
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
      <div className="text-xl sm:text-2xl font-bold mb-2 text-center">
        {cityName}, {country}
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="hidden sm:block">{weatherIcon}</div>
        <div className="block sm:hidden">{getWeatherIcon(data.weather[0].id, 48)}</div>
        <div className="text-4xl sm:text-5xl font-bold ml-2 sm:ml-4">{temp}°C</div>
      </div>

      <div className="text-lg sm:text-xl capitalize mb-4 sm:mb-6 text-center">{translatedDescription}</div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full">
        <Card className="bg-card text-card-foreground">
          <CardContent className="p-2 sm:p-4 flex flex-col items-center">
            <div className="text-xs sm:text-sm text-muted-foreground">Gefühlt wie</div>
            <div className="text-base sm:text-xl font-semibold">{feelsLike}°C</div>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground">
          <CardContent className="p-2 sm:p-4 flex flex-col items-center">
            <div className="text-xs sm:text-sm text-muted-foreground">Luftfeuchtigkeit</div>
            <div className="text-base sm:text-xl font-semibold">{humidity}%</div>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground">
          <CardContent className="p-2 sm:p-4 flex flex-col items-center">
            <div className="text-xs sm:text-sm text-muted-foreground">Windgeschwindigkeit</div>
            <div className="text-base sm:text-xl font-semibold">{windSpeed} m/s</div>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground">
          <CardContent className="p-2 sm:p-4 flex flex-col items-center">
            <div className="text-xs sm:text-sm text-muted-foreground">Luftdruck</div>
            <div className="text-base sm:text-xl font-semibold">{data.main.pressure} hPa</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
