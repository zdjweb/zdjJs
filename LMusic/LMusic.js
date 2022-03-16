class LMusic{
    constructor(e){
        //需要加载的设置
        let need = ['path','play','music','btn'];
        //可以加载的模式
        let mode = ['min'];
        //地址设置
        let path = {};
        //播放设置
        let play = {};
        //音乐
        let music = [...e.music];
        //按钮地址
        let btn = {};
        //播放状态
        let state = 0;
        //当前播放的音乐
        let now = 0;
        Object.defineProperties(this,{
            //播放状态
            state: {
                get: () => {
                    return state;
                }
            },
            //当前播放的音乐
            now: {
                get: () => {
                    return {
                        //编号
                        n: now,
                        //音乐地址
                        src: music[now].src,
                        //作者
                        author: music[now].author,
                        //音乐名
                        name: music[now].name,
                        //封面地址
                        cover: music[now].cover
                    }
                }
            },
        });
        //zdjJs类对象
        let z = new zdjJs;
        //模式设置信息列表
        let modeset = [];
        //读取设置信息
        for(let i in e){
            if(need.includes(i)){
                if(i != 'music'){
                    for(let j in e[i]){
                        eval(i)[j] = e[i][j];
                    }
                }
            }else{
                if(mode.includes(i)){
                    modeset.push(e[i]);
                    modeset[modeset.length - 1].mode = i;
                }else{
                    console.log('属性"' + e[i] + '"无效！');
                }
            }
        }
        //修正地址设置
        for(let i in path){
            if(path[i][path[i].length - 1] != '/'){
                path[i] += '/';
            }
        }
        //修正音乐地址
        if(path.music != undefined){
            for(let i in music){
                if(music[i].src != undefined){
                    music[i].src = path.music + music[i].src;
                }
            }
        }
        //修正封面地址
        if(path.cover != undefined){
            for(let i in music){
                if(music[i].cover != undefined){
                    music[i].cover = path.cover + music[i].cover;
                }
            }
        }
        //修正按钮地址
        if(path.btn != undefined){
            for(let i in btn){
                btn[i] = path.btn + btn[i];
            }
        }
        //修正自动播放设置
        if(play.auto == undefined){
            play.auto = false;
            console.log('请使用布尔值true或false作为play.auto的值，否则可能会出现不想要的结果！');
        }else{
            if(![true,false].includes(play.auto)){
                play.auto = Boolean(play.auto);
                console.log('请使用布尔值true或false作为play.auto的值，否则可能会出现不想要的结果！');
            }
        }
        //修正播放模式设置
        if(play.mode == undefined){
            play.mode = 0;
            console.log('请使用数值0、1、2其中一个作为play.auto的值，否则可能会出现不想要的结果！');
        }else{
            if(![0,1,2].includes(play.mode)){
                play.mode = parseInt(play.mode);
                if(![0,1,2].includes(play.mode)){
                    play.mode = 0;
                }
                console.log('请使用数值0、1、2其中一个作为play.auto的值，否则可能会出现不想要的结果！');
            }
        }
        //初始化音频媒体
        let setAudio = () => {
            audio[now].src = music[now].src;
        }
        //暂停播放按钮
        let btns = [];
        //封面
        let covers = [];
        //增加最小功能
        let setMinLMusic = (set) => {
            if(set.container == undefined){
                console.log('未定义容器，min.container不能为空！');
                return;
            }else{
                //获取容器
                let container = set.container;
                //更新容器
                container = z.addElementByArray([
                    'iframe',
                    'style',[
                        'width','100%',
                        'height','100%',
                        'border',0
                    ]
                ],container);
                //获取窗口
                let w = container.contentWindow;
                //更新容器
                container = w;
                //增加LMusic主要部分
                //增加最小功能的主要部分
                let setLMusic = () => {
                    //更新容器
                    container = container.document.body;
                    //最小边
                    let min;
                    //获取最小边
                    let getMin = () => {
                        min = w.innerWidth < w.innerHeight?w.innerWidth:w.innerHeight;
                    };
                    getMin();
                    //设置容器样式
                    Object.assign(container.style,{
                        margin: 0,
                        padding: 0,
                        width: '100vw',
                        height: '100vh',
                        background: set.background,
                        backgroundImage: 'url("' + music[0].cover + '")',
                        backgroundSize: '100vw 100vh',
                        fontSize: 0,
                        overflow: 'hidden',
                        userSelect: 'none'
                    });
                    covers.push(container);
                    //按钮
                    let playBtn = z.addElementByArray([
                        'img',
                        'src',btn[['play','pause'][state]],
                        'style',[
                            'margin-top','calc((100vh - ' + min / w.innerWidth * 50 + 'vw) / 2)',
                            'margin-left','calc((100vw - ' + min / w.innerWidth * 50 + 'vw) / 2)',
                            'width',min / w.innerWidth * 50 + 'vw',
                            'height',min / w.innerWidth * 50 + 'vw'
                        ],
                        'function',[
                            'click',() => {
                                if(state){
                                    audio[now].pause();
                                    state = 0;
                                    playBtn.src = btn.play;
                                }else{
                                    audio[now].play();
                                    state = 1;
                                    playBtn.src = btn.pause;
                                }
                            }
                        ]
                    ],container);
                    btns.push(playBtn);
                    w.addEventListener('resize',() => {
                        getMin();
                        Object.assign(playBtn.style,{
                            marginTop: 'calc((100vh - ' + min / w.innerWidth * 50 + 'vw) / 2)',
                            marginLeft: 'calc((100vw - ' + min / w.innerWidth * 50 + 'vw) / 2)',
                            width: min / w.innerWidth * 50 + 'vw',
                            height: min / w.innerWidth * 50 + 'vw'
                        });
                    });
                    setAudio();
                }
                if(navigator.userAgent.toUpperCase().includes('Firefox'.toUpperCase())){
                    w.addEventListener('load',function(){
                        setLMusic();
                    });
                }else{
                    setLMusic();
                }
            }
        }
        //音频媒体
        let audio = [];
        //创建媒体
        for(let i in music){
            audio.push(z.addElementByArray([
                'audio',
                'function',[
                    'play',() => {
                        state = 1;
                        for(let i in btns){
                            btns[i].src = btn.pause;
                        }
                    },
                    'end',() => {
                        for(let i in btns){
                            if(covers[i].localName == 'img'){
                                covers[i].src = music[0].cover;
                            }else{
                                covers[i].backgroundImage = 'url("' + music[0].cover + '")';
                            }
                        }
                    }
                ]
            ]));
        }
        setAudio();
        setTimeout(() => {
            audio[now].play();
        },100);
        for(let i in modeset){
            if(modeset[i].mode == 'min'){
                setMinLMusic(modeset[i]);
            }
        }
    }
}