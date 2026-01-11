'use client';

import { usePathname } from 'next/navigation';
import { DiscussionSection } from '@/components/discussion';

/**
 * Client component wrapper for DiscussionSection on marga detail pages.
 * This is needed because the parent page is a server component.
 */
export function MargaDiscussion() {
  const pathname = usePathname();
  
  return <DiscussionSection pagePath={pathname} />;
}

export default MargaDiscussion;
