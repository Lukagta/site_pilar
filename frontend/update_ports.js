const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

walk('./src', function (filePath) {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = content.replace(/http:\/\/localhost:3002/g, 'http://localhost:3015');
        updated = updated.replace(/http:\/\/localhost:5173/g, 'http://localhost:5185');
        if (content !== updated) {
            fs.writeFileSync(filePath, updated, 'utf8');
            console.log('Updated', filePath);
        }
    }
});
