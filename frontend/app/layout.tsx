import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FARMAI Prototype",
  description: "농산물 이미지 품질 판정 웹 프로토타입",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
