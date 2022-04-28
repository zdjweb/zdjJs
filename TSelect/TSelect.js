// TSelect类
class TSelect {
    // 构造函数
    constructor(e) {
        // 检查容器是否存在 不存在则直接返回
        if (e.container == null) {
            return;
        }
        // 验证一个值是否符合条件 并返回符合条件的值
        const reSetValue = (value, min, max, def) => {
            return (value == null || isNaN(value) ? def : (value < min ? min : (value > max ? max : +value)));
        };
        // 创建一个新的e
        const getNewE = () => {
            // 对原有的e进行复制
            e = {...e};
            // 验证type属性 默认值为'simple'
            e.type = e.type == null ? 'simple' : (() => {
                return ['simple', 'complex', 'time', 'date'].includes(e.type) ? e.type : 'simple';
            })();
            // 验证font属性 默认值为{} 复制内容
            e.font = e.font == null ? {} : {...e.font};
            // 验证opacity属性 默认值为{} 复制内容
            e.opacity = e.opacity == null ? {} : {...e.opacity};
            // 验证line属性 默认值为{} 复制内容
            e.line = e.line == null ? {} : {...e.line};
            if (e.type == 'date') {
                Object.defineProperty(this, 'type', {
                    get: () => 'date'
                });
                // 验证values属性 默认值为当前时间生成的TSelect的Date模式 复制内容 保证其内容为对象
                e.values = (() => {
                    const values = [];
                    e.year = e.year == null ? {} : ((e.year.show == null ? true : e.year.show) ? {...e.year} : null);
                    e.month = e.month == null ? {} : ((e.month.show == null ? true : e.month.show) ? {...e.month} : null);
                    e.date = e.date == null ? {} : ((e.date.show == null ? true : e.date.show) ? {...e.date} : null);
                    // 用于获取当前时间的Date对象
                    const date = new Date;
                    // 验证year属性
                    e.year != null ? (() => {
                        // 验证start属性
                        e.year.start = e.year.start == null ? date.getFullYear() : reSetValue(e.year.start, 1970, 2100, date.getFullYear());
                        // 验证end属性
                        e.year.end == null ? e.year.end = date.getFullYear() : 0;
                        // 设置选项
                        e.year.values = [];
                        for (let i = e.year.start; i <= e.year.end; i++) {
                            e.year.values.push(i);
                        }
                        // 验证suffix属性
                        e.year.suffix == null ? e.year.suffix = '年' : 0;
                        // 验证default属性
                        e.year.default == null ? e.year.default = (e.year.values.includes(date.getFullYear()) ? e.year.values.indexOf(date.getFullYear()) : e.year.values.length - 1) : 0;
                        // 验证width属性
                        e.year.width = reSetValue(e.year.width, 0, 100, 40);
                        // 设置类型
                        e.year.type = 'year';
                        // 设置valueChangeFunction
                        e.year.valueChangeFunction = e.year.valueChangeFunction == null ? function() {
                            this.day != null ? (() => {
                                const number = new Date(this.value, this.month == null ? (new Date).getMonth() + 1 : this.month.value, 0).getDate();
                                this.day.code > number - 1 ? this.day.code = number - 1 : 0;
                                while (this.day.number > number) {
                                    this.day.deleteValue();
                                }
                                while (this.day.number < number) {
                                    this.day.addValue(+this.day.values[this.day.number - 1] + 1);
                                }
                            })() : 0;
                        } : eval(`(${e.year.valueChangeFunction})`);
                        values.push(e.year);
                    })() : 0;
                    e.month != null ? (() => {
                        // 设置选项
                        e.month.values = [];
                        for (let i = 1; i <= 12; i++) {
                            e.month.values.push(i);
                        }
                        // 验证suffix属性
                        e.month.suffix == null ? e.month.suffix = '月' : 0;
                        // 验证default属性
                        e.month.default == null ? e.month.default = date.getMonth() : 0;
                        // 验证width属性
                        e.month.width = reSetValue(e.month.width, 0, 100, 30);
                        // 设置类型
                        e.month.type = 'month';
                        // 设置valueChangeFunction
                        e.month.valueChangeFunction = e.month.valueChangeFunction == null ? function() {
                            this.day != null ? (() => {
                                const number = new Date(this.year == null ? (new Date).getFullYear() : this.year.value, this.value, 0).getDate();
                                this.day.code > number - 1 ? this.day.code = number - 1 : 0;
                                while (this.day.number > number) {
                                    this.day.deleteValue();
                                }
                                while (this.day.number < number) {
                                    this.day.addValue(+this.day.values[this.day.number - 1] + 1);
                                }
                            })() : 0;
                        } : eval(`(${e.month.valueChangeFunction})`);
                        values.push(e.month);
                    })() : 0;
                    e.date != null ? (() => {
                        // 设置选项
                        e.date.values = [];
                        for (let i = 1; i <= new Date(e.year != null ? e.year.values[e.year.default] : date.getFullYear(), (e.month != null ? e.month.default : date.getMonth()) + 1 , 0).getDate(); i++) {
                            e.date.values.push(i);
                        }
                        // 验证suffix属性
                        e.date.suffix == null ? e.date.suffix = '日' : 0;
                        // 验证default属性
                        e.date.default == null ? e.date.default = date.getDate() - 1 : 0;
                        e.date.width = reSetValue(e.date.width, 0, 100, 30);
                        // 设置类型
                        e.date.type = 'day';
                        values.push(e.date);
                    })() : 0;
                    return values;
                })();
                e.type = 'complex';
            } else if (e.type == 'time') {
                Object.defineProperty(this, 'type', {
                    get: () => 'time'
                });
                // 验证values属性 默认值为[] 复制内容 保证其内容为对象
                e.values = (() => {
                    const values = [];
                    e.hour = e.hour == null ? {} : ((e.hour.show == null ? true : e.hour.show) ? {...e.hour} : null);
                    e.minute = e.minute == null ? {} : ((e.minute.show == null ? true : e.minute.show) ? {...e.minute} : null);
                    // 用于获取当前时间的Date对象
                    const date = new Date;
                    // 验证hour属性
                    e.hour != null ? (() => {
                        // 设置选项
                        e.hour.values = [];
                        for (let i = 0; i < 24; i++) {
                            e.hour.values[i] = i < 10 ? '0' + i : i;
                        }
                        // 验证suffix属性
                        e.hour.suffix == null ? e.hour.suffix = '时' : 0;
                        // 验证default属性
                        e.hour.default == null ? e.hour.default = date.getHours() : 0;
                        // 验证width属性
                        e.hour.width = reSetValue(e.hour.width, 0, 100, 50);
                        values.push(e.hour);
                    })() : 0;
                    // 验证minute属性
                    e.minute != null ? (() => {
                        // 设置选项
                        e.minute.values = [];
                        for (let i = 0; i < 60; i++) {
                            e.minute.values[i] = i < 10 ? '0' + i : i;
                        }
                        // 验证suffix属性
                        e.minute.suffix == null ? e.minute.suffix = '分' : 0;
                        // 验证default属性
                        e.minute.default == null ? e.minute.default = date.getMinutes() : 0;
                        // 验证width属性
                        e.minute.width = reSetValue(e.minute.width, 0, 100, 50);
                        values.push(e.minute);
                    })() : 0;
                    return values;
                })();
                e.type = 'complex';
            }
            // 根据类型分别验证
            if (e.type == 'simple') {
                // 验证values属性 默认值为[] 复制内容 保证其内容为字符串且不重复
                const defaultValue = ['这是一个没有选项的TSelect实例', '请添加选项!'];
                e.values = e.values == null ? defaultValue : (Array.isArray(e.values) ? (() => {
                    const values = [];
                    for (let i in e.values) {
                        if (!values.includes(String(e.values[i]))) {
                            values.push(String(e.values[i]));
                        }
                    }
                    return values;
                })() : defaultValue);
                // 验证prefix属性 默认值为'' 保证其为字符串
                e.prefix = e.prefix == null ? '' : String(e.prefix);
                // 验证suffix属性 默认值为'' 保证其为字符串
                e.suffix = e.suffix == null ? '' : String(e.suffix);
                // 验证number属性 默认值为5 保证其不小于于1且不大于15
                e.number = parseInt(reSetValue(e.number, 1, 15, 5));
                // 验证width属性 默认值为100 保证其不小于0且不大于100
                e.width = reSetValue(e.width, 0, 100, 100);
                // 验证default属性 默认值为0 保证其不小于0且不大于选项的数量减1
                e.default = parseInt(reSetValue(e.default, 0, e.values.length - 1, 0));
                // 验证background属性 默认值为'#FFFFFF' 保证其是字符串
                e.background = e.background == null ? '#FFFFFF' : String(e.background);
                // 验证font属性的size 默认值为1 保证其是数值类型且不小于0.3且不大于1.25
                e.font.size = reSetValue(e.font.size, 0.3, 1.25, 1);
                // 验证font属性的color属性 默认值为'#807F7F' 保证其是字符串
                e.font.color = e.font.color == null ? '#807F7F' : String(e.font.color);
                // 验证opacity属性的change属性 默认值为true 保证其是布尔类型
                e.opacity.change = e.opacity.change == null ? true : !!e.opacity.change;
                // 验证opacity属性的max属性 默认值为1 保证其是数值类型且不小于0且不大于1
                e.opacity.max = reSetValue(e.opacity.max, 0, 1, 1);
                // 验证opacity属性的min属性 默认值为0.2 保证其是数值类型且不小于0且不大于1
                e.opacity.min = reSetValue(e.opacity.min, 0, 1, 0.2);
                // 如果opacity属性的min属性大于max属性则互换值
                e.opacity.min > e.opacity.max ? (() => {
                    e.opacity.min = e.opacity.max - e.opacity.min;
                    e.opacity.max -= e.opacity.min;
                    e.opacity.min += e.opacity.max;
                })() : 0;
                // 检查opacity属性的max属性是否不小于0.2
                e.opacity.max = reSetValue(e.opacity.max, 0.2, 1, 0.1);
                // 验证line属性的height属性 默认值为1 保证其是数值类型且不小于0.5且不大于1.25
                e.line.height = reSetValue(e.line.height, 0.5, 1.25, 1);
                // 验证line属性的color属性 默认值为'#EEEEEE' 保证其是字符串
                e.line.color = e.line.color == null ? '#EEEEEE' : String(e.line.color);
                // 验证valueChangeFunction属性 默认值为() => {} 进行复制
                e.valueChangeFunction = e.valueChangeFunction == null ? () => {} : eval(`(${e.valueChangeFunction})`);
            } else if (e.type == 'complex') {
                this.type == null ? Object.defineProperty(this, 'type', {
                    get: () => 'complex'
                }) : 0;
                // 验证values属性 默认值为[] 复制内容 保证其内容为对象
                e.values = e.values == null ? [] : (Array.isArray(e.values) ? (() => {
                    const values = [...e.values];
                    // 验证属性
                    const checkAttribute = (parent, child, attribute) => {
                        child[attribute] == null ? child[attribute] = parent[attribute] : 0;
                    };
                    for (let i in e.values) {
                        e.values != null && typeof e.values[i] == 'object' && !Array.isArray(e.values[i]) ? (() => {
                            // 复制value
                            values[i] = {...e.values[i]};
                            // 设置container属性
                            values[i].container = e.container;
                            // 验证number属性
                            checkAttribute(e, values[i], 'number');
                            // 验证background属性
                            checkAttribute(e, values[i], 'background');
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
            } else {

            }
            return e;
        };
        // 获取一个新的e
        e = getNewE();
        // TSelect实例
        if (e.type == 'complex') {
            for (const i in e.values) {
                const newTSelect = new TSelect(e.values[i]);
                Object.defineProperty(this, i, {
                    get: () => newTSelect
                });
                if (['date', 'year', 'month', 'day', 'hour', 'minute'].includes(e.values[i].type)) {
                    Object.defineProperty(this, e.values[i].type, {
                        get: () => newTSelect
                    });
                    for (const j in e.values) {
                        if (['date', 'year', 'month', 'day', 'hour', 'minute'].includes(e.values[j].type) && e.values[i].type != e.values[j].type) {
                            Object.defineProperty(this[e.values[i].type], e.values[j].type, {
                                get: () => this[e.values[j].type]
                            });
                        }
                    }
                }
            }
            Object.defineProperties(this, {
                fullValue: {
                    get: () => {
                        let value = '';
                        for (let i in ts) {
                            value += ts[i].fullValue;
                        }
                        return value;
                    }
                },
                value: {
                    get: () => this.fullValue
                }
            });
            return;
        }
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
    // 版本信息
    get version() {
        return '1.0.0';
    }
    // 作者信息
    get author() {
        return '2002-2003';
    }
}