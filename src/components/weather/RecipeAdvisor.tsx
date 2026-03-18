
"use client";

import { useEffect, useState } from 'react';
import { Utensils, Timer, CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRecipeAdvice, RecipeAdvisorOutput } from '@/ai/flows/weather-recipe-advisor';
import { WeatherData } from '@/app/lib/weather-service';

export function RecipeAdvisor({ weather }: { weather: WeatherData }) {
  const [advice, setAdvice] = useState<RecipeAdvisorOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      setLoading(true);
      try {
        const res = await getRecipeAdvice({
          temperature: weather.currentConditions.temperature,
          condition: weather.currentConditions.weatherDescription,
          humidity: weather.currentConditions.humidity,
        });
        setAdvice(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [weather]);

  return (
    <Card className="mb-8 border-none shadow-sm rounded-3xl bg-orange-50/50 dark:bg-orange-950/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-orange-600 dark:text-orange-400">
          <Utensils className="w-5 h-5" />
          Weather Mood Food
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center py-6 gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-orange-400" />
            <p className="text-xs text-muted-foreground">Finding the perfect recipe...</p>
          </div>
        ) : advice ? (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xl font-black text-orange-700 dark:text-orange-300">{advice.dishName}</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {advice.whyItMatches}
                </p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/40 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shrink-0">
                <Timer className="w-3.5 h-3.5 text-orange-600" />
                <span className="text-xs font-bold text-orange-600">{advice.estimatedTime}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-orange-600/70">Key Ingredients</h5>
              <div className="flex flex-wrap gap-2">
                {advice.keyIngredients.map((ing, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-white dark:bg-orange-900/20 px-3 py-1 rounded-full text-[10px] font-bold shadow-sm border border-orange-100 dark:border-orange-800">
                    <CheckCircle className="w-3 h-3 text-orange-400" />
                    {ing}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
