import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "whatssup",
  description: "chat application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const classname = `${inter.className} dark`; //dark mode enabled
  return (
    <html lang="en">
      <body className={classname}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
