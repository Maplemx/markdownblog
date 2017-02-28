const express = require('express'),
      blogApp = express();

let setting = {
    //BLOG SERVER SETTING
    blogPort: 3000,
    blogRootURI: '/',
    blogHomePage: '/首页',
    blogApp: blogApp,
    routingGlobalStatic: true,

    //BLOG SCANER SETTING
    blogPublishMark: 'pub',
    blogStaticDirs: ['files'],

    //BLOG GENERATOR SETTING
    blogDraftTest: true,
    
    //BLOG INFORMATION
    blogName: 'My Blog',
    blogOwner: 'Me',
    blogOwnerEmail: 'me@example.com',

    //APP INFORMATION
    markdownBlogVersion: '1.2.0',
    markdownBlogAuthor: 'Maplemx',
    markdownBlogAuthorEmail: 'maplemx@gmail.com',
};

module.exports = setting;