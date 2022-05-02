// TSelect类
class TSelect {
    // 构造函数
    constructor(e) {
        // 检查容器是否存在
        if (e.container == null) {
            return;
        }
        // 创建一个zdjJs实例
        const z = new zdjJs;
        // 获取一个新的e
        const getE = () => {
            // 验证原有的e
            e = z.checkValue({
                value: e,
                default: {
                    type: {
                        values: ['simple', 'complex', 'time', 'date']
                    },
                    font: {
                        default: {
                            size: {
                                min: 0.3,
                                max: 1.25,
                                default: 1
                            },
                            color: {
                                default: '#807F7F'
                            }
                        }
                    },
                    opacity: {
                        default: {
                            change: {
                                default: true
                            },
                            max: {
                                min: 0.2,
                                max: 1,
                                default: 1
                            },
                            min: {
                                min: 0.2,
                                max: 1,
                                default: 0.2
                            }
                        }
                    },
                    line: {
                        default: {
                            height: {
                                min: 0.5,
                                max: 1.25,
                                default: 1
                            },
                            color: {
                                default: '#EEEEEE'
                            }
                        }
                    }
                }
            });
            // 如果opacity属性的min属性大于max属性则互换值
            e.opacity.min > e.opacity.max ? (() => {
                let temp = e.opacity.min;
                e.opacity.min = e.opacity.max;
                e.opacity.max = temp;
            })() : 0;
            // 根据类型分别验证
            if (e.type == 'date') {
                Object.defineProperty(this, 'type', {
                    get: () => 'date'
                });
                // 验证values属性
                e.values = (() => {
                    const values = [];
                    // 用于获取当前时间的Date对象
                    const date = new Date;
                    // 验证year属性
                    e.year = z.checkValue({
                        value: e.year,
                        default: {
                            type: 'year',
                            start: {
                                type: 'Int',
                                min: 1970,
                                max: 2100,
                                default: date.getFullYear()
                            },
                            end: {
                                type: 'Int',
                                min: 1970,
                                max: 2100,
                                default: date.getFullYear()
                            },
                            suffix: {
                                default: '年'
                            },
                            width: {
                                min: 0,
                                max: 100,
                                default: 40
                            },
                            valueChangeFunction: {
                                default: function() {
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
                                }
                            },
                            show: {
                                default: true
                            }
                        }
                    });
                    // 如果year属性的start属性大于end属性则互换值
                    e.year.start > e.year.end ? (() => {
                        const temp = e.year.start;
                        e.year.start = e.year.end;
                        e.year.end = temp;
                    })() : 0;
                    // 判断year属性是否显示
                    e.year.show == false ? 0 : (() => {
                        // 设置选项
                        e.year.values = [];
                        for (let i = e.year.start; i <= e.year.end; i++) {
                            e.year.values.push(i);
                        }
                        // 验证default属性
                        e.year.default == null ? e.year.default = (e.year.values.includes(date.getFullYear()) ? e.year.values.indexOf(date.getFullYear()) : e.year.values.length - 1) : 0;
                        values.push(e.year);
                    })();
                    // 验证month属性
                    e.month = z.checkValue({
                        value: e.month,
                        default: {
                            type: {
                                value: 'month',
                            },
                            suffix: {
                                default: '月'
                            },
                            width: {
                                min: 0,
                                max: 100,
                                default: 30
                            },
                            valueChangeFunction: {
                                default: function() {
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
                                }
                            },
                            show: {
                                default: true
                            }
                        }
                    });
                    // 判断month属性是否显示
                    e.month.show == false ? 0 : (() => {
                        // 设置选项
                        e.month.values = [];
                        for (let i = 1; i <= 12; i++) {
                            e.month.values.push(i);
                        }
                        // 验证default属性
                        e.month.default == null ? e.month.default = date.getMonth() : 0;
                        values.push(e.month);
                    })();
                    // 验证date属性
                    e.date = z.checkValue({
                        value: e.date,
                        default: {
                            type: {
                                value: 'day',
                                default: ''
                            },
                            suffix: {
                                default: '日'
                            },
                            width: {
                                min: 0,
                                max: 100,
                                default: 30
                            },
                            show: {
                                default: true
                            }
                        }
                    });
                    // 判断date属性是否显示
                    e.date.show == false ? 0 : (() => {
                        // 设置选项
                        e.date.values = [];
                        for (let i = 1; i <= new Date(e.year.show == true ? e.year.values[e.year.default] : date.getFullYear(), (e.month.show == true ? e.month.default : date.getMonth()) + 1 , 0).getDate(); i++) {
                            e.date.values.push(i);
                        }
                        // 验证default属性
                        e.date.default == null ? e.date.default = date.getDate() - 1 : 0;
                        values.push(e.date);
                    })();
                    return values;
                })();
                e.type = 'complex';
            }
        }
        e = getE();
    }
}