import { Sun, Cloud, CloudRain, Moon, CloudLightning, Wind } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  className?: string;
  size?: number;
}

export function WeatherIcon({ condition, className, size = 48 }: WeatherIconProps) {
  const c = condition.toLowerCase();
  if (c.includes('sunny') || c.includes('clear')) return <Sun size={size} className={`${className} text-yellow-400`} />;
  if (c.includes('rain')) return <CloudRain size={size} className={`${className} text-blue-400`} />;
  if (c.includes('cloud')) return <Cloud size={size} className={`${className} text-gray-400`} />;
  if (c.includes('lightning') || c.includes('storm')) return <CloudLightning size={size} className={`${className} text-indigo-500`} />;
  if (c.includes('night')) return <Moon size={size} className={`${className} text-slate-200`} />;
  if (c.includes('wind')) return <Wind size={size} className={`${className} text-teal-400`} />;
  return <Sun size={size} className={`${className} text-yellow-400`} />;
}
