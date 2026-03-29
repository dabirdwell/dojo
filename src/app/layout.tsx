import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AchievementToast from "@/components/achievement-toast/AchievementToast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dojo — Train Your Mind. Defend Your Thinking.",
  description:
    "Gamified critical thinking trainer. Master fallacy detection, argument construction, and source evaluation through martial arts-inspired progression.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <AchievementToast />
      </body>
    </html>
  );
}
