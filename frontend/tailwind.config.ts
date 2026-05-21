import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        farm: {
          leaf: "#1f8a5b",
          field: "#eef8ec",
          soil: "#5a4636",
          sun: "#f2b84b",
        },
      },
      boxShadow: {
        soft: "0 18px 50px rgba(31, 138, 91, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
