const path = require('path');
const fs = require('fs');

const dev = process.env.API_ENV === 'dev';

const configServerPath = path.join(
  __dirname,
  '..',
  'assets',
  'configServer.json'
);

function getConfigServerData() {
  // try {
  const fileContent = fs.readFileSync(configServerPath);
  return JSON.parse(fileContent);
  // } catch (err) {
  //   return '';
  // }
}

function setConfigServerData(key, data) {
  // try {
  const fileContent = getConfigServerData();

  if (!fileContent) {
    return;
  }

  fileContent[key] = data;

  fs.writeFileSync(configServerPath, JSON.stringify(fileContent));
  // } catch (err) {}
}

module.exports = {
  getConfigServerData,
  setConfigServerData,
};
