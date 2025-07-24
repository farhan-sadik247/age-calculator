import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.scss";

export const metadata: Metadata = {
  title: {
    default: "Age & Health Calculator - Precise Age, BMI & Diet Plans",
    template: "%s | Age & Health Calculator"
  },
  description: "Calculate your exact age in years, months, days, hours, minutes & seconds. Get personalized BMI analysis, custom diet plans, and expert health tips. Free online health calculator with PDF reports.",
  keywords: [
    "age calculator",
    "calculate age",
    "age in days",
    "age in hours",
    "age in minutes",
    "birthday calculator",
    "exact age",
    "age counter",
    "time calculator"
  ],
  authors: [{ name: "Age & Health Calculator" }],
  creator: "Age & Health Calculator",
  publisher: "Age & Health Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://age-calculator.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Age & Health Calculator - Precise Age, BMI & Diet Plans',
    description: 'Calculate your exact age in years, months, days, hours, minutes & seconds. Get personalized BMI analysis, custom diet plans, and expert health tips.',
    url: 'https://age-health-calculator.vercel.app',
    siteName: 'Age & Health Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Age Calculator - Calculate Your Exact Age',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Age & Health Calculator - Precise Age, BMI & Diet Plans',
    description: 'Calculate your exact age in years, months, days, hours, minutes & seconds. Get personalized BMI analysis, custom diet plans, and expert health tips.',
    images: ['/og-image.png'],
    creator: '@agecalculator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Age & Health Calculator",
    "description": "Calculate your exact age in years, months, days, hours, minutes & seconds. Get personalized BMI analysis, custom diet plans, and expert health tips. Free online health calculator with PDF reports.",
    "url": "https://age-health-calculator.vercel.app",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Age & Health Calculator"
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "keywords": "age calculator, calculate age, age in days, age in hours, age in minutes, birthday calculator, exact age, time calculator"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
