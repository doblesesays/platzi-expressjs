const fs = require('fs');

function getRenderedContent(content, options) {
    
}

function expressJxs(filePath, options, callback) {
    fs.readFile(filePath, (err, content)=> {
        if (err) {
            return callback(err);
        }

        const rendered = getRenderedContent(content, options);

        return callback(null, rendered);
    })
}

module.exports = expressJxs;