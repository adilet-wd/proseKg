import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../node_modules/bootstrap/scss/bootstrap.scss";
import "./globals.scss";
import { AuthProvider } from "./auth/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProseKG",
  description: "Made by AlaToo team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </AuthProvider>
    
  );
}
