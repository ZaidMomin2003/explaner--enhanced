import { Metadata, Viewport } from "next";
import { Inter, Great_Vibes } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "../../styles/global.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "SaaSVideo - Create SaaS explainer videos in minutes",
  description: "Create SaaS explainer videos in minutes",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${greatVibes.variable} font-sans bg-background`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
