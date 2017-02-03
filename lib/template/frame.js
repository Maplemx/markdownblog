const fs = require('fs');

const setting = require('../../setting');

const header = require('./item/header'),
      footer = require('./item/footer');

function genarateCSSes (cssFiles) {
    return  setting.CSS_GLOBAL_FILES
                .concat(cssFiles)
                .map(
                    (cssFile) => {
                        return `<link rel="stylesheet" type="text/css" href="${ setting.CSS_URL + cssFile }" />`;
                    }
                )
                .join('\n');
}

function genarateHeadScripts (headScriptFiles) {
    return  setting.SCRIPT_GLOBAL_HEAD_FILES
                .concat(headScriptFiles)
                .map(
                    (headScriptFiles) => {
                        return `<script src="${ setting.SCRIPT_URL + headScriptFiles }">`;
                    }
                )
}

function genarateScripts (scriptFiles) {
    return  setting.SCRIPT_GLOBAL_FILES
                .concat(scriptFiles)
                .map(
                    (scriptFiles) => {
                        return `<script src="${ setting.SCRIPT_URL + scriptFiles }"></script>`;
                    }
                )
                .join('\n');
}

function genarateFrame (title, cssFiles, body, scriptFiles, headScriptFiles) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8" />
                <title>${ title }</title>
                ${ genarateCSSes(cssFiles) }
                ${ genarateHeadScripts(headScriptFiles) }
            <head>
            <body>
                <div class = "mdblog-header">
                    ${ header() }
                </div>
                <div class = "mdblog-body">
                    ${ body }
                </div>
                <div class = "mdblog-footer">
                    ${ footer() }
                </div>
                ${ genarateScripts(scriptFiles) }
            </body>
        </html>
    `
}

module.exports = genarateFrame;