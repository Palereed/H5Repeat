var H5ComponentRing = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    var width = cfg.width;
    var height = cfg.height; // 画布长宽
    var x = width / 2;
    var y = height / 2; // 圆心
    var r = width / 2; // 环半径
    var ringw = 20; // 环宽
    var rate = cfg.data[1]; // 数据值
    var sAngle = 1.5 * Math.PI; // 起始角度
    var eAngle = sAngle + 2 * Math.PI * rate; // 结束角度
    var bgcolor = '#eee'; // 背景颜色
    var ratebg = '#fff'; // 数据背景颜色

    // 环图底层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = width;
    cns.height = ctx.height = height;
    component.append(cns);
    ctx.beginPath();
    ctx.fillStyle = bgcolor;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();

    // 绘制数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = width;
    cns.height = ctx.height = height;
    component.append(cns);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, r, sAngle, eAngle);
    ctx.fillStyle = cfg.data[2];
    ctx.fill();


    // 最上层蒙版
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = width;
    cns.height = ctx.height = height;
    cns.className = 'Ratebg';
    component.append(cns);
    ctx.beginPath();
    ctx.fillStyle = ratebg;
    ctx.arc(x, y, r - ringw, 0, 2 * Math.PI);
    ctx.fill();
    var text = $("<div class='text'>");
    text.text(cfg.data[0]);
    var per = $("<div class='per'>");
    per.text(rate * 100 + '%');
    text.append(per);
    cfg.data[3] && text.css('color', cfg.data[3]);
    text.css('opacity', 0);
    component.append(text);

    // 添加蒙版层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = width;
    cns.height = ctx.height = height;
    component.append(cns);
    var draw = function (per) {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(x, y);
        if (per <= 0) {
            ctx.arc(x, y, r + 1, 0, 2 * Math.PI);
        } else {
            ctx.arc(x, y, r + 1, sAngle, sAngle + 2 * Math.PI * per, true);
        }
        ctx.fillStyle = bgcolor;
        ctx.fill();
        if (per >= 1) {
            component.find('.text').css('opacity', 1);
        } else {
            component.find('.text').css('opacity', 0);
        }
    }
    draw(0);

    component.on('onLoad', function () {
        var s = 0;
        for (var i = 0; i < 100; i++) {
            setTimeout(function () {
                s += 0.01;
                draw(s);
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