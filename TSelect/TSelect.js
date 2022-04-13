//TSelect类
class TSelect {
    constructor(e) {
        // 检查容器是否存在
        if (e.container == null) {
            return;
        }
        const getNewE = () => {
            const newE = {...e};
            newE.values == null ? newE.values = [] : 0;
            Array.isArray(newE.values) ? newE.values = [...newE.values] : 0;
            newE.suffix == null ? newE.suffix = '' : 0;
            newE.number == null ? newE.number = 5 : 0;
            newE.background == null ? newE.background = '#FFFFFF' : 0;
            newE.font == null ? newE.font = {} : 0;
            newE.font = {...e.font};
            newE.font.size == null ? newE.font.size = 1 : 0;
            newE.font.color == null ? newE.font.color = '#807F7F' : 0;
            newE.font.line == null ? newE.font.line = {} : 0;
            newE.line = {...e.line};
            newE.line.height == null ? newE.line.height = 1 : 0;
            newE.line.background == null ? newE.line.background = '#EEEEEE' : 0;
            newE.valueChangeFunction == null ? newE.valueChangeFunction = () => {} : 0;
            newE.valueChangeFunction = eval(`(${newE.valueChangeFunction.toString()})`);
            return newE;
        };
        e = getNewE();
        //当前选择选项的编号
        let code = 0;
        //选项值
        const values = {};
        //刚刚选中的选项值
        let lastValue;
        //选项改变的方向
        let direction = 1;
        //选项信息容器
        let msgBox;
        //选项信息
        const msg = [];
        //选项信息高度
        let msgHeight;
        //最大marginTop
        let maxMarginTop;
        //最小marginTop
        let minMarginTop;
        //增加选项信息
        let addMsg;
        //值更改时执行的函数
        let valueChangeFunction = e.valueChangeFunction;
        Object.defineProperties(this, {
            //设置信息
            set: {
                get: () => getNewE()
            },
            //选项
            values: {
                get: () => values
            },
            //选项数量
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
            //当前选择选项的编号
            code: {
                get: () => code,
                set(sCode) {
                    if (sCode >= 0 && sCode < this.number || sCode == 0) {
                        msgBox.style.marginTop = maxMarginTop - (code = sCode) * (e.line.height + msgHeight) + 'vh';
                        this._changeCheck(values[code]);
                    }
                }
            },
            //当前选择选项的值
            value: {
                get: () => values[code],
                set(value) {
                    for (const i in values) {
                        values[i] == String(value) ? this.code = i : 0;
                    }
                }
            },
            //当前选择选项的完整值
            fullValue: {
                get: () => this.value + e.suffix
            },
            //刚刚选中的选项值
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
            //选项改变的方向
            direction: {
                get: () => direction
            },
            //选项信息容器
            _msgBox: {
                get: () => msgBox
            },
            //选项信息
            _msg: {
                get: () => msg
            },
            //选项信息高度
            _msgHeight: {
                get: () => msgHeight
            },
            //最大marginTop
            _maxMarginTop: {
                get: () => maxMarginTop,
                set(sMaxMarginTop) {
                    maxMarginTop = sMaxMarginTop;
                }
            },
            //最小marginTop
            _minMarginTop: {
                get: () => minMarginTop,
                set(sMinMarginTop) {
                    minMarginTop = sMinMarginTop;
                }
            },
            //增加选项信息
            _addMsg: {
                get: () => eval(addMsg.toString())
            },
            //值更改时执行的函数
            _valueChangeFunction: {
                get: () => eval(`(${valueChangeFunction.toString()})`),
                set(Function) {
                    valueChangeFunction = eval(`(${Function.toString()})`);
                }
            },
        });
        //获取、修正选项值
        if (Array.isArray(e.values)) {
            for (const i in e.values) {
                this.checkValue(e.values[i]) < 0 ? values[this.number] = String(e.values[i]) : 0;
            }
        } else {

        }
        lastValue = values[0];
        //创建zdjJs对象
        const z = new zdjJs;
        //创建容器
        let container = z.addElementByArray([
            'iframe',
            'style',[
                'width','100%',
                'height','100%',
                'border',0
            ]
        ], e.container);
        //结束事件
        let end;
        //移出事件
        const outFunction = (event) => {
            if (!event.touches){
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
        //获取窗口
        const w = container.contentWindow;
        w.addEventListener('mouseout', outFunction);
        w.addEventListener('keydown', (event) => {
            if (['w', 'a', '8', '4', '-', 'ArrowUp', 'ArrowLeft'].includes(event.key)) {
                this.code--;
            } else if (['s', 'd', '2', '6', '+', 'ArrowDown', 'ArrowRight'].includes(event.key)) {
                this.code++;
            }
        });
        //更新容器
        container = w;
        //设置TSelect主要部分
        const setTSelect = () => {
            //更新容器
            container = container.document.body;
            //设置容器样式
            Object.assign(container.style, {
                margin: 0,
                padding: 0,
                width: '100vw',
                height: '100vh',
                background: e.background,
                fontSize: 0,
                overflow: 'hidden'
            });
            //获取系统设置导致字体放大的倍数
            z.getFontTimes(container);
            //设置字体大小单位
            z.setFontSuffix('vh');
            //样式修正定时器
            let timer;
            //刚刚移动的距离
            let lastY;
            //现在移动的距离
            let nowY;
            //开始事件
            const start = (event) => {
                event.preventDefault();
                clearInterval(timer);
                nowY = !event.touches ? event.clientY : event.touches[0].clientY;
                w.focus();
            };
            //移动事件
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
                }
            };
            end = () => {
                if (nowY != null) {
                    nowY = null;
                    timer = setInterval(msgBoxReSet, 5);
                }
            };
            //创建容器
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
            //选项信息高度
            msgHeight = (100 - (e.number - 1) * e.line.height) / e.number;
            //最大marginTop
            maxMarginTop = msgHeight * parseInt(e.number / 2) + e.line.height * (parseInt(e.number / 2) - 1);
            //最小marginTop
            minMarginTop = maxMarginTop - (this.number - 1) * (e.line.height + msgHeight);
            //选择线
            for (let i = 0; i < 2; i++) {
                z.addElementByArray([
                    'div',
                    'style',[
                        'position','fixed',
                        'z-index',-1,
                        'top',maxMarginTop + (msgHeight + e.line.height) * i + 'vh',
                        'left',0,
                        'margin','',
                        'width','100%',
                        'height',e.line.height + '%',
                        'background',e.line.background
                    ]
                ], container);
            }
            //选项信息容器
            msgBox = z.addElementByArray([
                'div',
                'style',[
                    'display','inline-block',
                    'margin-top',maxMarginTop + 'vh',
                    'width','100%'
                ]
            ], container);
            const msgBoxReSet = () => {
                //用于计算的选择线高度
                const lineHeight = e.line.height;
                //一次移动的距离
                const marginMove = (lineHeight + msgHeight) / 50;
                if (z.strRemove(msgBox.style.marginTop) >= maxMarginTop - (lineHeight + msgHeight / 2)) {
                    if (z.strRemove(msgBox.style.marginTop) + marginMove >= maxMarginTop) {
                        this.code = 0;
                        clearInterval(timer);
                    } else {
                        msgBox.style.marginTop = z.strRemove(msgBox.style.marginTop) + marginMove + 'vh';
                    }
                } else if (z.strRemove(msgBox.style.marginTop) <= minMarginTop + msgHeight / 2) {
                    if (z.strRemove(msgBox.style.marginTop) - marginMove <= minMarginTop) {
                        this.code = this.number - 1;
                        clearInterval(timer);
                    } else {
                        msgBox.style.marginTop = z.strRemove(msgBox.style.marginTop) - marginMove + 'vh';
                    }
                } else {
                    for (let i = 1;i < this.number - 1;i++) {
                        if (z.strRemove(msgBox.style.marginTop) <= maxMarginTop - i * (lineHeight + msgHeight) + msgHeight / 2 && z.strRemove(msgBox.style.marginTop) >= maxMarginTop - (i + 1) * (lineHeight + msgHeight) + msgHeight / 2) {
                            if (z.strRemove(msgBox.style.marginTop) >= maxMarginTop - i * (lineHeight + msgHeight)) {
                                if (z.strRemove(msgBox.style.marginTop) - marginMove <= maxMarginTop - i * (lineHeight + msgHeight)) {
                                    this.code = i;
                                    clearInterval(timer);
                                    break;
                                } else {
                                    msgBox.style.marginTop = z.strRemove(msgBox.style.marginTop) - marginMove + 'vh';
                                }
                            } else {
                                if (z.strRemove(msgBox.style.marginTop) + marginMove >= maxMarginTop - i * (lineHeight + msgHeight)) {
                                    this.code = i;
                                    clearInterval(timer);
                                    break;
                                } else {
                                    msgBox.style.marginTop = z.strRemove(msgBox.style.marginTop) + marginMove + 'vh';
                                }
                            }
                        }
                    }
                }
            };
            //增加选项信息
            addMsg = (value) => {
                return z.addElementByArray([
                    'div',
                    'innerHTML',value + e.suffix,
                    'style',[
                        'margin-top',e.line.height + 'vh',
                        'width','100%',
                        'height',msgHeight + 'vh',
                        'color',e.font.color,
                        'text-align','center',
                        'font-size',z.getFontSize(msgHeight / 2 * e.font.size),
                        'line-height',msgHeight + 'vh'
                    ]
                ]);
            };
            //选项信息
            for (let i in values) {
                msgBox.appendChild(msg[i] = addMsg(values[i]));
            }
        }
        if (navigator.userAgent.toUpperCase().includes('Firefox'.toUpperCase())) {
            container.addEventListener('load', () => {
                setTSelect();
            });
        } else {
            setTSelect();
        }
    }
    //版本信息
    get version() {
        return '1.0.0';
    }
    //作者信息
    get author() {
        return 'zdj0123';
    }
    //检查是否为空
    get isEmpty() {
        return this.number == 0;
    }
    //检查选中的选项是否改变
    get _changeCheck() {
        return function() {
            !(this.value == this.lastValue) ? this._valueChangeFunction() : 0;
        };
    }
    //在指定位置增加选项
    get addValue() {
        return function(value,code) {
            if (this.checkValue((value = String(value))) < 0) {
                if (code >= 0 && code <= this.number) {
                    const newMsg = (this._addMsg)(value);
                    let i = this.number - 1;
                    while (i >= code) {
                        this.values[i + 1] = this.values[i--];
                    }
                    this.values[code] = value;
                    code < this.number - 1 ? this._msgBox.insertBefore(newMsg, this._msg[code]) : this._msgBox.appendChild(newMsg);
                    this._msg.splice(code, 0, newMsg);
                    this._minMarginTop = this._maxMarginTop - (this.number - 1) * (this.set.line.height + this._msgHeight);
                    code <= this.code ? this.code++ : 0;
                    this._msgBox.style.marginTop = this._msgBox.style.marginTop = this._maxMarginTop - this.code * (this.set.line.height + this._msgHeight) + 'vh';
                } else {
                    this.addValue(value, this.number);
                }
            }
        }
    }
    //删除指定选项
    get deleteValue() {
        return function(code) {
            if (code >= 0 && code < this.number) {
                this.values[code] = null;
                let i = code;
                while (i < this.number) {
                    this.values[i] = this.values[i++ + 1];
                }
                for (const i in this.values) {
                    this.values[i] == null ? delete this.values[i] : 0;
                }
                this._msgBox.removeChild(this._msg[code]);
                this._msg.splice(code,1);
                this._minMarginTop = this._maxMarginTop - (this.number - 1) * (this.set.line.height + this._msgHeight);
                this.code = this.isEmpty ? 0 : (this.code == this.number || this.code > code ? this.code-- : this.code);
            } else {
                this.number ? this.deleteValue(this.number - 1) : 0;
            }
        }
    }
    //清空所有选项
    get clearValues() {
        return function() {
            while (this.number) {
                this.deleteValue();
            }
        }
    }
    //修改指定选项
    get changeValue() {
        return function(code,value) {
            if (code >= 0 && code < this.number && this.checkValue(value) < 0) {
                this._msg[code].innerHTML = (this.values[code] = value) + this.set.suffix;
                this._changeCheck();
            }
        }
    }
    //检查选项是否存在
    get checkValue() {
        return function(value) {
            let result = -1;
            for (const i in this.values) {
                if (this.values[i] === String(value)) {
                    return Number(i);
                }
            }
            return result;
        }
    }
    //设置值更改时执行的函数
    get setValueChangeFunction() {
        return function(Function) {
            this._valueChangeFunction = Function;
        }
    }
}