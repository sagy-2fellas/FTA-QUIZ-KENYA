import Head from "next/head";

const SITE_URL = "https://www.befairrightnow-kenya.org";
const OTHER_SITE_URL = "https://www.befairrightnow-sa.org";
const LOCALE = "en_KE";
const HREF_LANG = "en-KE";
const OTHER_HREF_LANG = "en-ZA";

export default function SeoHead({ title, description, path = "/", noindex = false }) {
  const url = `${SITE_URL}${path}`;
  const image = `${SITE_URL}/img/home-hero.jpg`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      {noindex ? (
        <meta name="robots" content="noindex,follow" key="robots" />
      ) : (
        <>
          <link rel="canonical" href={url} key="canonical" />
          <link rel="alternate" hrefLang={HREF_LANG} href={url} key="self-locale" />
          <link rel="alternate" hrefLang={OTHER_HREF_LANG} href={`${OTHER_SITE_URL}${path}`} key="other-locale" />
        </>
      )}
      <meta property="og:type" content="website" key="og-type" />
      <meta property="og:locale" content={LOCALE} key="og-locale" />
      <meta property="og:site_name" content="Be Fair Right Now" key="og-site" />
      <meta property="og:url" content={url} key="og-url" />
      <meta property="og:title" content={title} key="og-title" />
      <meta property="og:description" content={description} key="og-description" />
      <meta property="og:image" content={image} key="og-image" />
      <meta property="og:image:width" content="1200" key="og-image-width" />
      <meta property="og:image:height" content="1000" key="og-image-height" />
      <meta property="og:image:alt" content="A person behind the products we buy every day" key="og-image-alt" />
      <meta name="twitter:card" content="summary_large_image" key="twitter-card" />
      <meta name="twitter:title" content={title} key="twitter-title" />
      <meta name="twitter:description" content={description} key="twitter-description" />
      <meta name="twitter:image" content={image} key="twitter-image" />
      <meta name="twitter:image:alt" content="A person behind the products we buy every day" key="twitter-image-alt" />
    </Head>
  );
}
