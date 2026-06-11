import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save } from 'lucide-react';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { MediaUploader } from '@/components/admin/MediaUploader';

interface Row {
  id: string; key: string; page: string; label: string;
  field_type: string; value_ar: string; value_en: string; sort_order: number;
}

export const ContentEditor = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('site_content').select('*').order('page').order('sort_order').then(({ data }) => {
      setRows((data ?? []).map((d) => ({ ...d, value_ar: d.value_ar ?? '', value_en: d.value_en ?? '' })) as Row[]);
      setLoading(false);
    });
  }, []);

  const groups = useMemo(() => {
    const m: Record<string, Row[]> = {};
    for (const r of rows) (m[r.page] ??= []).push(r);
    return m;
  }, [rows]);

  const set = (id: string, k: 'value_ar' | 'value_en', v: string) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [k]: v } : r)));

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from('site_content').upsert(
      rows.map(({ id, key, page, label, field_type, value_ar, value_en, sort_order }) =>
        ({ id, key, page, label, field_type, value_ar, value_en, sort_order })),
    );
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success('Content saved');
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-foreground">Page Content</h1>
        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save all
        </Button>
      </div>

      {Object.keys(groups).length === 0 && (
        <p className="text-sm text-muted-foreground">No content rows yet.</p>
      )}

      {Object.entries(groups).map(([page, items]) => (
        <section key={page} className="rounded-lg border border-border bg-white p-6">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">{page}</h2>
          <div className="space-y-5">
            {items.map((r) => (
              <div key={r.id} className="space-y-2 border-b border-border/60 pb-5 last:border-0 last:pb-0">
                <p className="text-sm font-semibold text-foreground">{r.label || r.key}</p>
                {r.field_type === 'image' ? (
                  <ImageUploader label="" value={r.value_en} folder="content"
                    onChange={(url) => { set(r.id, 'value_en', url); set(r.id, 'value_ar', url); }} />
                ) : r.field_type === 'media' ? (
                  <MediaUploader label="" value={r.value_en} folder="content"
                    onChange={(url) => { set(r.id, 'value_en', url); set(r.id, 'value_ar', url); }} />
                ) : r.field_type === 'url' ? (
                  <Input dir="ltr" value={r.value_en} placeholder="https://…"
                    onChange={(e) => { set(r.id, 'value_en', e.target.value); set(r.id, 'value_ar', e.target.value); }} />
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">العربية</span>
                      {r.field_type === 'textarea'
                        ? <Textarea dir="rtl" className="font-cairo" value={r.value_ar} onChange={(e) => set(r.id, 'value_ar', e.target.value)} />
                        : <Input dir="rtl" className="font-cairo" value={r.value_ar} onChange={(e) => set(r.id, 'value_ar', e.target.value)} />}
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">English</span>
                      {r.field_type === 'textarea'
                        ? <Textarea dir="ltr" value={r.value_en} onChange={(e) => set(r.id, 'value_en', e.target.value)} />
                        : <Input dir="ltr" value={r.value_en} onChange={(e) => set(r.id, 'value_en', e.target.value)} />}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
