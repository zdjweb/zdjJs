// TSelect类
class TSelect {
    // 构造函数
    constructor(e) {
        // 检查容器是否存在 不存在则直接返回
        if (e.container == null) {
            return;
        }
        // 创建一个新的e
        const getNewE = () => {
            // 对原有的e进行复制
            e = {...e};
            // 检查values属性是否存在 不存在则将其设为空数组 存在则检查是否是数组 是数组则进行复制并保证选项值是字符串且唯一
            e.values = e.values == null ? [] : (Array.isArray(e.values) ? (() => {
                const values = [];
                for (let i in e.values) {
                    if (!values.includes(String(e.values[i]))) {
                        values.push(String(e.values[i]));
                    }
                }
                return values;
            })() : 0);
            // 检查prefix属性是否存在 不存在则将其设为空字符串 存在则需保证是字符串
            e.prefix = e.prefix == null ? '' : String(e.prefix);
            // 检查suffix属性是否存在 不存在则将其设为空字符串 存在则需保证是字符串
            e.suffix = e.suffix == null ? '' : String(e.suffix);
            // 进行条件判断 验证一个值是否符合条件 并返回符合条件的值
            const reSetValue = (value, min, max, def) => {
                return (value == null || isNaN(value) ? def : (value < min ? min : (value > max ? max : +value)));
            };
            // 检查default属性是否存在 并保证其是整数 且不小于0、不大于选项的数量减一 默认值为0
            e.default = parseInt(reSetValue(e.default, 0, e.values.toString().split(',').length - 1, 0));
            // 检查number属性是否存在 并保证其是整数 且不小于1、不大于15 默认值为5
            e.number = parseInt(reSetValue(e.number, 1, 15, 5));
            // 检查background属性是否存在 不存在则将其设为'#FFFFFF' 存在则需保证是字符串
            e.background = e.background == null ? '#FFFFFF' : String(e.background);
            // 检查font属性是否存在 不存在则将其设为空对象 存在则进行复制
            e.font = e.font == null ? {} : {...e.font};
            // 检查font属性是否存在size属性 并保证其是数值类型 且不小于0.3、不大于1.25 默认值为1
            e.font.size = reSetValue(e.font.size, 0.3, 1.25, 1);
            // 检查font属性是否存在color属性 不存在则将其设为'#807F7F' 存在则需保证是字符串
            e.font.color = e.font.color == null ? '#807F7F' : String(e.font.color);
            // 检查opacity属性是否存在 不存在则将其设为空对象
            e.opacity = e.opacity == null ? {} : {...e.opacity};
            // 检查opacity属性是否存在change属性 不存在则将其设为true 存在则需保证其是布尔类型
            e.opacity.change = e.opacity.change == null ? true : !!e.opacity.change;
            // 检查opacity属性是否存在max属性 并保证其是数值类型 且不小于0、不大于1 默认值为1
            e.opacity.max = reSetValue(e.opacity.max, 0, 1, 1);
            // 检查opacity属性是否存在min属性 并保证其是数值类型 且不小于0、不大于1 默认值为0.2
            e.opacity.min = reSetValue(e.opacity.min, 0, 1, 0.2);
            // 如果opacity属性的min属性大于max属性则互换值
            e.opacity.min > e.opacity.max ? (() => {
                e.opacity.min = e.opacity.max - e.opacity.min;
                e.opacity.max -= e.opacity.min;
                e.opacity.min += e.opacity.max;
            })() : 0;
            // 检查opacity属性的max属性是否不小于0.2
            e.opacity.max = reSetValue(e.opacity.max, 0.2, 1, 0.1);
            // 检查line属性是否存在 不存在则将其设为空对象
            e.line = e.line == null ? {} : {...e.line};
            // 检查line属性是否存在height属性 并保证其是数值类型 且不小于0.5、不大于1.25 默认值为1
            e.line.height = reSetValue(e.line.height, 0.5, 1.25, 1);
            // 检查line属性是否存在background属性 不存在则将其设为'#EEEEEE' 存在则需保证是字符串
            e.line.background = e.line.background == null ? '#EEEEEE' : String(e.line.background);
            // 检查valueChangeFunction属性是否存在 不存在则将其设为空函数 存在则进行复制
            e.valueChangeFunction = e.valueChangeFunction == null ? () => {} : eval(`(${e.valueChangeFunction})`);
            return e;
        };
        // 获取一个新的e
        e = getNewE();
        // 当前选择的选项的编号 当前所在位置的选项的编号
        let code = e.default, moveCode = code;
        // 选项值
        const values = {};
        // 前缀 后缀
        let prefix = e.prefix, suffix = e.suffix;
        // 刚刚选中的选项值
        let lastValue;
        // 选项改变的方向
        let direction = 1;
        // 选项信息容器 选项信息
        let msgBox, msg = [];
        // 选项信息高度
        let msgHeight;
        // 最大marginTop 最小marginTop
        let maxMarginTop, minMarginTop;
        // 用于增加选项信息的函数
        let addMsg = () => {};
        // 选择的值改变时执行的函数
        let valueChangeFunction = e.valueChangeFunction;
        // 用于存放音效播放器
        const audio = [];
        // 播放音效
        const audioPlay = () => {
            const createAudio = () => {
                const newAudio = new Audio;
                newAudio.src = 'TSelect.mp3';
                audio.push(newAudio);
                return newAudio;
            };
            (audio.length > 0 ? (() => {
                for (let i in audio) {
                    if (audio[i].paused) {
                        return audio[i];
                    }
                }
                return createAudio();
            })() : createAudio()).play();
        };
        // 获取选项完整值
        const getFullValue = (code) => {
            return prefix + values[code] + suffix;
        };
        // 设置访问器属性
        Object.defineProperties(this, {
            // 设置信息
            set: {
                get: () => getNewE()
            },
            // 选项值
            values: {
                get: () => values
            },
            // 前缀
            prefix: {
                get: () => prefix,
                set(sPrefix) {
                    sPrefix != prefix ? (() => {
                        prefix = String(sPrefix);
                        for (const i in msg) {
                            msg[i].innerHTML = getFullValue(i);
                        }
                    })() : 0;
                }
            },
            // 后缀
            suffix: {
                get: () => suffix,
                set(sSuffix) {
                    sSuffix != suffix ? (() => {
                        suffix = String(sSuffix);
                        for (const i in msg) {
                            msg[i].innerHTML = getFullValue(i);
                        }
                    })() : 0;
                }
            },
            // 完整选项值
            fullValues: {
                get() {
                    const newValues = {};
                    for (const i in values) {
                        newValues[i] = getFullValue(i);
                    }
                    return newValues;
                }
            },
            // 选项数量
            number: {
                get() {
                    let number = 0;
                    for (const i in values) {
                        if (values[i] != null) {
                            number++;
                        }
                    }
                    return number;
                }
            },
            // 当前选择选项的编号
            code: {
                get: () => code,
                set(sCode) {
                    if (sCode >= 0 && sCode < this.number || sCode == 0) {
                        msgBox.style.marginTop = maxMarginTop - (code = sCode) * (e.line.height + msgHeight) + 'vh';
                        code != moveCode ? audioPlay() : 0;
                        e.opacity.change ? opacityReSet(moveCode = code) : 0;
                        this._changeCheck();
                    }
                }
            },
            // 所在位置的选项的编号
            moveCode: {
                get: () => moveCode
            },
            // 当前选择的选项值
            value: {
                get: () => values[code],
                set(value) {
                    for (const i in values) {
                        values[i] == String(value) ? this.code = i : 0;
                    }
                }
            },
            // 当前选择的完整选项值
            fullValue: {
                get: () => this.isEmpty ? undefined : getFullValue(code)
            },
            // 刚刚选中的选项值
            lastValue: {
                get() {
                    const value = lastValue;
                    lastValue = this.value;
                    if (this.checkValue(value) < this.checkValue(lastValue)) {
                        direction = 1;
                    } else if (this.checkValue(value) > this.checkValue(lastValue)) {
                        direction = -1;
                    }
                    return value;
                }
            },
            // 选项改变的方向
            direction: {
                get: () => direction
            },
            // 值更改时执行的函数
            valueChangeFunction: {
                get: () => eval(`(${valueChangeFunction})`),
                set(Function) {
                    valueChangeFunction = eval(`(${Function})`);
                }
            },
            // 检查是否为空
            isEmpty: {
                get: () => this.number == 0
            },
            // 检查选中的选项是否改变
            _changeCheck: {
                get: () => () => this.value == this.lastValue ? 0 : (() => {
                    this.valueChangeFunction();
                })()
            },
            // 在指定位置增加选项
            addValue: {
                get: () => function(value,code) {
                    if (this.checkValue(value) < 0) {
                        if (code >= 0 && code <= this.number) {
                            let i = this.number - 1;
                            while (i >= code) {
                                values[i + 1] = values[i--];
                            }
                            values[code] = String(value);
                            const newMsg = addMsg(code);
                            code < this.number - 1 ? msgBox.insertBefore(newMsg, msg[code]) : msgBox.appendChild(newMsg);
                            msg.splice(code, 0, newMsg);
                            minMarginTop = maxMarginTop - (this.number - 1) * (e.line.height + msgHeight);
                            this.code = this.number == 1 ? 0 : (code <= this.code ? ++this.code : this.code);
                            return true;
                        } else {
                            return this.addValue(value, this.number);
                        }
                    }
                    return false;
                }
            },
            // 删除指定选项
            deleteValue: {
                get: () => function(code) {
                    if (code >= 0 && code < this.number) {
                        let i = code;
                        while (i < this.number) {
                            values[i] = values[i++ + 1];
                        }
                        delete values[this.number];
                        msgBox.removeChild(msg[code]);
                        msg.splice(code,1);
                        minMarginTop = maxMarginTop - (this.number - 1) * (e.line.height + msgHeight);
                        this.code = this.isEmpty ? 0 : (this.code == this.number || this.code > code ? --this.code : this.code);
                        return true;
                    } else {
                        return this.number ? this.deleteValue(this.number - 1) : false;
                    }
                }
            },
            // 清空所有选项
            clearValues: {
                get: () => function() {
                    return this.number ? (() => {
                        while (this.number) {
                            this.deleteValue();
                        }
                        return true;
                    })() : false;
                }
            },
            // 修改指定选项
            changeValue: {
                get: () => function(code,value) {
                    if (code >= 0 && code < this.number && this.checkValue(value) < 0) {
                        msg[code].innerHTML = prefix + (values[code] = String(value)) + suffix;
                        this._changeCheck();
                        return true;
                    }
                    return false;
                }
            },
            // 检查选项是否存在
            checkValue: {
                get: () => function(value) {
                    for (const i in values) {
                        if (values[i] === String(value)) {
                            return Number(i);
                        }
                    }
                    return -1;
                }
            }
        });
        // 判断设置信息中的values属性是否是数组
        Array.isArray(e.values) ? (() => {
            // 是数组则进行遍历 将选项存入values
            for (const i in e.values) {
                this.checkValue(e.values[i]) < 0 ? values[this.number] = e.values[i] : 0;
            }
        })() : 0;
        // 将lastValue的值初始化为第一个选项的值
        lastValue = values[code];
        // 创建一个zdjJs对象
        const z = new zdjJs;
        // 创建容器
        let container = z.addElementByArray([
            'iframe',
            'style', [
                'width', '100%',
                'height', '100%',
                'border', 0
            ]
        ], e.container);
        // 结束事件
        let end = () => {};
        // 判断是否移出TSelect范围
        const outFunction = (event) => {
            if (!event.touches) {
                if (event.clientX <= 0 || event.clientX >= w.innerWidth || event.clientY <= 0 || event.clientY >= w.innerHeight) {
                    end();
                    return true;
                }
            } else {
                if (event.touches[0].clientX <= 0 || event.touches[0].clientX >= w.innerWidth || event.touches[0].clientY <= 0 || event.touches[0].clientY >= w.innerHeight) {
                    end();
                    return true;
                }
            }
            return false;
        };
        // 选项信息透明度更新函数
        let opacityReSet = () => {};
        // 获取窗口并更新容器
        const w = container = container.contentWindow;
        // 给窗口绑定移出判断事件
        w.addEventListener('mouseout', outFunction);
        // 给窗口绑定按键事件
        w.addEventListener('keydown', (event) => {
            if (['w', 'a', '8', '4', '-', 'ArrowUp', 'ArrowLeft'].includes(event.key)) {
                this.code--;
            } else if (['s', 'd', '2', '6', '+', 'ArrowDown', 'ArrowRight', ' '].includes(event.key)) {
                this.code++;
            }
        });
        // 给窗口绑定鼠标滚轮事件
        w.addEventListener('mousewheel',(event) => {
            event.wheelDelta < 0 ? this.code++ : this.code--;
        });
        w.addEventListener('DOMMouseScroll', (event) => {
            event.detail > 0 ? this.code++ : this.code--;
        });
        // 设置TSelect主要部分
        const setTSelect = () => {
            // 更新容器并设置容器样式
            Object.assign((container = container.document.body).style, {
                margin: 0,
                padding: 0,
                width: '100vw',
                height: '100vh',
                background: e.background,
                fontSize: 0,
                overflow: 'hidden'
            });
            z.addElementByArray([
                'style',
                'innerHTML','::-webkit-scrollbar{width: 0;height: 0;}*{scrollbar-width: none;}'
            ],container);
            // 获取系统设置导致字体放大的倍数
            z.getFontTimes(container);
            // 设置字体大小单位
            z.setFontSuffix('vh');
            // 获取当前所在位置的选项的编号
            const moveCodeGet = () => {
                // 用于计算的选择线高度
                const lineHeight = e.line.height;
                if (z.strRemove(msgBox.style.marginTop) >= maxMarginTop - (lineHeight + msgHeight / 2)) {
                    return 0;
                } else if (z.strRemove(msgBox.style.marginTop) <= minMarginTop + msgHeight / 2) {
                    return this.number - 1;
                } else {
                    for (let i = 1; i < this.number - 1; i++) {
                        if (z.strRemove(msgBox.style.marginTop) <= maxMarginTop - i * (lineHeight + msgHeight) + msgHeight / 2 && z.strRemove(msgBox.style.marginTop) >= maxMarginTop - (i + 1) * (lineHeight + msgHeight) + msgHeight / 2) {
                            return i;
                        }
                    }
                }
            };
            // 选项信息透明度移动更新
            const opacityMoveReSet = () => {
                // 获取当前所在位置的选项的编号
                const nowMoveCode = moveCodeGet();
                const needNumber = Math.floor((e.number - 1) / 2) + 1;
                let min = nowMoveCode - needNumber;
                min < 0 ? min = 0 : 0;
                let max = nowMoveCode + needNumber;
                max > this.number - 1 ? max = this.number - 1 : 0;
                const moveTimes = +(-(z.strRemove(msgBox.style.marginTop) - (maxMarginTop - nowMoveCode * (e.line.height + msgHeight))) / (e.line.height + msgHeight)).toFixed(2);
                for (let i = min; i <= max; i++) {
                    msg[i].style.opacity = (e.opacity.max - ((e.opacity.max - e.opacity.min) / Math.floor((e.number - 1) / 2)) * (Math.abs(i - (nowMoveCode + moveTimes)))).toFixed(2);
                }
            };
            // 样式修正定时器
            let timer;
            // 刚刚移动的距离
            let lastY;
            // 现在移动的距离
            let nowY;
            // 开始事件
            const start = (event) => {
                event.preventDefault();
                clearInterval(timer);
                nowY = !event.touches ? event.clientY : event.touches[0].clientY;
                w.focus();
            };
            // 移动事件
            const move = (event) => {
                event.preventDefault();
                if (nowY != null) {
                    lastY = nowY;
                    if (!event.touches) {
                        nowY = event.clientY;
                    } else {
                        nowY = event.touches[0].clientY;
                        if (outFunction(event)) {
                            return;
                        }
                    }
                    const setMargin = z.strRemove(msgBox.style.marginTop) + ((nowY - lastY) / w.innerHeight) * 100;
                    if (setMargin > maxMarginTop) {
                        msgBox.style.marginTop = maxMarginTop + 'vh';
                    } else if (setMargin < minMarginTop) {
                        msgBox.style.marginTop = minMarginTop + 'vh';
                    } else {
                        msgBox.style.marginTop = setMargin + 'vh';
                    }
                    e.opacity.change ? opacityMoveReSet() : 0;
                    const nowMoveCode = moveCodeGet();
                    moveCode == nowMoveCode ? 0 : (() => {
                        audioPlay();
                        moveCode = nowMoveCode;
                    })();
                }
            };
            // 结束事件
            end = () => {
                if (nowY != null) {
                    nowY = null;
                    timer = setInterval(msgBoxReSet, 5);
                }
            };
            // 创建容器
            container = z.addElementByArray([
                'main',
                'style', [
                    'width', '100%',
                    'height', '100%'
                ],
                'function', [
                    'touchstart', start,
                    'touchmove', move,
                    'touchend', end,
                    'mousedown', start,
                    'mousemove', move,
                    'mouseup', end
                ]
            ], container);
            // 选项信息高度
            msgHeight = (100 - (e.number - 1) * e.line.height) / e.number;
            // 最大marginTop
            maxMarginTop = msgHeight * parseInt(e.number / 2) + e.line.height * (parseInt(e.number / 2) - 1);
            // 最小marginTop
            minMarginTop = maxMarginTop - (this.number - 1) * (e.line.height + msgHeight);
            // 选择线
            for (let i = 0; i < 2; i++) {
                z.addElementByArray([
                    'div',
                    'style', [
                        'position', 'fixed',
                        'z-index', -1,
                        'top', maxMarginTop + (msgHeight + e.line.height) * i + 'vh',
                        'left', 0,
                        'margin', '',
                        'width', '100%',
                        'height', e.line.height + '%',
                        'background', e.line.background
                    ]
                ], container);
            }
            // 选项信息容器
            msgBox = z.addElementByArray([
                'div',
                'style', [
                    'display', 'inline-block',
                    'margin-top', maxMarginTop + 'vh',
                    'width', '100%'
                ]
            ], container);
            // 选项信息透明度更新
            opacityReSet = (code) => {
                const needNumber = Math.floor((e.number - 1) / 2) + 1;
                let min = code - needNumber;
                min < 0 ? min = 0 : 0;
                let max = code + needNumber;
                max > this.number - 1 ? max = this.number - 1 : 0;
                for (let i = min; i <= max; i++) {
                    msg[i].style.opacity = (e.opacity.max - ((e.opacity.max - e.opacity.min) / Math.floor((e.number - 1) / 2)) * Math.abs(i - code)).toFixed(2);
                }
            };
            // 选项信息容器重设已经选择选项更新
            const msgBoxReSet = () => {
                // 用于计算的选择线高度
                const lineHeight = e.line.height;
                // 一次移动的距离
                const marginMove = (lineHeight + msgHeight) / 50;
                // 需要的选项的编号
                const needCode = moveCodeGet();
                if (needCode == 0) {
                    if (z.strRemove(msgBox.style.marginTop) + marginMove >= maxMarginTop) {
                        this.code = 0;
                        clearInterval(timer);
                    } else {
                        msgBox.style.marginTop = z.strRemove(msgBox.style.marginTop) + marginMove + 'vh';
                        opacityMoveReSet();
                    }
                } else if (needCode == this.number - 1) {
                    if (z.strRemove(msgBox.style.marginTop) - marginMove <= minMarginTop) {
                        this.code = needCode;
                        clearInterval(timer);
                    } else {
                        msgBox.style.marginTop = z.strRemove(msgBox.style.marginTop) - marginMove + 'vh';
                        opacityMoveReSet();
                    }
                } else {
                    if (z.strRemove(msgBox.style.marginTop) >= maxMarginTop - needCode * (lineHeight + msgHeight)) {
                        if (z.strRemove(msgBox.style.marginTop) - marginMove <= maxMarginTop - needCode * (lineHeight + msgHeight)) {
                            this.code = needCode;
                            clearInterval(timer);
                        } else {
                            msgBox.style.marginTop = z.strRemove(msgBox.style.marginTop) - marginMove + 'vh';
                            opacityMoveReSet();
                        }
                    } else {
                        if (z.strRemove(msgBox.style.marginTop) + marginMove >= maxMarginTop - needCode * (lineHeight + msgHeight)) {
                            this.code = needCode;
                            clearInterval(timer);
                        } else {
                            msgBox.style.marginTop = z.strRemove(msgBox.style.marginTop) + marginMove + 'vh';
                            opacityMoveReSet();
                        }
                    }
                }
            };
            // 刚刚移动的距离
            let lastX;
            // 现在移动的距离
            let nowX;
            // 滚动开始事件
            const scrollStart = (event) => {
                nowX = !event.touches ? event.clientX : event.touches[0].clientX;
            };
            // 滚动进行事件
            const scrollMove = (event) => {
                if (nowX != null) {
                    lastX = nowX;
                    if (!event.touches) {
                        nowX = event.clientX;
                    } else {
                        nowX = event.touches[0].clientX;
                        if (outFunction(event)) {
                            return;
                        }
                    }
                    event.target.scrollLeft -= nowX - lastX;
                }
            };
            // 滚动结束事件
            const scrollend = () => {
                if (nowX != null) {
                    nowX = null;
                }
            };
            // 增加选项信息
            addMsg = (code) => {
                return z.addElementByArray([
                    'div',
                    'innerHTML', getFullValue(code),
                    'style',[
                        'margin-top', e.line.height + 'vh',
                        'width', '100%',
                        'height', msgHeight + 'vh',
                        'color', e.font.color,
                        'white-space','nowrap',
                        'text-align', 'center',
                        'font-size', z.getFontSize(msgHeight / 2 * e.font.size),
                        'line-height', msgHeight + 'vh',
                        'overflow-x', 'auto'
                    ],
                    'function', [
                        'touchstart', scrollStart,
                        'touchmove', scrollMove,
                        'touchend', scrollend,
                        'mousedown', scrollStart,
                        'mousemove', scrollMove,
                        'mouseup', scrollend
                    ]
                ]);
            };
            // 选项信息
            for (let i in values) {
                msgBox.appendChild(msg[i] = addMsg(i));
            }
            msgBox.style.marginTop = maxMarginTop - code * (e.line.height + msgHeight) + 'vh';
            e.opacity.change ? opacityReSet(code) : 0;
        };
        if (navigator.userAgent.toUpperCase().includes('Firefox'.toUpperCase())) {
            container.addEventListener('load', () => {
                setTSelect();
            });
        } else {
            setTSelect();
        }
    }
    // 版本信息
    get version() {
        return '1.0.0';
    }
    // 作者信息
    get author() {
        return '2002-2003';
    }
}