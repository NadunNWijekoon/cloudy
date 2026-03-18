"use client";

import { useEffect, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { smartWeatherInsight, SmartWeatherInsightInput } from '@/ai/flows/smart-weather-insight';
import { WeatherData } from '@/app/lib/weather-service';

export function AIInsightCard({ weather }: { weather: WeatherData }) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getInsight() {
      setLoading(true);
      try {
        const result = await smartWeatherInsight(weather as SmartWeatherInsightInput);
        setInsight(result.insight);
      } catch (error) {
        console.error("AI Insight failed", error);
        setInsight("Enjoy your day! The weather looks standard for the season.");
      } finally {
        setLoading(false);
      }
    }
    getInsight();
  }, [weather]);

  return (
    <Card className="bg-white/90 dark:bg-card/90 backdrop-blur-sm border-none shadow-sm overflow-hidden mb-6">
      <CardContent className="p-5 flex gap-4 items-start">
        <div className="bg-primary/10 p-2 rounded-full mt-0.5">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-primary/80 mb-1">Cloudy Assistant</h4>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin" />
              Analyzing patterns...
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-foreground/90 font-medium">
              {insight}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
