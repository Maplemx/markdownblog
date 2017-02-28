let moduleReader = {
    pageModules: {
        blog: '../blog-template/page/blog',
        list: '../blog-template/page/list',
        empty: '../blog-template/page/empty',
    },
    itemModules: {},
    setPage: (moduleName, modulePath) => { moduleReader.pageModules[moduleName] = modulePath; },
    getPage: (moduleName) => { return moduleReader.pageModules[moduleName] ? require(moduleReader.pageModules[moduleName]) : null; },
    setItem: (moduleName, modulePath) => { moduleReader.itemModules[moduleName] = modulePath; },
    getItem: (moduleName) => { return moduleReader.itemModules[moduleName] ? require(moduleReader.itemModules[moduleName]) : null; },
}

module.exports = moduleReader;