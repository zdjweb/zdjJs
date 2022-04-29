






                
            } else if (e.type == 'time') {
                Object.defineProperty(this, 'type', {
                    get: () => 'time'
                });
                // 验证values属性
                e.values = (() => {
                    const values = [];
                    // 用于获取当前时间的Date对象
                    const date = new Date;
                    // 验证hour属性
                    e.hour = z.checkValue({
                        value: e.hour,
                        default: {
                            suffix: {
                                default: '时'
                            },
                            width: {
                                min: 0,
                                max: 100,
                                default: 50
                            },
                            show: {
                                default: true
                            }
                        }
                    });
                    // 判断hour属性是否显示
                    e.hour.show == false ? 0 : (() => {
                        // 设置选项
                        e.hour.values = [];
                        for (let i = 0; i < 24; i++) {
                            e.hour.values[i] = i < 10 ? '0' + i : i;
                        }
                        // 验证default属性
                        e.hour.default == null ? e.hour.default = date.getHours() : 0;
                        values.push(e.hour);
                    })();
                    // 验证minute属性
                    e.minute = z.checkValue({
                        value: e.minute,
                        default: {
                            suffix: {
                                default: '分'
                            },
                            width: {
                                min: 0,
                                max: 100,
                                default: 50
                            },
                            show: {
                                default: true
                            }
                        }
                    });
                    // 判断minute属性是否显示
                    e.minute.show == false ? 0 : (() => {
                        // 设置选项
                        e.minute.values = [];
                        for (let i = 0; i < 60; i++) {
                            e.minute.values[i] = i < 10 ? '0' + i : i;
                        }
                        // 验证default属性
                        e.minute.default == null ? e.minute.default = date.getMinutes() : 0;
                        values.push(e.minute);
                    })();
                    return values;
                })();
                e.type = 'complex';
            }
            if (e.type != 'complex') {
                // 验证values属性
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
                // 验证e
                e = z.checkValue({
                    value: e,
                    default: {
                        prefix: {
                            default: ''
                        },
                        suffix: {
                            default: ''
                        },
                        default: {
                            min: 0,
                            max: e.values.length - 1,
                            default: 0
                        },
                        number: {
                            min: 1,
                            max: 15,
                            default: 5
                        },
                        width: {
                            min: 0,
                            max: 100,
                            default: 100
                        },
                        background: {
                            default: '#FFFFFF'
                        },
                        valueChangeFunction: {
                            default: () => {}
                        }
                    }
                });
            } else {
                this.type == null ? Object.defineProperty(this, 'type', {
                    get: () => 'complex'
                }) : 0;
                // 验证values属性
                e.values = e.values == null ? [] : (Array.isArray(e.values) ? (() => {
                    const values = [...e.values];
                    for (const i in e.values) {
                        // 复制value
                        values[i] = {...e.values[i]};
                        // 验证属性
                        values[i] = z.checkValue({
                            value: values[i],
                            default: {
                                container: {
                                    value: e.container,
                                    default: e.container
                                },
                                number: {
                                    default: e.number
                                },
                                background: {
                                    default: e.background
                                },
                                font: {
                                    default: e.font
                                }
                            }
                        });
                        console.log(values[i].background);
                    }
                })() : 0);
            }
            return e;
        };
        // 获取一个新的e
        e = getE();
        // 生成TSlect实例
        if (e.type == 'complex') {
            console.log(6);
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
                        for (const i in ts) {
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