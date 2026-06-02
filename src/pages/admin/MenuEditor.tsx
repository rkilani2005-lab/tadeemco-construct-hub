import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as Icons from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface Row {
  id: string; path: string; label_ar: string; label_en: string;
  icon: string; is_visible: boolean; sort_order: number; _new?: boolean;
}

const IconPreview = ({ name }: { name: string }) => {
  const C = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[name];
  return C ? <C className="h-4 w-4 text-primary" /> : <span className="text-xs text-muted-foreground">?</span>;
};

export const MenuEditor = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [removed, setRemoved] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = () =>
    supabase.from('menu_items').select('*').order('sort_order').then(({ data }) => {
      setRows((data ?? []).map((d) => ({ ...d, icon: d.icon ?? '' })) as Row[]);
      setLoading(false);
    });
  useEffect(() => { load(); }, []);

  const set = (id: string, k: keyof Row, v: string | boolean) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [k]: v } : r)));

  const addRow = () => setRows((rs) => [...rs, {
    id: crypto.randomUUID(), path: '/', label_ar: '', label_en: '', icon: '',
    is_visible: true, sort_order: rs.length + 1, _new: true,
  }]);

  const move = (i: number, dir: -1 | 1) => setRows((rs) => {
    const next = [...rs];
    const j = i + dir;
    if (j < 0 || j >= next.length) return rs;
    [next[i], next[j]] = [next[j], next[i]];
    return next.map((r, k) => ({ ...r, sort_order: k + 1 }));
  });

  const remove = (id: string) => {
    setRows((rs) => rs.filter((r) => r.id !== id));
    setRemoved((d) => [...d, id]);
  };

  const save = async () => {
    setSaving(true);
    if (removed.length) await supabase.from('menu_items').delete().in('id', removed);
    const payload = rows.map(({ _new, ...r }, i) => ({ ...r, sort_order: i + 1 }));
    const { error } = await supabase.from('menu_items').upsert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Menu saved');
    setRemoved([]);
    load();
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-foreground">Navigation Menu</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addRow}><Plus className="h-4 w-4" /> Add</Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Icon = any <a className="underline" href="https://lucide.dev/icons" target="_blank" rel="noreferrer">lucide</a> name
        (e.g. <code>Phone</code>, <code>Wrench</code>).
      </p>

      <div className="space-y-4">
        {rows.map((r, i) => (
          <div key={r.id} className="rounded-lg border border-border bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconPreview name={r.icon} />
                <span className="text-sm font-semibold text-foreground">{r.label_en || r.path}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => move(i, -1)}><ArrowUp className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => move(i, 1)}><ArrowDown className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => remove(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="space-y-1"><span className="text-xs text-muted-foreground">Path</span>
                <Input dir="ltr" value={r.path} onChange={(e) => set(r.id, 'path', e.target.value)} /></div>
              <div className="space-y-1"><span className="text-xs text-muted-foreground">Label (AR)</span>
                <Input dir="rtl" className="font-cairo" value={r.label_ar} onChange={(e) => set(r.id, 'label_ar', e.target.value)} /></div>
              <div className="space-y-1"><span className="text-xs text-muted-foreground">Label (EN)</span>
                <Input dir="ltr" value={r.label_en} onChange={(e) => set(r.id, 'label_en', e.target.value)} /></div>
              <div className="space-y-1"><span className="text-xs text-muted-foreground">Icon</span>
                <Input dir="ltr" value={r.icon} onChange={(e) => set(r.id, 'icon', e.target.value)} /></div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Switch checked={r.is_visible} onCheckedChange={(v) => set(r.id, 'is_visible', v)} />
              <Label className="text-sm">Visible</Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
