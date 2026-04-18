import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image: string;
  imageAlt: string;
  language: 'ar' | 'en';
  children?: ReactNode;
}

/**
 * Compact page hero used on internal pages (About, Services, Projects,
 * Equipment, Contact). Shorter than the Home hero — ~38vh — with a real
 * site image, subtle dark-only scrim on the text side, and the orange
 * accent bar at the top corner that echoes the corporate profile.
 */
export const PageHeader = ({
  title,
  subtitle,
  eyebrow,
  image,
  imageAlt,
  language,
  children,
}: PageHeaderProps) => {
  const isArabic = language === 'ar';
  return (
    <section className="relative min-h-[34vh] md:min-h-[40vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Dark-only scrim on the text side, no blue tint */}
        <div
          className={`absolute inset-0 ${
            isArabic
              ? 'bg-gradient-to-l from-black/65 via-black/35 to-transparent'
              : 'bg-gradient-to-r from-black/65 via-black/35 to-transparent'
          }`}
          aria-hidden
        />
      </div>

      <div
        className={`absolute top-0 ${isArabic ? 'left-0' : 'right-0'} h-2 w-32 bg-accent z-10`}
        aria-hidden
      />

      <div className={`container-width relative z-10 py-10 md:py-14 ${isArabic ? 'text-right' : 'text-left'}`}>
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-4 text-accent">{eyebrow}</p>}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-4 text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl text-pretty">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};
