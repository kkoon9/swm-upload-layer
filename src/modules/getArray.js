const upload = require('./getUrl');

async function getArray(filePath) {
  const result = await upload(filePath);
  return result;
}

module.exports = getArray;
