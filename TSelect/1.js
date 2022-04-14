                    // 用于进行计算新作用域
                    ((e) => {
                        // 用于存储信息的对象
                        e = {
                            // 保证是字符串
                            values: String(e.values),
                            // 读取状态
                            state: 0,
                            // 表达式数量
                            number: 0,
                            // 用于存储表达式的数组
                            arr: [''],
                            // 循环的次数
                            times: 0
                        };
                        for (e.char in e.values) {
                            e.char = e.values[e.char];
                            if (!e.state) {
                                e.char == '[' ? e.state = 1 : 0;
                            } else {
                                if (e.char == ']') {
                                    e.state = 0;
                                    e.arr[++e.number] = '';
                                } else {
                                    e.arr[e.number] += e.char;
                                }
                            }
                        }
                        let i;
                        if (e.arr[0].includes('~')) {
                            console.log(eval(e.arr[0].split('~')[0].split('=')[0]));
                        } else {
                            e.times = +e.arr[0].split('-')[1] - +e.arr[0].split('-')[0] + 1;
                        }
                        console.log(e);
                    })(e);