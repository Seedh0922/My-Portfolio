import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteNav } from "@/components/chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Shopify & Headless Commerce Engineer`,
    template: `%s — ${site.name}`,
  },
  description:
    "Shopify and headless commerce engineer. Thirteen years building for the web, eight on Shopify and Shopify Plus — storefronts, custom apps, catalog and order integrations, performance and CRO.",
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Shopify & Headless Commerce Engineer`,
    description:
      "Shopify, Shopify Plus and headless commerce. Storefronts, custom apps, integrations, performance and CRO.",
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
