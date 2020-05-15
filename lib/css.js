
var fs = require('fs');
var handlebars = require('handlebars');
var tmpl = fs.readFileSync(__dirname + '/handlebars/css.template.handlebars', 'utf8');
var config = require('../config')
function cssTemplate(data) {
const unit = config.unit || 'rpx'
const dip = config.dip || 1
data.sprites.map(function (item){
  item.px.width = parseInt(item.px.width) /dip + unit ;
  item.px.height = parseInt(item.px.height) /dip + unit ;
  item.px.offset_x = parseInt(item.px.offset_x) /dip + unit ;
  item.px.offset_y = parseInt(item.px.offset_y) /dip + unit ;
  item.px.total_width = parseInt(item.px.total_width) /dip + unit ;
  item.px.total_height = parseInt(item.px.total_height) /dip + unit ;

});

  var css = handlebars.compile(tmpl)(data);
  return css;
}

module.exports = cssTemplate;
