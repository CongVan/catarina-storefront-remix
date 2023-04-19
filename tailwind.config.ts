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
        secondary: {
          "50": "#fbf4f8",
          "100": "#f9eaf3",
          "200": "#f5d5e6",
          "300": "#edb4d1",
          "400": "#e185b2",
          "500": "#d55f96",
          "600": "#c14176",
          "700": "#b53466",
          "800": "#8a2a4e",
          "900": "#742744",
          "950": "#461125",
        },
        action: {
          "50": "#f3f6fb",
          "100": "#e4e8f5",
          "200": "#cfd7ee",
          "300": "#aebde2",
          "400": "#879bd3",
          "500": "#6a7cc7",
          "600": "#515eb7",
          "700": "#4c53a9",
          "800": "#42458b",
          "900": "#393d6f",
          "950": "#262745",
        },
      },
    },
  },
  plugins: [sfTypography({ utilityPrefix: "sf" })],
} satisfies Config;
