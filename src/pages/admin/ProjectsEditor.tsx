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
import { getProjectImage } from '@/lib/cms-context';

interface Row {
  id: string; slug: string;
  area_ar: string; area_en: string; contractor_ar: string; contractor_en: string;
  consultant_ar: string; consultant_en: string; type_ar: string; type_en: string;
  services: string[]; image_url: string; is_visible: boolean; sort_order: number;
}
const SERVICES = ['shoring', 'dewatering', 'waterproofing', 'excavation'];
const clean = (d: Record<string, unknown>): Row => ({
  id: d.id as string, slug: d.slug as string,
  area_ar: (d.area_ar as string) ?? '', area_en: (d.area_en as string) ?? '',
  contractor_ar: (d.contractor_ar as string) ?? '', contractor_en: (d.contractor_en as string) ?? '',
  consultant_ar: (d.consultant_ar as string) ?? '', consultant_en: (d.consultant_en as string) ?? '',
  type_ar: (d.type_ar as string) ?? '', type_en: (d.type_en as string) ?? '',
  services: (d.services as string[]) ?? [], image_url: (d.image_url as string) ?? '',
  is_visible: (d.is_visible as boolean) ?? true, sort_order: (d.sort_order as number) ?? 0,
});

export const ProjectsEditor = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [removed, setRemoved] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = () => supabase.from('projects').select('*').order('sort_order').then(({ data }) => {
    setRows((data ?? []).map(clean)); setLoading(false);
  });
  useEffect(() => { load(); }, []);

  const set = (id: string, k: keyof Row, v: string | boolean | string[]) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [k]: v } : r)));
  const toggleSvc = (id: string, svc: string) => setRows((rs) => rs.map((r) =>
    r.id === id ? { ...r, services: r.services.includes(svc) ? r.services.filter((s) => s !== svc) : [...r.services, svc] } : r));
  const addRow = () => setRows((rs) => [...rs, clean({
    id: crypto.randomUUID(), slug: `project-${rs.length + 1}`, services: [], is_visible: true, sort_order: rs.length + 1,
  })]);
  const move = (i: number, dir: -1 | 1) => setRows((rs) => {
    const n = [...rs]; const j = i + dir; if (j < 0 || j >= n.length) return rs;
    [n[i], n[j]] = [n[j], n[i]]; return n.map((r, k) => ({ ...r, sort_order: k + 1 }));
  });
  const remove = (id: string) => { setRows((rs) => rs.filter((r) => r.id !== id)); setRemoved((d) => [...d, id]); };

  const save = async () => {
    setSaving(true);
    if (removed.length) await supabase.from('projects').delete().in('id', removed);
    const { error } = await supabase.from('projects').upsert(rows.map((r, i) => ({ ...r, sort_order: i + 1 })));
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Projects saved'); setRemoved([]); load();
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-foreground">Projects</h1>
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
              <span className="text-sm font-semibold text-foreground">{r.type_en || r.slug}</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => move(i, -1)}><ArrowUp className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => move(i, 1)}><ArrowDown className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => remove(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </div>
            <BilingualField label="Project type / name" ar={r.type_ar} en={r.type_en}
              onAr={(v) => set(r.id, 'type_ar', v)} onEn={(v) => set(r.id, 'type_en', v)} />
            <BilingualField label="Area" ar={r.area_ar} en={r.area_en}
              onAr={(v) => set(r.id, 'area_ar', v)} onEn={(v) => set(r.id, 'area_en', v)} />
            <BilingualField label="Main contractor" ar={r.contractor_ar} en={r.contractor_en}
              onAr={(v) => set(r.id, 'contractor_ar', v)} onEn={(v) => set(r.id, 'contractor_en', v)} />
            <BilingualField label="Consultant (optional)" ar={r.consultant_ar} en={r.consultant_en}
              onAr={(v) => set(r.id, 'consultant_ar', v)} onEn={(v) => set(r.id, 'consultant_en', v)} />
            <div className="space-y-2">
              <Label>Services</Label>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((svc) => (
                  <button key={svc} type="button" onClick={() => toggleSvc(r.id, svc)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      r.services.includes(svc)
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-white text-muted-foreground'
                    }`}>{svc}</button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Slug</Label>
              <Input dir="ltr" value={r.slug} onChange={(e) => set(r.id, 'slug', e.target.value)} />
            </div>
            <ImageUploader label="Project image" value={getProjectImage(r.slug, r.image_url)} folder="projects"
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
