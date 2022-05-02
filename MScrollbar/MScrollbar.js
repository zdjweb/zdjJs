// MScrollbar类
class MScrollbar {
    // 构造函数
    constructor(e) {
        // 滚动条容器
        let container = e.container;
        // 被控制对象
        const controlled = e.controlled;
        // 检查容器及被控制对象是否存在
        if (container == null || controlled == null) {
            return;
        }
        // 创建zdjJs对象
        const z = new zdjJs;
        // 获取一个新的e
        const getE = () => {
            // 检查属性
            const newE = z.checkValue({
                value: e,
                default: {
                    direction: {
                        type: 'Int',
                        min: 0,
                        max: 1,
                        default: 0
                    },
                    track: {
                        default: {
                            background: '#C8C8FA'
                        }
                    },
                    thumb: {
                        default: {
                            width: {
                                type: 'Int',
                                min: 0,
                                max: 100,
                                default: 100,
                            },
                            background: '#FFFFFF',
                            rounded: {
                                type: 'Int',
                                min: 0,
                                max: 100,
                                default: 0,
                            }
                        }
                    }
                }
            });
            return newE;
        };
        // 获取一个新的e
        e = getE();
        // 判断对象是否是窗口
        const isWindow = (obj) => {
            return obj != null && obj == obj.window;
        };
        // 隐藏原有的滚动条
        const hideBar = (container) => {
            z.addElementByObj({
                type: 'style',
                container,
                id: 'MScrollbarStyle',
                innerHTML: '::-webkit-scrollbar{width: 0;height: 0;}*{scrollbar-width: none;}'
            });
        };
        // 隐藏被控制对象原有的滚动条
        const hideControlledBar = () => {
            const container = isWindow(controlled) ? controlled.document : document;
            container.querySelector('#MScrollbarStyle') == null ? hideBar(container.body) : 0;
        };
        hideControlledBar();
        // 如果被控对象不是窗口且是框架时执行
        if (!isWindow(controlled) && ['frame','iframe'].includes(controlled.localName)) {
            // 更新被控制对象为窗口
            controlled = controlled.contentWindow;
            // 被控制窗口加载成功后隐藏其滚动条
            controlled.addEventListener('load', () => {
                hideControlledBar();
            });
        }
        // 滚动条滚动的方向
        let direction = e.direction;
        // 页面的总大小
        let total,
        // 显示的部分的大小
        show,
        // 已滚动的部分的大小
        hide;
        // 当前滚动条滑块所在的位置
        let now,
        // 鼠标点击的需要的位置
        need,
        // 开始移动前的滚动距离
        move,
        // 鼠标的起始位置
        start,
        // 鼠标的结束位置
        end;
        // 键盘控制的滚动方向
        let press;
        // 滚动条滑块的宽度
        const width = e.thumb.width;
        // 更新容器
        container = z.addElementByObj({
            type: 'iframe',
            container,
            style: {
                width: '100%',
                height: '100%',
                border: 0
            }
        });
        // 获取窗口
        const w = container.contentWindow;
        // 更新容器
        container = w;
        // 访问器属性
        Object.defineProperties(this, {
            // 设置信息
            set: {
                get: () => getE()
            }
        });
        // 设置MScrollbar主要部分
        const setMScrollbar = () => {
            // 更新容器并设置样式
            Object.assign((container = container.document.body).style, {
                margin: 0,
                padding: 0
            });
            // 隐藏容器原有的滚动条
            hideBar(container);
            // 获取指定方向上的已滚动距离
            const getHide = (direction) => {
                if (isWindow(controlled)) {
                    return controlled.document.documentElement[direction ? 'scrollLeft' : 'scrollTop'];
                } else {
                    return controlled[direction ? 'scrollLeft' : 'scrollTop'];
                }
            };
            // 获取被控制对象的部分信息
            const getMsg = () => {
                if (isWindow(controlled)) {
                    if (direction) {
                        total = controlled.document.documentElement.scrollWidth;
                        show = controlled.innerWidth;
                    } else {
                        total = controlled.document.documentElement.scrollHeight;
                        show = controlled.innerHeight;
                    }
                } else {
                    if (direction) {
                        total = controlled.scrollWidth;
                        show = controlled.offsetWidth;
                    } else {
                        total = controlled.scrollHeight;
                        show = controlled.offsetHeight;
                    }
                }
                hide = getHide(direction);
            };
            getMsg();
            // 滚动事件
            const roll = (direction, wheel) => {
                for (let i = 0; i < 120; i++) {
                    setTimeout(() => {
                        getMsg();
                        if (isWindow(controlled)) {
                            controlled.document.documentElement[direction ? 'scrollLeft' : 'scrollTop'] = Math.round(getHide(direction)) + wheel;
                        } else {
                            controlled[direction ? 'scrollLeft' : 'scrollTop'] = Math.round(getHide(direction)) + wheel;
                        }
                    }, i);
                }
                start = undefined;
            };
            // 滚动条轨道
            const track = z.addElementByObj({
                type: 'div',
                container,
                style: {
                    display: 'inline-block',
                    width: '100%',
                    height: '100%',
                    background: e.track.background
                },
                function: {
                    // 键盘按下事件
                    mousedown(event) {
                        // 左键
                        if (!event.button) {
                            now = thumb[direction ? 'offsetLeft' : 'offsetTop'];
                            need = event[direction ? 'clientX' : 'clientY'];
                            if (direction) {
                                if (now <= need && need <= now + thumb.offsetWidth) {
                                    return;
                                }
                                if (need > now + thumb.offsetWidth) {
                                    need -= thumb.offsetWidth;
                                }
                            } else {
                                if (now <= need && need <= now + thumb.offsetHeight) {
                                    return;
                                }
                                if (need > now + thumb.offsetHeight) {
                                    need -= thumb.offsetHeight;
                                }
                            }
                            move = hide;
                            // 暂存滚动条滑块当前所在的位置
                            const keepNow = now;
                            for (let i = 0; i < 100; i++) {
                                setTimeout(() => {
                                    if (need != null && now == keepNow) {
                                        getMsg();
                                        if (isWindow(controlled)) {
                                            if (direction) {
                                                controlled.document.documentElement.scrollLeft = move + (need - now) / 100 * (i + 1) / track.offsetWidth * total;
                                            } else {
                                                controlled.document.documentElement.scrollTop = move + (need - now) / 100 * (i + 1) / track.offsetHeight * total;
                                            }
                                        } else {
                                            if (direction) {
                                                controlled.scrollLeft = move + (need - now) / 100 * (i + 1) / track.offsetWidth * total;
                                            } else {
                                                controlled.scrollTop = move + (need - now) / 100 * (i + 1) / track.offsetHeight * total;
                                            }
                                        }
                                    }
                                }, i * 2);
                            }
                        } else {
                            event.preventDefault();
                        }
                    },
                    // 鼠标滚动事件
                    mousewheel(event) {
                        event.preventDefault();
                        roll(direction, event.wheelDelta < 0 ? 1 : -1);
                    },
                    DOMMouseScroll(event) {
                        event.preventDefault();
                        roll(direction, event.detail > 0 ? 1 : -1);
                    },
                    // 隐藏默认右键菜单
                    contextmenu(event) {
                        event.preventDefault();
                    }
                }
            });
            //获取滚动条滑块的部分margin信息
            const thumbMargin = () => {
                return (1 - width / 100) / 2 * track[direction ? 'offsetHeight' : 'offsetWidth'] + 'px';
            };
            // 滚动条滑块
            const thumb = z.addElementByObj({
                type: 'div',
                container: track,
                style: {
                    marginTop: direction ? thumbMargin() : 0,
                    marginLeft: direction ? 0 : thumbMargin(),
                    width: direction ? show / total * track.offsetWidth + 'px' : width + '%',
                    height: direction ? width + '%' : show / total * track.offsetHeight + 'px',
                    background: e.thumb.background
                },
                function: {
                    mousedown(event) {
                        // 左键
                        if (!event.button) {
                            start = event[direction ? 'clientX' : 'clientY'];
                            move = hide;
                        }
                    }
                }
            });
            // 防止滚动条超出
            const stopBar = () => {
                getMsg();
                if ((hide <= 0) || (hide + show + 1 >= total)) {
                    start = end;
                    move = hide;
                }
            };
            // 滚动条移动事件
            const moveBar = (start, end) => {
                getMsg();
                if (isWindow(controlled)) {
                    if (direction) {
                        controlled.document.documentElement.scrollLeft = move + (end - start) / track.offsetWidth * total;
                    } else {
                        controlled.document.documentElement.scrollTop = move + (end - start) / track.offsetHeight * total;
                    }
                } else {
                    if (direction) {
                        controlled.scrollLeft = move + (end - start) / track.offsetWidth * total;
                    } else {
                        controlled.scrollTop = move + (end - start) / track.offsetHeight * total;
                    }
                }
                stopBar();
            };
            // 鼠标松开事件
            w.addEventListener('mouseup', (event) => {
                if (start != null) {
                    moveBar(start, end = event[direction ? 'clientX' : 'clientY']);
                }
                start = need = null;
            });
            // 鼠标移动事件
            w.addEventListener('mousemove', (event) => {
                if (start != null) {
                    if ((!direction && (event.clientX < -50 || event.clientX > track.offsetWidth + 50)) || (direction && (event.clientY < -50 || event.clientY > track.offsetHeight + 50))) {
                        start = null;
                        return;
                    }
                    moveBar(start, end = event[direction ? 'clientX' : 'clientY']);
                }
            });
            // 设置滚动条滑块的部分样式
            const setThumbStyle = () => {
                getMsg();
                //水平方向
                if (direction) {
                    thumb.style.marginTop = thumbMargin();
                    thumb.style.marginLeft = hide / total * track.offsetWidth + 'px';
                    thumb.style.width = show / total * track.offsetWidth + 'px';
                } else {
                    thumb.style.marginTop = hide / total * track.offsetHeight + 'px';
                    thumb.style.marginLeft = thumbMargin();
                    thumb.style.height = show / total * track.offsetHeight + 'px';
                }
                if (thumb.scrollWidth > thumb.scrollHeight) {
                    thumb.style.borderRadius = (thumb.scrollHeight / 2) * e.thumb.rounded / 100 + 'px';
                } else {
                    thumb.style.borderRadius = (thumb.scrollWidth / 2) * e.thumb.rounded / 100 + 'px';
                }
            };
            // 定时设置滚动条滑块的部分样式
            setInterval(setThumbStyle, 40);
            // 鼠标滚动事件
            controlled.addEventListener('scroll', () => {
                setThumbStyle(getMsg());
            });
            // 键盘按下事件
            w.addEventListener('keydown', (event) => {
                event.preventDefault();
                if (direction) {
                    if (['a', '4', 'ArrowLeft', '-'].includes(event.key)) {
                        press = -1;
                    } else if (['d', '6', 'ArrowRight', '+'].includes(event.key)) {
                        press = 1;
                    } else if (['w', '8', 'ArrowUp'].includes(event.key)) {
                        return roll(0, -1);
                    } else if (['s', '2', 'ArrowDown', ' '].includes(event.key)) {
                        return roll(0, 1);
                    } else {
                        return;
                    }
                } else {
                    if (['w', '8', '-', 'ArrowUp'].includes(event.key)) {
                        press = -1;
                    } else if (['s', '2', '+', 'ArrowDown', ' '].includes(event.key)) {
                        press = 1;
                    } else if (['a', '4', 'ArrowLeft'].includes(event.key)) {
                        return roll(1, -1);
                    } else if (['d', '6', 'ArrowRight'].includes(event.key)) {
                        return roll(1, 1);
                    } else {
                        return;
                    }
                }
                roll(direction, press);
            });
        };
        if (navigator.userAgent.toUpperCase().includes('Firefox'.toUpperCase())) {
            container.addEventListener('load',() => {
                setMScrollbar();
            });
        } else {  
            setMScrollbar();
        }
    }
    // 版本信息
    get version() {
        return '2.0.2';
    }
    // 作者信息
    get author() {
        return '2002-2003';
    }
}