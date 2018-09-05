// 垂直柱状图
var H5ComponentBar_v = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    $.each(cfg.data, function (index, item) {
        var line = $('<div class="line">');
        var name = $('<div class="name">' + item[0] + '</div>');
        var rate = $('<div class="rate">');
        var per = $('<div class="per">' + item[1] * 100 + '%</div>');
        var bg = $('<div class="bg">');

        var width = cfg.width / cfg.data.length;
        var height = item[1] * 100 + '%';
        var margin = (width - 16) / 2;
        line.css('width', width);
        rate.css('height', height);
        bg.css('marginLeft', margin);

        item[2] && bg.css('backgroundColor', item[2]);
        rate.append(bg).append(per);
        line.append(name).append(rate);
        component.append(line);
    })
    return component;
}