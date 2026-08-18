import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
  ),
  title: 'Alex Chen | Senior Engineering Leader',
  description:
    'Senior Engineering Leader with 12+ years building scalable systems at companies from seed-stage startups to public tech giants. Passionate about architecture, developer experience, and shipping products users love.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
