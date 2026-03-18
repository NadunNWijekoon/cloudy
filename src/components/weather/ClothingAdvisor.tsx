
"use client";

import { useEffect, useState } from 'react';
import { Shirt, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getClothingAdvice, ClothingAdvisorOutput } from '@/ai/flows/clothing-advisor';
import { WeatherData } from '@/app/lib/weather-service';

export function ClothingAdvisor({ weather }: { weather: WeatherData }) {
  const [advice, setAdvice] = useState<ClothingAdvisorOutput | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAdvice() {
      setLoading(true);
      try {
        const res = await getClothingAdvice({
          temperature: weather.currentConditions.temperature,
          weatherDescription: weather.currentConditions.weatherDescription,
          humidity: weather.currentConditions.humidity,
          windSpeed: weather.currentConditions.windSpeed,
        });
        setAdvice(res);
      } catch (err) {
        console.error("Clothing advice failed", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAdvice();
  }, [weather]);

  return (
    <Card className="mb-8 border-none shadow-sm rounded-3xl bg-secondary/5 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Shirt className="w-5 h-5 text-secondary" />
          What to Wear
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-secondary" />
            <p className="text-sm text-muted-foreground font-medium">Styling your day...</p>
          </div>
        ) : advice ? (
          <div className="space-y-4 animate-in fade-in duration-500">
            <p className="text-sm font-medium text-foreground/80 italic">"{advice.summary}"</p>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-secondary/70">Recommended Layers</h5>
                <div className="flex flex-wrap gap-2">
                  {advice.layers.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-white dark:bg-card px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-secondary/10">
                      <CheckCircle2 className="w-3 h-3 text-secondary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {advice.accessories.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-secondary/70">Essential Accessories</h5>
                  <div className="flex flex-wrap gap-2">
                    {advice.accessories.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-secondary/10 px-3 py-1.5 rounded-full text-xs font-semibold text-secondary">
                        <Sparkles className="w-3 h-3" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Unable to generate advice at this time.</p>
        )}
      </CardContent>
    </Card>
  );
}
