// Tetris(俄罗斯方块)类
function Tetris(css,x,y,shape) { 
    // 创建4个div用来组合出各种方块
    var myCss = css?css:"c";
    this.divs = [createElm("div",myCss),createElm("div",myCss),createElm("div",myCss),createElm("div",myCss)]
    // 疑问1：这个if存在的作用？
    // 没有shape说明没有是第一次创建
    if(!shape){
        // 预告区域的方块
        this.divs2 = [createElm("div",myCss),createElm("div",myCss),createElm("div",myCss),createElm("div",myCss)]
        // 分数区域
        this.score = createElm("div","g");
        this.score.style.top = 10*size+"px";
        this.score.style.left = (col+1)*size+"px";
        this.score.style.backgroundColor = "rgb(0,0,0)"
        this.score.innerHTML = "score：0";
    }
    
    this.container = null;

    // 对x、y、shape、container进行初始化操作
    this.refresh = function () {
        this.x = (typeof(x)!='undefined')?x:3;
        this.y = (typeof(y)!='undefined')?y:0;
        // 如果有传参，优先使用参数的，如果有预告，优先使用预告，
        // 都没有就自己生成
        if (shape) {this.shape = shape;}
        else if(this.shape2){this.shape = this.shape2}
        else{this.shape = shape?shape:shapes[Math.floor((Math.random()*shapes.length-0.000000001))].split(",");}
        
        this.shape2 = shapes[Math.floor((Math.random()*shapes.length-0.000000001))].split(",");
        
        if (this.container && !this.container.check(this.x,this.y,this.shape)) {
            isOver = true;
            // 在这里可以加一个模拟框！！！！！！！
            alert("游戏结束");
        }
        else{
            this.show();
            this.showScore();
            this.showAnnouncement();
        }
    }

    // 显示方块
    this.show = function () {
        // javascript:for in总是得到对像的key或数组,字符串的下标
        // python:得到元素的值
        for (const i in this.divs) {
            this.divs[i].style.top = (this.shape[i*2+1]- -this.y)*size+"px";
            this.divs[i].style.left = (this.shape[i*2]- -this.x)*size+"px";
        }
    }

    // 显示预告
    this.showAnnouncement = function(){
        for (const i in this.divs2) {
            this.divs2[i].style.top = (this.shape2[i*2+1]- -1)*size+"px";
            this.divs2[i].style.left = (this.shape2[i*2]- -1- -col)*size+"px";
        }
    }

    // 显示分数
    this.showScore = function(){
        if(this.container && this.score)
        {
            this.score.innerHTML = "score："+this.container.score;
        }
    }

    // 水平移动方块的位置
    this.hMove = function (step) {
        if (this.container.check(this.x- -step,this.y,this.shape)) {
            this.x += step;
            this.show()            
        }
    }

    // 垂直移动方块位置
    this.vMove = function (step) {
        if (this.container.check(this.x,this.y- -step,this.shape)) {
           this.y +=step;
           this.show();             
        }
        else{
            this.container.fixShape(this.x,this.y,this.shape);
            this.container.findFull();
            this.refresh();
        }
    }

    // 旋转方块
    this.rotate = function () {
        var newShape = [this.shape[1],3-this.shape[0],this.shape[3],3-this.shape[2],this.shape[5],3-this.shape[4],this.shape[7],3-this.shape[6]];
        if (this.container.check(this.x,this.y,newShape)) {
           this.shape = newShape;
           this.show();             
        }
    }
    
    this.refresh(); //?????????
}

