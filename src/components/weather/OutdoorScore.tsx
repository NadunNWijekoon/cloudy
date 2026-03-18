"use client";

import { useEffect, useState } from 'react';
import { Zap, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getOutdoorScore, OutdoorScoreOutput } from '@/ai/flows/outdoor-score';
import { WeatherData } from '@/app/lib/weather-service';

export function OutdoorScore({ weather }: { weather: WeatherData }) {
  const [data, setData] = useState<OutdoorScoreOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScore() {
      setLoading(true);
      try {
        const res = await getOutdoorScore({
          temperature: weather.currentConditions.temperature,
          condition: weather.currentConditions.weatherDescription,
          windSpeed: weather.currentConditions.windSpeed,
          humidity: weather.currentConditions.humidity,
        });
        setData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchScore();
  }, [weather]);

  return (
    <Card className="mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-none shadow-none rounded-3xl overflow-hidden">
      <CardContent className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white/80 dark:bg-card/80 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm">
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            ) : (
              <span className="text-2xl font-black text-primary">{data?.score}</span>
            )}
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary/70 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Outdoor Vibe
            </h4>
            {loading ? (
              <div className="h-4 w-32 bg-primary/10 animate-pulse rounded mt-1" />
            ) : (
              <p className="text-sm font-semibold text-foreground/90">
                {data?.emoji} {data?.vibeDescription}
              </p>
            )}
          </div>
        </div>
        <div className="text-[10px] font-bold text-primary/40 bg-white/40 px-2 py-1 rounded-full">/ 10</div>
      </CardContent>
    </Card>
  );
}
