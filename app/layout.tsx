import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";

export const metadata = {
  title: "Malone’s Pub | Downtown Fort Worth",
  description: "Cold drinks, games, and a great patio in Downtown Fort Worth."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        <Nav />
        <main className="pb-24 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}

