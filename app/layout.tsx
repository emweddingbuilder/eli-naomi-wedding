import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eli & Naomi — October 19, 2026",
  description: "Join us for the wedding of Eli Minsky and Naomi Alsberg in Tel Aviv-Yafo, Israel.",
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
