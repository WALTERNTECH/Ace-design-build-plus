/** Line icons drawn for this site — each discipline icon depicts the actual
 *  work, not a generic glyph, so the service cards read at a glance on a phone. */

interface IconProps {
  size?: number;
  className?: string;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

/* ---------- discipline icons ---------- */

/** Drawing board: elevation on a sheet with a set square. */
export const IconArchitecture = ({ size = 26, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 4.5h18v15H3z" />
    <path d="M7 19.5V11l4-3 4 3v8.5" />
    <path d="M11 19.5v-4h0.5v4" />
    <path d="M3 8.5h18" />
  </svg>
);

/** Portal frame with a downward load and fixed bases. */
export const IconStructural = ({ size = 26, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 8h16" />
    <path d="M6 8v11M18 8v11" />
    <path d="M3.5 19h5M15.5 19h5" />
    <path d="M12 2v4.2M9.8 4.4 12 6.6l2.2-2.2" />
    <path d="M6 12h12" />
  </svg>
);

/** Tower crane with jib, hoist line and counterweight. */
export const IconConstruction = ({ size = 26, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 6h18" />
    <path d="M6 6 12 3l6 3" />
    <path d="M12 6v14" />
    <path d="M9 20h6" />
    <path d="M16.5 6v4.5" />
    <path d="M14.8 10.5h3.4v2.6h-3.4z" />
    <path d="M4.5 6v2" />
  </svg>
);

/** Room in section: ceiling, pendant light and a seat. */
export const IconInterior = ({ size = 26, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 3.5h18" />
    <path d="M15 3.5v4" />
    <path d="M13.2 7.5h3.6l-.9 2.4h-1.8z" />
    <path d="M4 20.5v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
    <path d="M4 17.2h8" />
    <path d="M5.5 20.5v1.2M10.5 20.5v1.2" />
    <path d="M18 20.5h3" />
  </svg>
);

/** Globe with a site marker — building here, from elsewhere. */
export const IconDiaspora = ({ size = 26, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="M3.2 9.5h15.6M3.2 13.5h11" />
    <path d="M11 3a13 13 0 0 0 0 16 13 13 0 0 0 0-16Z" />
    <path d="M20.5 15.5c0 2-2.5 4.2-2.5 4.2s-2.5-2.2-2.5-4.2a2.5 2.5 0 0 1 5 0Z" />
  </svg>
);

/** Plant: production shed, stack and storage silo. */
export const IconIndustrial = ({ size = 26, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M2.5 20.5h19" />
    <path d="M3.5 20.5v-8l5 3v-3l5 3V20.5" />
    <path d="M16.5 20.5v-9a2 2 0 0 1 4 0v9" />
    <path d="M16.5 14.5h4" />
    <path d="M6 9.5V6" />
  </svg>
);

export const DISCIPLINE_ICONS: Record<string, (p: IconProps) => JSX.Element> = {
  architecture: IconArchitecture,
  structural: IconStructural,
  construction: IconConstruction,
  interior: IconInterior,
  diaspora: IconDiaspora,
  industrial: IconIndustrial,
};

/* ---------- utility icons ---------- */

export const IconArrow = ({ size = 15, className }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.8} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconCheck = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} strokeWidth={2.2} className={className}>
    <path d="m4 12 5 5L20 6" />
  </svg>
);

export const IconPhone = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.6} className={className}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

export const IconMail = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.6} className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

export const IconPin = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.6} className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
