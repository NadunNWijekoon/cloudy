
"use client";

import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { LocationManager } from '@/components/weather/LocationManager';
import { AIInsightCard } from '@/components/weather/AIInsightCard';
import { HourlyForecast } from '@/components/weather/HourlyForecast';
import { DailyForecast } from '@/components/weather/DailyForecast';
import { WeatherGrid } from '@/components/weather/WeatherGrid';
import { TravelAssistant } from '@/components/weather/TravelAssistant';
import { VoiceAssistant } from '@/components/weather/VoiceAssistant';
import { ClothingAdvisor } from '@/components/weather/ClothingAdvisor';
import { SafetyAdvisor } from '@/components/weather/SafetyAdvisor';
import { OutdoorScore } from '@/components/weather/OutdoorScore';
import { RoutineOptimizer } from '@/components/weather/RoutineOptimizer';
import { PhotographyAdvisor } from '@/components/weather/PhotographyAdvisor';
import { GardenCareAdvisor } from '@/components/weather/GardenCareAdvisor';
import { RecipeAdvisor } from '@/components/weather/RecipeAdvisor';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { fetchWeather, WeatherData } from '@/app/lib/weather-service';

export default function Home() {
  const [location, setLocation] = useState('San Francisco');
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Initial fetch
    setWeather(fetchWeather(location));
  }, [location]);

  if (!weather) return null;

  return (
    <div className="min-h-screen max-w-md mx-auto relative pb-24 px-4 sm:px-6">
      {/* Location Selection & Date */}
      <LocationManager 
        currentLocation={location} 
        onLocationChange={setLocation} 
      />

      {/* Main Temperature Display */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="relative mb-4">
          <WeatherIcon 
            condition={weather.currentConditions.weatherDescription} 
            size={120} 
            className="drop-shadow-2xl"
          />
        </div>
        <div className="flex items-start">
          <h1 className="text-8xl font-bold tracking-tighter text-foreground">{weather.currentConditions.temperature}</h1>
          <span className="text-4xl font-semibold text-primary mt-3">°</span>
        </div>
        <p className="text-xl font-medium text-muted-foreground mt-2">
          {weather.currentConditions.weatherDescription}
        </p>
        <div className="flex gap-4 mt-3">
          <span className="text-sm font-semibold text-foreground">H:{weather.dailyForecast[0].maxTemperature}°</span>
          <span className="text-sm font-semibold text-foreground">L:{weather.dailyForecast[0].minTemperature}°</span>
        </div>
      </div>

      {/* Outdoor Vibe Score Widget */}
      <OutdoorScore weather={weather} />

      {/* Severe Alerts */}
      {weather.alerts && weather.alerts.length > 0 && (
        <Alert variant="destructive" className="mb-6 rounded-3xl border-none bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="font-bold flex items-center gap-2">
            {weather.alerts[0].title}
          </AlertTitle>
          <AlertDescription className="text-xs font-medium mt-1">
            {weather.alerts[0].description}
          </AlertDescription>
        </Alert>
      )}

      {/* AI Safety Advisor (Only shows when alerts exist) */}
      <SafetyAdvisor weather={weather} />

      {/* AI Insight Card */}
      <AIInsightCard weather={weather} />

      {/* Photography & Lighting Advisor */}
      <PhotographyAdvisor weather={weather} />

      {/* Weather-based Recipe Advisor */}
      <RecipeAdvisor weather={weather} />

      {/* Garden Care Advisor */}
      <GardenCareAdvisor weather={weather} />

      {/* Clothing Advisor */}
      <ClothingAdvisor weather={weather} />

      {/* Routine Optimizer */}
      <RoutineOptimizer weather={weather} />

      {/* Hourly Forecast */}
      <HourlyForecast weather={weather} />

      {/* 7-Day Forecast */}
      <DailyForecast weather={weather} />

      {/* Weather Grid */}
      <WeatherGrid weather={weather} />

      {/* AI Travel Assistant */}
      <TravelAssistant weather={weather} />

      {/* Floating Voice Assistant */}
      <VoiceAssistant weather={weather} />

      {/* Bottom Nav Mockup UI Hint */}
      <div className="h-8" />
    </div>
  );
}
