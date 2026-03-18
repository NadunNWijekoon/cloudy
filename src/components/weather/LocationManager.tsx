"use client";

import { useMemo, useState } from 'react';
import { ChevronDown, MapPin, Plus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AVAILABLE_LOCATIONS } from '@/app/lib/weather-service';

interface LocationManagerProps {
  currentLocation: string;
  onLocationChange: (loc: string) => void;
}

export function LocationManager({ currentLocation, onLocationChange }: LocationManagerProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const locations = useMemo(() => {
    if (AVAILABLE_LOCATIONS.includes(currentLocation)) {
      return AVAILABLE_LOCATIONS;
    }

    return [currentLocation, ...AVAILABLE_LOCATIONS];
  }, [currentLocation]);

  const handleAddLocation = () => {
    const normalizedInput = locationInput.trim().toLowerCase();
    const matchedLocation = AVAILABLE_LOCATIONS.find(
      (location) => location.toLowerCase() === normalizedInput
    );

    if (!normalizedInput) {
      setErrorMessage('Enter a city name.');
      return;
    }

    if (!matchedLocation) {
      setErrorMessage(`Supported locations: ${AVAILABLE_LOCATIONS.join(', ')}.`);
      return;
    }

    onLocationChange(matchedLocation);
    setLocationInput('');
    setErrorMessage('');
    setIsAddDialogOpen(false);
  };

  return (
    <div className="flex flex-col items-center mb-8 pt-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1.5 px-4 py-2 rounded-full hover:bg-white/20 text-foreground transition-all">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-lg font-bold">{currentLocation}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="rounded-2xl w-48 p-2">
          {locations.map((loc) => (
            <DropdownMenuItem 
              key={loc} 
              className="rounded-xl px-3 py-2 cursor-pointer focus:bg-primary/10"
              onClick={() => onLocationChange(loc)}
            >
              {loc}
            </DropdownMenuItem>
          ))}
          <div className="h-px bg-border my-1" />
          <DropdownMenuItem
            className="rounded-xl px-3 py-2 text-primary font-medium flex items-center gap-2"
            onClick={() => {
              setLocationInput('');
              setErrorMessage('');
              setIsAddDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Add Location
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="text-sm text-muted-foreground font-medium mt-1">Tuesday, 14 May</div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-sm rounded-3xl">
          <DialogHeader>
            <DialogTitle>Add Location</DialogTitle>
            <DialogDescription>
              Enter one of the supported cities to switch the forecast.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="location-input">City</Label>
            <Input
              id="location-input"
              value={locationInput}
              onChange={(event) => {
                setLocationInput(event.target.value);
                if (errorMessage) {
                  setErrorMessage('');
                }
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleAddLocation();
                }
              }}
              placeholder="San Francisco"
            />
            {errorMessage ? (
              <p className="text-sm text-destructive">{errorMessage}</p>
            ) : null}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddLocation}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
