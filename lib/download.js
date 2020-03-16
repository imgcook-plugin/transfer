const fs = require('fs');
const { unique, downloadImg } = require('@imgcook/cli-utils');

const filePath = './src/resources/images';

module.exports = {
  loadToLocal
}

async function loadToLocal(url, fileDirPath, fileDirName , fileName) {
  // 判断是否存在当前模块文件夹
  if(!fs.existsSync(fileDirPath)) {
    fs.mkdirSync(fileDirPath);
  }
  await downloadImg(url, `${fileDirPath}/${fileName}`);

  return `require('@images/${fileDirName}/${fileName}')`
}
