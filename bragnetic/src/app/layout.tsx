import type { Metadata } from "next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bragnetic | UGC Creator Network",
  description:
    "Bragnetic connects brands with vetted UGC creators to produce high-performing video ads.",
  metadataBase: new URL("https://bragnetic.com"),
  openGraph: {
    title: "Bragnetic | UGC Creator Network",
    description:
      "UGC creator agency connecting brands with creators for scroll-stopping video ads.",
    url: "https://bragnetic.com",
    siteName: "Bragnetic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bragnetic | UGC Creator Network",
    description:
      "UGC creator agency connecting brands with creators for scroll-stopping video ads.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-brand-black text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
