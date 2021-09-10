var songs = [
    {
        name: '月亮代表我的心',
        artist: '邓丽君',
        video: 'https://www.bilibili.com/video/BV1Zt411977p?p=1',
        neteaseAudioId: '1847408145',
        tag: '80s',
        comments: [
            {
                msg: '亲爱的小婷，我已成功到埠，原来香港真的很远，这里什么都跟天津不一样，人多，车多，楼盖的特别高',
                uploader: 'ALICE123456789啊啊啊啊'
            },{
                msg: '人生一万多次日出，一起看一次就够了',
                uploader: '宋个耀文给轩'
            },{
                msg: '繁星偷了人间的酒 喝得银河漫漫铺开一整片天空 我不看月亮 也不说想你 这样 月亮和你 都蒙在鼓里 我爱月亮也爱你 我看月亮的时候也在偷看你 你以为我爱月亮 只有月亮知道我爱你',
                uploader: '河北王天霖'
            },{
                msg: '小时候每次和远在山东的姥姥通话都会给姥姥唱这首歌 这也是我学的第一首歌，是姥姥教的，后来很多年后我家去了黑龙江 ，我也不再在给姥姥唱这首歌，高二去哈尔滨集训美术，学校的艺术节上我重新听到这首温柔的歌，竟然还记得词调 于是重新唱了这首歌发给了姥姥 我的情也深我的爱也真，月亮代表我的',
                uploader: '-朝浥轻尘'
            }
        ],
        sentences: [
            '轻轻的 一个吻','已经打动我的心','轻轻的 一段情','叫我思念到如今'
        ]
    },{
        name: '美酒加咖啡',
        artist: '邓丽君',
        video: 'https://www.bilibili.com/video/BV1Dx411t7TW?p=1',
        neteaseAudioId: '1858139250',
        tag: '80s',
        comments: [
            {
                msg: '我是02的，但也爱老歌，他们都说我的心理年龄特别老。其实只是小时候爸爸妈妈爱听，跟着听，现在听来有童年的味道罢了',
                uploader: 'x云笙'
            },{
                msg: '小时候老爸经常用VCD 放的碟子 看到电视机里面 还里的鱼珊瑚礁 和美女在圆柱的台子上穿着比基尼 五颜六色 甚是喜欢',
                uploader: '用户87354493'
            }
        ],
        sentences: [
            '明知道爱情像流水','管他去爱谁','我要美酒加咖啡','一杯再一杯'
        ]
    },{
        name: '甜蜜蜜',
        artist: '邓丽君',
        video: 'https://www.bilibili.com/video/BV1ua4y177vs?p=1',
        neteaseAudioId: '1853812727',
        tag: '80s',
        comments: [
            {
                msg: '每次听这首歌，总想起我和特莉莎在洛杉矶沙滩一起晒太阳的日子。那时候她特别喜欢骑摩托。',
                uploader: '周杰伦郑州分火轮'
            },{
                msg: '想起来上学期坐你自行车经过主教桥，脑子里想的是电影《甜蜜蜜》李翘坐在黎小军自行车后座上穿过香港大街小巷…当时背景音乐就是这个…BUT！你自行车坏了就不修🐷这学期累死啦!差评！😒@你不傻-我傻',
                uploader: '账号已注销'
            }
        ],
        sentences: [
            '在哪里？在哪里见过你？','在梦里，在梦里见过你'
        ]
    }
];

function notIn(source, targetList) {
    for(var target of targetList) {
        if(source == target) return false;
    }
    return true;
}
function getWordDrops() {
    var wordDrops = [];
    for(var song of songs){
        const wordset = new Set();
        // 将名字分割成单字添加到set中
        song.name.split("").forEach(t=>wordset.add(t));
        // 将歌词连接起来分割成单字添加到set中
        song.sentences.join("").split("").filter(t=>notIn(t,["，","。"," ","？","！",".",",","《","》","（","）","、","；","“","”","'",'"',"~","—","-"])).forEach(t=>wordset.add(t));
        // 将每一个单字绑定给歌曲对象添加到wordDrops中
        wordset.forEach(word=>wordDrops.push({word: word, song: song}));
    }
    return wordDrops;
}
