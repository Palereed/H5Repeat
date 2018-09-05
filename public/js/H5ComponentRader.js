var H5ComponentRader = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    var width = cfg.width;
    var height = cfg.height;

    // 绘制网格线背景
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = width;
    cns.height = height;
    component.append(cns);
    var r = width / 2;
    var step = cfg.data.length;
    var isBlue = false;
    for (var s = 10; s > 0; s--) {
        ctx.beginPath();
        for (var i = 0; i < step; i++) {
            // rad = (2 * Math.PI / step) * i + 0.5 * Math.PI;
            // 改变起点使多边形显示妥帖 
            // 可以不加 0.5 * Math.PI (90°) 
            // 求 x 时 sin ,y 时 cos 即可
            var rad = (2 * Math.PI / step) * i;
            var x = r + Math.sin(rad) * r * (s / 10);
            var y = r + Math.cos(rad) * r * (s / 10);
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = (isBlue = !isBlue) ? '#0fb9ed' : '#f1f9ff'; // 交替上色
        ctx.fill();
    }

    // 雷达伞骨
    ctx.beginPath();
    for (var i = 0; i < step; i++) {
        var rad = (2 * Math.PI / step) * i;
        var x = r + Math.sin(rad) * r
        var y = r + Math.cos(rad) * r
        ctx.moveTo(r, r);
        ctx.lineTo(x, y);
        var text = $('<div class="text"></div>');
        text.text(cfg.data[i][0]);
        x > width / 2 ? text.css('left', x + 10) : text.css('right', (width - x) + 10);
        y > height / 2 ? text.css('top', y + 10) : text.css('bottom', (height - y) + 10);

        cfg.data[i][2] && text.css('color', cfg.data[i][2]);
        component.append(text);
    }
    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();

    // 数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = width;
    cns.height = height;
    component.append(cns);
    var draw = function (per) {
        per >= 1 ? component.find('.text').css('opacity', 1) : component.find('.text').css('opacity', 0)
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath(); // 无此行,最后一条线指不向圆心
        for (var i = 0; i < step; i++) {
            var rad = (2 * Math.PI / step) * i;
            var rate = cfg.data[i][1] * per;
            var x = r + Math.sin(rad) * r * rate;
            var y = r + Math.cos(rad) * r * rate;
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#ff4422';
        ctx.stroke();

        // 数据点
        ctx.fillStyle = '#ff4422';
        for (var i = 0; i < step; i++) {
            var rad = (2 * Math.PI / step) * i;
            var rate = cfg.data[i][1] * per;
            var x = r + Math.sin(rad) * r * rate;
            var y = r + Math.cos(rad) * r * rate;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
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