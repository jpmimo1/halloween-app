import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { Header } from "@/components/Header/Header";
import { Creepster } from 'next/font/google'

const creepster = Creepster({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-creepster',
  weight: '400'
});



export const metadata: Metadata = {
  title: "Halloween Party",
  description: "App to confirm your attendance at the halloween party",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${creepster.variable}`}>
      <body>
        <Header />
        <Providers>
          <div className="mainContainer pt-6">
            {children}
          </div>
        </Providers>
        <ToastContainer position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
