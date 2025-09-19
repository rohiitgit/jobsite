import React from 'react';

// Amazon logo placeholder - black circle with orange smile
export const AmazonLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#232F3E"/>
    <text x="20" y="26" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Arial">
      a
    </text>
    <path d="M12 24c8 4 16 4 24 0" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="32" cy="24" r="1" fill="#FF9900"/>
  </svg>
);

// Tesla logo placeholder - white circle with red T
export const TeslaLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="white" stroke="#f0f0f0"/>
    <path d="M13 15h14v3h-5.5v12h-3v-12h-5.5z" fill="#DC143C"/>
  </svg>
);

// Generic company logo placeholder (orange circle with detailed lightbulb)
export const GenericLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#FF8C42"/>
    <g transform="translate(12, 10)">
      <path d="M8 2C5.8 2 4 3.8 4 6c0 1.3.6 2.5 1.5 3.3v2.4c0 .4.3.8.8.8h3.4c.4 0 .8-.4.8-.8v-2.4C11.4 8.5 12 7.3 12 6c0-2.2-1.8-4-4-4z" fill="white"/>
      <rect x="6" y="13" width="4" height="2" fill="white"/>
      <rect x="6.5" y="15" width="3" height="1" fill="white"/>
    </g>
  </svg>
);

// Google logo placeholder
export const GoogleLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#4285F4"/>
    <text x="20" y="26" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">
      G
    </text>
  </svg>
);

// Microsoft logo placeholder
export const MicrosoftLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#00A1F1"/>
    <text x="20" y="26" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">
      M
    </text>
  </svg>
);

// Apple logo placeholder
export const AppleLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#000000"/>
    <path d="M16.5 12c1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.31-.73 1.76l-.02.02c-.44.44-1.06.72-1.75.72s-1.31-.28-1.76-.73c-.44-.44-.72-1.06-.72-1.75 0-1.38 1.12-2.5 2.5-2.5zm1.5 4.5c2.21 0 4 1.79 4 4v8c0 1.1-.9 2-2 2h-6c-1.1 0-2-.9-2-2v-8c0-2.21 1.79-4 4-4z" fill="white"/>
  </svg>
);

// Export a function to get company logo by name
export const getCompanyLogo = (companyName: string) => {
  const name = companyName.toLowerCase();
  if (name.includes('amazon')) return AmazonLogo;
  if (name.includes('tesla')) return TeslaLogo;
  if (name.includes('google')) return GoogleLogo;
  if (name.includes('microsoft')) return MicrosoftLogo;
  if (name.includes('apple')) return AppleLogo;
  return GenericLogo;
};