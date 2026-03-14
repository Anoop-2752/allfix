const developerSeoData = {
  'json-formatter': {
    longDescription:
      'Format, validate, and beautify your JSON data instantly with this free online JSON formatter. Paste raw or minified JSON and get perfectly indented, syntax-highlighted output right in your browser — no signup or installation required. Ideal for developers debugging API responses, config files, or any structured data.',
    keywords: [
      'json formatter',
      'json validator online',
      'json beautifier',
      'format json online',
      'json pretty print',
      'validate json',
      'json lint online',
    ],
    faqs: [
      {
        q: 'How do I format JSON online for free?',
        a: 'Paste your raw JSON into the editor and it will be formatted and validated instantly. The tool runs entirely in your browser, so your data never leaves your device.',
      },
      {
        q: 'Can this tool validate JSON syntax?',
        a: 'Yes. The formatter highlights syntax errors and tells you exactly where the issue is, making it easy to fix malformed JSON quickly.',
      },
      {
        q: 'Is it safe to paste sensitive JSON data here?',
        a: 'Absolutely. Everything runs client-side in your browser. No data is sent to any server, so your API keys, tokens, and private data stay private.',
      },
    ],
    howToSteps: [
      { title: 'Paste your JSON', detail: 'Copy raw, minified, or broken JSON from your API response or config file and paste it into the input box.' },
      { title: 'Click Format', detail: 'The tool instantly beautifies and validates your JSON with proper indentation and syntax highlighting.' },
      { title: 'Fix errors if any', detail: 'If your JSON has syntax errors, the tool highlights the exact line and character where the issue is.' },
      { title: 'Copy the result', detail: 'Use the Copy button to get the formatted JSON back into your clipboard.' },
    ],
  },

  'base64': {
    longDescription:
      'Encode text to Base64 or decode Base64 strings back to plain text with this free online tool. Perfect for developers working with data URIs, API authentication headers, or encoded payloads — all processing happens in your browser with no signup needed.',
    keywords: [
      'base64 encoder',
      'base64 decoder',
      'base64 encode online',
      'base64 decode online',
      'text to base64',
      'base64 to text',
      'base64 converter',
    ],
    faqs: [
      {
        q: 'What is Base64 encoding used for?',
        a: 'Base64 encoding converts binary or text data into an ASCII string format. It is commonly used in email attachments, data URIs, API authentication headers, and embedding images in CSS or HTML.',
      },
      {
        q: 'How do I decode a Base64 string online?',
        a: 'Paste your Base64-encoded string into the input field and select "Decode." The original text will appear instantly — no account or download required.',
      },
      {
        q: 'Is Base64 encoding the same as encryption?',
        a: 'No. Base64 is an encoding scheme, not encryption. Anyone can decode a Base64 string, so it should never be used to protect sensitive information.',
      },
    ],
    howToSteps: [
      { title: 'Select Encode or Decode', detail: 'Choose whether you want to convert plain text to Base64 or decode a Base64 string back to text.' },
      { title: 'Paste your input', detail: 'Enter the text or Base64 string you want to convert.' },
      { title: 'See the result instantly', detail: 'The output appears immediately as you type.' },
      { title: 'Copy the output', detail: 'Click Copy to grab the result for use in your code or API request.' },
    ],
  },

  'jwt-decoder': {
    longDescription:
      'Decode and inspect JSON Web Tokens (JWT) instantly with this free online JWT decoder. View the header, payload, and expiration details without any server-side processing. A must-have tool for developers working with OAuth, API authentication, or any JWT-based workflow.',
    keywords: [
      'jwt decoder',
      'jwt token decoder online',
      'decode jwt',
      'jwt parser',
      'json web token decoder',
      'jwt viewer',
      'jwt debugger',
    ],
    faqs: [
      {
        q: 'How do I decode a JWT token online?',
        a: 'Paste the full JWT string into the input field and the tool will instantly display the decoded header and payload sections, including claims like expiration time and issuer.',
      },
      {
        q: 'Is it safe to paste my JWT token into an online decoder?',
        a: 'Yes, this tool runs entirely in your browser. Your token is never sent to any server, so your credentials and claims remain private.',
      },
      {
        q: 'What information is inside a JWT token?',
        a: 'A JWT contains three parts: a header (algorithm and token type), a payload (claims like user ID, roles, and expiration), and a signature used to verify authenticity.',
      },
    ],
    howToSteps: [
      { title: 'Paste your JWT token', detail: 'Copy the full JWT string (starting with eyJ...) and paste it into the input field.' },
      { title: 'View decoded sections', detail: 'The tool splits and decodes the header, payload, and signature sections automatically.' },
      { title: 'Check claims and expiry', detail: 'Review the payload for claims like exp (expiration), iat (issued at), and any custom claims.' },
    ],
  },

  'uuid-generator': {
    longDescription:
      'Generate random UUIDs (v4) instantly with this free online UUID generator. Create one or many universally unique identifiers for databases, APIs, or testing — all in your browser with no signup required. Copy to clipboard with a single click.',
    keywords: [
      'uuid generator',
      'uuid generator online',
      'generate uuid',
      'random uuid',
      'uuid v4 generator',
      'guid generator',
      'unique id generator',
    ],
    faqs: [
      {
        q: 'What is a UUID and when should I use one?',
        a: 'A UUID (Universally Unique Identifier) is a 128-bit identifier that is practically guaranteed to be unique. Use UUIDs as primary keys in databases, as request IDs for tracing, or anywhere you need a unique reference without a central authority.',
      },
      {
        q: 'Can I generate multiple UUIDs at once?',
        a: 'Yes. Specify how many UUIDs you need and the tool will generate them all instantly. You can copy the full list to your clipboard in one click.',
      },
      {
        q: 'Are the generated UUIDs truly unique?',
        a: 'Version 4 UUIDs are generated using a cryptographically secure random number generator. The probability of a collision is astronomically low — around 1 in 5.3 × 10^36.',
      },
    ],
    howToSteps: [
      { title: 'Choose UUID version', detail: 'Select v1 (time-based) or v4 (random) depending on your use case.' },
      { title: 'Set quantity', detail: 'Enter how many UUIDs you need — generate 1 to 100 at a time.' },
      { title: 'Click Generate', detail: 'UUIDs are generated instantly using your browser\'s secure random number generator.' },
      { title: 'Copy the results', detail: 'Copy individual UUIDs or all at once with the Copy All button.' },
    ],
  },

  'timestamp-converter': {
    longDescription:
      'Convert between Unix timestamps and human-readable dates with this free online timestamp converter. Supports seconds and milliseconds, multiple date formats, and timezone adjustments — all running client-side in your browser with no signup needed.',
    keywords: [
      'unix timestamp converter',
      'timestamp to date',
      'epoch converter',
      'date to timestamp',
      'unix time converter online',
      'epoch time converter',
    ],
    faqs: [
      {
        q: 'How do I convert a Unix timestamp to a date?',
        a: 'Paste your Unix timestamp (in seconds or milliseconds) into the input field and the tool will instantly show the corresponding date and time in a human-readable format.',
      },
      {
        q: 'What is a Unix timestamp?',
        a: 'A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC (the Unix epoch). It is widely used in programming, databases, and APIs to represent points in time.',
      },
      {
        q: 'Does this tool support millisecond timestamps?',
        a: 'Yes. The converter automatically detects whether your timestamp is in seconds or milliseconds and converts it accordingly.',
      },
    ],
    howToSteps: [
      { title: 'Enter a Unix timestamp', detail: 'Paste a Unix timestamp (seconds or milliseconds since epoch) into the input field.' },
      { title: 'See the human-readable date', detail: 'The tool converts it to a readable date and time in your local timezone and UTC.' },
      { title: 'Or convert a date to timestamp', detail: 'Pick a date and time using the date picker to get the equivalent Unix timestamp.' },
    ],
  },

  'url-encoder': {
    longDescription:
      'Encode or decode URLs and query strings instantly with this free online URL encoder/decoder. Ensure your URLs are safe for transmission by converting special characters to percent-encoded format — all processing runs in your browser with no signup required.',
    keywords: [
      'url encoder',
      'url decoder',
      'url encode online',
      'url decode online',
      'percent encoding',
      'urlencode online',
      'encode url characters',
    ],
    faqs: [
      {
        q: 'What does URL encoding do?',
        a: 'URL encoding replaces unsafe or special characters (like spaces, ampersands, and non-ASCII characters) with percent-encoded equivalents so they can be safely transmitted in a URL.',
      },
      {
        q: 'How do I decode a URL-encoded string?',
        a: 'Paste the encoded string into the input and select "Decode." The tool will convert all percent-encoded characters back to their original form instantly.',
      },
      {
        q: 'When do I need to URL-encode a string?',
        a: 'Whenever you include user input, file names, or special characters in a URL query string or path segment. Encoding prevents broken links and ensures servers interpret the URL correctly.',
      },
    ],
    howToSteps: [
      { title: 'Paste your URL or text', detail: 'Enter the full URL or just the query string value you want to encode or decode.' },
      { title: 'Choose Encode or Decode', detail: 'Select encode to make the text URL-safe, or decode to restore the original characters.' },
      { title: 'Copy the result', detail: 'The encoded or decoded output is ready to paste into your code or browser address bar.' },
    ],
  },

  'qr-code-generator': {
    longDescription:
      'Generate QR codes for any URL, text, or contact information instantly with QuickKit\'s free QR Code Generator. Customise foreground and background colours, choose your error correction level, and download the result as a high-quality PNG — no watermark, no signup, no server upload.',
    keywords: [
      'qr code generator free',
      'qr code maker online',
      'generate qr code for url',
      'qr code generator no signup',
      'free qr code maker',
      'custom qr code generator',
      'qr code download png',
      'online qr code creator',
    ],
    faqs: [
      {
        q: 'How do I generate a QR code for a URL?',
        a: 'Paste your URL into the text field and a QR code is generated instantly. Click "Download PNG" to save it. The QR code can be scanned with any smartphone camera.',
      },
      {
        q: 'Can I customise the colours of my QR code?',
        a: 'Yes. Use the foreground and background colour pickers to choose any colour combination. For best scannability, keep high contrast between the two — dark foreground on a light background.',
      },
      {
        q: 'What does error correction level mean?',
        a: 'Error correction allows a QR code to be scanned even if part of it is damaged or obscured. Level L recovers 7% data loss, M = 15%, Q = 25%, H = 30%. Use a higher level if you plan to print the QR code on surfaces that might get dirty or worn.',
      },
      {
        q: 'Is there a character limit for QR codes?',
        a: 'QR codes can technically store up to 4,296 alphanumeric characters, but codes with more than 500-1000 characters become very dense and harder to scan reliably. The tool warns you at 2000 characters.',
      },
    ],
    howToSteps: [
      { title: 'Enter your URL or text', detail: 'Type or paste the URL, phone number, email address, or any text you want to encode in the QR code.' },
      { title: 'Customize appearance', detail: 'Choose foreground and background colors, set the output size, and pick an error correction level.' },
      { title: 'Preview the QR code', detail: 'The QR code updates live as you type and change settings.' },
      { title: 'Download as PNG', detail: 'Click Download to save the QR code image to your device.' },
    ],
  },
}

export default developerSeoData
