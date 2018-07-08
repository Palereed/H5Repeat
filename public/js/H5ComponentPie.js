var H5ComponentPie = function (name, cfg) {
	var component = new H5ComponentBase(name, cfg);
	var width = cfg.width;
    var height = cfg.height; // 画布长宽
    var x = width/2;         
    var y = height/2;        // 圆心
    var r = width/2;         // 饼半径
    var bgcolor = '#eee';    // 背景颜色

    // 绘制饼图底层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width  = width;
    cns.height = height;
    component.append(cns);
    ctx.beginPath();
    ctx.fillStyle = bgcolor;
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fill();
    
    // 绘制数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width  =  width;
    cns.height =  height;
    component.append(cns);
    var step   = cfg.data.length;
    var sAngle = -0.5 * Math.PI;  // 起始角度
    var eAngle = 0;  // 结束角度
    $.each(cfg.data, function(index, item){
        // 扇形
        var rate = item[1];
        ctx.beginPath();
        ctx.moveTo(x ,y);
        eAngle = sAngle + 2 * Math.PI * rate
        ctx.arc(x ,y ,r ,sAngle ,eAngle);
        ctx.fillStyle = item[2];
        ctx.fill();
        sAngle = eAngle;
        // 数据
        var text = $("<div class='text'>");
        var per  = $("<div class='per'>");
        text.text( item[0] );
        per.text ( item[1] * 100 + '%');
        text.append(per);
        var datax = r +  Math.cos( sAngle ) * r;
        var datay = r +  Math.sin( sAngle ) * r;
        datax > width/2  ? text.css('left', datax) : text.css('right', width - datax );
        datay > height/2 ? text.css('top', datay)  : text.css('bottom',height- datay);
        
        item[3] && text.css('color',item[3]);
        component.append(text)
    })
    
    // 绘制蒙版层,模拟动画效果
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width  =  width;
    cns.height =  height;
    component.append(cns);
    sAngle = 1.5 * Math.PI;  //重置起始角度
    var draw = function( per ){
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(x ,y);
        if( per <= 0 ){
            ctx.arc(x, y, r + 1, 0, 2 * Math.PI);
        } else {
            ctx.arc(x, y, r + 1, sAngle , sAngle + 2 * Math.PI * per, true);
        }
        ctx.fillStyle = bgcolor;
        ctx.fill();
        per >= 1 ? component.find('.text').css('opacity',1) : component.find('.text').css('opacity',0)
    }
    draw(0);

    component.on('onLoad', function(){
         var s=0;
            for (var i=0; i<100; i++){
                setTimeout(function(){
                s += 0.01;
                draw(s)
            }, i*10+1000);
         }
     })
    component.on('onLeave', function(){
         var s=1;
            for (var i=0; i<100; i++){
                setTimeout(function(){
                s -= 0.01;
                draw(s)
            }, i*10);
         }
     })
    return component;
}