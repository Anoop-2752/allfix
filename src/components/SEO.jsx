import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://allfix.dev'
const DEFAULT_TITLE = 'AllFix — Every Developer Tool You Need'
const DEFAULT_DESC = 'Free online developer tools. JSON formatter, Base64 encoder, JWT decoder, UUID generator, word counter and more — all free, all client-side, no signup required.'
const DEFAULT_KEYWORDS = 'developer tools, online tools, free tools, JSON formatter, Base64 encoder, JWT decoder, UUID generator, word counter, markdown previewer'

export default function SEO({ title, description, keywords, path }) {
  const fullTitle = title ? `${title} | AllFix` : DEFAULT_TITLE
  const desc = description || DEFAULT_DESC
  const kw = keywords || DEFAULT_KEYWORDS
  const canonical = `${BASE_URL}${path || ''}`

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={kw} />
      <meta name="author" content="AllFix" />
      <link rel="canonical" href={canonical} />

      {/* Crawlers */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="AllFix" />
      <meta property="og:image" content={`${BASE_URL}/og-image.svg`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={`${BASE_URL}/og-image.svg`} />
    </Helmet>
  )
}
