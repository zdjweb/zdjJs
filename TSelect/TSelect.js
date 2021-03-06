
class TSelect {
    
    constructor(e) {
        
        const getNewE = () => {
            
            if (e.type == 'complex') {

                // 验证values属性 默认值为[] 复制内容 保证其内容为对象
                e.values = e.values == null ? [] : (Array.isArray(e.values) ? (() => {
                    
                    // 验证属性
                    const checkAttribute = (parent, child, attribute) => {
                        child[attribute] == null ? child[attribute] = parent[attribute] : 0;
                    };
                    for (let i in e.values) {
                        e.values != null && typeof e.values[i] == 'object' && !Array.isArray(e.values[i]) ? (() => {
                            
                            
                            
                            // 验证font属性
                            checkAttribute(e, values[i], 'font');
                            // 验证font属性的size属性
                            checkAttribute(e.font, values[i].font, 'size');
                            // 验证font属性的color属性
                            checkAttribute(e.font, values[i].font, 'color');
                            // 验证opacity属性
                            checkAttribute(e, values[i], 'opacity');
                            // 验证opacity属性的change属性
                            checkAttribute(e.opacity, values[i].opacity, 'change');
                            // 验证opacity属性的max属性
                            checkAttribute(e.opacity, values[i].opacity, 'max');
                            // 验证opacity属性的min属性
                            checkAttribute(e.opacity, values[i].opacity, 'min');
                            // 验证line属性
                            checkAttribute(e, values[i], 'line');
                            // 验证line属性的height属性
                            checkAttribute(e.line, values[i].line, 'height');
                            // 验证line属性的color属性
                            checkAttribute(e.line, values[i].line, 'color');
                        })() : 0;
                    }
                    return values;
                })() : []);
                // 验证width属性
                e.width = reSetValue(e.width, 0, 100, 100);
                const width = [];
                for (let i in e.values) {
                    width.push(reSetValue(e.values[i].width, 0, 100, 100 / e.values.length));
                }
                let totalWidth = 0;
                for (const i in width) {
                    totalWidth += width[i];
                }
                totalWidth != e.width ? (() => {
                    let setWidth = 0;
                    for (const i in width) {
                        i < width.length - 1 ? setWidth += width[i] = width[i] / totalWidth * e.width : (() => {
                            width[i] = e.width - setWidth;
                        })();
                    }
                })() : 0;
                for (const i in width) {
                    e.values[i].width = width[i];
                }
            }
        };
        


        // TSelect页面的body
        let body;
        // 显示的选项个数
        let number = e.number;
        // 背景颜色
        let background = e.background;
        // 选择线高度 选择线颜色
        let lineHeight = e.line.height, lineColor = e.line.color;
        // 选项值
        const values = {};
        // 前缀 后缀
        let prefix = e.prefix, suffix = e.suffix;
        // 当前选择的选项的编号 刚刚选择的选项的编号 当前所在位置的选项的编号
        let code = e.default, lastCode = code, moveCode = code;
        // 选项改变的方向
        let direction = 0;
        // 选项容器 选项 选择线
        let msgBox, msg = [], line = [];
        // 选项信息高度 最大marginTop 最小marginTop
        let msgHeight, maxMarginTop, minMarginTop;
        // 获取选项部分相关样式
        const getStyle = () => {
            // 选项信息高度
            msgHeight = (100 - (number - 1) * lineHeight) / number;
            // 最大marginTop
            maxMarginTop = msgHeight * parseInt(number / 2) + lineHeight * (parseInt(number / 2) - 1);
            // 最小marginTop
            minMarginTop = maxMarginTop - (this.number - 1) * (lineHeight + msgHeight);
        };
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
            // TSelect类型
            type: {
                get: () => e.type
            },
            // 显示的选项个数
            showNumber: {
                get: () => number,
                set(sNumber) {
                    (sNumber = parseInt(reSetValue(sNumber, 1, 15, 5))) != number ? (() => {
                        getStyle(number = sNumber);
                        for (const i in msg) {
                            Object.assign(msg[i].style, {
                                height: msgHeight + 'vh',
                                fontSize: z.getFontSize(msgHeight / 2 * e.font.size),
                                lineHeight: msgHeight + 'vh'
                            });
                        }
                        for (const i in line) {
                            line[i].style.top = maxMarginTop + (msgHeight + lineHeight) * i + 'vh';
                        }
                        msgBox.style.marginTop = maxMarginTop - code * (lineHeight + msgHeight) + 'vh';
                        e.opacity.change ? opacityReSet(code) : 0;
                    })() : 0;
                }
            },
            // 背景颜色
            background: {
                get: () => background,
                set(sBackground) {
                    body.style.background = background = sBackground;
                }
            },
            // 选择线高度
            lineHeight: {
                get: () => lineHeight,
                set(sLineHeight) {
                    (sLineHeight = reSetValue(sLineHeight, 0.5, 1.25, 1)) != lineHeight ? (() => {
                        getStyle(lineHeight = sLineHeight);
                        for (let i in line) {
                            Object.assign(line[i].style, {
                                top: maxMarginTop + (msgHeight + lineHeight) * i + 'vh',
                                height: lineHeight + '%'
                            });
                        }
                        for (let i in msg) {
                            Object.assign(msg[i].style, {
                                marginTop: lineHeight + 'vh',
                                height: msgHeight + 'vh',
                                fontSize: z.getFontSize(msgHeight / 2 * e.font.size),
                                lineHeight: msgHeight + 'vh'
                            });
                            msg[i].style.marginTop = lineHeight + 'vh';
                        }
                        msgBox.style.marginTop = maxMarginTop - code * (lineHeight + msgHeight) + 'vh';
                    })() : 0;
                }
            },
            // 选择线颜色
            lineColor: {
                get: () => lineColor,
                set(sLineColor) {
                    for (const i in line) {
                        line[i].style.background = sLineColor;
                    }
                }
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
            // 当前选择的选项的编号
            code: {
                get: () => code,
                set(sCode) {
                    if (sCode >= 0 && sCode < this.number || sCode == 0) {
                        lastCode = code;
                        msgBox.style.marginTop = maxMarginTop - (code = sCode) * (lineHeight + msgHeight) + 'vh';
                        direction = lastCode < code ? 1 : (lastCode > code ? -1 : 0);
                        code != moveCode ? audioPlay() : 0;
                        moveCode = code;
                        e.opacity.change ? opacityReSet(code) : 0;
                        this._changeCheck();
                    }
                }
            },
            // 刚刚选择的选项的编号
            lastCode: {
                get: () => lastCode
            },
            // 所在位置的选项的编号
            moveCode: {
                get: () => moveCode
            },
            // 当前选择的选项的值
            value: {
                get: () => values[code],
                set(value) {
                    for (const i in values) {
                        values[i] == String(value) ? this.code = i : 0;
                    }
                }
            },
            // 当前选择的选项的完整值
            fullValue: {
                get: () => this.isEmpty ? undefined : getFullValue(code)
            },
            // 刚刚选择的选项的值
            lastValue: {
                get: () => lastCode == null ? undefined : values[lastCode]
            },
            // 刚刚选择的选项的完整值
            lastFullValue: {
                get: () => this.isEmpty ? undefined : getFullValue(lastCode)
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
                get: () => () => code == lastCode ? 0 : (() => {
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
                            minMarginTop = maxMarginTop - (this.number - 1) * (lineHeight + msgHeight);
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
                        minMarginTop = maxMarginTop - (this.number - 1) * (lineHeight + msgHeight);
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
        // 设置容器的样式
        Object.assign(e.container.style, {
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        });
        // 创建一个zdjJs对象
        const z = new zdjJs;
        // 创建容器
        let container = z.addElementByArray([
            'iframe',
            'style', [
                'vertical-align', 'top',
                'height', '100%',
                'border', 'none'
            ]
        ], e.container), iframe = container;
        // 修正width
        const setWidth = () => {
            iframe.style.width = (e.width / 100 * e.container.offsetWidth).toFixed(0) + 'px';
            const width = [], children = [];
            let setWidth = 0;
            for (let i in e.container.children) {
                const child = e.container.children[i];
                if (child.nodeType == 1 && child.nodeName.toLowerCase() != 'script') {
                    setWidth += Math.round(child.offsetWidth);
                    width.push(Math.round(child.offsetWidth));
                    children.push(child);
                }
            }
            setWidth > e.container.offsetWidth ? width[width.length - 1] = e.container.offsetWidth - (setWidth -= width[width.length - 1]) : 0;
            for (let i in children) {
                children[i].style.width = width[i] + 'px';
            }
        };
        setWidth();
        // 给窗口绑定大小改变事件
        window.addEventListener('resize', () => {
            setWidth();
        });
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
            Object.assign((body = container = container.document.body).style, {
                margin: 0,
                padding: 0,
                width: '100vw',
                height: '100vh',
                background: background,
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
                const needNumber = Math.floor((number - 1) / 2) + 1;
                let min = nowMoveCode - needNumber;
                min < 0 ? min = 0 : 0;
                let max = nowMoveCode + needNumber;
                max > this.number - 1 ? max = this.number - 1 : 0;
                const moveTimes = +(-(z.strRemove(msgBox.style.marginTop) - (maxMarginTop - nowMoveCode * (lineHeight + msgHeight))) / (lineHeight + msgHeight)).toFixed(2);
                for (let i = min; i <= max; i++) {
                    msg[i].style.opacity = (e.opacity.max - ((e.opacity.max - e.opacity.min) / Math.floor((number - 1) / 2)) * (Math.abs(i - (nowMoveCode + moveTimes)))).toFixed(2);
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
                    'margin', '0 2.5%',
                    'width', '95%',
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
            getStyle();
            // 选择线
            for (let i = 0; i < 2; i++) {
                line[i] = z.addElementByArray([
                    'div',
                    'style', [
                        'position', 'fixed',
                        'z-index', -1,
                        'top', maxMarginTop + (msgHeight + lineHeight) * i + 'vh',
                        'left', 0,
                        'margin', '',
                        'width', '100%',
                        'height', lineHeight + '%',
                        'background', lineColor
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
                const needNumber = Math.floor((number - 1) / 2) + 1;
                let min = code - needNumber;
                min < 0 ? min = 0 : 0;
                let max = code + needNumber;
                max > this.number - 1 ? max = this.number - 1 : 0;
                for (let i = min; i <= max; i++) {
                    msg[i].style.opacity = (e.opacity.max - ((e.opacity.max - e.opacity.min) / Math.floor((number - 1) / 2)) * Math.abs(i - code)).toFixed(2);
                }
            };
            // 选项信息容器重设已经选择选项更新
            const msgBoxReSet = () => {
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
                        'margin-top', lineHeight + 'vh',
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
            msgBox.style.marginTop = maxMarginTop - code * (lineHeight + msgHeight) + 'vh';
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

}