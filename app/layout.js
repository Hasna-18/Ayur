import {Inter} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

const inter = Inter({ subsets:["latin"] });
export const metadata = {
  title: "Medical web -ayu",
  description: "connect with doctors anytime, anywhere",
};

export default function RootLayout({ children }) {
  return (
  <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Copy right under @Hasna</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
    </html>
  );
}
