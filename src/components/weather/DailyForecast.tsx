import { WeatherData } from '@/app/lib/weather-service';
import { WeatherIcon } from './WeatherIcon';

export function DailyForecast({ weather }: { weather: WeatherData }) {
  return (
    <div className="mb-8 bg-white dark:bg-card rounded-3xl p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">7-Day Forecast</h3>
      <div className="space-y-6">
        {weather.dailyForecast.map((day, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-sm font-medium w-12">{day.date}</span>
            <div className="flex items-center gap-3 w-32">
              <WeatherIcon condition={day.weatherDescription} size={20} />
              <span className="text-xs text-muted-foreground truncate">{day.weatherDescription}</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-semibold text-foreground">{day.maxTemperature}°</span>
              <span className="text-muted-foreground">{day.minTemperature}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
