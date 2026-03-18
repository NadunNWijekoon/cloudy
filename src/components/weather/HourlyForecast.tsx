import { WeatherData } from '@/app/lib/weather-service';
import { WeatherIcon } from './WeatherIcon';

export function HourlyForecast({ weather }: { weather: WeatherData }) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1">Hourly Forecast</h3>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 snap-x">
        {weather.hourlyForecast.map((hour, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center min-w-[70px] bg-white dark:bg-card p-4 rounded-2xl shadow-sm snap-start"
          >
            <span className="text-xs font-medium text-muted-foreground mb-3">{hour.time}</span>
            <WeatherIcon condition={hour.weatherDescription} size={24} className="mb-3" />
            <span className="text-lg font-bold">{hour.temperature}°</span>
            {hour.rainProbability > 0 && (
              <span className="text-[10px] font-bold text-blue-500 mt-1">{hour.rainProbability}%</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
