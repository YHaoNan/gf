(function(global){
    // 一个屏幕中显示的最大DROP个数 算法问题，这个值在200-500之间比较安全
    var DROP_COUNT = 260;
    var PUSH_DROP_INTERVAL = Math.max(parseInt(document.body.clientHeight / DROP_COUNT),1);
    // 一个DROP的最小和最大大小
    var DROP_MIN_SIZE = 16, DROP_MAX_SIZE = 32;
    // 一个DROP最快最慢滴落速度
    // var DROP_MIN_SPEED = 0.16, DROP_MAX_SPEED = 0.2;
    var DROP_MIN_SPEED = 0.8, DROP_MAX_SPEED = 1.4;
    // 一个DROP的方向，负数往左，正数往右
    var DROP_MIN_DIR = -0.1, DROP_MAX_DIR = 0.1;

    var canvasWidth, canvasHeight, wordDrops, ctx, activeWordDrops = [], hoverPos={x:NaN,y:NaN}, clicked = false, hoverdDrop = null

    function drawDrop(drop,color ,ctx){;
        ctx.font = `${drop.fontSize}px serif`;
        ctx.fillStyle = color;
        if(!drop.viewSize) {
            drop.viewSize = ctx.measureText(drop.text);
        }
        ctx.fillText(drop.word, drop.x, drop.y);
    }

    function generateOneWordDrop(){
        let randomDrop = JSON.parse(JSON.stringify(randomOne(wordDrops)));
        randomDrop.fontSize = randomInt(DROP_MIN_SIZE,DROP_MAX_SIZE);
        randomDrop.x = randomInt(0,canvasWidth);
        randomDrop.y = -randomDrop.fontSize;
        randomDrop.dir = randomFloat(DROP_MIN_DIR,DROP_MAX_DIR);
        randomDrop.speed = randomFloat(DROP_MIN_SPEED, DROP_MAX_SPEED);
        return randomDrop;
    }

    function pushWordDrop(cnt) {
        var cur=0;
        while(cur++ < cnt && activeWordDrops.length < DROP_COUNT) {
            activeWordDrops.push(generateOneWordDrop());
        }
    }
    function inBound(source,target){
        if(!target.viewSize) return false;
        return (source.x>=target.x && source.x<=target.x+target.fontSize && source.y>=target.y && source.y<=target.y+target.fontSize);
    }
    function handleClicked(drop,pos){
        showCard(drop,pos);
    }
    var loopcnt = 0;
    function mainloop() {
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        // 遍历每一个当前处于active状态的drop
        for(let drop of activeWordDrops) {
            // 如果鼠标在drop区域内悬停，并且当前没有处于hover状态的drop，那么将drop设置成hover状态
            // 这样判断是为了保证一次只能hover一个drop
            if(inBound(hoverPos,drop) && (hoverdDrop == null || hoverdDrop==drop)){
                // 如果点击了 并且鼠标在当前drop区域 处理点击
                // 其实不需要这个判断，因为在悬停区域就必定在点击区域
                if(clicked){
                    handleClicked(drop,hoverPos);
                }
                // 绘制悬停状态的drop样式
                drawDrop(drop,"#ff3a3a",ctx);
                // 设置当前悬停的Drop对象以免出现好几个drop一起被hover
                hoverdDrop = drop;
            }else{
                // 清空当前drop的hover状态
                if(hoverdDrop==drop) hoverdDrop=null;
                // 绘制非hover状态的drop
                drawDrop(drop,"#000",ctx);
                // drop下落
                drop.x += drop.dir; drop.y += drop.speed;
            }
            // 探测drop是否已经超出屏幕外
            if(drop.x <= -drop.fontSize || drop.x >= canvasWidth || drop.y >= canvasHeight+drop.fontSize) {
                // 将finished状态设置给drop
                drop.finished = true;
            }
        }

        // 重置点击状态
        clicked = false;

        // 移除已经处于finished状态的drop
        activeWordDrops = activeWordDrops.filter(drop=>!drop.finished);
        // 尝试添加一个drop 因为几乎好几轮loop才会finished一个drop 所以 这样每次添加一个而不是一次性添加满
        // 如果当前屏幕的drop已经达到 DROP_COUNT 数量了，那么此次添加会静默失败
        if(++loopcnt==PUSH_DROP_INTERVAL){
            pushWordDrop(1);
            loopcnt = 0;
        }
        console.log(activeWordDrops.length);
        ctx.save()

        window.requestAnimationFrame(mainloop);
    }
    addOnload(function(){
        var canvas = document.getElementById("main-canvas");
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        canvas.addEventListener("mousemove",(ev)=>{
            hoverPos = getRealXYInCanvas(canvas,ev.clientX,ev.clientY);
        });
        canvas.addEventListener("mouseup",(ev)=>{
            clicked = true;
        })

        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        ctx = canvas.getContext('2d');
        wordDrops = getWordDrops();



        window.requestAnimationFrame(mainloop)
    })
    // global.onload = function() {
    // }
})(window);