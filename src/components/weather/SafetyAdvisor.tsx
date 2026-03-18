
"use client";

import { useState } from 'react';
import { ShieldAlert, AlertTriangle, Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSafetyAdvice, SafetyAdvisorOutput } from '@/ai/flows/safety-advisor';
import { WeatherData } from '@/app/lib/weather-service';

export function SafetyAdvisor({ weather }: { weather: WeatherData }) {
  const [advice, setAdvice] = useState<SafetyAdvisorOutput | null>(null);
  const [loading, setLoading] = useState(false);

  if (!weather.alerts || weather.alerts.length === 0) return null;

  const alert = weather.alerts[0];

  const handleGetAdvice = async () => {
    setLoading(true);
    try {
      const res = await getSafetyAdvice({
        alertType: alert.type,
        alertDescription: alert.description,
        location: weather.locationName
      });
      setAdvice(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-8 border-none shadow-sm rounded-3xl bg-red-50 dark:bg-red-950/20 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-red-600 dark:text-red-400">
          <ShieldAlert className="w-5 h-5" />
          Safety Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!advice ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-red-700/80 dark:text-red-300/80">
              A <strong>{alert.title}</strong> is active. Get AI-powered safety steps tailored to this alert.
            </p>
            <Button 
              variant="destructive" 
              className="rounded-2xl h-11 font-semibold"
              onClick={handleGetAdvice}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Info className="w-4 h-4 mr-2" />}
              Generate Safety Plan
            </Button>
          </div>
        ) : (
          <div className="space-y-5 animate-in fade-in slide-in-from-top-2">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Immediate Action
              </h5>
              <ul className="space-y-1.5">
                {advice.immediateSteps.map((step, i) => (
                  <li key={i} className="text-sm font-medium text-foreground/90 pl-2 border-l-2 border-red-500">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Preparation</h5>
              <ul className="space-y-1">
                {advice.preparationTips.map((tip, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[10px] italic text-muted-foreground border-t pt-3">
              {advice.emergencyContactsSummary}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
