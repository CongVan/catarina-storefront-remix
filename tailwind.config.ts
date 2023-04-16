import type { Config } from "tailwindcss";
import sfTypography from "@storefront-ui/typography";
import { tailwindConfig } from "@storefront-ui/react/tailwind-config";

export default {
  presets: [tailwindConfig],

  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@storefront-ui/react/**/*.{js,mjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [sfTypography({ utilityPrefix: "sf" })],
} satisfies Config;
