'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Loader2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface City {
  displayName: string;
  city: string;
  country: string;
  lat: string;
  lon: string;
}

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export function CityAutocomplete({
  value,
  onChange,
  placeholder = 'Введіть місто...',
  error,
}: CityAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Fetch cities from Nominatim API
  const fetchCities = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(searchQuery)}&` +
        `format=json&` +
        `addressdetails=1&` +
        `limit=6&` +
        `featuretype=city&` +
        `accept-language=uk,en`,
        {
          headers: {
            'User-Agent': 'Astroline/1.0',
          },
        }
      );

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      
      const cities: City[] = data
        .filter((item: any) => 
          item.address?.city || 
          item.address?.town || 
          item.address?.village ||
          item.type === 'city' ||
          item.type === 'town' ||
          item.class === 'place'
        )
        .map((item: any) => {
          const cityName = item.address?.city || 
                          item.address?.town || 
                          item.address?.village ||
                          item.name;
          const country = item.address?.country || '';
          
          return {
            displayName: `${cityName}, ${country}`,
            city: cityName,
            country: country,
            lat: item.lat,
            lon: item.lon,
          };
        })
        .filter((city: City, index: number, self: City[]) => 
          index === self.findIndex((c) => c.displayName === city.displayName)
        );

      setSuggestions(cities);
      setIsOpen(cities.length > 0);
    } catch (err) {
      console.error('City search error:', err);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    setHighlightedIndex(-1);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchCities(newValue);
    }, 300);
  };

  // Select a city
  const selectCity = (city: City) => {
    setQuery(city.displayName);
    onChange(city.displayName);
    setSuggestions([]);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          selectCity(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Sync external value
  useEffect(() => {
    if (value !== query) {
      setQuery(value);
    }
  }, [value]);

  return (
    <div ref={containerRef} className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
            <MapPin className="w-5 h-5" />
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setIsOpen(true)}
            placeholder={placeholder}
            autoComplete="off"
            className={cn(
              'input-default pl-12 pr-10',
              error && 'border-error focus:border-error focus:ring-error/20'
            )}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5 opacity-50" />
            )}
          </span>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-error mt-2"
          >
            {error}
          </motion.p>
        )}
      </motion.div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 glass rounded-xl overflow-hidden shadow-xl border border-white/20"
          >
            <ul className="py-2 max-h-64 overflow-y-auto">
              {suggestions.map((city, index) => (
                <motion.li
                  key={`${city.lat}-${city.lon}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <button
                    type="button"
                    onClick={() => selectCity(city)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={cn(
                      'w-full px-4 py-3 text-left flex items-center gap-3 transition-colors',
                      highlightedIndex === index
                        ? 'bg-accent/20 text-accent'
                        : 'hover:bg-white/5 text-text-primary'
                    )}
                  >
                    <MapPin className={cn(
                      'w-4 h-4 flex-shrink-0',
                      highlightedIndex === index ? 'text-accent' : 'text-text-secondary'
                    )} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{city.city}</div>
                      <div className="text-xs text-text-secondary truncate">
                        {city.country}
                      </div>
                    </div>
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="px-4 py-2 border-t border-white/10 text-xs text-text-muted flex items-center gap-1">
              <span>Дані:</span>
              <a 
                href="https://www.openstreetmap.org/copyright" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                © OpenStreetMap
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
