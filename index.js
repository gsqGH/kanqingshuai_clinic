/*
* @Author: 朝夕熊
* @Date:   2017-11-05 10:17:45
* @Last Modified by:   zhaoxixiong
* @Last Modified time: 2017-11-05 10:27:05
*/
function Circle() {
    this.init();
    this.generalRandomParam();
    this.drawCircles();

    this.ballAnimate();
    
}
// 初始化
Circle.prototype.init = function(){
    //父元素宽高
    this.stateW = document.body.offsetWidth;
    this.stateH = document.body.offsetHeight;
    this.iCanvas = document.createElement("canvas");
    // 设置Canvas 与父元素同宽高
    this.iCanvasW = this.iCanvas.width = this.stateW;
    this.iCanvasH = this.iCanvas.height = this.stateH;
    // 获取 2d 绘画环境
    this.ctx = this.iCanvas.getContext("2d");
    // 插入到 body 元素中
    document.body.appendChild(this.iCanvas);
    // 随机生成圆的数量
    this.ballNumber = ramdomNumber(50, 150);
    // 保存所有小球的数组
    this.balls = [];
    // 保存动画中最后一个停止运动的小球
    this.animte = null;
}
// 渲染出所有圆
Circle.prototype.drawCircles = function () {
    for(var i=0;i<this.ballNumber;i++){
        this.renderBall(this.balls[0]);
    }
}
// 随机生成每个圆的相关参数
Circle.prototype.generalRandomParam = function(){
    for(var i=0;i<this.ballNumber;i++){
        var ball = {};
        // ball.aX = ramdomNumber(0.3, 0.5); // 随机生成一个加速度
        // ball.aY = ramdomNumber(0.3, 0.5);
        ball.size = ramdomNumber(10, 30); // 随机生成圆半径
        // 随机生成圆心 x 坐标
        ball.x = ramdomNumber(0+ball.size, this.iCanvasW-ball.size);
        ball.y = ramdomNumber(0+ball.size, this.iCanvasH-ball.size);
        ball.speedX = ramdomNumber(-1, 1);
        ball.speedY = ramdomNumber(-1, 1);
        this.balls.push(ball);
    }
}
// 改变圆的位置
Circle.prototype.changeposition = function(){
    for(var i=0;i<this.ballNumber;i++){
        this.balls[i].x += this.balls[i].speedX;
        this.balls[i].y += this.balls[i].speedY;
    }
}
// 画圆,这里通过对圆圈的颜色填充效果进行设置，显示成蓝色气泡效果
Circle.prototype.renderBall = function(ball){
    var grd=this.ctx.createRadialGradient(ball.x,ball.y,2,ball.x,ball.y,ball.size);
    grd.addColorStop(1,"rgba(0,255,255,0.2)");//最后一位设置透明度0-1
    grd.addColorStop(0.1,"rgba(255,255,255,0.2)");

    this.ctx.fillStyle = grd;
    this.ctx.beginPath(); // 这个一定要加
    this.ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
    this.ctx.closePath(); // 这个一定要加
    this.ctx.fill();
}
// 小球碰撞边界判断
Circle.prototype.collision = function(ball){
    for(var i=0;i<this.ballNumber;i++){
       if(ball.x>this.iCanvasW-ball.size || ball.x<ball.size){
            if(ball.x>this.iCanvasW-ball.size){
                ball.x = this.iCanvasW-ball.size;
            }else{
                ball.x = ball.size;
            }
            ball.speedX = - ball.speedX;
       }
       if(ball.y>this.iCanvasH-ball.size || ball.y<ball.size){
            if(ball.y>this.iCanvasH-ball.size){
                ball.y = this.iCanvasH-ball.size;
            }else{
                ball.y = ball.size;
            }
            ball.speedY = - ball.speedY;
       }
    }
}
// 开始动画
Circle.prototype.ballAnimate = function(){
    var This = this;
    var animateFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    (function move(){
        animte = animateFrame(move);
        This.ctx.clearRect(0, 0, This.iCanvasW, This.iCanvasH);
        This.changeposition();
        for(var i=0;i<This.ballNumber;i++){
           This.collision(This.balls[i]);
           This.renderBall(This.balls[i]);
           
        }
        //完成背景动画绘制后，绘制其它内容，这里调用函数addtext()加一些文本
           This.addtext();
     
    })();
}

Circle.prototype.addtext = function(){
    //var that=this;
    this.ctx.fillStyle = "black";
    this.ctx.textAlign="center"; 
    this.ctx.font="40px Arial";
    var text="阚庆帅诊所";
    this.ctx.fillText(text,this.iCanvasW/2,this.iCanvasH/2);
    var length = this.ctx.measureText(text);
    this.ctx.lineWidth="1";
    this.ctx.strokeStyle="#FF0000";
    this.ctx.strokeRect((this.iCanvasW/2)-(length.width/2)-5,(this.iCanvasH/2)-35,length.width+10,50);
}


// 生成一个随机数
function ramdomNumber(min, max) {
    return Math.random() * (max - min) + min;
}