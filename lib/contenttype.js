function setFileContentType (path, res) {
    let extension = path.replace(/.+\./gm, '');
    switch (extension) {
        case 'txt':
        default:
            res.set('Content-Type','text/plain');
            break;
        case 'html':
        case 'htm':
            res.set('Content-Type','text/html');
            break;
        case 'css':
            res.set('Content-Type','text/css');
            break;
        case 'js':
            res.set('Content-Type','text/javascript');
            break;
        case 'png':
            res.type('.PNG');
            break;
        case 'jpg':
            res.type('.JPG');
            break;
        case 'jpeg':
            res.type('.JPEG');
            break;
    }
    return extension;
}

module.exports = setFileContentType;