import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { MovieProvider } from "./context/MovieContext";
import { Suspense } from "react";
import Loading from "./loading";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "MovieStore",
  description: "Search for any movie using the OMDb API.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loading />}>
          <MovieProvider>
            {/* Logo of App : To be visible throught the website */}
            <div className="w-full bg-black p-5">
              <Link
                href={"/"}
                className="left-2 w-fit cursor-pointer rounded-full p-3 text-base text-white hover:text-gray-200 lg:text-xl"
              >
                MovieStore
              </Link>
            </div>
            {children}
          </MovieProvider>
        </Suspense>
      </body>
    </html>
  );
}
