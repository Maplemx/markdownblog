# USAGE

## First of all

Just remember to modify your setting in file `setting.js`

## Simple Start

```
    const markdownblog = requrie('markdownblog');
    markdownblog.start();
```

## Get as a Express App

```
    const markdownblog = require('markdownblog'),
          express = require('express');
    const app = express();
    app.use('/blog',markdownblog.getApp());
    app.use('/foo',bar);
    app.listen(80);
```

# CONTACT ME

Email: [Maplemx@gmail.com](mailto:Maplemx@gmail.com)

# GITHUB

[https://github.com/Maplemx/markdownblog](https://github.com/Maplemx/markdownblog)

# DEMO BLOG

[My Blog](http//moxin.tech)!