import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../style/globals.css";
import { Navbar } from "../../components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RepoPilot - AI-Powered GitHub Bio Generator",
  description: "Generate professional and engaging GitHub bios with RepoPilot. Powered by LLaMA and Mistral AI, create customized profiles instantly with AI-driven insights.",
  authors: [
    {
      name: "Santosh Phadtare",
      url: "https://santoshphadtare.me",
    },
    {
      name: "RepoPilot",
      url: "https://repopilot.vercel.app",
    }
  ],
  creator: "Santosh Phadtare",
  keywords: "GitHub bio generator, AI GitHub bio, RepoPilot, LLaMA AI, Mistral AI, developer profile generator, GitHub profile AI",
  openGraph: {
    title: "RepoPilot - AI-Powered GitHub Bio Generator",
    description: "Create unique and professional GitHub bios effortlessly with AI. Powered by LLaMA and Mistral AI, RepoPilot helps developers enhance their online presence.",
    url: "https://repopilot.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://repopilot.vercel.app/banner.jpeg",
        width: 5088,
        height: 3022,
        alt: "RepoPilot - AI GitHub Bio Generator",
      },
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "RepoPilot - AI GitHub Bio Generator",
    description: "Craft the perfect GitHub bio with AI. Use RepoPilot to generate engaging and professional bios using LLaMA and Mistral AI.",
    images: [
      {
        url: "https://repopilot.vercel.app/banner.jpeg",
        width: 5088,
        height: 3022,
        alt: "RepoPilot - AI GitHub Bio Generator",
      },
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <nav className="mb-12">
          <Navbar />
        </nav>
        <div className="min-w-full h-auto py-1.5 overflow-clip">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
