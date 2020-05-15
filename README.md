## 简单的合成雪碧图的工具

### 使用方式
```
  node index.js
    or
  npm run setup
```
## 文件存放，
```
  每个页面将需要合并的图片放置到 src/pages/的页面目录下  
```

### 生成后的操作
```
  生成雪碧图之后，会默认在dist目录下创建css目录和image目录
  css中的样式可以做为一个参考 ,下面为生成后的示例
```
```
.icon-mapicon12{
    display: inline-block;
}
.icon-mapicon12:before {
    display: block;
    content: '';
    background-image: url(booking.png);
    background-position: 0rpx 0rpx;
    width: 40rpx;
    height: 32rpx;
    background-size: 105rpx 72rpx
}
```