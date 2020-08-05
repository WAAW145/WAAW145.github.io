<script>
class Circle {
    //´´½¨¶ÔÏó
    //ÒÔÒ»¸öÔ²Îª¶ÔÏó
    //ÉèÖÃËæ»úµÄ x£¬y×ø±ê£¬r°ë¾¶£¬_mx£¬_myÒÆ¶¯µÄ¾àÀë
    //this.rÊÇ´´½¨Ô²µÄ°ë¾¶£¬²ÎÊýÔ½´ó°ë¾¶Ô½´ó
    //this._mx,this._myÊÇÒÆ¶¯µÄ¾àÀë£¬²ÎÊýÔ½´óÒÆ¶¯
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = Math.random() * 10 ;
        this._mx = Math.random() ;
        this._my = Math.random() ;

    }

    //canvas »­Ô²ºÍ»­Ö±Ïß
    //»­Ô²¾ÍÊÇÕý³£µÄÓÃcanvas»­Ò»¸öÔ²
    //»­Ö±ÏßÊÇÁ½¸öÔ²Á¬Ïß£¬ÎªÁË±ÜÃâÖ±Ïß¹ý¶à£¬¸øÔ²È¦¾àÀëÉèÖÃÁËÒ»¸öÖµ£¬¾àÀëºÜÔ¶µÄÔ²È¦£¬¾Í²»×öÁ¬Ïß´¦Àí
    drawCircle(ctx) {
        ctx.beginPath();
        //arc() ·½·¨Ê¹ÓÃÒ»¸öÖÐÐÄµãºÍ°ë¾¶£¬ÎªÒ»¸ö»­²¼µÄµ±Ç°×ÓÂ·¾¶Ìí¼ÓÒ»Ìõ»¡¡£
        ctx.arc(this.x, this.y, this.r, 0, 360)
        ctx.closePath();
        ctx.fillStyle = 'rgba(  100,149,237, 0.3)';
        ctx.fill();
    }

    drawLine(ctx, _circle) {
        let dx = this.x - _circle.x;
        let dy = this.y - _circle.y;
        let d = Math.sqrt(dx * dx + dy * dy)
        if (d < 150) {
            ctx.beginPath();
            //¿ªÊ¼Ò»ÌõÂ·¾¶£¬ÒÆ¶¯µ½Î»ÖÃ this.x,this.y¡£´´½¨µ½´ïÎ»ÖÃ _circle.x,_circle.y µÄÒ»ÌõÏß£º
            ctx.moveTo(this.x, this.y);   //ÆðÊ¼µã
            ctx.lineTo(_circle.x, _circle.y);   //ÖÕµã
            ctx.closePath();
            ctx.strokeStyle = 'rgba(    100,149,237， 0.3)';
            ctx.stroke();
        }
    }

    // Ô²È¦ÒÆ¶¯
    // Ô²È¦ÒÆ¶¯µÄ¾àÀë±ØÐëÔÚÆÁÄ»·¶Î§ÄÚ
    move(w, h) {
        this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
        this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
        this.x += this._mx / 2;
        this.y += this._my / 2;
    }
}
//Êó±êµã»­Ô²ÉÁË¸±ä¶¯
class currentCirle extends Circle {
    constructor(x, y) {
        super(x, y)
    }

    drawCircle(ctx) {
        ctx.beginPath();
        //×¢ÊÍÄÚÈÝÎªÊó±ê½¹µãµÄµØ·½Ô²È¦°ë¾¶±ä»¯
        //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
        this.r = 8;
        ctx.arc(this.x, this.y, this.r, 0, 360);
        ctx.closePath();
        //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
        ctx.fillStyle = 'rgba(255, 77, 54, 0.3)'
        ctx.fill();

    }
}
//¸üÐÂÒ³ÃæÓÃrequestAnimationFrameÌæ´úsetTimeout
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let w = canvas.width = canvas.offsetWidth;
let h = canvas.height = canvas.offsetHeight;
let circles = [];
let current_circle = new currentCirle(0, 0)

let draw = function () {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < circles.length; i++) {
        circles[i].move(w, h);
        circles[i].drawCircle(ctx);
        for (j = i + 1; j < circles.length; j++) {
            circles[i].drawLine(ctx, circles[j])
        }
    }
    if (current_circle.x) {
        current_circle.drawCircle(ctx);
        for (var k = 1; k < circles.length; k++) {
            current_circle.drawLine(ctx, circles[k])
        }
    }
    requestAnimationFrame(draw)
}

let init = function (num) {
    for (var i = 0; i < num; i++) {
        circles.push(new Circle(Math.random() * w, Math.random() * h));
    }
    draw();
}
window.addEventListener('load', init(60));
window.onmousemove = function (e) {
    e = e || window.event;
    current_circle.x = e.clientX;
    current_circle.y = e.clientY;
}
window.onmouseout = function () {
    current_circle.x = null;
    current_circle.y = null;

};
</script>
