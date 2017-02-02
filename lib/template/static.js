const fs = require('fs');

const setting = require('../../setting');

function scanFile (path, callback) {
    var files = [];
    files = fs.readdirSync(path);

    for (let i = 0; i < files.length; i++){
        let file = files[i],
            fileStatus = fs.statSync(path + '/' + file);
        if (fileStatus.isDirectory()) {
            scanFile(path + '/' + file, callback);
        } else {
            callback(path, file);
        }
    }
}

function startCSSRouting (app, path) {
    scanFile(
        setting.CSS_DIR,
        (path, file) => {
            let uri = encodeURIComponent(setting.CSS_URL + path.replace(setting.CSS_DIR, '') + file).replace(/\%2F/gm, '/');
            console.log('Add CSS Routing: ' + uri);
            app.get(
                uri,
                function (req, res) {
                    let data = fs.readFileSync(path + '/' + file);
                    res.send(data.toString());
                }
            );
        }
    );
}

function startScriptRouting (app, path) {
    scanFile(
        setting.SCRIPT_DIR,
        (path, file) => {
            let uri = encodeURIComponent(setting.SCRIPT_URL + path.replace(setting.SCRIPT_DIR, '') + file).replace(/\%2F/gm, '/');
            console.log('Add Script Routing: ' + uri);
            app.get(
                uri,
                function (req, res) {
                    let data = fs.readFileSync(path + '/' + file);
                    res.send(data.toString());
                }
            );
        }
    );
}

function startStaticFilesRouting (app) {
    startCSSRouting(app);
    startScriptRouting(app);
}

module.exports = startStaticFilesRouting;