// 柱状图
var H5ComponentBar = function (name, cfg) {
	var component = new H5ComponentBase(name, cfg);
    $.each(cfg.data, function(index, item){
        var line = $('<div class="line">');
        var name = $('<div class="name">' + item[0] + '</div>');
        var rate = $('<div class="rate">');
        var per  = $('<div class="per">' + item[1] * 100 + '%</div>');
        var bg   = $('<div class="bg">');

        var height = cfg.height / cfg.data.length;
        var width  = item[1] * 100 + '%';
        var rateHeight = cfg.rateHeight;
        var top = (height - rateHeight)/2;
        line.css({'height':height, 'lineHeight':height + 'px'});
        rate.css({'width':width,'top':top + 'px'});
        per.css({'top':-top + 'px'})
        // 借用bg简化动画实现
        item[2] && bg.css('backgroundColor', item[2]);
        rate.append(bg);
        rate.append(per);
        line.append(name).append(rate);
        component.append(line);
    })
	return component;
}