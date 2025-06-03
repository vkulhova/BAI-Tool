import "./globals.css";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import Button from "@/components/ui/Button";
import HomeButton from "@/components/ui/HomeButton";

export default function RootLayout({ children }) {
  return (
    <html className=" scroll-smooth scroll-py-5" lang="en" data-theme="dark">
      <body className="dark:bg-black1 container mx-auto px-5 lg:px-[5%] py-8 scrollbar bg-beige min-h-screen transition-colors duration-300">
        <header className="flex items-center justify-between">
          <HomeButton />
          <ThemeSwitch />
        </header>
        <main className="mt-4">{children}</main>
      </body>
    </html>
  );
}
