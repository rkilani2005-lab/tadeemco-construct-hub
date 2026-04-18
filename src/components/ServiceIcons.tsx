// Service icons matching the Tadeemco corporate profile's visual language.
// Three columns (shoring) / water drop with arrow (dewatering) / layers (waterproofing) / excavator bucket.

import type { SVGProps } from 'react';

export const IconShoring = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Three vertical columns on a baseline */}
    <rect x="10" y="14" width="10" height="34" fill="currentColor" />
    <rect x="27" y="14" width="10" height="34" fill="currentColor" />
    <rect x="44" y="14" width="10" height="34" fill="currentColor" />
    {/* Top and bottom bars */}
    <rect x="6" y="8" width="52" height="6" fill="currentColor" />
    <rect x="6" y="48" width="52" height="6" fill="currentColor" />
  </svg>
);

export const IconDewatering = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Water drop */}
    <path
      d="M32 8 C32 8, 18 22, 18 34 C18 42.837 24.163 50 32 50 C39.837 50 46 42.837 46 34 C46 22, 32 8, 32 8 Z"
      fill="currentColor"
    />
    {/* Down-pulling arrow through drop */}
    <path d="M32 26 L32 42 M26 36 L32 42 L38 36" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Ground line below */}
    <rect x="12" y="54" width="40" height="3" fill="currentColor" />
  </svg>
);

export const IconWaterproofing = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Stacked diamond-layers (insulation) */}
    <path d="M32 10 L54 22 L32 34 L10 22 Z" fill="currentColor" opacity="0.95" />
    <path d="M32 26 L54 38 L32 50 L10 38 Z" fill="currentColor" opacity="0.75" />
    <path d="M32 42 L46 50 L32 58 L18 50 Z" fill="currentColor" opacity="0.55" />
  </svg>
);

export const IconExcavation = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Excavator bucket teeth silhouette */}
    <path
      d="M10 14 L54 14 L54 36 C54 40 50 44 46 44 L18 44 C14 44 10 40 10 36 Z"
      fill="currentColor"
    />
    {/* Teeth */}
    <rect x="14" y="44" width="4" height="8" fill="currentColor" />
    <rect x="22" y="44" width="4" height="8" fill="currentColor" />
    <rect x="30" y="44" width="4" height="8" fill="currentColor" />
    <rect x="38" y="44" width="4" height="8" fill="currentColor" />
    <rect x="46" y="44" width="4" height="8" fill="currentColor" />
    {/* Arm hinge */}
    <circle cx="32" cy="22" r="3" fill="white" />
  </svg>
);
