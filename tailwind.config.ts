import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lightColor: "#8BDDF9",
        lightShadeColor: "#edf9fd",
        normalPurple: "#B799D6",
        lightPurple: "#D7C5E7",
        normalYellow: "#FAE275",
        lightYellow: "#FAE161",
      },
    },
  },
  plugins: [],
};
export default config;
