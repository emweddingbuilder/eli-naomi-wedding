import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eli & Naomi — October 19, 2026",
  description: "Join us for the wedding of Eli Minsky and Naomi Alsberg in Tel Aviv-Yafo, Israel.",
  openGraph: {
    title: "Eli & Naomi — October 19, 2026",
    description: "Join us for the wedding of Eli Minsky and Naomi Alsberg in Tel Aviv-Yafo, Israel.",
    url: "https://elinaomi.love",
    siteName: "Eli & Naomi",
    images: [{ url: "https://elinaomi.love/hero.jpg", width: 1200, height: 630, alt: "Eli & Naomi — October 19, 2026" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eli & Naomi — October 19, 2026",
    description: "Join us for the wedding of Eli Minsky and Naomi Alsberg in Tel Aviv-Yafo, Israel.",
    images: ["https://elinaomi.love/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
