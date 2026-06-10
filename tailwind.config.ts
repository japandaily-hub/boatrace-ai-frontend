import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ボートカラー (1号艇=白, 2=黒, 3=赤, 4=青, 5=黄, 6=緑)
      colors: {
        boat: {
          1: "#FFFFFF",
          2: "#1a1a1a",
          3: "#EF4444",
          4: "#3B82F6",
          5: "#EAB308",
          6: "#22C55E",
        },
      },
    },
  },
  plugins: [],
};

export default config;
