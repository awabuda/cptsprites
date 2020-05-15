// 默认配置项

module.exports =  {
  imgName: 'sprites.png', //默认的图片名称
  cssName: 'sprites.css', // 默认生成的样式名称
  imgDest: './dist/image', // 生成的图片地址
  cssDest: './dist/css', // 生成样式的地址
  padding: 4, // 雪碧图每个之间的间距
  algorithmOpts: {},
  engineOpts: {},
  imgOpts: {
      format: 'png', 
  },
  cssVarMap: function () {},

  cssOpts: {
      functions: true,
      variableNameTransforms: '',
  },
  unit:'rpx', // css 单位
  dip:1, // 物理像素比
  maxSize:20 // 单个文件的大小阈值 触发警告
}