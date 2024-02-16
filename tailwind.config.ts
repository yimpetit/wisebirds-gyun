import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend:{
      colors:{
        "w-yellow":"#f5ee30",
        "w-red":"#f1592a",
        "w-green":"#13a89e",
        "w-blue":"#2fc5f4",
      }
    }
  },
  plugins: [],
};
export default config;
