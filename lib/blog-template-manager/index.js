const global = require('./global'),
      moduleManager = require('./module-manager'),
      pageFrame = require('./page-frame');

exports.global = global;

exports.moduleManager = moduleManager;

exports.pageFrame = pageFrame;

exports.getPageFrame = pageFrame.create;

exports.getPage = moduleManager.getPage;

exports.setPage = moduleManager.setPage;

exports.getItem = moduleManager.getItem;

exports.setItem = moduleManager.setItem;

exports.getGlobalCSSes = global.getCSSes;

exports.appendGlobalCSS = global.appendCSS;

exports.getGlobalScripts = global.getScripts;

exports.appendGlobalScript = global.appendScript;