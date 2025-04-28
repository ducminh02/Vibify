import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./(root)/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibify",
  description: "Personlize the music experience with your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      <footer className="attribution">
        <p>
          Song features data provided by{' '}
          <a 
            href="https://getsongbpm.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GetSongBPM
          </a>
        </p>
      </footer>
      </body>
    </html>
  );
}
