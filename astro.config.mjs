import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import rehypeMathjax from "rehype-mathjax/chtml";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";
import remarkUnwrapImages from "remark-unwrap-images";
import { mathJaxMacros } from "./src/mathjax.macros";
import { expressiveCodeOptions } from "./src/site.config";
import { remarkReadingTime } from "./src/utils/remarkReadingTime.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://agustinus.kristia.de",
  prefetch: true,

  redirects: {
    "/about": "/",
  },

  integrations: [
    expressiveCode(expressiveCodeOptions),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    icon(),
  ],

  markdown: {
    remarkPlugins: [
      [remarkSmartypants, { dashes: "oldschool" }],
      remarkUnwrapImages,
      remarkReadingTime,
      remarkMath,
    ],

    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["nofollow, noopener, noreferrer"],
        },
      ],

      [
        rehypeMathjax,
        {
          chtml: {
            fontURL: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
            scale: 1.1,
          },

          tex: {
            macros: mathJaxMacros,
          },
        },
      ],
    ],

    remarkRehype: {
      footnoteLabelProperties: {
        className: [""],
      },
    },
  },
});
