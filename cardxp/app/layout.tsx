import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DopyCat",
  description: "DopyCat profile card",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/98.css" />
      </head>
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}