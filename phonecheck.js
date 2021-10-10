(function (global) {
    addOnload(function () {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || document.body.clientWidth < 1000) {
            append(
                div({
                    klass: 'mobile-device',
                    attrs:{
                        style: new lazyValue('display: none',5000)
                    },
                    children: [
                        span({
                            klass: 'tip',
                            text: '检测到您使用移动设备或窗口过小，请在PC上以全屏模式(f11)访问效果更佳'
                        }),
                        img({
                            klass: 'close',
                            src: './assets/close.png',
                            onclick: function () {
                                document.getElementsByClassName("mobile-device")[0].remove();
                            }
                        })
                    ]
                })
            )
        }
    })
})(window);