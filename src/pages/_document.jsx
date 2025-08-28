import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta property="og:url" content="https://www.befairrightnow.net" />
          <meta property="og:title" content="Fairtrade Africa Quiz" />
          <meta
            property="og:description"
            content="Meet the human who grows your favourite drink."
          />
          <meta
            property="og:image"
            content="https://www.befairrightnow.net/img/home-hero.jpg"
          />
          <meta property="og:site_name" content="FairTrade Africa Quiz" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image"
            content="https://www.befairrightnow.net/img/home-hero.jpg"
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
        </Head>
        <body>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src="https://px.ads.linkedin.com/collect/?pid=7862545&fmt=gif"
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
