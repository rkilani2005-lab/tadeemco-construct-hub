import { useEffect, useState } from 'react';

interface HeroVideoProps {
  /** YouTube video ID (the `v=` param value) */
  youtubeId: string;
  /** Poster image shown before video loads and for reduced-motion users */
  poster: string;
  /** Alt text for the poster image */
  posterAlt: string;
  /** Extra className for the container */
  className?: string;
}

/**
 * Full-bleed background video powered by a YouTube iframe.
 * - Respects prefers-reduced-motion (shows poster only)
 * - Scales up 130% to crop YouTube branding
 * - Pointer-events disabled so nothing blocks CTAs over the video
 * - Poster is always rendered underneath as an SEO + LCP fallback
 */
export const HeroVideo = ({ youtubeId, poster, posterAlt, className = '' }: HeroVideoProps) => {
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    // Honor reduced-motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setCanPlay(false);
      return;
    }

    // Delay mounting iframe slightly so LCP is the poster, not the iframe
    const timer = window.setTimeout(() => setCanPlay(true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: youtubeId, // required for loop on a single video
    controls: '0',
    showinfo: '0',
    modestbranding: '1',
    rel: '0',
    iv_load_policy: '3',
    disablekb: '1',
    playsinline: '1',
    fs: '0',
    cc_load_policy: '0',
  });

  const videoUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;

  return (
    <div className={`absolute inset-0 overflow-hidden bg-primary-dark ${className}`} style={{ backgroundColor: 'hsl(var(--primary-dark))' }}>
      {/* Poster image — always rendered, hidden once iframe loads */}
      <img
        src={poster}
        alt={posterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />

      {/* YouTube iframe — scaled up 130% to crop branding */}
      {canPlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            // 16:9 iframe scaled to cover the container, sized up 130% to hide YT UI
            width: '130%',
            height: '130%',
            top: '-15%',
            left: '-15%',
          }}
        >
          <iframe
            src={videoUrl}
            title="Hüdig dewatering equipment"
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            loading="lazy"
            style={{
              // Make iframe fill its oversized wrapper
              minWidth: '100%',
              minHeight: '100%',
              // 16:9 aspect correction — the wrapper enforces the size,
              // but we need the video to letterbox-fill, not letterbox-fit
              aspectRatio: 'auto',
            }}
          />
        </div>
      )}
    </div>
  );
};
