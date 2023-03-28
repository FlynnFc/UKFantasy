/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["-translate-y-[100%]", "translate-y-[105%]"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: "#047AFF",
          secondary: "#463AA2",
          accent: "#F471B5",
          neutral: "#1E293B",
          "base-100": "#0F172A",
          info: "#93E7FB",
          success: "#81CFD1",
          warning: "#EFD7BB",
          error: "#E58B8B",
        },
      },
      "winter",
      "bumblebee",
      "halloween",
      "lofi",
      "black",
      "cyberpunk",
      "synthwave",
      "corporate",
      "business",
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
};
