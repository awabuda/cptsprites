let path = require('path');
let fs = require('fs-extra');
let glob = require("glob");
let colors = require('colors');
let initSprite = require('./tools/index')
let sprite_sub_Path = {}
let exec = require('child_process').exec;
let config = require('./config');
const start = () => {
  return new Promise((resolve) => {
    if (fs.existsSync('./dist')) {
      console.log("----------存在dist目录先进行清空-----".yellow);
      exec('rm -rf dist', (error, stdout, stderr) => {
        console.log(stderr);
        console.log('--------dist目录情况完毕，开始进入合并流程----start------'.green)
        return resolve();
      })
    } else {
      console.log("---------开始进行合并流程------start------".green);
      return resolve()
    }
  })
}
start().then(() => {

  glob(`./src/pages/**/*.png`, (error, files) => {
    if (error) {
      console.log(error)
    } else {
      files.forEach(item => {
        let sub_path = path.relative('./src/pages', path.parse(item).dir);
        if (!sprite_sub_Path[sub_path]) {
          sprite_sub_Path[sub_path] = []
        }
        sprite_sub_Path[sub_path].push(item)
      })
      const allPath = Object.keys(sprite_sub_Path);

      if (allPath.length) {
        Promise.all(allPath.map(pagePath => {
          let item = sprite_sub_Path[pagePath];
          
          item.forEach(file => {
            let size = fs.statSync(file).size / 1024; // 借鉴roc的写法 判断大小
            const maxSize = config.maxSize || 20
            if (size > maxSize) {
              console.log(`---------${file}文件超过${maxSize}kb，请慎重合并-----`.red)
            }
          })
          console.log(`-------正在处理${pagePath}的合并流程------`.bgBlue)
          return initSprite({
            images: item,
            imgName: `${pagePath}.png`,
            cssName: `${pagePath}.css`
          }).catch(e => {
            console.log(`${pagePath}目录合并失败${e}`.red)
          }).then(e=>{
            console.log(`${pagePath}目录合并完成`.bgGreen)
          })
        })).then(e=>{
          console.log(`----------${allPath.join('目录，')}合并完成--------end------`.bgGreen)
        })
      }
    }
  })
})