'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { JsonLd } from './JsonLd';
import { createBreadcrumbJsonLd, type BreadcrumbItem, BASE_URL } from '@/lib/seo';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const fullItems: BreadcrumbItem[] = [
    { name: 'Головна', url: BASE_URL },
    ...items,
  ];

  const jsonLd = createBreadcrumbJsonLd(fullItems);

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav
        aria-label="Навігація"
        className={`flex items-center flex-wrap gap-2 text-sm ${className}`}
      >
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1;
          const isFirst = index === 0;

          return (
            <div key={item.url} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-white/20" />
              )}
              {isLast ? (
                <span className="text-white/90 font-medium truncate max-w-[200px]">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url.replace(BASE_URL, '')}
                  className="text-white/40 hover:text-accent transition-colors flex items-center gap-1"
                >
                  {isFirst && <Home className="w-4 h-4" />}
                  <span className={isFirst ? 'sr-only sm:not-sr-only' : ''}>
                    {item.name}
                  </span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
