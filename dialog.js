(function(global){

    function popDialog(root){
        clearAllPopDialog();
        append(
            div({
                klass: 'pop-dialog',
                children: [
                    root,
                    div({
                        klass: 'bottom',
                        text: '按esc关闭'
                    })
                ]
            })
        )
    }

    function clearAllPopDialog(){
        var dialogs = document.getElementsByClassName('pop-dialog');
        for(var dialog of dialogs) dialog.remove();
    }

    function popAboutWindow() {
        var songlist = getSongListByYears();
        popDialog(
            div({
                klass: 'about',
                children: [
                    h({
                        level: 2,
                        text: '关于'
                    }),
                    p({
                        text: '音乐的意义？可能对于不同身份的人，答案是不同的。但最珍贵的，便是其中承载的故事，对，你和我的故事！' 
                    }),
                    p({
                        text: '一段歌词，一句话，一个字......对于每个人来说都存着一份不一样的生命情感。'
                    }),
                    p({
                        text: '是爱情、亲情、友情？是上学时其他同学羡慕的一双球鞋？是和ta分手时的眼泪？是初入社会，来不及转变角色的焦头烂额的你得到的一句慰藉？是你自己都已经忘记的那句生日快乐？是下班回家热气腾腾的炒肉段？是黄昏时公园的双人椅？'
                    }),
                    p({
                        text: '聚散总有，但那首歌我们永远记得，那份感受我们永远不忘......'
                    }),
                    p({
                        klass: 'highlight',
                        html: '<strong>现在，随便点开一个文字雨，看看世界某一个角落里其他人的故事吧！</strong>'
                    }),
                    h({
                        level: 2,
                        text: '歌曲列表'
                    }),
                    ul({
                        children: Object.keys(songlist).map(yearsTag=>
                            li({
                                text: `${yearsTag}: ${songlist[yearsTag].join(', ')}`
                            })
                        )
                    }),
                    h({
                        level: 2,
                        text: '版权相关'
                    }),
                    ul({
                        children: copyrights.map(item=>
                            li({
                                html: item
                            })
                        )
                    }),
                ]
            })
        )
    }


    global.onkeyup = function(ev) {
        console.log(ev.key);
        if(ev.key===' '){
            popAboutWindow();
        }else if(ev.key==='Escape'){
            clearAllPopDialog();
        }
    }
})(window);