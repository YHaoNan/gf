    // <div class="card">
    //     <img class="close" src="./assets/close.png" alt="">
    //     <div class="song-title">甜蜜蜜 - 邓丽君</div>
    //     <p class="song-from-and-mv"><span class="song-from">来自雨滴：梦</span> <a class="song-mv-link"
    //             href="https://www.bilibili.com/video/BV1ua4y177vs">MV播放</a> </p>
    //     <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=400 height=86
    //         src="https://music.163.com/outchain/player?type=2&id=1853812727&autco=0&height=66"></iframe>
    //     <div class="song-lyric">
    //         <h3>忘不掉的那几句歌词</h3>

    //         <ul>
    //             <li class="song-sentences">轻轻地一个吻</li>
    //             <li class="song-sentences">轻轻的一段情</li>
    //         </ul>
    //     </div>


    //     <div class="song-comments">
    //         <h3>藏在歌里的故事</h3>
    //         <div class="song-story">
    //             <div class="story-main">
    //                 我是02的，但也爱老歌，他们都说我的心理年龄特别老。其实只是小时候爸爸妈妈爱听，跟着听，现在听来有童年的味道罢了'
    //             </div>
    //             <div class="story-uploader">
    //                 ——x云笙
    //             </div>
    //         </div>
    //         <div class="song-story">
    //             <div class="story-main">
    //                 小时候老爸经常用VCD 放的碟子 看到电视机里面 还里的鱼珊瑚礁 和美女在圆柱的台子上穿着比基尼 五颜六色 甚是喜欢
    //             </div>
    //             <div class="story-uploader">
    //                 ——用户87354493
    //             </div>
    //         </div>
    //     </div>
    // </div>
    
function minusIfBIsPositive(a,b){
    return a - (b>0 ? b : 0);
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
                    text: `${drop.song.name} - ${drop.song.artist}`
                }),
                p({
                    klass: 'song-from-and-mv',
                    children: [
                        span({
                            klass: 'song-from',
                            text: `来自雨滴：${drop.word}`
                        }),
                        span({klass: 'dot'}),
                        a({
                            klass: 'song-mv-link',
                            href: drop.song.video,
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
                                    text: s
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
// {
//     "word": "经",
//     "song": {
//         "name": "月亮代表我的心",
//         "artist": "邓丽君",
//         "video": "https://www.bilibili.com/video/BV1Zt411977p?p=1",
//         "audio": "https://music.163.com/song?id=1847408145",
//         "tag": "80s",
//         "comments": [
//             {
//                 "msg": "亲爱的小婷，我已成功到埠，原来香港真的很远，这里什么都跟天津不一样，人多，车多，楼盖的特别高",
//                 "uploader": "ALICE123456789啊啊啊啊"
//             },
//             {
//                 "msg": "人生一万多次日出，一起看一次就够了",
//                 "uploader": "宋个耀文给轩"
//             },
//             {
//                 "msg": "繁星偷了人间的酒 喝得银河漫漫铺开一整片天空 我不看月亮 也不说想你 这样 月亮和你 都蒙在鼓里 我爱月亮也爱你 我看月亮的时候也在偷看你 你以为我爱月亮 只有月亮知道我爱你",
//                 "uploader": "河北王天霖"
//             },
//             {
//                 "msg": "小时候每次和远在山东的姥姥通话都会给姥姥唱这首歌 这也是我学的第一首歌，是姥姥教的，后来很多年后我家去了黑龙江 ，我也不再在给姥姥唱这首歌，高二去哈尔滨集训美术，学校的艺术节上我重新听到这首温柔的歌，竟然还记得词调 于是重新唱了这首歌发给了姥姥 我的情也深我的爱也真，月亮代表我的",
//                 "uploader": "-朝浥轻尘"
//             }
//         ],
//         "sentences": [
//             "轻轻的 一个吻",
//             "已经打动我的心",
//             "轻轻的 一段情",
//             "叫我思念到如今"
//         ]
//     },
//     "fontSize": 19,
//     "x": 546.7080610267246,
//     "y": 762.4250537047614,
//     "dir": 0.033292702615324965,
//     "speed": 1.2563103757311402,
//     "viewSize": {},
//     "finished": true
// }