const path = require('path'),
      fs = require('fs'),
      marked = require('marked');

function createMarkdownContainer (pageFrame, data) {
    pageFrame.appendCSS('markdown-container', path.resolve(__dirname, './css/markdown-container.css'));
    return `
        <!-- Markdown Blog Markdown-Container -->
        <div class = "markdown-container">
            ${ marked(fs.readFileSync(data.path).toString()) }
        </div>
        <!-- Markdown Blog Markdown-Container -->
    `;
}

module.exports = createMarkdownContainer;