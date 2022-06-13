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
            'darkgray':'#ADADAD',
            'blue':'#42A8FD',
            'darkblue':'#0D2481',
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
