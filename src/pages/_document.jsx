import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

/**
 * Same gate as _app.jsx: these are production tracking IDs (Lucky Orange
 * 47375252, LinkedIn partner 7862545, GA4 G-1RGBH52YR6) shared by every
 * environment, so previews and local runs must stay silent.
 */
const ANALYTICS_ENABLED =
  process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-KE">
        <Head>
          {ANALYTICS_ENABLED ? (
            <>
            <Script
              id="lucky-orange"
              strategy="afterInteractive"
              async
              defer
              src="https://tools.luckyorange.com/core/lo.js?site-id=47375252"
            />
            <Script
              id="linkedin-insight-tag"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
          _linkedin_partner_id = "7862545";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
            if (!l) {
              window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[];
            }
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript"; b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `,
              }}
            />
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-1RGBH52YR6"
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1RGBH52YR6');
        `,
              }}
            />
            </>
          ) : null}
        </Head>
        <body>
          {ANALYTICS_ENABLED ? (
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt=""
                src="https://px.ads.linkedin.com/collect/?pid=7862545&fmt=gif"
              />
            </noscript>
          ) : null}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
