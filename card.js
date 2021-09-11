function minusIfBIsPositive(a,b){
    return a - (b>0 ? b : 0);
}
function hightLightWord(word,html){
    return html.replace(`${word}`, `<span class='highlight'>${word}</span>`);
}
function showCard(drop, pos){
    var oldCard = document.getElementsByClassName("card");
    if(oldCard && oldCard.length!=0) oldCard[0].remove();

    const HEIGHT = 400;
    const WIDTH = 400;
    const screenHeight = document.body.clientHeight;
    const screenWidth = document.body.clientWidth;

    var x = pos.x + 30, y = pos.y;
    var left = minusIfBIsPositive(x,(WIDTH-(screenWidth-x)+60)) , top = minusIfBIsPositive(y, (HEIGHT-(screenHeight-y)+60));


    append(
        div({
            klass: 'card',
            attrs: {
                style: `left: ${left}px;top: ${top}px;height: ${HEIGHT}px;width: ${WIDTH}px;`
            },
            children: [
                img({
                    klass: 'close',
                    src: './assets/close.png',
                    onclick: function(){
                        document.getElementsByClassName("card")[0].remove();
                    }
                }),
                div({
                    klass: 'song-title',
                    html: hightLightWord(drop.word,`${drop.song.name}`) + `- ${drop.song.artist}`,
                }),
                p({
                    klass: 'song-from-and-mv',
                    children: [
                        span({
                            klass: 'song-from',
                            html: `来自雨滴：${hightLightWord(drop.word,drop.word)}`
                        }),
                        span({klass: 'dot'}),
                        a({
                            klass: 'song-mv-link',
                            href: drop.song.video,
                            attrs: {target: '_blank'},
                            text: '播放MV'
                        }),
                        span({klass: 'dot'}),
                        span({
                            klass: 'song-years',
                            text: `${drop.song.tag}`
                        })
                    ]
                }),
                iframe({
                    src: new lazyValue(`https://music.163.com/outchain/player?type=2&id=${drop.song.neteaseAudioId}&auto=0&height=66`,100),
                    attrs: {
                        frameborder: "no",
                        border: "0",
                        marginwidth: "0",
                        marginheight: "0",
                        width: '400',
                        height: '86'
                    }
                }),
                div({
                    klass: 'song-lyric',
                    children: [
                        h({
                            level: 3,
                            text: '忘不掉的那几句词'
                        }),
                        ul({
                            children: drop.song.sentences.map(s=>
                                li({
                                    klass: 'song-sentences',
                                    html: hightLightWord(drop.word,s)
                                }
                            ))
                        })
                    ]
                }),
                div({
                    klass: 'song-comments',
                    children: [
                        h({
                            level: 3,
                            text: '藏在歌里的故事'
                        }),
                        div({
                            children: drop.song.comments.map(comment => 
                                div({
                                    klass: 'song-story',
                                    children: [
                                        span({
                                            klass: 'tooltip',
                                            text: '复制成功',
                                            attrs: {
                                                style: 'visibility: hidden'
                                            }
                                        }),
                                        div({
                                            klass: 'story-main',
                                            text: comment.msg,
                                            attrs: {
                                                "data-clipboard-text": `${comment.msg} ——${comment.uploader}`
                                            }
                                        }),
                                        div({
                                            klass: 'story-uploader',
                                            text: `——${comment.uploader}`
                                        })
                                    ]
                                }))
                        })
                    ]
                })
            ]
        })
    )
    var clipboard = new ClipboardJS('.story-main');
    clipboard.on('success', function(e){
        console.log(e.trigger);
        console.log(e.trigger.previousElementSibling);
        var tooltip = e.trigger.previousElementSibling;
        tooltip.style.visibility = 'visible';
        setTimeout(()=>tooltip.style.visibility='hidden',500)
    })
}