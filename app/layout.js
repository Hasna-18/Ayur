import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GiLotus } from "react-icons/gi";


const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Medical web -ayu",
  description: "connect with doctors anytime, anywhere",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`} suppressHydrationWarning>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen">{children}</main>
          <footer className="bg-green-950 text-white py-16">

            <div className="max-w-7xl mx-auto px-6">

              <div className="grid md:grid-cols-4 gap-10">

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GiLotus className="w-8 h-8 text-[#d9b56d]" />
                    <h1 className="text-5xl font-serif text-[#d9b56d]">
                      Ayur
                    </h1>
                  </div>
                  <p className="text-sm text-gray-300 mt-2">
                    Ancient Wisdom. Modern Care.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Links</h4>
                  <ul className="space-y-2">
                    <li>Home</li>
                    <li>Treatments</li>
                    <li>Contact</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Resources</h4>
                  <ul className="space-y-2">
                    <li>Blog</li>
                    <li>FAQ</li>
                    <li>Privacy Policy</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Contact</h4>
                  <p>hello@ayurmedi.com</p>
                  <p>+91 9876543210</p>
                </div>

              </div>

            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
