import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Save } from 'lucide-react';
import { BilingualField } from '@/components/admin/BilingualField';
import { ImageUploader } from '@/components/admin/ImageUploader';

interface Row {
  name_ar: string; name_en: string;
  tagline_ar: string; tagline_en: string;
  phones: string[]; email: string; whatsapp: string;
  instagram: string; instagram_url: string;
  address_ar: string; address_en: string; logo_url: string;
}

const empty: Row = {
  name_ar: '', name_en: '', tagline_ar: '', tagline_en: '',
  phones: [], email: '', whatsapp: '', instagram: '', instagram_url: '',
  address_ar: '', address_en: '', logo_url: '',
};

export const SettingsEditor = () => {
  const [row, setRow] = useState<Row>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('site_settings').select('*').eq('id', true).maybeSingle().then(({ data }) => {
      if (data) setRow({ ...empty, ...data, phones: data.phones ?? [] });
      setLoading(false);
    });
  }, []);

  const set = (k: keyof Row, v: string | string[]) => setRow((r) => ({ ...r, [k]: v }));

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from('site_settings').upsert({ id: true, ...row });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success('Settings saved');
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-foreground">Site Settings</h1>
        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
        </Button>
      </div>

      <div className="space-y-5 rounded-lg border border-border bg-white p-6">
        <BilingualField label="Company name" ar={row.name_ar} en={row.name_en}
          onAr={(v) => set('name_ar', v)} onEn={(v) => set('name_en', v)} />
        <BilingualField label="Tagline" ar={row.tagline_ar} en={row.tagline_en}
          onAr={(v) => set('tagline_ar', v)} onEn={(v) => set('tagline_en', v)} multiline />
        <BilingualField label="Address" ar={row.address_ar} en={row.address_en}
          onAr={(v) => set('address_ar', v)} onEn={(v) => set('address_en', v)} multiline />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Phones (one per line)</Label>
            <textarea
              dir="ltr"
              className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={row.phones.join('\n')}
              onChange={(e) => set('phones', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
            />
          </div>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input dir="ltr" value={row.email} onChange={(e) => set('email', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>WhatsApp (e.g. +96590001662)</Label>
              <Input dir="ltr" value={row.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Instagram handle</Label>
            <Input dir="ltr" value={row.instagram} onChange={(e) => set('instagram', e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Instagram URL</Label>
            <Input dir="ltr" value={row.instagram_url} onChange={(e) => set('instagram_url', e.target.value)} />
          </div>
        </div>

        <ImageUploader label="Logo" value={row.logo_url} folder="logo"
          onChange={(url) => set('logo_url', url)} />
      </div>
    </div>
  );
};
