import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

import Providers from "./providers";
import Footer from "@/components/Footerr";
import TopHeader from "@/components/TopHeader";
import { LoaderProvider } from "./Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <html lang="en">
      <body className={inter.className}>
      
      <Providers>
    <LoaderProvider>
      {/* <AnnouncementBar/> */}
      <TopHeader/>
      <Header/>
        {children}
        <Footer/>
        </LoaderProvider>
        </Providers>
        
        </body>
    </html>
   
  );
}
