import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AIEventAssistant } from '@/components/AIEventAssistant';

export const metadata: Metadata = {
  title: 'GDG RBU — Google Developer Groups',
  description: 'Official Platform for Google Developer Groups - RBU Chapter. Discover workshops, tech talks, hackathons, and secure your registration passes.',
  keywords: ['GDG', 'Google Developer Groups', 'RBU', 'Events', 'Workshops', 'Hackathons', 'Tech'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#FBBC05] selection:text-neutral-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <AIEventAssistant />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
