import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { BilingualField } from '@/components/admin/BilingualField';
import { ImageUploader } from '@/components/admin/ImageUploader';

interface Row {
  id: string; slug: string;
  title_ar: string; title_en: string; tag_ar: string; tag_en: string;
  description_ar: string; description_en: string; icon: string; image_url: string;
  is_visible: boolean; sort_order: number;
}
const ICONS = ['shoring', 'dewatering', 'waterproofing', 'excavation'];
const clean = (d: Record<string, unknown>): Row => ({
  id: d.id as string, slug: d.slug as string,
  title_ar: (d.title_ar as string) ?? '', title_en: (d.title_en as string) ?? '',
  tag_ar: (d.tag_ar as string) ?? '', tag_en: (d.tag_en as string) ?? '',
  description_ar: (d.description_ar as string) ?? '', description_en: (d.description_en as string) ?? '',
  icon: (d.icon as string) ?? '', image_url: (d.image_url as string) ?? '',
  is_visible: (d.is_visible as boolean) ?? true, sort_order: (d.sort_order as number) ?? 0,
});

export const ServicesEditor = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [removed, setRemoved] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = () => supabase.from('services').select('*').order('sort_order').then(({ data }) => {
    setRows((data ?? []).map(clean)); setLoading(false);
  });
  useEffect(() => { load(); }, []);

  const set = (id: string, k: keyof Row, v: string | boolean) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [k]: v } : r)));
  const addRow = () => setRows((rs) => [...rs, clean({
    id: crypto.randomUUID(), slug: `service-${rs.length + 1}`, is_visible: true, sort_order: rs.length + 1,
  })]);
  const move = (i: number, dir: -1 | 1) => setRows((rs) => {
    const n = [...rs]; const j = i + dir; if (j < 0 || j >= n.length) return rs;
    [n[i], n[j]] = [n[j], n[i]]; return n.map((r, k) => ({ ...r, sort_order: k + 1 }));
  });
  const remove = (id: string) => { setRows((rs) => rs.filter((r) => r.id !== id)); setRemoved((d) => [...d, id]); };

  const save = async () => {
    setSaving(true);
    if (removed.length) await supabase.from('services').delete().in('id', removed);
    const { error } = await supabase.from('services').upsert(rows.map((r, i) => ({ ...r, sort_order: i + 1 })));
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Services saved'); setRemoved([]); load();
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-foreground">Services</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addRow}><Plus className="h-4 w-4" /> Add</Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {rows.map((r, i) => (
          <div key={r.id} className="space-y-4 rounded-lg border border-border bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">{r.title_en || r.slug}</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => move(i, -1)}><ArrowUp className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => move(i, 1)}><ArrowDown className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => remove(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </div>
            <BilingualField label="Title" ar={r.title_ar} en={r.title_en}
              onAr={(v) => set(r.id, 'title_ar', v)} onEn={(v) => set(r.id, 'title_en', v)} />
            <BilingualField label="Tagline" ar={r.tag_ar} en={r.tag_en}
              onAr={(v) => set(r.id, 'tag_ar', v)} onEn={(v) => set(r.id, 'tag_en', v)} />
            <BilingualField label="Description" ar={r.description_ar} en={r.description_en}
              onAr={(v) => set(r.id, 'description_ar', v)} onEn={(v) => set(r.id, 'description_en', v)} multiline />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Slug</Label>
                <Input dir="ltr" value={r.slug} onChange={(e) => set(r.id, 'slug', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Built-in icon</Label>
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={ICONS.includes(r.icon) ? r.icon : ''}
                  onChange={(e) => set(r.id, 'icon', e.target.value)}>
                  <option value="">— none / custom —</option>
                  {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
            </div>
            <ImageUploader label="Image (optional)" value={r.image_url} folder="services"
              onChange={(url) => set(r.id, 'image_url', url)} />
            <div className="flex items-center gap-2">
              <Switch checked={r.is_visible} onCheckedChange={(v) => set(r.id, 'is_visible', v)} />
              <Label className="text-sm">Visible</Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
