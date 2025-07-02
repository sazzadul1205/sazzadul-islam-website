/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["cursor-none"],
  theme: {
    extend: {
      keyframes: {
        glint: {
          "0%": { transform: "translateX(-100%) rotate(25deg)" },
          "100%": { transform: "translateX(200%) rotate(25deg)" },
        },
      },
      animation: {
        glint: "glint 1.2s ease-in-out",
      },
    },
  },
  plugins: [require("daisyui")],
};
