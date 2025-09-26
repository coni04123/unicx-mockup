import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Unicx - WhatsApp Business Management Platform',
  description: 'Comprehensive WhatsApp Business and spy number management system with multi-tenant support',
  keywords: 'WhatsApp, Business, Messaging, Campaigns, Spy Numbers, Multi-tenant',
  authors: [{ name: 'Unicx Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#22c55e',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
