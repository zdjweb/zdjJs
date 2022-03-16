class LMusic{
    constructor(e){
        //需要加载的东西
        let needLoad = ['path','play','music','btn'];
        //模式
        let mode = ['min'];
        //地址设置
        let path = {};
        //播放设置
        let play = {};
        //音乐
        let music = [...e.music];
        //按钮
        let btn = {};
        //播放状态
        let state = 0;
        Object.defineProperties(this,{
            state: {
                get: () => {
                    return state;
                }
            }
        });
        //zdjJs类对象
        let z = new zdjJs;
        //增加最小功能
        let addMin = (set) => {
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
                    //按钮
                    let playBtn = z.addElementByArray([
                        'img',
                        'src',btn[['play','pause'][state]],
                        'style',[
                            'margin-top','calc((100vh - ' + min / w.innerWidth * 50 + 'vw) / 2)',
                            'margin-left','calc((100vw - ' + min / w.innerWidth * 50 + 'vw) / 2)',
                            'width',min / w.innerWidth * 50 + 'vw',
                            'height',min / w.innerWidth * 50 + 'vw'
                        ]
                    ],container);
                    w.addEventListener('resize',() => {
                        getMin();
                        Object.assign(playBtn.style,{
                            marginTop: 'calc((100vh - ' + min / w.innerWidth * 50 + 'vw) / 2)',
                            marginLeft: 'calc((100vw - ' + min / w.innerWidth * 50 + 'vw) / 2)',
                            width: min / w.innerWidth * 50 + 'vw',
                            height: min / w.innerWidth * 50 + 'vw'
                        });
                    });
                };
                if(navigator.userAgent.toUpperCase().includes('Firefox'.toUpperCase())){
                    w.addEventListener('load',function(){
                        setLMusic();
                    });
                }else{
                    setLMusic();
                }
            }
        };
        //设置信息列表
        let modeset = [];
        //读取设置信息
        for(let i in e){
            if(needLoad.includes(i)){
                if(i != 'music'){
                    for(let j in e[i]){
                        eval(i)[j] = e[i][j];
                    }
                }
                needLoad.splice(needLoad.indexOf(i),1);
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
        //媒体
        let audio = [];
        //创建媒体
        for(let i in music){
            audio.push(z.addElementByArray([
                'audio',
                'function',[
                    'play',() => {
                        console.log(6);
                    },
                    'end',() => {
                        console.log(5);
                    }
                ]
            ]));
        }
        if(path.music){
            audio[0].src = music[0].src;
        }
        console.log(audio);
        audio[0].play();
        for(let i in modeset){
            if(modeset[i].mode == 'min'){
                addMin(modeset[i]);
            }
        }
    }   
}