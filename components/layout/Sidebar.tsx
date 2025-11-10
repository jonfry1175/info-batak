import { TahukahKamu } from '@/components/ui/TahukahKamu';

export function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Did You Know Component */}
      <TahukahKamu />

      {/* Optional: Popular Articles */}
      <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
        <h3 className="font-bold text-lg mb-4">Artikel Populer</h3>
        <div className="space-y-3">
          <p className="text-sm text-foreground/60">Segera hadir...</p>
        </div>
      </div>
    </aside>
  );
}
