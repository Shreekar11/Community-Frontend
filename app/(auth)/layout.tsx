import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/Auth";

const inter = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

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
        <main className="">
          <AuthProvider>{children}</AuthProvider>
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={2000}
            pauseWhenPageIsHidden
            visibleToasts={1}
          />
        </main>
      </body>
    </html>
  );
}
