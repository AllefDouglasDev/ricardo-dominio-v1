const ejs = require('ejs');
const path = require('path');

async function renderEjs(fileDir, fileName, content) {
  const filePath = path.join(__dirname, '../', 'templates', fileDir, fileName);

  return new Promise((resolve, reject) => {
    ejs.renderFile(filePath, content, async (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}

module.exports = { renderEjs };
