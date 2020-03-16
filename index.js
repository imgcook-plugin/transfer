/**
 * @name plugin example
 * @param option: { data, filePath, config }
 * - data: module and generate code Data
 * - filePath: Pull file storage directory
 * - config: cli config
 */

const path = require('path');
const fs = require('fs');
const loadToLocal = require('./lib/download').loadToLocal;
const filePaths = './src/resources/images';

const pluginHandler = async options => {
  let { data, filePath, config  } = options;
  if(Array.isArray(data.code.panelDisplay)) {
    data.code.panelDisplay = [...data.code.panelDisplay.map(element => {
      // const reg = /(\d+\.([0-9]{0,2})px)|(\d+px)/g;
      const imgReg = /(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|](\.png|\.jpg)/g
      if(element.panelName === 'index.vue') {
        element.panelValue = 
          element.panelValue.replace(imgReg, function (match,param,offset,string) {
            // 如果不存在根文件夹，则直接返回url
            
            const needPath = path.resolve().indexOf('src') > -1 ?  path.resolve().split('src')[0] : path.resolve();
            console.log('嘻嘻嘻', path.resolve(needPath, filePaths));
            if(!fs.exists(path.resolve(needPath, filePaths))) {
              return match;
            }
            loadToLocal(match, data.moduleData.id, `${data.moduleData.id}_${string}${path.extname(match)}`);
            return `require('@images/${data.moduleData.id}/${data.moduleData.id}_${string}${path.extname(match)}')`;
          });
        }
      // if(element.panelName === 'index.css') {
      //   element.panelValue = element.panelValue.replace(reg, function (match,param,offset,string) {
      //     if(!isNaN(Number(match.replace('px', '')))) {
      //       return `${Number(match.replace('px', '')) / 100}rem`
      //     }
      //     return match;
      //   });
      // }
      // if(element.panelName === 'index.vue') {
      //   element.panelValue = element.panelValue.replace('index.response.css', 'index.css');
      // }
      return element;
    })];
  }
  return { data, filePath, config };
};

module.exports = (...args) => {
  return pluginHandler(...args).catch(err => {
    console.log(err);
  });
};
