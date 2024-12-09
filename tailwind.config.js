/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        subtitle: "Outfit",
        title: "Bebas Neue",
        about: "Work Sans",
        montserrat: "Montserrat",
        cabin: "Cabin",
      },
      colors: {
        backgroundColor: "#E6F2F9",
        blueColor: "#003459",
        lightBlue: "#007ea7",
        greenColor: "#32CD32",
        lightGreen: "#50C878",
      },
    },
  },
  plugins: [],
};
