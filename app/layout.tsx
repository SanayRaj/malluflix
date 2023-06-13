import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { Inter, Raleway } from "next/font/google";
import logo from "../public/logo.png";
import SearchBar from "@/components/SearchBar";

const font = Inter({
  subsets: ["latin"],
  style: "normal",
});
const title = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-title",
});

export const metadata = {
  title: "MalluFlix",
  description: "Watch Movies and TV Shows Online for Free",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} ${title.variable}`}>
        <header className=" z-50 fixed sm:sticky top-0 left-0 right-0 bg-gradient-to-t from-transparent to-black sm:bg-black">
          <nav className="flex mx-auto container py-2 items-center justify-between px-3 z-30">
            <Link href={"/"}>
              <Image
                src={logo}
                width={128}
                alt="malluflix"
                className="select-none"
              />
            </Link>
            <div className="flex items-center">
              <SearchBar />
              {/* <ul className="hidden sm:flex gap-6">
                <li>
                  <Link
                    className="hover:border-b p-1 border-b-red-600 hover:text-red-600 transition-colors font-medium"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:border-b p-1 border-b-red-600 hover:text-red-600 transition-colors font-medium"
                    href="/latest"
                  >
                    Latest Movies
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:border-b p-1 border-b-red-600 hover:text-red-600 transition-colors font-medium"
                    href="/catogories"
                  >
                    Catogories
                  </Link>
                </li>
              </ul> */}
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
