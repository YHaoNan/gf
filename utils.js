function randomInt(min, max) {
    return Math.floor(randomFloat(min, max + 1));
}
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function randomOne(arr, start = 0, end = arr.length - 1) {
    return arr[randomInt(start, end)];
}
function addOnload(callback) {
    var oldOnLoad = window.onload;
    window.onload = function(){
        if(oldOnLoad)
            oldOnLoad();
        callback();
    }
}
function getRealXYInCanvas(canvas, x, y) {
    /**
        在canvas对象上调用getBoundingClientRect()方法，
        来获取canvas元素的边界框，
        该边界框的坐标是相对于整个窗口的。
        然后返回一个对象，该对象的x、y属性分别对应于鼠标在canvas之中的坐标
    **/
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height) +20
    };
}

