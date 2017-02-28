module.exports = function formatURI (originURI) {
    originURI = originURI ? originURI : '/';
    return encodeURIComponent(
               '/' + originURI
                   .replace(/\/[0-9]+\-/gm, '')
                   .replace(/\(.*\)]/gm, '')
            )
               .replace(/%2F/gm, '/')
               .replace(/\/+/, '/');
}