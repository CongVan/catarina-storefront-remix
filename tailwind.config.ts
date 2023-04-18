import type { Config } from "tailwindcss";
import sfTypography from "@storefront-ui/typography";
import { tailwindConfig } from "@storefront-ui/react/tailwind-config";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  presets: [tailwindConfig],

  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@storefront-ui/react/**/*.{js,mjs}",
  ],
  theme: {
    fontFamily: {
      sans: ["Public Sans", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: {
          "50": "#f2f8fd",
          "100": "#e5eef9",
          "200": "#c5ddf2",
          "300": "#92c1e7",
          "400": "#57a0d9",
          "500": "#3185c6",
          "600": "#2269a7",
          "700": "#1f5b93",
          "800": "#1b4871",
          "900": "#1c3e5e",
          "950": "#13273e",
        },
      },
    },
  },
  plugins: [sfTypography({ utilityPrefix: "sf" })],
} satisfies Config;
