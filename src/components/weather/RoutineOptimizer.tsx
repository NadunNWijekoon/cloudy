"use client";

import { useEffect, useState } from 'react';
import { Clock, CheckCircle2, Loader2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRoutineOptimization, RoutineOptimizerOutput } from '@/ai/flows/routine-optimizer';
import { WeatherData } from '@/app/lib/weather-service';

export function RoutineOptimizer({ weather }: { weather: WeatherData }) {
  const [data, setData] = useState<RoutineOptimizerOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoutine() {
      setLoading(true);
      try {
        const res = await getRoutineOptimization({
          hourlyForecast: weather.hourlyForecast.map(h => ({
            time: h.time,
            temp: h.temperature,
            condition: h.weatherDescription,
            rainProb: h.rainProbability
          }))
        });
        setData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchRoutine();
  }, [weather]);

  return (
    <Card className="mb-8 border-none shadow-sm rounded-3xl bg-white dark:bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Best Times for You
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center py-6 gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-primary/50" />
            <p className="text-xs font-medium text-muted-foreground">Optimizing your schedule...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.recommendations.map((rec, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-2xl bg-muted/30 border border-muted/50">
                <div className="bg-white dark:bg-background w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-sm">
                  <span className="text-[10px] font-bold text-primary uppercase">Time</span>
                  <span className="text-xs font-black">{rec.bestTime}</span>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-foreground">{rec.activity}</h5>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{rec.reason}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
