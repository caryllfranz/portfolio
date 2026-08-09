import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { profile } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/* Derived from profile.disciplines so the page title, the JSON-LD jobTitle and
   the hero can never drift apart. */
const disciplines = profile.disciplines.join(", ");
const title = `${profile.name} - ${disciplines}`;
const description =
  "AI Engineer, Data Engineer and Machine Learning Engineer building LLM and RAG systems, predictive models, and the data pipelines that put them into production.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s - ${profile.name}`,
  },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: [
    "AI Engineer",
    "Data Engineer",
    "Machine Learning Engineer",
    "Machine Learning",
    "Data Scientist",
    "Predictive Modeling",
    "EDA",
    "Statistics",
    "LLM applications",
    "RAG",
    "data pipelines",
    "Python",
    "SQL",
    profile.name,
  ],
  openGraph: {
    type: "profile",
    title,
    description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "technology",
};

/**
 * `viewportFit: cover` lets fixed elements reach the screen edge on notched
 * phones, which is what makes `env(safe-area-inset-*)` resolve to real values
 * instead of 0.
 *
 * `interactiveWidget: resizes-content` makes the virtual keyboard shrink the
 * layout viewport, so `dvh` units track the space actually left above the
 * keyboard. Without it the assistant's composer is pushed underneath it.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: disciplines,
  description,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "Data Science",
    "Machine Learning",
    "Predictive Modeling",
    "Statistics",
    "Data Analysis",
    "Data Engineering",
    "Artificial Intelligence",
    "Retrieval-Augmented Generation",
    "Python",
    "SQL",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Adamson University",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <noscript>
          {/* Without JS the reveal observer never runs, so force content visible. */}
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-svh antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
