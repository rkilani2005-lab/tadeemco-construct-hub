import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Loader2 } from 'lucide-react';

interface MediaUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

const isVideo = (url: string) => /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(url);

/**
 * Uploads an image OR video to the public `site-images` bucket and returns the
 * public URL. Used for the hero, which can be a still image or a short clip.
 */
export const MediaUploader = ({ value, onChange, folder = 'general', label = 'Media' }: MediaUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      // Soft guard: large videos make the page slow and may hit storage limits.
      if (file.type.startsWith('video/') && file.size > 50 * 1024 * 1024) {
        throw new Error('Video is larger than 50 MB. Please compress it (e.g. 720p, ~10–15s) before uploading.');
      }
      const ext = file.name.split('.').pop() || 'bin';
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('site-images').upload(path, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type || undefined,
      });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('site-images').getPublicUrl(path);
      if (!data?.publicUrl) throw new Error('Upload succeeded but no public URL was returned.');
      onChange(data.publicUrl);
      toast.success(file.type.startsWith('video/') ? 'Video uploaded' : 'Image uploaded');
    } catch (e) {
      const raw = e instanceof Error ? e.message : 'Upload failed';
      const msg = /bucket.*not.*found|not found/i.test(raw)
        ? "Storage bucket 'site-images' is missing. Apply the latest Supabase migration (or create a public 'site-images' bucket) and try again."
        : /row-level security|policy|unauthorized|403/i.test(raw)
          ? 'Upload blocked by permissions. Make sure you are signed in as an admin user.'
          : raw;
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <span className="text-sm font-medium text-foreground">{label}</span>}
      <div className="flex items-start gap-4">
        <div className="h-24 w-32 shrink-0 overflow-hidden rounded border border-border bg-muted">
          {value ? (
            isVideo(value)
              ? <video src={value} className="h-full w-full object-cover" muted playsInline />
              : <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              No media
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => inputRef.current?.click()}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Upload image or video
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
            placeholder="…or paste an image/video URL"
            className="text-xs"
          />
          <p className="text-[11px] text-muted-foreground">
            Images: JPG/PNG/WebP. Video: MP4/WebM, keep it short and under 50 MB for fast loading.
          </p>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }}
      />
    </div>
  );
};
