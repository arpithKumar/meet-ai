import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { auth } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userDisplayName =
    session?.user?.name || session?.user?.email || "Guest";

  console.log(`Generating metadata for user: ${userDisplayName}`);

  return {
    title: `${userDisplayName} | Meet.AI`,
    description: "AI-powered meeting experience.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
