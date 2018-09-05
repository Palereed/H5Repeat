// 内容组织类
var H5 = function () {
  this.id = ('h5_' + Math.random()).replace('.', '_');
  this.el = $(`<div class="h5" id=${this.id}>`).hide();
  this.page = [];
  $('body').append(this.el);
  // 新增页面
  // name 页面名称 text 页内文本
  // return this , 返回H5对象，可以重复使用H5对象支持的方法
  this.addPage = function (name, text) {
    //使用fullpage必须类名得为section
    var page = $('<div class="h5_page section">');
    name && page.addClass('h5_page_' + name);
    text && page.text(text);
    // 这里的this指向的是创建的h5对象,向其添加page
    this.el.append(page);
    // 将添加的page加入数组中,以备添加组件时获取page目标
    this.page.push(page);
    if (typeof this.whenAddPage === 'function') {
      this.whenAddPage()
    }
    return this;
  }
  // 新增组件
  // name 组件名称 cfg 组件定义
  this.addComponent = function (name, cfg) {
    var cfg = cfg || {};
    // 若cfg.type为空的话,会默认赋给其base
    cfg = $.extend({
      type: 'base'
    }, cfg);
    var component; //存储组件元素的变量
    // 获取数组最后一个元素
    var page = this.page.slice(-1)[0];
    switch (cfg.type) {
      case 'base':
        // 实例化一个组件
        component = new H5ComponentBase(name, cfg);
        break;
      case 'polyline':
        component = new H5ComponentPolyline(name, cfg);
        break;
      case 'pie':
        component = new H5ComponentPie(name, cfg);
        break;
      case 'bar':
        component = new H5ComponentBar(name, cfg);
        break;
      case 'bar_v':
        component = new H5ComponentBar_v(name, cfg);
        break;
      case 'rader':
        component = new H5ComponentRader(name, cfg);
        break;
      case 'ring':
        component = new H5ComponentRing(name, cfg);
        break;
      case 'point':
        component = new H5ComponentPoint(name, cfg);
        break;
    }
    // 为此页添加组件
    page.append(component);
    return this;
  }
  this.loader = function (firstPage) {
    this.el.fullpage({
      onLeave: function (index, nextIndex, direction) {
        $(this).find('.h5_component').trigger('onLeave');
      },
      afterLoad: function (anchorLink, index) {
        $(this).find('.h5_component').trigger('onLoad');
      }
    });
    this.page[0].find('.h5_component').trigger('onLoad');
    this.el.show();
    // $.fn
    if (firstPage) {
      $.fn.fullpage.moveTo(firstPage);
    }
  }
  this.loader = typeof H5_loading == "function" ? H5_loading : this.loader
  return this;
}