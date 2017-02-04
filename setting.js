const path = require('path');

exports.BLOG_PORT = 80;

exports.BLOG_ROOT_URL = '/';

exports.BLOG_HOME_REDIRECT = '/首页';

exports.BLOG_DIR = path.resolve(__dirname, './blogs/');

exports.BLOG_PUBLISH_MARK = 'pub';

exports.BLOG_ATTACHEMENT_DIRS = /\/files\//;

exports.BLOG_NAME = '我的博客';

exports.BLOG_OWNER = 'ME';

exports.BLOG_OWNER_EMAIL = 'example@gmail.com';

exports.BLOG_LIST_ORDER = 'mtime';
//name: order by file name;
//mtime: order by update time;(default)
//ctime: order by create time;

exports.BLOG_LIST_ORDER_DESC = true;

exports.SUB_LIST_ORDER = 'ctime';

exports.SUB_LIST_ORDER_DESC = false;

exports.CSS_URL = this.BLOG_ROOT_URL + 'css/';

exports.CSS_DIR = path.resolve(__dirname, './lib/template/css');

exports.CSS_GLOBAL_FILES = ['default.css'];

exports.SCRIPT_URL = this.BLOG_ROOT_URL + 'js/';

exports.SCRIPT_DIR = path.resolve(__dirname, './lib/template/js');

exports.SCRIPT_GLOBAL_FILES = ['default.js'];

exports.SCRIPT_GLOBAL_HEAD_FILES = [];

exports.VERSION = 'v1.1.0';

exports.PATH_TO_URI = function (originPath) {
    return encodeURIComponent(
        originPath.replace(this.BLOG_DIR, this.BLOG_ROOT_URL)
    )
    .replace(/\%2F/gm, '/')
    .replace(/(\/)+/, '/');
}