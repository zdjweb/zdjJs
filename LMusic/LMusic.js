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
        //增加最小功能
        let addMin = () => {

        };
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
                    let minSet = e[i];
                    addMin(minSet);
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
        //zdjJs类对象
        let z = new zdjJs;
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
            audio[0].src = path.music + music[0].src;
        }
        console.log(audio);
        audio[0].play();
    }   
}