const fs = require('fs');
const { unique, downloadImg } = require('@imgcook/cli-utils');

const filePath = './src/resources/images';

module.exports = {
  loadToLocal
}

async function loadToLocal(url, fileDirName, fileName) {
  // 判断是否存在当前模块文件夹
  if(!fs.existsSync(`${filePath}/${fileDirName}`)) {
    fs.mkdirSync(`${filePath}/${fileDirName}`);
  }
  await downloadImg(url, `${filePath}/${fileDirName}/${fileName}`);

  return `require('@images/${fileDirName}/${fileName}')`
}