import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: '#030213',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 600 }}>
          Alex Chen
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            fontWeight: 500,
            marginTop: 24,
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          Senior Engineering Leader
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            marginTop: 32,
            maxWidth: 900,
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          Building products that shape the future
        </div>
      </div>
    ),
    { ...size },
  );
}
