'use client';

import { usePathname } from 'next/navigation';
import { DiscussionSection } from './DiscussionSection';

/**
 * Client component wrapper for DiscussionSection.
 * Use this in server components that need to include the discussion section.
 * It automatically gets the current page path from the URL.
 */
export function PageDiscussion() {
  const pathname = usePathname();
  
  return <DiscussionSection pagePath={pathname} />;
}

export default PageDiscussion;
