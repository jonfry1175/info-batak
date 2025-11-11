'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { ArrowRight } from 'lucide-react';

interface MediaCardProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  href: string;
  category?: string;
  icon?: React.ReactNode;
  index?: number;
}

export function MediaCard({
  title,
  description,
  image,
  imageAlt,
  href,
  category,
  icon,
  index = 0,
}: MediaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={href} className="group block h-full">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:border-accent/50">
          {image ? (
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={image}
                alt={imageAlt || title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              {category && (
                <Badge className="absolute left-4 top-4 bg-accent text-white hover:bg-accent/90">
                  {category}
                </Badge>
              )}
            </div>
          ) : (
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5">
              <div className="flex h-full items-center justify-center text-accent">
                {icon || (
                  <div className="text-6xl opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-20 w-20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              {category && (
                <Badge className="absolute left-4 top-4 bg-accent text-white hover:bg-accent/90">
                  {category}
                </Badge>
              )}
            </div>
          )}

          <CardHeader>
            <CardTitle className="group-hover:text-accent transition-colors">
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <CardContent>
            <Button variant="ghost" className="group/button pl-0">
              Pelajari Lebih Lanjut
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
            </Button>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export function MediaCardGrid({
  children,
  columns = 3,
}: {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
}) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return <div className={`grid gap-6 ${gridCols[columns]}`}>{children}</div>;
}
