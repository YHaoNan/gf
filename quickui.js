
function element(config) {
    if(!config.tag)return null;
    var e = document.createElement(config.tag);
    if(config.text) e.innerText = config.text;
    if(config.html) e.innerHTML = config.html;
    if(config.klass) e.setAttribute("class",config.klass);
    if(config.id) e.setAttribute("id",config.klass);
    if(config.onclick) e.onclick = config.onclick;
    if(config.attrs) {
        for(var key in config.attrs) {
            var val = config.attrs[key];
            if(val instanceof lazyValue) {
                setTimeout(()=>e.setAttribute(key,val.realValue),val.delay);
            }else{
                e.setAttribute(key, val);
            }
        }
    }
    if(config.children){
        for(var child of config.children) {
            e.appendChild(child);
        }
    }
    return e;
}

function div(config) {
    config.tag = "div";
    return element(config);
}

function p(config) {
    config.tag = "p";
    return element(config);
}
function a(config){
    config.tag = "a";
    if(!config.attrs) config.attrs = {};
    config.attrs.href = config.href; 
    return element(config);
}
function img(config) {
    config.tag = "img";
    if(!config.attrs) config.attrs = {};
    config.attrs.src = config.src;
    return element(config);
}
function span(config) {
    config.tag = "span";
    return element(config);
}
function ul(config) {
    config.tag = "ul";
    return element(config);
}
function li(config) {
    config.tag = "li";
    return element(config);
}
function h(config) {
    config.tag = `h${config.level}`;
    return element(config);
}
function iframe(config) {
    config.tag = "iframe";
    if(!config.attrs) config.attrs = {};
    config.attrs.src = config.src;
    return element(config);
}

/**
 * 返回一个懒加载值，这里不是指用到加载，而是延时加载
 * @param {*} value 值
 * @param {*} delay 延时
 * @returns 懒加载值
 */
function lazyValue(value,delay) {
    this.realValue = value;
    this.delay = delay;
}
function append(element) {
    document.body.append(element);
}