const percentageWidth = require("tailwindcss-percentage-width");

module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'customgray':'#F3F3F3',
            'blue':'#42A8FD',
            'red':'#FF3838',
            'lightorange':'#FFBB29',
            'darkorange':'#FF8D17'
        },
        fontFamily: {
            body : ["Open Sans"],
        }
    },
  },
  plugins: [
    percentageWidth
  ],
}
