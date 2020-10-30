const path = require("path");

module.exports = {
    entry: [
        "./js/util.js",
        "./js/backend.js",
        "./js/markup.js",
        "./js/activation.js",
        "./js/render.js",
        "./js/filter.js",
        "./js/form.js",
        "./js/main-pin.js",
        "./js/main.js"
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname),
        iife: true
    },
    devtool: false
};
