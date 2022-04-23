// TSelect类
class TSelect {
    // 构造函数
    constructor(e) {
        // 检查容器是否存在
        if (e.container == null) {
            // 如果不存在则直接返回
            return;
        }
        // 创建一个新的e
        const getNewE = () => {
            // 对原有的e进行简单的复制
            e = {...e};
            // 检查values属性是否存在 如果不存在则将其设为空数组
            e.values == null ? e.values = [] : (() => {
                // 如果存在则检查values属性是否是数组 如果是数组则进行复制
                Array.isArray(e.values) ? e.values = [...e.values] : 0;
            })();
            // 检查prefix属性是否存在 如果不存在则将其设为空字符串 如果存在则需保证是字符串
            e.prefix = e.prefix == null ? '' : String(e.prefix);
            // 检查suffix属性是否存在 如果不存在则将其设为空字符串 如果存在则需保证是字符串
            e.suffix = e.suffix == null ? '' : String(e.suffix);
            // 检查number属性是否存在 如果不存在则将其设为5
            e.number == null ? e.number = 5 : (() => {
                // 如果存在则需保证是数值类型并且是整数 如果不是则将其设为5
                typeof (e.number = parseInt(e.number)) == 'number' && !isNaN(e.number) ? (() => {
                    // 如果是则需保证其不小于1
                    e.number < 1 ? e.number = 1 : (() => {
                        // 如果不小于1则需保证其不大于15
                        e.number > 15 ? e.number = 15 : 0;
                    })();
                })() : e.number = 5;
            })();
            // 检查background属性是否存在 如果不存在则将其设为'#FFFFFF' 如果存在则需保证是字符串
            e.background = e.background == null ? '#FFFFFF' : String(e.background);
            // 检查font属性是否存在 如果不存在则将其设为空对象 如果存在则进行复制
            e.font == null ? e.font = {} : e.font = {...e.font};
            // 检查font属性是否存在size属性 如果不存在则将其设为1
            e.font.size == null ? e.font.size = 1 : (() => {
                // 如果存在则需保证是数值类型 如果不是则将其设为1
                typeof (e.font.size = parseFloat(e.font.size)) == 'number' && !isNaN(e.font.size) ? (() => {
                    // 如果是则需保证其不小于0.3
                    e.font.size < 0.3 ? e.font.size = 0.3 : (() => {
                        // 如果不小于0.3则需保证其不大于1.25
                        e.font.size > 1.25 ? e.font.size = 1.25 : 0;
                    })();
                })() : e.font.size = 1;
            })();
            // 检查font属性是否存在color属性 如果不存在则将其设为'#807F7F' 如果存在则需保证是字符串
            e.font.color = e.font.color == null ? '#807F7F' : String(e.font.color);
            // 检查font属性是否存在opacityChange属性 如果不存在则将其设为true 如果存在则需保证其是布尔类型
            e.font.opacityChange = e.font.opacityChange == null ? true : !!e.font.opacityChange;
            // 检查line属性是否存在 如果不存在则将其设为空对象
            e.line == null ? e.line = {} : e.line = {...e.line};
            // 检查line属性是否存在height属性 如果不存在则将其设为1
            e.line.height == null ? e.line.height = 1 : (() => {
                // 如果存在则需保证是数值类型 如果不是则将其设为1
                typeof (e.line.height = parseFloat(e.line.height)) == 'number' && !isNaN(e.line.height) ? (() => {
                    // 如果是则需保证其不小于0.5
                    e.line.height < 0.5 ? e.line.height = 0.5 : (() => {
                        // 如果不小于0.5则需保证其不大于1.25
                        e.line.height > 1.25 ? e.line.height = 1.25 : 0;
                    })();
                })() : e.line.height = 1;
            })();
            // 检查line属性是否存在background属性 如果不存在则将其设为'#EEEEEE' 如果存在则需保证是字符串
            e.line.background = e.line.background == null ? '#EEEEEE' : String(e.line.background);
            // 检查valueChangeFunction属性是否存在 如果不存在则将其设为空函数 如果存在则进行复制
            e.valueChangeFunction = e.valueChangeFunction == null ? () => {} : eval(`(${e.valueChangeFunction})`);
            return e;
        };
        // 获取一个新的e
        e = getNewE();
        // 当前选择选项的编号
        let code = 0;
        // 选项值
        const values = {};
        // 前缀
        let prefix = e.prefix;
        // 后缀
        let suffix = e.suffix;
        // 刚刚选中的选项值
        let lastValue;
        // 选项改变的方向
        let direction = 1;
        // 选项信息容器
        let msgBox;
        // 选项信息
        const msg = [];
        // 选项信息高度
        let msgHeight;
        // 最大marginTop
        let maxMarginTop;
        // 最小marginTop
        let minMarginTop;
        // 增加选项信息
        let addMsg;
        // 值更改时执行的函数
        let valueChangeFunction = e.valueChangeFunction;
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
                    sPrefix != prefix ? (prefix = String(sPrefix) || 1) && (() => {
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
                    sSuffix != suffix ? (suffix = String(sSuffix) || 1) && (() => {
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
                        e.font.opacityChange ? msgBoxOpacityReSet(this.code) : 0;
                        this._changeCheck();
                    }
                }
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
        if (Array.isArray(e.values)) {
            // 如果是数组则进行遍历
            for (const i in e.values) {
                // 将选项存入values变量并保证唯一
                this.checkValue(e.values[i]) < 0 ? values[this.number] = String(e.values[i]) : 0;
            }
        } else {

        }
        // 将lastValue的值初始化为第一个选项的值
        lastValue = values[0];
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
        let end;
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
        // 选项信息透明度更新
        let msgBoxOpacityReSet;
        // 获取窗口并更新容器
        const w = container = container.contentWindow;
        // 给窗口绑定移出判断事件
        w.addEventListener('mouseout', outFunction);
        // 给窗口绑定按键事件
        w.addEventListener('keydown', (event) => {
            if (['w', 'a', '8', '4', '-', 'ArrowUp', 'ArrowLeft'].includes(event.key)) {
                this.code--;
            } else if (['s', 'd', '2', '6', '+', 'ArrowDown', 'ArrowRight'].includes(event.key)) {
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
            // 获取系统设置导致字体放大的倍数
            z.getFontTimes(container);
            // 设置字体大小单位
            z.setFontSuffix('vh');
            // 刚才所在位置的选项的编号
            let moveCode = 0;
            // 获取当前所在位置的选项的编号
            const msgCodeGet = () => {
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
            const msgBoxOpacityMoveReSet = () => {
                // 获取当前所在位置的选项的编号
                const nowMoveCode = msgCodeGet();
                const needNumber = Math.floor((e.number - 1) / 2) + 1;
                let min = nowMoveCode - needNumber;
                min < 0 ? min = 0 : 0;
                let max = nowMoveCode + needNumber;
                max > this.number - 1 ? max = this.number - 1 : 0;
                const moveTimes = +(-(z.strRemove(msgBox.style.marginTop) - (maxMarginTop - nowMoveCode * (e.line.height + msgHeight))) / (e.line.height + msgHeight)).toFixed(2);
                for (let i = min; i <= max; i++) {
                    msg[i].style.opacity = (1 - (0.5 / Math.floor((e.number - 1) / 2)) * (Math.abs(i - (nowMoveCode + moveTimes)))).toFixed(2);
                }
            };
            // 用于播放音效
            const music = [];
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
                    msgBoxOpacityMoveReSet();
                    const nowMoveCode = msgCodeGet();
                    moveCode == nowMoveCode ? 0 : (() => {
                        let needMusic;
                        const createMusic = () => {
                            needMusic = new Audio;
                            needMusic.src = 'TSelect.mp3';
                            music.push(needMusic);
                        };
                        if (music.length > 0){
                            needMusic = null;
                            for (let i in music) {
                                if (music[i].paused) {
                                    needMusic = music[i];
                                    break;
                                }
                            }
                            needMusic == null ? createMusic() : 0;
                        } else {
                            createMusic();
                        }
                        needMusic.play();
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
            msgBoxOpacityReSet = (code) => {
                const needNumber = Math.floor((e.number - 1) / 2) + 1;
                let min = code - needNumber;
                min < 0 ? min = 0 : 0;
                let max = code + needNumber;
                max > this.number - 1 ? max = this.number - 1 : 0;
                for (let i = min; i <= max; i++) {
                    msg[i].style.opacity = (1 - (0.5 / Math.floor((e.number - 1) / 2)) * Math.abs(i - code)).toFixed(2);
                }
            };
            // 选项信息容器重设已经选择选项更新
            const msgBoxReSet = () => {
                // 用于计算的选择线高度
                const lineHeight = e.line.height;
                // 一次移动的距离
                const marginMove = (lineHeight + msgHeight) / 50;
                // 需要的选项的编号
                const needCode = msgCodeGet();
                if (needCode == 0) {
                    if (z.strRemove(msgBox.style.marginTop) + marginMove >= maxMarginTop) {
                        this.code = 0;
                        clearInterval(timer);
                    } else {
                        msgBox.style.marginTop = z.strRemove(msgBox.style.marginTop) + marginMove + 'vh';
                        msgBoxOpacityMoveReSet();
                    }
                } else if (needCode == this.number - 1) {
                    if (z.strRemove(msgBox.style.marginTop) - marginMove <= minMarginTop) {
                        this.code = needCode;
                        clearInterval(timer);
                    } else {
                        msgBox.style.marginTop = z.strRemove(msgBox.style.marginTop) - marginMove + 'vh';
                        msgBoxOpacityMoveReSet();
                    }
                } else {
                    if (z.strRemove(msgBox.style.marginTop) >= maxMarginTop - needCode * (lineHeight + msgHeight)) {
                        if (z.strRemove(msgBox.style.marginTop) - marginMove <= maxMarginTop - needCode * (lineHeight + msgHeight)) {
                            this.code = needCode;
                            clearInterval(timer);
                        } else {
                            msgBox.style.marginTop = z.strRemove(msgBox.style.marginTop) - marginMove + 'vh';
                        }
                    } else {
                        if (z.strRemove(msgBox.style.marginTop) + marginMove >= maxMarginTop - needCode * (lineHeight + msgHeight)) {
                            this.code = needCode;
                            clearInterval(timer);
                        } else {
                            msgBox.style.marginTop = z.strRemove(msgBox.style.marginTop) + marginMove + 'vh';
                            msgBoxOpacityMoveReSet();
                        }
                    }
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
                        'text-align', 'center',
                        'font-size', z.getFontSize(msgHeight / 2 * e.font.size),
                        'line-height', msgHeight + 'vh'
                    ]
                ]);
            };
            // 选项信息
            for (let i in values) {
                msgBox.appendChild(msg[i] = addMsg(i));
            }
            e.font.opacityChange ? msgBoxOpacityReSet(code) : 0;
        }
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
        return 'zdj0123';
    }
}