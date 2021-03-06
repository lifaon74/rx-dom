import { loadScript } from './load-script';

export interface IHTMLMinifierOptions {
  caseSensitive?: boolean;
  collapseBooleanAttributes?: boolean;
  collapseInlineTagWhitespace?: boolean;
  collapseWhitespace?: boolean;
  conservativeCollapse?: boolean;
  continueOnParseError?: boolean;
  customAttrAssign?: RegExp[];
  customAttrCollapse?: RegExp;
  customAttrSurround?: RegExp[];
  customEventAttributes?: RegExp[];
  decodeEntities?: boolean;
  html5?: boolean;
  ignoreCustomComments?: RegExp[];
  ignoreCustomFragments?: RegExp[];
  includeAutoGeneratedTags?: boolean;
  keepClosingSlash?: boolean;
  maxLineLength?: number;
  minifyCSS?: boolean;
  minifyJS?: boolean;
  minifyURLs?: boolean;
  preserveLineBreaks?: boolean;
  preventAttributesEscaping?: boolean;
  processConditionalComments?: boolean;
  processScripts?: string[];
  quoteCharacter?: '\'' | '"';
  removeAttributeQuotes?: boolean;
  removeComments?: boolean;
  removeEmptyAttributes?: boolean;
  removeEmptyElements?: boolean;
  removeOptionalTags?: boolean;
  removeRedundantAttributes?: boolean;
  removeScriptTypeAttributes?: boolean;
  removeStyleLinkTypeAttributes?: boolean;
  removeTagWhitespace?: boolean;
  sortAttributes?: boolean;
  sortClassName?: boolean;
  trimCustomFragments?: boolean;
  useShortDoctype?: boolean;
}

export interface IHTMLMinify {
  (code: string, options?: IHTMLMinifierOptions): Promise<string>;
}

let IMPORT_HTML_MINIFIER_PROMISE: Promise<IHTMLMinify>;

export function importHTMLMinifier(): Promise<IHTMLMinify> {
  if (IMPORT_HTML_MINIFIER_PROMISE === void 0) {
    // const keys = new Set(Object.keys(globalThis));
    IMPORT_HTML_MINIFIER_PROMISE = loadScript(`https://cdn.jsdelivr.net/npm/html-minifier/dist/htmlminifier.min.js`)
      .then(() => {
        // Object.keys(globalThis).forEach((key: string) => {
        //   if (!keys.has(key)) {
        //     console.log(key);
        //     debugger;
        //   }
        // });
        return (globalThis.require)('html-minifier')['minify'] as IHTMLMinify;
      });
  }
  return IMPORT_HTML_MINIFIER_PROMISE;
}

export const DEFAULT_HTML_MINIFIER_OPTIONS = {
  caseSensitive: true,
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: false,
  continueOnParseError: true,
  removeComments: true,
  sortAttributes: true,
  sortClassName: true,
};

export function minifyHTML(
  code: string,
  options: IHTMLMinifierOptions = DEFAULT_HTML_MINIFIER_OPTIONS,
): Promise<string> {
  return importHTMLMinifier()
    .then((minify: IHTMLMinify) => {
      return minify(code, options);
    });
}
