import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
import { BilingualField } from '@/components/admin/BilingualField';
import { ImageUploader } from '@/components/admin/ImageUploader';

interface Row {
  id: string; route: string;
  title_ar: string; title_en: string;
  description_ar: string; description_en: string;
  keywords_ar: string; keywords_en: string;
  og_image_url: string;
}
const clean = (d: Record<string, unknown>): Row => ({
  id: d.id as string, route: (d.route as string) ?? '/',
  title_ar: (d.title_ar as string) ?? '', title_en: (d.title_en as string) ?? '',
  description_ar: (d.description_ar as string) ?? '', description_en: (d.description_en as string) ?? '',
  keywords_ar: (d.keywords_ar as string) ?? '', keywords_en: (d.keywords_en as string) ?? '',
  og_image_url: (d.og_image_url as string) ?? '',
});

export const SeoEditor = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [removed, setRemoved] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = () => supabase.from('seo_meta').select('*').order('route').then(({ data }) => {
    setRows((data ?? []).map(clean)); setLoading(false);
  });
  useEffect(() => { load(); }, []);

  const set = (id: string, k: keyof Row, v: string) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [k]: v } : r)));
  const addRow = () => setRows((rs) => [...rs, clean({ id: crypto.randomUUID(), route: '/new-route' })]);
  const remove = (id: string) => { setRows((rs) => rs.filter((r) => r.id !== id)); setRemoved((d) => [...d, id]); };

  const save = async () => {
    setSaving(true);
    if (removed.length) await supabase.from('seo_meta').delete().in('id', removed);
    const { error } = await supabase.from('seo_meta').upsert(rows, { onConflict: 'route' });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success('SEO metadata saved'); setRemoved([]); load();
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-foreground">SEO Metadata</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addRow}><Plus className="h-4 w-4" /> Add route</Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Edits apply to the live site immediately. To bake them into the prerendered HTML that search
        engines crawl, trigger a Lovable redeploy after saving.
      </p>

      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.id} className="space-y-4 rounded-lg border border-border bg-white p-5">
            <div className="flex items-end justify-between gap-3">
              <div className="flex-1 space-y-1.5">
                <Label>Route</Label>
                <Input dir="ltr" value={r.route} onChange={(e) => set(r.id, 'route', e.target.value)} placeholder="/about" />
              </div>
              <Button variant="ghost" size="icon" onClick={() => remove(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
            <BilingualField label="Title" ar={r.title_ar} en={r.title_en}
              onAr={(v) => set(r.id, 'title_ar', v)} onEn={(v) => set(r.id, 'title_en', v)} />
            <BilingualField label="Description" ar={r.description_ar} en={r.description_en}
              onAr={(v) => set(r.id, 'description_ar', v)} onEn={(v) => set(r.id, 'description_en', v)} multiline />
            <BilingualField label="Keywords (comma separated)" ar={r.keywords_ar} en={r.keywords_en}
              onAr={(v) => set(r.id, 'keywords_ar', v)} onEn={(v) => set(r.id, 'keywords_en', v)} />
            <ImageUploader label="OG / social share image" value={r.og_image_url} folder="og"
              onChange={(url) => set(r.id, 'og_image_url', url)} />
          </div>
        ))}
      </div>
    </div>
  );
};
