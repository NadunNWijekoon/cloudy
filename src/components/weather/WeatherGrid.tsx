import { Droplets, Wind, Sun, Activity, Eye } from 'lucide-react';
import { WeatherData } from '@/app/lib/weather-service';

export function WeatherGrid({ weather }: { weather: WeatherData }) {
  const { humidity, windSpeed, uvIndex, aqi, feelsLikeTemperature } = weather.currentConditions;

  const cards = [
    { label: 'Feels Like', value: `${feelsLikeTemperature}°`, icon: <Sun className="w-4 h-4" /> },
    { label: 'Humidity', value: `${humidity}%`, icon: <Droplets className="w-4 h-4" /> },
    { label: 'Wind', value: `${windSpeed} km/h`, icon: <Wind className="w-4 h-4" /> },
    { label: 'UV Index', value: uvIndex, icon: <Sun className="w-4 h-4" /> },
    { label: 'AQI', value: aqi, icon: <Activity className="w-4 h-4" /> },
    { label: 'Visibility', value: '10 km', icon: <Eye className="w-4 h-4" /> },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white dark:bg-card p-5 rounded-3xl shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            {card.icon}
            <span className="text-[11px] font-bold uppercase tracking-wider">{card.label}</span>
          </div>
          <span className="text-xl font-bold">{card.value}</span>
        </div>
      ))}
    </div>
  );
}
