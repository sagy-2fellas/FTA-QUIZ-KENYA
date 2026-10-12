import Head from "next/head";
import Script from "next/script";

const giveawayUrl = "https://gleam.io/BRBiR/befairrightnow-kenya-2025";

export default function ThankYou() {
  return (
    <main className="giveaway-page">
      <Head>
        <title>Your Fairtrade giveaway | Kenya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="robots" content="noindex" />
      </Head>
      <header className="giveaway-heading">
        <h1>Thanks for signing up.</h1>
        <p>Complete your giveaway entry below, then explore the extra ways to enter.</p>
      </header>
      <section className="giveaway-embed" aria-label="Kenya Fairtrade giveaway">
        <a className="e-widget generic-loader no-button" href={giveawayUrl} rel="nofollow">Be Fair Right Now Kenya giveaway</a>
      </section>
      <p className="giveaway-fallback">Can’t see the giveaway? <a href={giveawayUrl} target="_blank" rel="noopener noreferrer">Open it on Gleam</a>.</p>
      <Script src="https://widget.gleamjs.io/e.js" strategy="afterInteractive" />
      <style jsx>{`
        .giveaway-page { min-height: 100dvh; padding: 32px 16px 48px; background: #f2f2f2; color: #1e1e1e; }
        .giveaway-heading { max-width: 680px; margin: 0 auto 28px; text-align: center; }
        h1 { font-family: Alegreya, sans-serif; font-size: clamp(32px, 5vw, 52px); line-height: 1.05; margin-bottom: 12px; }
        p { font-family: Exo, sans-serif; font-size: 16px; line-height: 1.5; }
        .giveaway-embed { max-width: 600px; margin: 0 auto; min-height: 320px; }
        .giveaway-fallback { max-width: 600px; margin: 24px auto 0; text-align: center; }
        a { color: #001b6e; text-decoration: underline; text-underline-offset: 3px; }
        @media (max-width: 400px) { .giveaway-page { padding: 24px 0 32px; } .giveaway-heading, .giveaway-fallback { padding: 0 12px; } }
      `}</style>
    </main>
  );
}
