import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <title>Shubham Patil</title>
        <meta name="title" content="Shubham Patil" />
        <meta
          name="description"
          content="Innovator, tinkerer, and developer at heart working on making computers more personal."
        />
        <meta
          name="keywords"
          content="shubham patil,shubham patil coder,shubham patil coding,shubham patil codeday,shubhampatil.dev,shubham patil blog,shubham patil website,Shubham Patil, developer, innovator, Beem, NASA, hackathon, computer engineering, UCSD, San Francisco"
        />
        <meta name="author" content="Shubham Patil" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shubhampatil.dev/" />
        <meta property="og:title" content="Shubham Patil" />
        <meta
          property="og:description"
          content="Shubham Patil is an innovator, tinkerer, and developer working on making computers more personal."
        />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://shubhampatil.dev/" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
