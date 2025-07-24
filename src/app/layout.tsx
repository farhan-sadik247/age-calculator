import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.scss";

export const metadata: Metadata = {
  title: {
    default: "Age Calculator & Health Hub - Precise Age, BMI & Diet Plans",
    template: "%s | Age Calculator & Health Hub"
  },
  description: "Calculate your exact age in years, months, days, hours, minutes & seconds. Get personalized BMI analysis, custom diet plans, and expert health tips. Free online health calculator with PDF reports.",
  keywords: [
    "age calculator",
    "exact age calculator",
    "BMI calculator",
    "diet plans",
    "health tips",
    "age in days",
    "age in hours",
    "age in minutes",
    "age in seconds",
    "health calculator",
    "nutrition calculator",
    "weight management",
    "health assessment",
    "personalized diet",
    "BMI analysis",
    "health recommendations",
    "birthday calculator",
    "time calculator",
    "health tools",
    "wellness calculator",
    "fitness calculator",
    "meal plans",
    "nutrition facts",
    "health report PDF"
  ],
  authors: [{ name: "Age Calculator & Health Hub" }],
  creator: "Age Calculator & Health Hub",
  publisher: "Age Calculator & Health Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://age-health-calculator.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://age-health-calculator.vercel.app',
    title: 'Age Calculator & Health Hub - Precise Age, BMI & Diet Plans',
    description: 'Calculate your exact age in years, months, days, hours, minutes & seconds. Get personalized BMI analysis, custom diet plans, and expert health tips.',
    siteName: 'Age Calculator & Health Hub',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Age Calculator & Health Hub - Calculate Age, BMI, Get Diet Plans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Age Calculator & Health Hub - Precise Age, BMI & Diet Plans',
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
    "name": "Age Calculator & Health Hub",
    "description": "Calculate your exact age in years, months, days, hours, minutes & seconds. Get personalized BMI analysis, custom diet plans, and expert health tips. Free online health calculator with PDF reports.",
    "url": "https://age-health-calculator.vercel.app",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Age Calculator",
      "BMI Calculator",
      "Diet Plans",
      "Health Tips",
      "PDF Reports",
      "Dark Mode",
      "Responsive Design"
    ],
    "author": {
      "@type": "Organization",
      "name": "Age Calculator & Health Hub"
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "keywords": "age calculator, BMI calculator, diet plans, health tips, calculate age, age in days, age in hours, age in minutes, birthday calculator, exact age, time calculator, health tools, wellness calculator"
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Age Health Calculator" />
        <meta name="application-name" content="Age Health Calculator" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
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
