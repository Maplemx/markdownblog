const fs = require('fs');

const setting = require('./setting'),
      formatURI =  require('./format-uri');

let defaultOrder = 0;

function analyzeFile (path, blogStorageDir) {
    const isBlog = new RegExp('\\\.' + setting.blogPublishMark + '\\\.md$'),
          isBlogDraft = new RegExp('[^\\\.' + setting.blogPublishMark + '][\\\..+\\\.md|\\\.md]$');

    const relativePath = path.replace(blogStorageDir, ''),
          fileName = relativePath.replace(/.+\//, '').replace(/^\//, '').split('.')[0],
          rootURI = relativePath.replace(/\/[^\/]+$/, '');

    //Published Blog
    if (isBlog.test(relativePath)){
        let order = fileName.match(/^([0-9]+)\-/),
            tags = fileName.match(/#(.+)/),
            name = fileName.replace(/^[0-9]+\-/, '').replace(/#.+/, '');
        order = order ? Number(order[1]) : ++defaultOrder;
        tags = tags ? tags[1].split(',') : [];
        return {
            type: 'blog',
            path: path,
            blogStorageDir: blogStorageDir,
            URI: formatURI(rootURI + '/' + name),
            name: name,
            order: order,
            tags: tags,
        }

    //Blog Draft
    } else if (isBlogDraft.test(relativePath)) {
        let order = fileName.match(/^([0-9]+)\-/),
            tags = fileName.match(/#(.+)/),
            name = fileName.replace(/^[0-9]+\-/, '').replace(/#.+/, '');
        order = order ? Number(order[1]) : defaultOrder++;
        tags = tags ? tags[1].split(',') : [];
        return {
            type: 'draft',
            path: path,
            blogStorageDir: blogStorageDir,
            URI: formatURI(rootURI + '/' + name),
            name: name,
            order: order,
            tags: tags,
        }

    //Attachement
    } else {
        return {
            type: 'others',
            path: path,
            blogStorageDir: blogStorageDir,
            URI: formatURI(rootURI + '/' + fileName),
            name: fileName,
        }
    }
}

function analyzeDir (path, blogStorageDir) {
    const isStaticsDir = new RegExp('[?:' + setting.blogStaticDirs.join('|') + '](\/|$)');

    const relativePath = path.replace(blogStorageDir, ''),
          dirName = relativePath.replace(/.+\//, '').replace(/^\//, ''),
          rootURI = relativePath.replace(/\/[^\/]+$/, '');

    //Statics Dir
    if (isStaticsDir.test(relativePath)) {
        return {
            type: 'staticDir',
            path: path,
            blogStorageDir: blogStorageDir,
            URI: formatURI(relativePath),
            name: dirName,
        }

    //List
    } else {
        let result = {};

        let order = dirName.match(/^([0-9]+)\-/),
            listType = dirName.match(/\((.+)\)/),
            name = dirName.replace(/^[0-9]+\-/, '').replace(/\(.+\)/, '');
        order = order ? Number(order[1]) : defaultOrder++;
        listType = listType ? listType[1] : 'default';

        result = {
            type: 'list',
            path: path,
            blogStorageDir: blogStorageDir,
            URI: formatURI(rootURI + '/' + name),
            name: name,
            order: order,
            listType: listType,
        }
        
        //Only Blog
        let files = fs.readdirSync(path),
            blogCount = 0,
            blogPath = undefined;
        for (let i = 0; i < files.length; i++) {
            let file = files[i],
                fileStatus = fs.statSync(path + '/' + file);
            if (!fileStatus.isDirectory()) {
                let fileInfo = analyzeFile(path + '/' + file);
                if (fileInfo.type == 'blog') {
                    blogCount++;
                    blogPath = path + '/' + file;
                }
            }
        }

        if (blogCount === 1) {
            result.isOnlyBlog = true;
            result.onlyBlogPath = blogPath;
        }

        return result;
    }
}

exports.file = analyzeFile;

exports.dir = analyzeDir;