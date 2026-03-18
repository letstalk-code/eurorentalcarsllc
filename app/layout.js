import "./globals.css";

export const metadata = {
  title: "Euro LLC — Rent the Luxury. Own the Thrill.",
  description: "Florida's premier exotic and luxury car rental experience. Rent Lamborghini, Ferrari, McLaren, Bentley in St. Petersburg, Tampa & Clearwater. From $349/day.",
  keywords: "luxury car rental, exotic car rental, Florida, Lamborghini rental, Ferrari rental, St. Petersburg car rental",
  openGraph: {
    title: "Euro LLC — Rent the Luxury. Own the Thrill.",
    description: "Florida's premier exotic car rental. Lamborghini, Ferrari, McLaren, Bentley and more. From $349/day.",
    type: "website",
    url: "https://www.eurorentalcarsllc.com",
    images: [
      {
        url: "/lamborghini_urus.jpg",
        width: 1200,
        height: 630,
        alt: "Euro LLC Luxury Rentals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Euro LLC — Rent the Luxury. Own the Thrill.",
    description: "Florida's premier exotic car rental. Lamborghini, Ferrari, McLaren, Bentley and more. From $349/day.",
    images: ["/lamborghini_urus.jpg"],
  },
  alternates: {
    canonical: "https://www.eurorentalcarsllc.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        {/* Google Fonts: Bebas Neue and Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
