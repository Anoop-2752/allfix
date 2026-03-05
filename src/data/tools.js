export const categories = [
  {
    id: 'developer',
    name: 'Developer Tools',
    slug: 'developer',
    description: 'Essential utilities for developers — format, encode, decode, and generate.',
    icon: 'Code2',
    color: 'blue',
    tools: [
      {
        id: 'json-formatter',
        name: 'JSON Formatter & Validator',
        slug: 'json-formatter',
        description: 'Format, validate, and prettify JSON data instantly.',
        icon: 'Braces',
        category: 'developer',
      },
      {
        id: 'base64',
        name: 'Base64 Encoder/Decoder',
        slug: 'base64',
        description: 'Encode text or files to Base64 and decode Base64 strings.',
        icon: 'Binary',
        category: 'developer',
      },
      {
        id: 'jwt-decoder',
        name: 'JWT Decoder',
        slug: 'jwt-decoder',
        description: 'Decode and inspect JSON Web Token headers and payloads.',
        icon: 'KeyRound',
        category: 'developer',
      },
      {
        id: 'uuid-generator',
        name: 'UUID Generator',
        slug: 'uuid-generator',
        description: 'Generate UUID v1 and v4 values in bulk.',
        icon: 'Fingerprint',
        category: 'developer',
      },
      {
        id: 'timestamp-converter',
        name: 'Timestamp Converter',
        slug: 'timestamp-converter',
        description: 'Convert between Unix timestamps and human-readable dates.',
        icon: 'Clock',
        category: 'developer',
      },
      {
        id: 'url-encoder',
        name: 'URL Encoder/Decoder',
        slug: 'url-encoder',
        description: 'Encode and decode URLs and query string parameters.',
        icon: 'Link',
        category: 'developer',
      },
    ],
  },
  {
    id: 'text',
    name: 'Text Tools',
    slug: 'text',
    description: 'Handy text utilities for writers, editors, and everyday users.',
    icon: 'Type',
    color: 'purple',
    tools: [
      {
        id: 'word-counter',
        name: 'Word Counter',
        slug: 'word-counter',
        description: 'Count words, characters, sentences, and reading time.',
        icon: 'AlignLeft',
        category: 'text',
      },
      {
        id: 'lorem-ipsum',
        name: 'Lorem Ipsum Generator',
        slug: 'lorem-ipsum',
        description: 'Generate placeholder text in paragraphs, sentences, or words.',
        icon: 'FileText',
        category: 'text',
      },
      {
        id: 'markdown-previewer',
        name: 'Markdown Previewer',
        slug: 'markdown-previewer',
        description: 'Write Markdown and see a live rendered preview side by side.',
        icon: 'Eye',
        category: 'text',
      },
      {
        id: 'case-converter',
        name: 'Case Converter',
        slug: 'case-converter',
        description: 'Convert text between UPPER, lower, Title, camelCase, and more.',
        icon: 'CaseSensitive',
        category: 'text',
      },
      {
        id: 'diff-checker',
        name: 'Diff Checker',
        slug: 'diff-checker',
        description: 'Compare two blocks of text and highlight the differences.',
        icon: 'GitCompare',
        category: 'text',
      },
      {
        id: 'filler-word-remover',
        name: 'Filler Word Remover',
        slug: 'filler-word-remover',
        description: 'Detect and remove filler words like "um", "uh", "basically".',
        icon: 'Eraser',
        category: 'text',
      },
    ],
  },
]

export const allTools = categories.flatMap((cat) => cat.tools)

export function getCategoryBySlug(slug) {
  return categories.find((cat) => cat.slug === slug)
}

export function getToolBySlug(categorySlug, toolSlug) {
  const category = getCategoryBySlug(categorySlug)
  return category?.tools.find((tool) => tool.slug === toolSlug)
}
