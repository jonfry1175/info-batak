import { TahukahKamu } from '@/components/ui/TahukahKamu';

export function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Did You Know Component */}
      <TahukahKamu />

      {/* Optional: Popular Articles */}
      <div className="bg-foreground/5 border-foreground/10 rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-bold">Artikel Populer</h3>
        <div className="space-y-3">
          <p className="text-foreground/60 text-sm">Segera hadir...</p>
        </div>
      </div>
    </aside>
  );
}
