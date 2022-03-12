//获取body
let body = document.body;
//设置body的样式
Object.assign(body.style,{
    margin: 0,
    padding: 0,
    width: '100vw',
    height: '100vh',
    background: '#FFFFFF',
});
//实例化一个zdjJs对象
let z = new zdjJs;
//获取系统设置导致字体放大的倍数
z.getFontTimes();
//设置字体单位
z.setFontSuffix('vw');
//顶部标题栏
let header = z.addElementByArray([
    'header',
    'style',[
        'position','relative',
        'z-index','2',
        'width','100%',
        'height','4vw',
        'text-align','center',
        'background','#C8C8FA',
        'box-shadow','0 0.25vw 1vw 0 #999999'
    ]
],body);
//顶部标题栏Logo图片
let headerLogo = z.addElementByArray([
    'img',
    'src','logo.png',
    'style',[
        'margin','0.5vw',
        'width','3vw',
        'height','3vw'
    ]
],header);
//顶部标题栏文字
let headerFont = z.addElementByArray([
    'div',
    'innerHTML','数学与信息工程学院电脑服务社',
    'style',[
        'display','inline-block',
        'vertical-align','top',
        'margin','0.5vw',
        'color','#F5F5F5',
        'font-size',z.getFontSize(1.5),
        'line-height',z.getFontSize(3)
    ]
],header);
//左部导航栏
let navBox = z.addElementByArray([
    'div',
    'style',[
        'display','inline-block',
        'vertical-align','top',
        'position','relative',
        'z-index','1',
        'width','12%',
        'height','calc(100vh - 4vw)',
        'background','#C3C3FA',
        'box-shadow','0.25vw 0 1vw 0 #999999'
    ]
],body);
//左部导航栏按钮容器
let navBtnBox = z.addElementByArray([
    'div',
    'style',[
        'width','100%',
        'background','rgba(255,255,255,0.15)'
    ]
],navBox);
//导航栏按钮
let nav = [];
//增加导航栏按钮
let addNavBtn = (innerHTML) => {
    let navBtn = z.addElementByArray([
        'nav',
        'innerHTML',innerHTML,
        'style',[
            'width','100%',
            'height','3vw',
            'text-align','center',
            'background',nav.length?'none':'rgba(255,255,255,0.2)',
            'color','#f5f5f5',
            'font-size',z.getFontSize(1.25),
            'line-height',z.getFontSize(3)
        ],
        'function',[
            'click',() => {
                nav[page.n].style.background = '';
                this.style.background = 'rgba(255,255,255,0.2)';
                page.n = i;
                page.change();
            }
        ]
    ],navBtnBox);
    nav.push(navBtn);
    navBtnBox.style.margin = 'calc((100vh - ' + (4 + 3 * nav.length) + 'vw) / 2) 0';
}
addNavBtn('关于我们');
addNavBtn('成员列表');
addNavBtn('QQ咨询群');
addNavBtn('微信公众号');
//页面主要部分
let main = z.addElementByArray([
    'main',
    'style',[
        'display','inline-block',
        'vertical-align','top',
        'position','relative',
        'z-index',0,
        'margin','2vw',
        'padding','1vw',
        'width','82vw',
        'height','calc(100vh - 10vw)',
        'background','#F5F5F5',
        'box-shadow','0vw 0 1vw 0 #BEBEFA',
        'outline','rgba(200,200,250,0.5) 0.1vw solid'
    ]
],body);
//滚动条容器
let bar = z.addElementByArray([
    'div',
    'style',[
        'position','fixed',
        'z-index','1',
        'top','4vw',
        'left','99%',
        'width','1%',
        'height','calc(100vh - 4vw)'
    ]
],body);
//滚动条
let ms = new MScrollbar({
    controlled: main,
    container: bar,
    direction: 0,
    track: {
        background: '#C8C8FA'
    },
    thumb: {
        width: 100,
        background: '#FFFFFF'
    }
});