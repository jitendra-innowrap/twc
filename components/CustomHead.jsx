import Head from 'next/head';

export default function CustomHead({
  title,
  content,
  pageSlug,
  pageType = 'website',
  ogImage = `${process.env.NEXT_PUBLIC_BASE_URL}/layout/og-image.png`,
}) {
  const ogTitle = title.replace(' - The Party Cafe', '');
  const pageURL = `${process.env.NEXT_PUBLIC_BASE_URL}${pageSlug}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={content} />
      <link rel='canonical' href={pageURL} />
      <meta property='og:type' content={pageType} />
      <meta property='og:title' content={ogTitle} />
      <meta property='og:description' content={content} />
      <meta property='og:url' content={pageURL} />
      <meta property='og:image' content={ogImage} />
    </Head>
  );
}