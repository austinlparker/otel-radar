import type { Metadata } from "next";
import { Inter, Teko, Michroma } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ModalProvider } from "./components/ModalProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "OpenTelemetry Radar",
  description: "Interactive OpenTelemetry radar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${teko.variable} ${michroma.variable}
              antialiased min-h-screen
              text-slate-900 dark:text-white
              bg-gradient-to-br from-white via-blue-500/10 to-blue-600/20
              dark:from-blue-600/20 dark:via-blue-300/20 dark:to-yellow-400/20
              transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class">
          <ModalProvider>
          {children}
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
