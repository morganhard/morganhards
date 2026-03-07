import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ProjectProvider } from "@/components/providers/project-provider";
import { Navbar } from "@/components/layout/navbar";
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
  title: "Platform OS | Morgan Hardjadinata",
  description: "Enterprise command center, AI orchestration hub, and cloud infrastructure portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background relative selection:bg-primary/30`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ProjectProvider>
            <Navbar />
            <main className="relative z-10 w-full min-h-screen pb-24 pt-24">
              {children}
            </main>
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
