"use client";

import { ChevronDown, MapPin, Plus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface LocationManagerProps {
  currentLocation: string;
  onLocationChange: (loc: string) => void;
}

export function LocationManager({ currentLocation, onLocationChange }: LocationManagerProps) {
  const locations = ['San Francisco', 'New York', 'London'];

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
          <DropdownMenuItem className="rounded-xl px-3 py-2 text-primary font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Location
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="text-sm text-muted-foreground font-medium mt-1">Tuesday, 14 May</div>
    </div>
  );
}
