import "./globals.css";
import Header from "@/components/Header";
import Providers from "./Providers";
import { Toaster } from "sonner";

export const metadata = {
  title: "Multilingual Text to Video Converter",
  description: "The 'Multilingual Text to Video Converter for PIB Press Releases' is a smart tool that helps turn press releases from the Press Information Bureau (PIB) of India into easy-to-understand videos. It works in 13 different languages, so people across India can access the information in their own language.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <main className="max-w-7xl p-2 md:p-4 overflow-x-hidden scroll-smooth min-h-screen w-full mx-auto mt-28">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
