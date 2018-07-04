// 散点图
var H5ComponentPoint = function (name, cfg) {
	 var component = new H5ComponentBase(name, cfg);
	 // 第一个点图的大小为基准
	 var base = cfg.data[0][1];
	 // 输出每个元素
    $.each(cfg.data,function(index, item){
         var point = $('<div class="point">');
         var text  = $('<div class="text">' + item[0] + '</div>');
         var per   = $('<div class="per">'  + item[1] * 100 + '%</div>');
         point.append(text);
         text.append(per);
         // 占第一个点图的比例
         var per = (item[1] / base * 100) + '%';
         point.width(per).height(per);
         // 点图背景颜色
         item[2] && point.css('backgroundColor',item[2]);
         // 0的话也会中断与 !==undefined
         (item[3] !== undefined && item[4] !== undefined) && point.css({
         	   'left': item[3],
         	   'top' : item[4]
         })
         component.append(point);
         point.css('transition-delay', index/3 + 's');
   })
	return component;
   //点状图调用
   //type:'point',
   //width:80,
   //height:80,
   //data:[
   //  ['Node' , 0.5 , '#ff7676', '-50%', '50%']
   //],
}