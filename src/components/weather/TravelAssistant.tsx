"use client";

import { useState } from 'react';
import { Plane, Calendar as CalendarIcon, MapPin, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { travelPlanningAssistant } from '@/ai/flows/travel-planning-assistant';
import { WeatherData } from '@/app/lib/weather-service';

export function TravelAssistant({ weather }: { weather: WeatherData }) {
  const [destination, setDestination] = useState('');
  const [activity, setActivity] = useState('');
  const [result, setResult] = useState<{ advice: string; times?: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlan = async () => {
    if (!destination && !activity) return;
    setLoading(true);
    try {
      const res = await travelPlanningAssistant({
        currentLocationName: weather.locationName,
        currentWeatherDescription: weather.currentConditions.weatherDescription,
        futureWeatherForecast: weather.dailyForecast.map(d => `${d.date}: ${d.weatherDescription}`).join(', '),
        userActivityPreference: activity || undefined,
        tripDetails: destination ? {
          destinationName: destination,
          startDate: '2024-06-01',
          endDate: '2024-06-05'
        } : undefined
      });
      setResult({ advice: res.planningAdvice, times: res.suggestedOptimalTimes });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-8 border-none shadow-sm rounded-3xl bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Plane className="w-5 h-5 text-primary" />
          Plan an Adventure
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Destination (e.g. Lake Tahoe)" 
              className="pl-9 rounded-2xl" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Activity (e.g. Hiking, Picnic)" 
              className="pl-9 rounded-2xl" 
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            />
          </div>
        </div>
        
        <Button 
          className="w-full rounded-2xl h-12 font-semibold shadow-lg shadow-primary/20" 
          onClick={handlePlan}
          disabled={loading || (!destination && !activity)}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
          Get AI Plan
        </Button>

        {result && (
          <div className="bg-white/80 dark:bg-card/80 p-5 rounded-2xl animate-in fade-in slide-in-from-top-2">
            <p className="text-sm font-medium leading-relaxed mb-3">{result.advice}</p>
            {result.times && result.times.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {result.times.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded-md">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
