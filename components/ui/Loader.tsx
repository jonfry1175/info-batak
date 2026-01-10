import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  /**
   * Size of the loader
   * @default "default"
   */
  size?: 'sm' | 'default' | 'lg';
  /**
   * Custom text to display below loader
   */
  text?: string;
  /**
   * Full screen loader with backdrop
   * @default false
   */
  fullScreen?: boolean;
  /**
   * Additional className
   */
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  default: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function Loader({ size = 'default', text, fullScreen = false, className }: LoaderProps) {
  const loaderElement = (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn('text-accent animate-spin', sizeClasses[size])} />
      {text && <p className="text-foreground/70 text-sm">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        {loaderElement}
      </div>
    );
  }

  return loaderElement;
}

/**
 * Full page loader component
 */
export function PageLoader({ text }: { text?: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader size="lg" text={text} />
    </div>
  );
}

/**
 * Inline loader component for small spaces
 */
export function InlineLoader({ className }: { className?: string }) {
  return <Loader size="sm" className={className} />;
}
