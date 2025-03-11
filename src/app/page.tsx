"use client"

import { useState } from "react"
import { SearchForm } from "@/components/search-form"
import { WeatherDisplay } from "@/components/weather-display"
import { Forecast } from "@/components/forecast"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [weatherData, setWeatherData] = useState<any>(null)
  const [forecastData, setForecastData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (city: string) => {
    setLoading(true)
    setError(null)

    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`,
      )

      if (!weatherResponse.ok) {
        throw new Error("Stadt nicht gefunden oder API-Fehler")
      }

      const weatherData = await weatherResponse.json()
      setWeatherData(weatherData)

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`,
      )

      if (!forecastResponse.ok) {
        throw new Error("Vorhersagedaten nicht verfügbar")
      }

      const forecastData = await forecastResponse.json()
      setForecastData(forecastData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten')
      setWeatherData(null)
      setForecastData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-24 bg-background text-foreground">
      <div className="w-full max-w-3xl flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">Wetter App</h1>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-3xl">
        <SearchForm onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="bg-destructive/20 border border-destructive text-destructive px-4 py-3 rounded mt-4" role="alert">
            <p className="text-sm sm:text-base">{error}</p>
          </div>
        )}

        {weatherData && (
          <Card className="mt-6 sm:mt-8 overflow-hidden">
            <CardContent className="p-3 sm:p-6">
              <Tabs defaultValue="current">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="current" className="text-xs sm:text-sm">Aktuelles Wetter</TabsTrigger>
                  <TabsTrigger value="forecast" className="text-xs sm:text-sm">5-Tage Vorhersage</TabsTrigger>
                </TabsList>
                <TabsContent value="current" className="mt-4">
                  <WeatherDisplay data={weatherData} />
                </TabsContent>
                <TabsContent value="forecast" className="mt-4">
                  {forecastData && <Forecast data={forecastData} />}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
