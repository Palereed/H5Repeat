// 折线图
var H5ComponentPolyline = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    var width = cfg.width;
    var height = cfg.height;
    var step = 10; // 水平线数目

    // 绘制网格线背景
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = width;
    cns.height = height;
    ctx.beginPath();
    for (var i = 0; i <= step; i++) {
        var y = (height / step) * i
        ctx.moveTo(0, y);
        ctx.lineTo(width, y)
    }
    step = cfg.data.length + 1;
    var text_w = width / step >> 0;
    for (var i = 0; i <= step; i++) {
        var x = (width / step) * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        if (cfg.data[i]) {
            var text = $('<div class="text">');
            text.text(cfg.data[i][0]);
            text.css({
                'width': text_w,
                'left': x + text_w / 2,
                'transition-delay': (i / 10) + 's' //机智如我
            })
            component.append(text)
        }
    }
    ctx.strokeStyle = "#aaa";
    ctx.stroke();
    component.append(cns);

    //网格数据
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = width;
    cns.height = height;
    component.append(cns);
    var draw = function (per) {
        per >= 1 ? component.find('.text').css('opacity', 1) : component.find('.text').css('opacity', 0)
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        var x = 0;
        var y = 0;
        var step = cfg.data.length;
        // 画点
        var point = width / (cfg.data.length + 1)
        for (var i = 0; i < step; i++) {
            x = point * (i + 1);
            y = height * (1 - cfg.data[i][1] * per);
            ctx.moveTo(x, y);
            ctx.arc(x, y, 2, 0, 2 * Math.PI);
        }
        // 连线
        ctx.moveTo(point, height * (1 - cfg.data[0][1] * per));
        for (var i = 0; i < step; i++) {
            x = point * (i + 1);
            y = height * (1 - cfg.data[i][1] * per);
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "#ff8878";
        ctx.stroke();
        // 绘制阴影,理解fill()的作用情况上面stroke()是为了先收笔,为之下
        // 设定阴影线的样式让其透明而不影响折线样式
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0, 0, 0, 0)"
        ctx.lineTo(x, height);
        ctx.lineTo(point, height);
        ctx.fillStyle = 'rgba(255, 118, 120, 0.3)';
        ctx.fill();
        //写数据
        for (var i = 0; i < step; i++) {
            x = point * (i + 1);
            y = height * (1 - cfg.data[i][1] * per);
            ctx.fillStyle = cfg.data[i][2] ? cfg.data[i][2] : '#ff7676'
            // >>保留小数整数位
            ctx.fillText(((cfg.data[i][1] * 100) * per >> 0) + '分', x - 10, y - 10);
        }
        ctx.stroke();
    }

    component.on('onLoad', function () {
        var s = 0;
        for (var i = 0; i < 100; i++) {
            setTimeout(function () {
                s += 0.01;
                draw(s)
            }, i * 10 + 500);
        }
    })
    component.on('onLeave', function () {
        var s = 1;
        for (var i = 0; i < 100; i++) {
            setTimeout(function () {
                s -= 0.01;
                draw(s)
            }, i * 10);
        }
    })

    return component;
}