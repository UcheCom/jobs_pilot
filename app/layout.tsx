import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { PostHogProvider } from "@/components/analytics/PostHogProvider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "JobPilot - AI-Powered Job Search",
  description:
    "Find better-fit jobs, understand every match, and research companies before you apply.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
