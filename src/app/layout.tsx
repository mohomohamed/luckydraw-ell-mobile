import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iPhone 18 Pro — Launch Day Lucky Draw | ELL Mobile",
  description:
    "Experience the iPhone 18 Pro Launch Day Lucky Draw hosted by ELL Mobile. Built with Apple's iconic Pro aesthetic, precision animations, and titanium craftsmanship.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-[#f5f5f7] min-h-screen selection:bg-[#e5c158]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
