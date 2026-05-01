import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BreadCrumbs from "./components/BreadCrumbs";
import { RegFormProvider } from "./contexts/RegFormContext";
import StatesProvider from "@/store/StatesProvider";
import StoreProvider from "./provider";
import { ProductProvider } from "./contexts/ProductContext";
import { generateSiteMetadata } from "@/utils/generateSiteMetadata";
import { CategoryProvider } from "./contexts/CategoryContext";
import { ArticleProvider } from "./contexts/ArticleContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   metadataBase: new URL(process.env.NEXT_PUBLICK_BASE_URL || 'http://localhost:3000'),
//   title: "Garage Shop",
//   description: "Delivery of all your needs in one place.",
// };

export async function generateMetadata(): Promise<Metadata> {
  return await generateSiteMetadata();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <StatesProvider>
            <RegFormProvider>
              <ProductProvider>
                <CategoryProvider>
                  <ArticleProvider>
                    <Header />
                    <BreadCrumbs />
                    {children}
                    <Footer />
                  </ArticleProvider>
                </CategoryProvider>
              </ProductProvider>
            </RegFormProvider>
          </StatesProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
