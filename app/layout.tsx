import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./Navbar/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "學生管理系統",
  description: "學生管理系統",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen flex">
        <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] sticky top-0">
          {/* NavBar */}
          <NavBar />
          {/* Contents */}
          <div className="flex flex-col overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
