import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
  style: "italic",
});

export const metadata: Metadata = {
  title: {
    default: "Kareem Tamer | Python Developer & AI Engineer",
    template: "%s | Kareem Tamer"
  },
  description: "Enterprise Brand Platform & Consulting Portfolio of Kareem Tamer. Specializing in Python Software Engineering, Custom AI Agents, Full-Stack SaaS Products, and Business Intelligence Analytics.",
  keywords: ["Kareem Tamer", "Software Engineer", "AI Developer", "Full Stack Developer", "Freelance Consultant", "Python Backend Developer"],
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0c] text-slate-100">
        {children}
      </body>
    </html>
  );
}
