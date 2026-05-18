import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "Vertical Solutions",
  title: "Vertical Solutions Elevator Company | Premium Elevator Services DMV",
  description: "Professional elevator installation, maintenance, and repair services serving Washington DC, Maryland, and Virginia. 24/7 emergency service.",
  openGraph: {
    title: "Vertical Solutions Elevator Company",
    description: "Premium elevator and escalator service for commercial buildings across the DMV.",
    siteName: "Vertical Solutions",
    type: "website",
  },
  appleWebApp: {
    title: "Vertical Solutions",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
