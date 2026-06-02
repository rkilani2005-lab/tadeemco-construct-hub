import { useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

/** Uploads to the public `site-images` bucket and returns the public URL. */
export const ImageUploader = ({ value, onChange, folder = 'general', label = 'Image' }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('site-images').upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('site-images').getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="flex items-start gap-4">
        <div className="h-24 w-32 shrink-0 overflow-hidden rounded border border-border bg-muted">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              No image
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => inputRef.current?.click()}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Upload
            </Button>
            {value && (
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange('')}>
                <X className="h-4 w-4" /> Clear
              </Button>
            )}
          </div>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…or paste an image URL"
            className="text-xs"
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }}
      />
    </div>
  );
};
