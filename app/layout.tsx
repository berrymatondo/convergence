import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/nav/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers";
import AppBar from "@/components/nav/appBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emerging Markets",
  description: "Connecting You To Tomorrow’s Market Leaders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {/*             <Header />
             */}{" "}
            <AppBar />
            {children}
            <Toaster richColors />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
