import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'vivie — the AI design studio for fashion obsessives',
  description: 'Design clothes with words. Share with people who get it.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
