import { ImageResponse } from 'next/og';

export const alt = 'Juno Money';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: '#18181B',
            letterSpacing: '-0.02em',
          }}
        >
          junomoney
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 24,
            color: '#71717A',
            fontWeight: 400,
          }}
        >
          Payment services, Redefined.
        </div>
      </div>
    ),
    { ...size }
  );
}
