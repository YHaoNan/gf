(function(global){
    addOnload(function(){
        console.log("asdf")
        append(
            div({
                klass: 'slogan',
                attrs: {
                    style: new lazyValue('display: none',3000)
                },
                children: [
                    div({
                        klass: 'slogan-title',
                        text: '文字雨'
                    }),
                    div({
                        klass: 'slogan-subtitle',
                        text: '让藏在歌词中的流年如雨滴般落下，你会接住它吗？'
                    })
                ]
            })
        )
        append(
            div({
                klass: 'bottom',
                text: '按空格查看帮助 / 关于',
                attrs: {
                    style: new lazyValue('display:none',3000)
                },
            })
        )
    });
})(window);