import type React from "react";
import "@/app/globals.css";
import { Rubik } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const RUBIK = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Elevn11 Agency - Flexible Content Creation",
  description:
    "Choose from our predefined plans or build your own custom package to meet your exact content creation needs.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={RUBIK.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
