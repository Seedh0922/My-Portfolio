import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteNav } from "@/components/chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Senior e-commerce full stack developer. 13 years in web development, 8+ on Shopify and Shopify Plus. Performance work delivered with the measurement attached.",
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.title}`,
    description:
      "Shopify, Shopify Plus and headless commerce. Performance work delivered with the measurement attached, not a screenshot.",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
