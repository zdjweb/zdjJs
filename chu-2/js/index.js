//加载容器
const loading = document.querySelector('#loading');
//加载结束事件
const loadingEnd = () => {
    loading.style.display = 'none';
};
//用于放置背景图片的容器
const bg = document.querySelectorAll('.bg');
//用于获取背景图片信息的图片
const img = document.querySelector('#img');
//图片信息
const bgMsg = [];
//待加载的背景图片列表
const bgSrc = [
    'img/background/1.jpg',
    'img/background/2.jpg',
    'img/background/3.jpg',
    'img/background/4.jpg'
];
//待加载的背景图片的编号
let bgN = 0;
//加载用于获取背景图片信息的图片
const bgLoad = () => {
    if(bgSrc.length > 0){
        img.src = bgSrc[0];
        bgSrc.splice(0,1);
        Object.assign(bg[bgN].style,{
            left: 100 * bgN++ + 'vw',
            backgroundImage: 'url(' + img.src + ')'
        });
    }else{
        bgSet();
    }
};
//获取背景图片信息
img.addEventListener('load',() => {
    bgMsg.push({
        width: img.offsetWidth,
        height: img.offsetHeight
    });
    bgLoad();
});
bgLoad();
//背景图片设置
const bgSet = () => {
    for(let i in bgMsg){
        if(bgMsg[i].width / bgMsg[i].height > window.innerWidth / window.innerHeight){
            bg[i].style.backgroundSize = 'auto 100vh';
        }else{
            bg[i].style.backgroundSize = '100vw auto';
        }
    }
};
//窗口大小重设事件
window.addEventListener('resize',() => {
    bgSet();
});
//背景图片切换定时器
let bgTimer;
//背景图片切换方向
let bgTo;
//背景图片切换状态计数
let bgTimes = 0;
//当前的背景图片的代号
let bgNow = 0;
//下一个背景图片的代号
let bgNext;
//背景图片切换
const bgChange = () => {
    clearInterval(bgTimer);
    bgTimer = setInterval(() => {
        if(bgTo){
            bgTimes--;
        }else{
            bgTimes++;
        }
        if(bgTimes > 0){
            bgNext = bgNow + 1;
        }else{
            bgNext = bgNow - 1;
        }
        if(bgNext > bg.length - 1){
            bgNext = 0;
        }
        if(bgNext < 0){
            bgNext =  bg.length - 1;
        }
        bg[bgNow].style.left = 0 - bgTimes + 'vw';
        bg[bgNext].style.left = bgNow + 'vw';
        if(bgTimes % 100 == 0){
            bgTimes = 0;
            bgNow = bgNext;
            clearInterval(bgTimer);
        }
    },10);
};
//键盘按键事件
window.addEventListener('keydown',(e) => {
    e.key == 'ArrowLeft'?bgTo = 0 && bgChange():0;
    e.key == 'ArrowRight'?bgTo = 1 && bgChange():0;
});
setTimeout(loadingEnd,3000);