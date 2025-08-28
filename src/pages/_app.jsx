import "../styles/globals.css";
import { store } from "../store";
import { Provider } from "react-redux";
import TagManager from "react-gtm-module";
import { useEffect } from "react";
import Script from "next/script";

const tagManagerArgs = {
  gtmId: "GTM-KB2G5XF",
};

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
  return (
    <Provider store={store}>
      <Script
        strategy="afterInteractive"
        src="https://tools.luckyorange.com/core/lo.js?site-id=47375252"
      ></Script>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
   !function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '368869985423322');
fbq('track', 'PageView');
  `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          src="https://www.facebook.com/tr?id=368869985423322&ev=PageView&noscript=1"
        />
      </noscript>
      <Component {...pageProps} />
      <style global jsx>{`
        @font-face {
          font-family: "Alegreya";
          src: url("/fonts/AlegreyaSans-Black.woff2") format("woff2");
          font-display: swap;
        }
        @font-face {
          font-family: "Exo";
          src: url("/fonts/Exo2-Bold.woff2") format("woff2");
          font-display: swap;
        }
      `}</style>{" "}
    </Provider>
  );
}

export default MyApp;
