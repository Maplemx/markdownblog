const fs = require('fs'),
      express = require('express');

const setting = require('./setting'),
      formatURI = require('./format-uri'),
      blogApp = setting.blogApp;

const templateManager = require('./blog-template-manager'),
      pathAnalysis = require('./path-analysis');

function routingGlobalStaticFile (filePath) {
    fs.access(
        filePath,
        function (err) {
            if (!err) {
                let URI = formatURI(setting.blogRootURI + '/static/global/' + filePath.replace(/.*\//, ''));
                console.log('Routing Global Static File: ' + decodeURIComponent(URI));
                blogApp.use(
                    URI,
                    express.static(filePath)
                );
            }
        }
    )
}

function generateGlobalStatic () {
    let globalCSSes = templateManager.getGlobalCSSes();
    for (let i = 0; i < globalCSSes.length; i++) {
        routingGlobalStaticFile(globalCSSes[i]);
    }
    let globalScripts = templateManager.getGlobalScripts();
    for (let i = 0; i < globalScripts.length; i++) {
        routingGlobalStaticFile(globalScripts[i]);
    }
}

function generateFromFile (fileInfo) {
    switch (fileInfo.type) {
        case 'blog':
            console.log('Routing Blog: ' + decodeURIComponent(fileInfo.URI));
            blogApp.get(
                fileInfo.URI,
                function (req, res) {
                    fs.access(
                        fileInfo.path,
                        function (err) {
                            if (err) {
                                res.send( templateManager.getPage('empty')(fileInfo) );
                            } else {
                                res.send( templateManager.getPage('blog')(fileInfo) );
                            }
                        }
                    );
                }
            );
            break;
        case 'draft':
            if (setting.blogDraftTest) {
                console.log('Routing Blog Draft: ' + decodeURIComponent(fileInfo.URI));
                blogApp.get(
                    fileInfo.URI + '/test',
                    function (req, res) {
                        fs.access(
                            fileInfo.path,
                            function (err) {
                                if (err) {
                                    res.send( templateManager.getPage('empty')(fileInfo) );
                                } else {
                                    res.send( templateManager.getPage('blog')(fileInfo) );
                                }
                            }
                        );
                    }
                );
            } else {
                console.log('Pass Blog Draft: ' + decodeURIComponent(fileInfo.URI));
            }
            break;
        default:
            //Do Nothing
            break;
    }
};

function generateFromDir (dirInfo) {
    switch (dirInfo.type) {
        case 'staticDir':
            fs.access(
                dirInfo.path,
                function (err) {
                    if (!err) {
                        console.log('Routing Static Dir: ' + decodeURIComponent(dirInfo.URI));
                        blogApp.use(
                            dirInfo.URI,
                            express.static(dirInfo.path)
                        );
                    }
                }
            );
            break;
        case 'list':
            console.log('Routing List: ' + decodeURIComponent(dirInfo.URI));
            if (dirInfo.URI == '/' && setting.blogHomePage) {
                blogApp.get(
                    dirInfo.URI,
                    function (req, res) {
                        res.send(`
                            <script>
                                window.location = '${ setting.blogHomePage }';
                            </script>
                        `);
                    }
                );
            } else {
                blogApp.get(
                    dirInfo.URI,
                    function (req, res) {
                        fs.access(
                            dirInfo.path,
                            function (err) {
                                if (err) {
                                    res.send( templateManager.getPage('empty')(dirInfo) );
                                } else {
                                    if (dirInfo.isOnlyBlog) {
                                        res.send( templateManager.getPage('blog')(pathAnalysis.file(dirInfo.onlyBlogPath, dirInfo.blogStorageDir), dirInfo.isOnlyBlog) );
                                    } else {
                                        res.send( templateManager.getPage('list')(dirInfo) );
                                    }
                                }
                            }
                        );
                    }
                );
            }
            break;
        default:
            //Do Nothing
            break;
    }
}

exports.globalStatic = generateGlobalStatic;

exports.file = generateFromFile;

exports.dir = generateFromDir;