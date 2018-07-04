// 基本图文组件类
var H5ComponentBase = function (name, cfg) {
	var cfg = cfg || {};
	var cls = ' h5_component_' + cfg.type;
	var component = $('<div class="h5_component h5_component_control_' + name + cls + '">');
	
	cfg.width  && component.width ( cfg.width );
	cfg.height && component.height( cfg.height );
	cfg.text   && component.text  ( cfg.text );
	cfg.css    && component.css   ( cfg.css );
	cfg.bg     && component.css   ('background' , 'url(' + cfg.bg + ')');
	if( cfg.center === true ){
	 	component.css({
	 	 	marginLeft : ( - cfg.width/2 ) + 'px',
	 	 	left:'50%'
	 	})
	 }
	if( typeof cfg.onclick === 'function' ) {
        component.on('click', cfg.onclick)
     }
     
  // 基本图文组件接受onLoad onLeave事件,独立模块化开发
	// H5js中翻页时为组件添加onLoad,onLeave事件 $('.h5_component').trigger('onLoad')
	// 这里的delay用CSS设置后动画周期将不起作用,？？？,只能用setTimeout?
	component.on('onLoad', function(){
	    // load时为其添加一个load样式,在css中设置该样式
	    setTimeout(function(){
	       component.addClass(cls + '_load').removeClass(cls + '_leave');	 
		   cfg.animateIn && component.animate(cfg.animateIn); // animate()默认500毫秒
	    }, cfg.delay || 0 );
		return false; // 避免DOM事件循环传播
	 })
	component.on('onLeave', function(){
		component.addClass(cls + '_leave').removeClass(cls + '_load');	
		cfg.animateOut && component.animate(cfg.animateOut); 	 	 
		return false;
	 })
	return component;
}