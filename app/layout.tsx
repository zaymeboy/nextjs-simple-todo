// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXTJS Todo",
  description: "Glorified todo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <header className="bg-blue-600 text-white p-4">Navbar here</header> */}
        <main className="p-6">{children}</main>
        {/* <footer className="bg-gray-800 text-white p-4">Footer here</footer> */}
      </body>
    </html>
  );
}
