const express = require('express');

const setting = require('../setting'),
      global = require('./global'),
      formatURI = require('../format-uri'),
      blogApp = setting.blogApp;

const routingExtraStaticFile = Symbol('routingExtraStaticFile'),
      routingExtraStatics = Symbol('routingExtraStatics'),
      createMetas = Symbol('createMetas'),
      createCSSes = Symbol('createCSSes'),
      createHeadScripts = Symbol('createHeadScripts'),
      createScripts = Symbol('createScripts');

class PageFrame {
    constructor (title) {
        this.title = title;
        this.globalCSSes = global.getCSSes();
        this.globalScripts = global.getScripts();
        this.extraMeta = {};
        this.extraCSSes = {};
        this.extraHeadScripts = {};
        this.body = '';
        this.extraScripts = {};
    }

    [routingExtraStaticFile] (itemName, staticFile) {
        let URI = formatURI(setting.blogRootURI + '/static/' + itemName + '/' + staticFile.replace(/.*\//, ''));
        //console.log('Routing [' + itemName + ']\'s Static File: ' + URI);
        blogApp.use(
            URI,
            express.static(staticFile)
        );   
    }

    [createMetas] () {
        let html = ``;
        for (let itemName in this.extraMeta) {
            html += `<!-- ${ itemName } extra metas-->`;
            for (let i = 0; i < this.extraMeta[itemName].length; i++) {
                html += `<meta ${ this.extraMeta[itemName][i] } />`;
            }
        }
        return html;
    }

    [createCSSes] () {
        let html = ``;
        html += `<!-- Global CSSes -->`;
        for (let i = 0; i < this.globalCSSes.length; i++) {
            html += `<link rel="stylesheet" type="text/css" href="${ formatURI(setting.blogRootURI + '/static/global/' + this.globalCSSes[i].replace(/.*\//, '')) }" />`;
        }
        for (let itemName in this.extraCSSes) {
            html += `<!-- ${ itemName } extra CSSes-->`;
            for (let i = 0; i < this.extraCSSes[itemName].length; i++) {
                html += `<link rel="stylesheet" type="text/css" href="${ formatURI(setting.blogRootURI + '/static/' + itemName + '/' + this.extraCSSes[itemName][i].replace(/.*\//, '')) }" />`;
            }
        }
        return html;
    }

    [createHeadScripts] () {
        let html = ``;
        for (let itemName in this.extraHeadScripts) {
            html += `<!-- ${ itemName } extra scripts-->`;
            for (let i = 0; i < this.extraHeadScripts[itemName].length; i++) {
                html += `<script src="${ formatURI(setting.blogRootURI + '/static/' + itemName + '/' + this.extraHeadScripts[itemName][i].replace(/.*\//, '')) }"></script>`;
            }
        }
        return html;
    }

    [createScripts] () {
        let html = ``;
        html += `<!-- Global scripts -->`;
        for (let i = 0; i < this.globalScripts.length; i++) {
            html += `<script src="${ formatURI(setting.blogRootURI + '/static/global/' + this.globalScripts[i].replace(/.*\//, '')) }"></script>`;
        }
        for (let itemName in this.extraScripts) {
            html += `<!-- ${ itemName } extra scripts-->`;
            for (let i = 0; i < this.extraScripts[itemName].length; i++) {
                html += `<script src="${ itemName }${ formatURI(setting.blogRootURI + '/static/' + itemName + '/' + this.extraScripts[itemName][i].replace(/.*\//, '')) }"></script>`;
            }
        }
        return html;
    }

    appendMeta (itemName, metaContent) {
        this.extraMeta[itemName] = this.extraMeta[itemName] ? this.extraMeta[itemName] : [];
        if (this.extraMeta[itemName].indexOf(metaContent) < 0) {
            this.extraMeta[itemName].push(metaContent);
        }
        return this;
    }

    appendCSS (itemName, cssPath) {
        this.extraCSSes[itemName] = this.extraCSSes[itemName] ? this.extraCSSes[itemName] : [];
        if (this.extraCSSes[itemName].indexOf(cssPath) < 0) {
            this.extraCSSes[itemName].push(cssPath);
            this[routingExtraStaticFile](itemName, cssPath);
        }
        return this;
    }

    appendHeadScript (itemName, headScriptPath) {
        this.extraHeadScripts[itemName] = this.extraHeadScripts[itemName] ? this.extraHeadScripts[itemName] : [];
        if (this.extraHeadScripts[itemName].indexOf(headScriptPath) < 0) {
            this.extraHeadScripts[itemName].push(headScriptPath);
            this[routingExtraStaticFile](itemName, headScriptPath);
        }
        return this;
    }

    appendScript (itemName, scriptPath) {
        this.extraScripts[itemName] = this.extraScripts[itemName] ? this.extraScripts[itemName] : [];
        if (this.extraScripts[itemName].indexOf(scriptPath) < 0) {
            this.extraScripts[itemName].push(scriptPath);
            this[routingExtraStaticFile](itemName, scriptPath);
        }
        return this;
    }

    setBody (html) {
        this.body = html;
        return this;
    }

    return () {
        let html = `
            <!DOCTYPE html>
            <HTML>
                <HEAD>
                    <meta charset="utf-8" />
                    ${ this[createMetas]() }
                    <title>${ this.title }</title>
                    ${ this[createCSSes]() }
                    ${ this[createHeadScripts]() }
                </HEAD>
                <BODY>
                    ${ this.body }
                    ${ this[createScripts]() }
                </BODY>
            </HTML>
        `;
        return html;
    }
}

exports.create = function (title) {
    return new PageFrame(title);
}