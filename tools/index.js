let fs = require('fs-extra');
let path = require('path');
// let templater = require('spritesheet-templates');
let Spritesmith = require('spritesmith');
var templater = require('spritesheet-templates');

let defaultConfig = require('../config');
const initSprite = (options = {}) => {
  return new Promise((resolve, reject) => {
    const params = Object.assign({}, defaultConfig, options);
    let {
      images
    } = options;
    if (!images || !images.length) {
      return reject(new Error('请添加需要合并的图片'))
    } else {
      const spritesmithParams = {
        engine: params.engine,
        algorithm: params.algorithm,
        padding: params.padding * 2,
        exportOpts: params.imgOpts,
      }
      let spritesmith = new Spritesmith(spritesmithParams);
      spritesmith.createImages(images, (error, imgItem) => {
        if (error) {
          return reject(new Error(error))
        }
        try {
          
          let result = spritesmith.processImages(imgItem, spritesmithParams);
          let coordinates = result.coordinates;
          let properties = result.properties;
          let spritePath = params.imgPath ? `${params.imgPath}/${params.imgName}` : params.imgName;
          let spritesheetData = {
            width: properties.width,
            height: properties.height,
            image: spritePath,
          };
          let cssVarMap = params.cssVarMap;
  
          let cleanCoords = [];
  
          Object.keys(coordinates).forEach(function (file) {
            let name = path.parse(file).name;
            let coords = coordinates[file];
            coords.name = name;
            coords.source_image = file;
            coords.image = spritePath;
            coords.total_width = properties.width;
            coords.total_height = properties.height;
  
            coords = cssVarMap(coords) || coords;
  
            cleanCoords.push(coords);
          });
          result.image.on('error', function (err) {
            throw err;
          });
          // 默认以css的模板
          const cssFormat = 'css';
          templater.addTemplate(cssFormat, require(__dirname + '/../lib/css'));
          var cssStr = templater({
            sprites: cleanCoords,
            spritesheet: spritesheetData,
            spritesheet_info: {
              name: params.cssSpritesheetName,
            },
          }, {
            format: cssFormat,
            formatOpts: params.cssOpts,
          });
          fs.ensureDirSync(params.imgDest);
          let writeStream = fs.createWriteStream(`${params.imgDest}/${params.imgName}`);
  
          result.image.pipe(writeStream);
          fs.ensureDirSync(params.cssDest);
          fs.writeFileSync(`${params.cssDest}/${params.cssName}`, cssStr);
          resolve();
        } catch (err) {
          reject(new Error(err))
        }
      })
    }
  })
}
module.exports = initSprite