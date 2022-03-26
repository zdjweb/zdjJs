class LMusic{
    constructor(e){
        //需要加载的设置
        let need = ['path','play','music','btn'];
        //可以加载的模式
        let mode = ['min','text'];
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
        //错误状态
        let error = 0;
        //当前播放的音乐
        let now = 0;
        Object.defineProperties(this,{
            //播放状态
            state: {
                get: () => {
                    return state;
                },
                set: (uIn) => {
                    (uIn?() => {
                        audio[now].play();
                        playSet();
                    }:() => {
                        audio[now].pause();
                        pauseSet();
                    })();
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
                },
                set: (uIn) => {
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
                    if(Array.isArray(e[i])){
                        for(let j in e[i]){
                            modeset.push(e[i][j]);
                            modeset[modeset.length - 1].mode = i;
                        }
                    }else{
                        modeset.push(e[i]);
                        modeset[modeset.length - 1].mode = i;
                    }
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
        play.auto = !!play.auto;
        //修正播放模式设置
        play.mode = +play.mode;
        [0,1,2].includes(play.mode) ? 0 : play.mode = 0;
        //初始化音频媒体
        let setAudio = () => {
            audio[now].src = music[now].src;
        }
        //暂停播放按钮
        let btns = [];
        //封面
        let covers = [];
        //音乐信息文本
        let texts = [];
        //播放状态下的设置
        let playSet = () => {
            state = 1;
            for(let i in btns){
                btns[i].src = btn.pause;
            }
        };
        //暂停状态下的设置
        let pauseSet = () => {
            state = 0;
            for(let i in btns){
                btns[i].src = btn.play;
            }
        };
        //切换修正功能
        let fixChange = () => {
            if(now < 0){
                now = audio.length - 1;
            }else if(now > audio.length - 1){
                now = 0;
            }
        };
        //音乐封面及信息重新加载
        let coverAndTextReload = () => {
            for(let i in covers){
                if(covers[i].localName == 'img'){
                    covers[i].src = music[now].cover;
                }else{
                    covers[i].style.backgroundImage = 'url("' + music[now].cover + '")';
                }
            }
            for(let i in texts){
                texts[i].innerHTML = '正在播放：' + music[now].author + ' - ' + music[now].name;
            }
        };
        //切换音乐功能
        let changeMusic = () => {
            //audio[now].pause();
            audio[now].currentTime = 0;
            if(!play.mode){
                now += 1;
            }else if(play.mode == 2){
                let arr = [];
                for(let i in audio){
                    if(i != now){
                        arr.push(i);
                    }
                }
                now = arr[Math.round(Math.random() * (arr.length - 1))];
            }
            fixChange();
            coverAndTextReload();
            setAudio();
            audio[now].play();
        };
        //创建iiframe容器
        let addContainer = (container) => {
            return z.addElementByArray([
                'iframe',
                'style',[
                    'width','100%',
                    'height','100%',
                    'border',0
                ]
            ],container);
        };
        //增加最小功能LMusic
        let setMinLMusic = (set) => {
            if(set.container != undefined){
                //创建容器 获取窗口
                let w = addContainer(set.container).contentWindow;
                //更新容器
                let container = w;
                //增加最小功能LMusic的主要部分
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
                        backgroundImage: set.coverShow?'url("' + music[now].cover + '")':'',
                        backgroundSize: '100vw 100vh',
                        fontSize: 0,
                        overflow: 'hidden',
                        userSelect: 'none'
                    });
                    set.coverShow?covers.push(container):0;
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
                                    pauseSet();
                                }else{
                                    audio[now].play();
                                    playSet();
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
        //增加文本功能LMusic
        let setTextLMusic = (set) => {
            if(set.container != undefined){
                //创建容器 获取窗口
                let w = addContainer(set.container).contentWindow;
                //更新容器
                let container = w;
                //增加文本功能LMusic的主要部分
                let setLMusic = () => {
                    //更新容器
                    container = container.document.body;
                    //设置容器样式
                    Object.assign(container.style,{
                        margin: 0,
                        padding: 0,
                        width: '100vw',
                        height: '100vh',
                        background: set.btnBackground,
                        backgroundImage: set.coverShow?'url("' + music[now].cover + '")':'',
                        backgroundSize: '100vH 100vh',
                        fontSize: 0,
                        overflow: 'hidden',
                        userSelect: 'none'
                    });
                    set.coverShow?covers.push(container):0;
                    //按钮
                    let playBtn = z.addElementByArray([
                        'img',
                        'src',btn[['play','pause'][state]],
                        'style',[
                            'margin','15vh',
                            'width','70vh',
                            'height','70vh'
                        ],
                        'function',[
                            'click',() => {
                                if(state){
                                    audio[now].pause();
                                    pauseSet();
                                }else{
                                    audio[now].play();
                                    playSet();
                                }
                            }
                        ]
                    ],container);
                    btns.push(playBtn);
                    //文本部分
                    let text = z.addElementByArray([
                        'div',
                        'innerHTML','正在播放：' + music[now].author + ' - ' + music[now].name,
                        'style',[
                            'display','inline-block',
                            'vertical-align','top',
                            'padding','0 10vh',
                            'width','calc(100vw - 120vh)',
                            'height','100vh',
                            'background',set.textBackground,
                            'white-space','nowrap',
                            'text-overflow','ellipsis',
                            'overflow','hidden',
                            'color',set.textColor,
                            'font-size','25vh',
                            'line-height','100vh'
                        ]
                    ],container);
                    texts.push(text);
                }
                if(navigator.userAgent.toUpperCase().includes('Firefox'.toUpperCase())){
                    w.addEventListener('load',function(){
                        setLMusic();
                    });
                }else{
                    setLMusic();
                }
            }
        };
        //音频媒体
        let audio = [];
        //创建媒体
        for(let i in music){
            audio.push(z.addElementByArray([
                'audio',
                'function',[
                    'play',playSet,
                    'pause',() => {
                        if(audio[now].currentTime != audio[now].duration){
                            pauseSet();
                        }
                    },
                    'ended',(event) => {
                        event.preventDefault();
                        changeMusic();
                    },
                    'error',() => {
                        error = 1;
                    }
                ]
            ]));
        }
        for(let i in modeset){
            if(modeset[i].mode == 'min'){
                setMinLMusic(modeset[i]);
            }else if(modeset[i].mode == 'text'){
                setTextLMusic(modeset[i]);
            }
        }
        play.mode == 2?(() => {
            if(play.mode == 2){
                let arr = [];
                for(let i in audio){
                    arr.push(i);
                }
                now = arr[Math.round(Math.random() * (arr.length - 1))];
                coverAndTextReload();
            }
        })():0;
        setAudio();
        if(play.auto){
            audio[now].play();
        }
    }
}