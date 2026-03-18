"use client";

import { useEffect, useState } from 'react';
import { Camera, Sun, Focus, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPhotographyAdvice, PhotographyAdvisorOutput } from '@/ai/flows/photography-advisor';
import { WeatherData } from '@/app/lib/weather-service';

export function PhotographyAdvisor({ weather }: { weather: WeatherData }) {
  const [advice, setAdvice] = useState<PhotographyAdvisorOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdvice() {
      setLoading(true);
      try {
        const res = await getPhotographyAdvice({
          condition: weather.currentConditions.weatherDescription,
          temperature: weather.currentConditions.temperature,
          timeOfDay: "Current Time",
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
    <Card className="mb-8 border-none shadow-sm rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Camera className="w-5 h-5" />
          Lens & Light
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
          </div>
        ) : advice ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-xl">
                <Sun className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-indigo-600/70 uppercase">Lighting</h5>
                <p className="text-sm font-medium">{advice.lightingQuality}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-xl">
                <Focus className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-indigo-600/70 uppercase">Top Subjects</h5>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {advice.suggestedSubjects.map((s, i) => (
                    <span key={i} className="text-[10px] bg-white dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 px-2 py-0.5 rounded-full font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground italic border-t pt-3">
              {advice.cameraSettingsTip}
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
