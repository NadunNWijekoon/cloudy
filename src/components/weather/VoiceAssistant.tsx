"use client";

import { useState } from 'react';
import { Mic, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { voiceWeatherQuery } from '@/ai/flows/voice-weather-query';
import { WeatherData } from '@/app/lib/weather-service';

export function VoiceAssistant({ weather }: { weather: WeatherData }) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await voiceWeatherQuery({
        query: query,
        currentWeatherSummary: `${weather.currentConditions.weatherDescription}, ${weather.currentConditions.temperature}°C`,
        hourlyForecastSummary: weather.hourlyForecast.map(h => `${h.time}: ${h.temperature}°C`).join(', '),
        dailyForecastSummary: weather.dailyForecast.map(d => `${d.date}: ${d.maxTemperature}°C`).join(', '),
      });
      setResponse(res.response);
    } catch (err) {
      setResponse("Sorry, I'm having trouble connecting right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={() => { setQuery(''); setResponse(null); }}>
      <DialogTrigger asChild>
        <Button size="icon" className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 z-50">
          <Mic className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-primary" />
            Cloudy Voice
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          {response && (
            <div className="bg-muted p-4 rounded-2xl text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-2">
              {response}
            </div>
          )}
          <form onSubmit={handleSubmit} className="relative">
            <Input
              placeholder="Ask: 'Will it rain tonight?'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-2xl pr-12 h-12"
              disabled={loading}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-1 top-1 h-10 w-10 hover:bg-transparent"
              disabled={loading || !query.trim()}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 text-primary" />}
            </Button>
          </form>
          <div className="flex flex-wrap gap-2">
            {['Will it rain today?', 'Need a jacket?', 'Weekend outlook'].map((q) => (
              <button
                key={q}
                onClick={() => setQuery(q)}
                className="text-xs bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-full transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
