import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "박경서 🤖",
  description: "박경서 자기소개 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
