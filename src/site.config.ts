import type { SiteConfig } from "@/types";
import { type AstroExpressiveCodeOptions } from "astro-expressive-code";
import "@fontsource-variable/public-sans";

export const siteConfig: SiteConfig = {
  // Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
  author: "Agustinus Kristiadi",
  // Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
  title: "Agustinus Kristiadi",
  // Meta property used as the default description meta property
  description: "Agustinus Kristiadi's Website",
  // HTML lang property, found in src/layouts/Base.astro L:18
  lang: "en-US",
  // Meta property, found in src/components/BaseHead.astro L:42
  ogLocale: "en_US",
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
  date: {
    locale: "en-US",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  },
};

export const menuLinks: Array<{ title: string; path: string }> = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "CV",
    path: "/cv/",
  },
  {
    title: "Blog",
    path: "/blog/",
  },
  {
    title: "Publications",
    path: "/publication/",
  },
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
  // One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
  themes: ["light-plus", "dark-plus"],

  themeCssSelector(theme, { styleVariants }) {
    if (styleVariants.length >= 2) {
      const baseTheme = styleVariants[0]?.theme;
      const altTheme = styleVariants.find(
        (v) => v.theme.type !== baseTheme?.type,
      )?.theme;

      if (theme === baseTheme || theme === altTheme)
        return `[data-theme='${theme.type}']`;
    }

    // return default selector
    return `[data-theme="${theme.name}"]`;
  },

  useThemedScrollbars: true,

  useDarkModeMediaQuery: true,

  styleOverrides: {
    uiLineHeight: "inherit",
    uiFontWeight: "500",
    codeFontSize: "0.825rem",
    codeLineHeight: "1.1rem",
    borderRadius: "0px",
    codePaddingInline: "1rem",

    frames: {
      frameBoxShadowCssValue: "none",
    },
  },
};
