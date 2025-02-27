import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/custom/navbar';
import { getUser } from './actions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Car Import Calculator - Swiss Auto Import Cost Estimator',
  description: 'Calculate import costs for vehicles from Germany to Switzerland including customs duties, VAT, and other fees.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar importUser={user} />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}