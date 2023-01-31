// Documentation for this file: https://prettier.io/docs/en/configuration.html
module.exports = {
  // Extend the line length that the printer will wrap on beyond the default of 80.
  printWidth: 100,

  // Use .gitattributes to manage newlines
  endOfLine: 'auto',

  // Use single quotes instead of double quotes.
  singleQuote: true,

  // Trailing commas wherever possible (including function parameters and calls).
  trailingComma: 'all',

  // Only add semicolons at the beginning of lines that may introduce ASI failures.
  semi: false,

  // Enforce single attribute per line in HTML, Svelte, Vue and JSX.
  singleAttributePerLine: false,

  // Put the > of a multi-line HTML element at the end of the last line instead of being alone on the next line.
  bracketSameLine: true,

  // More strict HTML syntax: less self-closed tags, quotes in attributes, no attribute shorthand.
  svelteStrictMode: true,

  // Note: prettier-plugin-tailwindcss must be last in the list
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],

  pluginSearchDirs: false,

  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
}
