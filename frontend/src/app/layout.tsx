import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";
// import { io } from "socket.io-client";
import { SocketContextProvider } from "@/context/SocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "whatssup",
  description: "chat application",
};

//socket io
// const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT as string);
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const classname = `${inter.className} dark`; //dark mode enabled
  return (
    <html lang="en">
      <body className={classname}>
        <Providers>
          <SocketContextProvider>{children}</SocketContextProvider>
        </Providers>
      </body>
    </html>
  );
}
