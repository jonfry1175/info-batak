'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { MapMarker } from '@/types';

interface MapEmbedProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  markers?: MapMarker[];
  fallbackImage?: string;
  title: string;
}

/**
 * Validates if coordinates are within valid ranges
 * Latitude: -90 to 90
 * Longitude: -180 to 180
 */
export function isValidCoordinate(lat: number, lng: number): boolean {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

/**
 * Generates Google Maps embed URL from coordinates
 */
export function generateMapEmbedUrl(
  latitude: number,
  longitude: number,
  zoom: number = 10
): string {
  return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d${Math.pow(2, 21 - zoom)}!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1704067200000!5m2!1sen!2sid`;
}

export function MapEmbed({
  latitude,
  longitude,
  zoom = 10,
  markers = [],
  fallbackImage = '/images/rumpun/placeholder.jpg',
  title,
}: MapEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Validate coordinates
  const validCoordinates = isValidCoordinate(latitude, longitude);

  // If coordinates are invalid, show fallback
  if (!validCoordinates) {
    return (
      <div className="relative w-full overflow-hidden rounded-xl bg-foreground/5">
        <div className="aspect-video relative">
          <Image
            src={fallbackImage}
            alt={`Peta wilayah ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <svg
                className="mx-auto h-12 w-12 mb-2 opacity-80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-sm font-medium">Wilayah {title}</p>
              <p className="text-xs opacity-80 mt-1">Koordinat tidak tersedia</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const mapUrl = generateMapEmbedUrl(latitude, longitude, zoom);

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-foreground/5">
      {/* 16:9 Aspect Ratio Container */}
      <div className="aspect-video relative">
        {/* Loading Skeleton */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 z-10 animate-pulse bg-foreground/10">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <svg
                  className="mx-auto h-10 w-10 animate-spin text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="mt-2 text-sm text-foreground/60">Memuat peta...</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Fallback */}
        {hasError ? (
          <div className="absolute inset-0">
            <Image
              src={fallbackImage}
              alt={`Peta wilayah ${title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <svg
                  className="mx-auto h-12 w-12 mb-2 opacity-80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-sm font-medium">Wilayah {title}</p>
                <p className="text-xs opacity-80 mt-1">
                  {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Google Maps Embed */
          <iframe
            src={mapUrl}
            title={`Peta wilayah ${title}`}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </div>

      {/* Markers Legend (if provided) */}
      {markers.length > 0 && !hasError && (
        <div className="border-t border-foreground/10 bg-background/80 p-3">
          <p className="text-xs font-medium text-foreground/70 mb-2">Lokasi Penting:</p>
          <div className="flex flex-wrap gap-2">
            {markers.slice(0, 5).map((marker, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                  marker.type === 'center'
                    ? 'bg-accent/20 text-accent'
                    : marker.type === 'landmark'
                      ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                      : 'bg-foreground/10 text-foreground/70'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    marker.type === 'center'
                      ? 'bg-accent'
                      : marker.type === 'landmark'
                        ? 'bg-blue-500'
                        : 'bg-foreground/50'
                  }`}
                />
                {marker.label}
              </span>
            ))}
            {markers.length > 5 && (
              <span className="text-xs text-foreground/50">
                +{markers.length - 5} lainnya
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
