//VPicture类
class VPicture{
    constructor(e){
        //背景颜色
        let background;
        //用于获取信息的图片
        let setPicture;
        //用于显示的图片
        let picture;
        //原始图片宽
        let width;
        //原始图片高
        let height;
        //当前图片宽
        let nowWidth = 0;
        //当前图片高
        let nowHeight = 0;
        //当前图片显示倍数
        let times;
        //此前图片显示倍数
        let lastTimes;
        //图片显示倍数改变次数与方向
        let timesTimes = 0;
        //用户设置的点击事件
        let clickFunction = () => {};
        Object.defineProperties(this,{
            //版本信息
            version: {
                get: () => '1.0.0'
            },
            //作者信息
            author: {
                get: () => 'zdj0123'
            },
            //背景颜色
            background: {
                get: () => background
            },
            //图片信息
            picture: {
                get: () => ({
                    src: picture.src,
                    width: width,
                    height: height,
                    aspectRatio: width / height,
                    nowWidth: nowWidth,
                    nowHeight: nowHeight,
                    times: nowWidth / width
                })
            },
            //图片显示倍数
            times: {
                get: () => times
            }
        });
        //创建zdjJs对象
        let z = new zdjJs();
        //创建容器
        let container = z.addElementByArray([
            'iframe',
            'style',[
                'width','100%',
                'height','100%',
                'border',0
            ]
        ],e.container);
        //获取窗口
        let w = container.contentWindow;
        //更新容器
        container = w;
        //显示图片样式重设
        let pictureCssReSet;
        //设置VPicture主要部分
        let setVPicture = () => {
            //更新容器
            container = container.document.body;
            //设置容器样式
            Object.assign(container.style,{
                margin: 0,
                padding: 0,
                width: '100vw',
                height: '100vh',
                background: e.background,
                fontSize: 0,
                overflow: 'hidden',
                userSelect: 'none'
            });
            //更新容器
            container = z.addElementByArray([
                'div',
                'style',[
                    'width','100%',
                    'height','100%'
                ]
            ],container);
            //用于显示的图片
            let addPicture = () => {
                picture = z.addElementByArray([
                    'img',
                    'function',[
                        'mousedown',(event) => {
                            event.preventDefault();
                        }
                    ]
                ],container);
            }
            //刚刚的容器宽
            let cWidth = container.offsetWidth;
            //刚刚的容器高
            let cHeight = container.offsetHeight;
            //图片位置修正
            let fix = (moveX,moveY) => {
                if(picture.offsetWidth < container.offsetWidth){
                    if(picture.offsetLeft + moveX >= 0){
                        if(picture.offsetLeft + moveX <= container.offsetWidth - picture.offsetWidth){
                            picture.style.marginLeft = z.strRemove(picture.style.marginLeft) + moveX + 'px';
                        }else{
                            picture.style.marginLeft = container.offsetWidth - picture.offsetWidth;
                        }
                    }else{
                        picture.style.marginLeft = 0;
                    }
                }else{
                    if(picture.offsetLeft + moveX < 0){
                        if(picture.offsetLeft + moveX > container.offsetWidth - nowWidth){
                            picture.style.marginLeft = z.strRemove(picture.style.marginLeft) + moveX + 'px';
                        }else{
                            picture.style.marginLeft = container.offsetWidth - nowWidth + 'px';
                        }
                    }else{
                        picture.style.marginLeft = 0;
                    }
                }
                if(picture.offsetHeight < container.offsetHeight){
                    if(picture.offsetTop + moveY >= 0){
                        if(picture.offsetTop + moveY <= container.offsetHeight - picture.offsetHeight){
                            picture.style.marginTop = z.strRemove(picture.style.marginTop) + moveY + 'px';
                        }else{
                            picture.style.marginTop = container.offsetHeight - picture.offsetHeight;
                        }
                    }else{
                        picture.style.marginTop = 0;
                    }
                }else{
                    if(picture.offsetTop + moveY < 0){
                        if(picture.offsetTop + moveY > container.offsetHeight - picture.offsetHeight){
                            picture.style.marginTop = z.strRemove(picture.style.marginTop) + moveY + 'px';
                        }else{
                            picture.style.marginTop = container.offsetHeight - picture.offsetHeight + 'px';
                        }
                    }else{
                        picture.style.marginTop = 0;
                    }
                }
            };
            pictureCssReSet = (n) => {
                if(width / height > container.offsetWidth / container.offsetHeight){
                    Object.assign(picture.style,{
                        width: container.offsetWidth * times + 'px',
                        height: 'auto'
                    });
                }else{
                    Object.assign(picture.style,{
                        width: 'auto',
                        height: container.offsetHeight * times + 'px'
                    });
                }
                if(n){
                    picture.style.marginTop = (container.offsetHeight - picture.offsetHeight) / 2 + 'px';
                    picture.style.marginLeft = (container.offsetWidth - picture.offsetWidth) / 2 + 'px';
                }
                nowWidth = picture.offsetWidth;
                nowHeight = picture.offsetHeight;
                cWidth = container.offsetWidth;
                cHeight = container.offsetHeight;
                if(!n){
                    fix((() => {
                        if(container.offsetWidth != cWidth){
                            return -picture.offsetLeft * (container.offsetWidth / cWidth - 1);
                        }else{
                            return -(-picture.offsetLeft + container.offsetWidth / 2) * (times / lastTimes - 1);
                        }
                    })(),(() => {
                        if(container.offsetHeight != cHeight){
                            return picture.offsetTop * (container.offsetHeight / cHeight - 1);
                        }else{
                            return -(-picture.offsetTop + container.offsetHeight / 2) * (times / lastTimes - 1);
                        }
                    })());
                }
                lastTimes = times;
            }
            //用于获取信息的图片
            setPicture = z.addElementByArray([
                'img',
                'src',e.src?e.src:'',
                'style',[
                    'position','fixed',
                    'top','100vh',
                    'left','100vw'
                ],
                'function',[
                    'load',() => {
                        times = 1;
                        lastTimes = 1;
                        timesTimes = 0;
                        width = setPicture.offsetWidth;
                        height = setPicture.offsetHeight;
                        addPicture();
                        picture.src = setPicture.src;
                        pictureCssReSet(1);
                    }
                ]
            ],container);
            //当前的x坐标
            let x;
            //当前的y坐标
            let y;
            //第二个x坐标
            let dx;
            //第二个y坐标
            let dy;
            //双击状态
            let clickState = 0;
            //双击状态定时器
            let timer;
            //图片操作开始事件
            let start = (event) => {
                event.preventDefault();
                clickState++;
                clearTimeout(timer);
                if(clickState == 2){
                    pictureCssReSet(1);
                    clickState = 0;
                }
                timer = setTimeout(() => {
                    if(clickState == 1){
                        clickFunction();
                    }
                    clickState = 0;
                },300);
                if(!event.touches){
                    x = event.clientX;
                    y = event.clientY;
                }else{
                    x = event.touches[0].clientX;
                    y = event.touches[0].clientY;
                    if(event.touches.length > 1){
                        dx = event.touches[1].clientX;
                        dy = event.touches[1].clientY;
                    }
                }
            };
            //图片移动惭怍
            let move = (event) => {
                event.preventDefault();
                if(x != undefined){
                    clickState = 0;
                    let lastX = x;
                    let lastY = y;
                    if(!event.touches){
                        x = event.clientX;
                        y = event.clientY;
                    }else{
                        x = event.touches[0].clientX;
                        y = event.touches[0].clientY;
                        if(event.touches.length > 1){
                            dx = event.touches[1].clientX;
                            dy = event.touches[1].clientY;
                        }
                    }
                    fix(x - lastX,y - lastY);
                }
            };
            //图片操作结束事件
            let end = () => {
                x = undefined;
                dx = undefined;
            };
            container.addEventListener('touchstart',start);
            container.addEventListener('touchmove',move);
            container.addEventListener('touchup',end);
            container.addEventListener('mousedown',start);
            container.addEventListener('mousemove',move);
            container.addEventListener('mouseup',end);
            //页面大小改变事件
            w.addEventListener('resize',() => {
                if(picture != undefined){
                    pictureCssReSet(1);
                }
            });
            //鼠标滚轮事件
            let mouseEvent = (detail) => {
                if(detail < 0 && timesTimes - 1 >= -9){
                    timesTimes--;
                }
                if(detail > 0 && timesTimes + 1 <= 40){
                    timesTimes++;
                }
                times = 1 + timesTimes * 0.1;
                pictureCssReSet(timesTimes == 0 && lastTimes > 1?1:0);
            }
            w.addEventListener('mousewheel',(event) => {
                mouseEvent(event.deltaY);
            });
            w.addEventListener('DOMMouseScroll',(event) => {
                mouseEvent(event.detail);
            });
            //移出事件
            let outFunction = (event) => {
                if(!event.touches){
                    if(event.clientX <= 0 || event.clientX >= w.innerWidth || event.clientY <= 0 || event.clientY >= w.innerHeight){
                        end();
                    }
                }else{
                    if(event.touches[0].clientX <= 0 ||event.touches[0].clientX >= w.innerWidth || event.touches[0].clientY <= 0 || event.touches[0].clientY >= w.innerHeight){
                        end();
                    }
                }
            }
            w.addEventListener('mouseout',outFunction);
        };
        if(navigator.userAgent.toUpperCase().includes('Firefox'.toUpperCase())){
            container.addEventListener('load',function(){
                setVPicture();
            });
        }else{
            setVPicture();
        }
        //修改图片地址
        this.changeSrc = (src) => {
            container.removeChild(picture);
            picture = undefined;
            setPicture.src = src;
        }
        //修改图片大小
        this.changeTimes = (uTimes) => {
            if(uTimes < 0.1){
                times = 0.1;
                timesTimes = -9;
            }else if(uTimes > 5){
                times = 5;
                timesTimes = 40;
            }else{
                times = uTimes;
                timesTimes = (times - 1) / 0.1;
            }
            pictureCssReSet();
        }
        //下载图片
        this.download = () => {
            let b = new XMLHttpRequest();
            b.open('GET',this.picture.src);
            b.responseType = 'blob';
            b.onreadystatechange = () => {
                if(b.readyState == 4){
                    if(b.status == 200){
                        z.addElementByArray([
                            'a',
                            'href',URL.createObjectURL(b.response),
                            'download','图片' + this.picture.src
                        ]).click();
                    }else{
                    }
                }
            }
            b.send();
        }
        //修改背景颜色
        this.changeBackground = (color) => {
            container.style.background = background = color;
        }
        //设置点击事件
        this.setClickFunction = (uFunction) => {
            clickFunction = uFunction;
        }
    }
}