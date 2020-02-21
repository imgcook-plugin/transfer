/**
 * @name plugin example
 * @param option: { data, filePath, config }
 * - data: module and generate code Data
 * - filePath: Pull file storage directory
 * - config: cli config
 */

const pluginHandler = async options => {
  let { data, filePath, config  } = options;
  if(Array.isArray(data.code.panelDisplay)) {
    data.code.panelDisplay = [...data.code.panelDisplay.map(element => {
      // const reg = /(\d+\.([0-9]{0,2})px)|(\d+px)/g;
      const reg = /(^\d+\.([0-9]{0,2})px$)|(^\d+px$)/g;
      // if(element.panelName === 'style.js') {
      if(element.panelName === 'index.css') {
        element.panelValue = element.panelValue.replace(reg, function (match,param,offset,string) {
          if(!isNaN(Number(match.replace('px', '')))) {
            return `${Number(match.replace('px', '')) / 100}rem`
          }
          return match;
        });
      }
      if(element.panelName === 'index.vue') {
        element.panelValue = element.panelValue.replace('index.response.css', 'index.css');
      }
      return element;
    })];
  }
  console.log('嘻嘻嘻', data.code.panelDisplay);
  return { data, filePath, config };
};

module.exports = (...args) => {
  return pluginHandler(...args).catch(err => {
    console.log(err);
  });
};
