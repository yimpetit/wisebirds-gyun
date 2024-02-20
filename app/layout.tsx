import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Gnb from "@/components/layout/Gnb";
import ReactQueryProvider from "@/components/layout/ReactQueryProvider";
import Error from "@/components/common/Error";

export const metadata: Metadata = {
  title: "Wisebirds",
  description: "프론트엔드 개발자 채용 사전 과제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <div className="grid grid-rows-layout h-screen">
            <Gnb />
            <main className="max-w-screen-xl w-full m-auto h-full px-12">
              {children}
            </main>
          </div>
          <Error />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
