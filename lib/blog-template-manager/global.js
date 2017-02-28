const path = require('path');

let global = {
    CSSes: [path.resolve(__dirname, '../blog-template/static/css/global.css')],
    scripts: [path.resolve(__dirname, '../blog-template/static/script/global.js')],
    appendCSS: (path) => {
        if (global.CSSes.indexOf(path) < 0) {
            global.CSSes.push(path);
        }
    },
    appendScript: (path) => {
        if (global.scripts.indexOf(path) < 0) {
            global.scripts.push(path);
        }
    },
    getCSSes: () => {
        return global.CSSes;
    },
    getScripts: () => {
        return global.scripts;
    },
};

module.exports = global;