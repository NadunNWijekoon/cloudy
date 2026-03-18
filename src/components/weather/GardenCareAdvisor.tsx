"use client";

import { useEffect, useState } from 'react';
import { Sprout, Droplets, ShieldCheck, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getGardenAdvice, GardenCareOutput } from '@/ai/flows/garden-care-advisor';
import { WeatherData } from '@/app/lib/weather-service';

export function GardenCareAdvisor({ weather }: { weather: WeatherData }) {
  const [advice, setAdvice] = useState<GardenCareOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdvice() {
      setLoading(true);
      try {
        const res = await getGardenAdvice({
          temperature: weather.currentConditions.temperature,
          humidity: weather.currentConditions.humidity,
          rainProbability: weather.currentConditions.rainProbability || 0,
          nextDayForecast: weather.dailyForecast[1].weatherDescription,
        });
        setAdvice(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAdvice();
  }, [weather]);

  return (
    <Card className="mb-8 border-none shadow-sm rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <Sprout className="w-5 h-5" />
          Garden Guru
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
          </div>
        ) : advice ? (
          <div className="space-y-4">
            <div className="bg-emerald-100/50 dark:bg-emerald-900/20 p-3 rounded-2xl flex items-center gap-3">
              <Droplets className="w-5 h-5 text-emerald-600" />
              <p className="text-sm font-semibold">{advice.wateringAdvice}</p>
            </div>

            <div className="space-y-2">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600/70 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Plant Protection
              </h5>
              <p className="text-xs text-muted-foreground">{advice.plantProtection}</p>
            </div>

            <div className="space-y-2">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600/70">Tasks for Today</h5>
              <ul className="space-y-1">
                {advice.tasks.map((task, i) => (
                  <li key={i} className="text-xs font-medium flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
