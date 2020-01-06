// Container(画布)类
function Container() {   
    // 容器(画布)初始化
    this.init = function () {
        // 绘制方块所在区域(画布的大小)
        var bgDiv = createElm("div","f");
        bgDiv.style.width = size*col+"px";
        bgDiv.style.height = size*row+"px";

        // 绘制预告所在区域
        var bgDiv = createElm("div","e");
        bgDiv.style.left = size*col+"px";
        bgDiv.style.width = size*announcement+"px";
        bgDiv.style.height = size*row+"px";

        // 积分初始化
        this.score = 0;
    }

    // 容器边界(待解决)
    this.check = function(x,y,shape){
        // 检查边界越界
        var flag = false;
        var leftmost = col;
        var rightmost = 0;
        var undermost = 0;

        // shape为一个方块形状╮(╯▽╰)╭
        //       ________ ________ ________ ________
        //      |        |        |        |        |
        //      |        |        |        |        |
        //      |________|________|________|________|
        //
        // 标记一个俄罗斯方块最左坐标、最右坐标、最下坐标
        for (let i = 0; i < 8; i+=2) {
            // 记录最左边水平坐标
            if (shape[i]<leftmost) {
                leftmost = shape[i];
            }
            // 记录最右边水平坐标
            if (shape[i]>rightmost) {
                rightmost = shape[i];
            }
            // 记录最下边垂直坐标
            if (shape[i+1]>undermost) {
                undermost = shape[i+1];
            }
            // 判断是否碰撞 ???????
            // this[(shape[i+1]- -y)*100- -(shape[i]- -x)]为被碰撞的方块
            // (shape[i+1]- -y)*100- -(shape[i]- -x)返回的结果为X1 0 X2,X1为行数，X2为列数
            // *100是为了用0隔开2个数
            // 
            if (this[(shape[i+1]- -y)*100- -(shape[i]- -x)]) {
                console.log((shape[i+1]- -y)*100- -(shape[i]- -x))
                console.log(this[(shape[i+1]- -y)*100- -(shape[i]- -x)])
                flag = true;
            }
            // console.log(shape[i+1])
            // console.log(y)
            // console.log((shape[i+1]- -y)*100)
            // console.log(shape[i]- -x)
        }
        // 判断是否到达极限高度
        for (let m = 0; m < 3; m++) {
            for (let n = 0; n < col; n++) {
                if (this[m*100+n]) {
                    flag = true;
                }    
            }
        }
        if ( (rightmost- -x+1)>col || (leftmost- -x)<0 || (undermost- -y+1)>row || flag){
            return false;
        }
        return true;
    }

    // 用灰色方块替换红色方块，并在容器中记录灰色方块的位置
    this.fixShape = function (x,y,shape) {
        var t = new Tetris("d",x,y,shape);
        for (let i = 0; i < 8; i+=2) {
            this[(shape[i+1]- -y)*100- -(shape[i]- -x)] = t.divs[i/2];
        }
    }

    // 遍历整个容器，判断是否可以消除
    this.findFull = function(){
        // s:记录消除的行数
        var s = 0;
        for (let m = 0; m < row; m++) {
            var count = 0;
            for(var n=0;n<col;n++){
                if(this[m*100+n]){count++;}
            }
            if(count==col){s++;this.removeLine(m);}
        }
        this.score -= -this.calScore(s)
    }

    // 
    this.calScore = function(s){
        if(s!=0) return s- -this.calScore(s-1);
        else return 0;
    }

    // 消除指定一行方块
    this.removeLine = function(row){
        // 移除一行方块
        for (let n = 0; n < col; n++) {
            document.body.removeChild(this[row*100+n]);
        }
        // 把所消除行上面所有的方块下移一行
        for (var i = row;i>0;i--){
            for (let j = 0; j < col; j++) {
                this[i*100- -j] = this[(i-1)*100- -j]
                if(this[i*100- -j]){this[i*100- -j].style.top = i*size + "px";}   
            }
        }
    }
}
