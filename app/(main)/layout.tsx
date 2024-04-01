import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/layout/Sidebar";
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
        <main className="flex">
          <AuthProvider>
            <div className=" bg-[#2a2b2f] max-w-xs min-h-screen md:min-w-[20rem]">
              <Sidebar />
            </div>
            <div className="bg-[#313338] flex-1">
              {children}
              <Toaster position="top-right" richColors />
            </div>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
