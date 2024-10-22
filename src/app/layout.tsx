import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { Header } from "@/components/Header/Header";
import { Creepster } from 'next/font/google'
import Image from "next/image";

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
          <div className="mainContainer pt-6 mt-[70px] lg:mt-[89px]">
            {children}
          </div>
        </Providers>
        <ToastContainer position="bottom-right" theme="dark" />
        <div>
          <Image alt="background" src={'/assets/background.png'} width={1080} height={1280} className="fixed -bottom-4 md:-bottom-12 lg:-bottom-28 w-full -z-10 opacity-30 blur-sm" />
        </div>
      </body>
    </html>
  );
}
