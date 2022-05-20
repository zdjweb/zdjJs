// zdjJs类
class zdjJs {
    constructor() {
        // 通过对象生成元素
        const addElementByObj = (sObj) => {
            if (sObj.type == null) {
                return;
            }
            const element = document.createElement(sObj.type);
            for (const i in sObj) {
                if (i == 'style') {
                    Object.assign(element.style, sObj[i]);
                } else if (i == 'innerHTML') {
                    element.innerHTML = sObj[i];
                } else if (i == 'function') {
                    for (const j in sObj[i]) {
                        element.addEventListener(j, sObj[i][j]);
                    }
                } else if (i != 'container' && i != 'type') {
                    element.setAttribute(i, sObj[i]);
                }
            }
            sObj.container != null ? sObj.container.appendChild(element) : 0;
            return element;
        };
        // 动态加载JavaScript文件
        const loadScript = (src, container) => {
            this.addElementByObj({
                type: 'script',
                container: container ? container : document.body,
                src
            });
        };
        // 格式化字符串为首字母大写、其余小写
        const formatStr = (str) => {
            let newStr = '';
            for (const i in str) {
                newStr += newStr.length > 0 ? str[i].toLowerCase() : str[i].toUpperCase();
            }
            return newStr;
        };
        // 移除字符串的单位并返回数字类型
        const strRemove = (str) => {
            const arr = ['cm', 'mm', 'vmax', 'vmin', 'in', 'px', 'pt', 'pc', 'rem', 'em', 'ex', 'ch', 'vw', 'vh', '%'];
            for(const i in arr){
                str.includes(arr[i]) ? str = str.replace(arr[i], '') : 0;
            }
            return +str;
        };
        // 获取一个值的类型
        const getType = (value) => {
            let type = typeof value;
            if (type == 'number') {
                if (isNaN(value)) {
                    return 'NaN';
                } else if (parseInt(value) == value) {
                    return 'Int';
                } else if ([Infinity, -Infinity].includes(value)) {
                    return 'Infinity';
                }
                return 'Float';
            } else if (type == 'object') {
                if (value == null) {
                    return 'Null';
                } else if (Array.isArray(value)) {
                    return 'Array';
                } else if (value.nodeType != null) {
                    return 'Element';
                }
            }
            return formatStr(type);
        };
        // 验证一个值是否在范围内 返回符合条件的值
        const checkValue = (sObj) => {
            const def = sObj.default != null ? sObj.default : (sObj.values != null ? sObj.values[0] : sObj.value),
            typeArr = ['Int', 'Float', 'Infinity', 'NaN', 'String', 'Boolean', 'Object', 'Array', 'Element', 'Null', 'Undefined', 'Function', 'Symbol'];
            let type = typeArr.includes(sObj.type) ? sObj.type : getType(def);
            if (['Int', 'Float'].includes(type)) {
                sObj.type != 'Int' ? type = 'Float' : 0;
                let value = +(sObj.value != null ? sObj.value : def),
                min = sObj.min != null ? +sObj.min : value,
                max = sObj.max != null ? +sObj.max : value;
                if (type == 'Int') {
                    value = parseInt(value);
                    min = parseInt(min);
                    max = parseInt(max);
                }
                ['Infinity', 'NaN'].includes(getType(value)) ? value = 0 : 0;
                ['Infinity', 'NaN'].includes(getType(min)) ? min = 0 : 0;
                ['Infinity', 'NaN'].includes(getType(max)) ? max = 0 : 0;
                return value < min ? min : (value > max ? max : value);
            } else if (type == 'NaN') {
                return NaN;
            } else if (type == 'Infinity') {
                const value = sObj.value != null ? sObj.value : def;
                return getType(value) == 'Infinity' ? value : Infinity;
            } else if (type == 'String') {
                const value = String(sObj.value != null ? sObj.value : def),
                values = [value];
                sObj.values != null ? (() => {
                    for (const i in sObj.values) {
                        values.push(String(sObj.values[i]));
                    }
                })() : 0;
                return values == null ? value : (String(values.includes(value) ? value : def));
            } else if (type == 'Boolean') {
                return !!(sObj.value != null ? sObj.value : def);
            } else if (type == 'Object') {
                let value = sObj.value != null ? sObj.value : {};
                getType(value) != 'Object' ? value = {} : 0;
                let obj = getType(def) == 'Object' ? def : {};
                for (const i in obj) {
                    getType(obj[i]) != 'Object' ? obj[i] = {default: obj[i]} : 0;
                    obj[i].value == null ? obj[i].value = value[i] : 0;
                    value[i] = checkValue(obj[i]);
                }
                return {...value};
            } else if (type == 'Array') {
                let value = sObj.value != null ? sObj.value : def;
                getType(value) != 'Array' ? value = [] : 0;
                return [...value];
            } else if (type == 'Element') {
                return sObj.value != null ? sObj.value : def;
            } else if (type == 'Null') {
                return null;
            } else if (type == 'Undefined') {
                return undefined;
            } else if (type == 'Function') {
                let value = sObj.value != null ? sObj.value : def;
                getType(value) != 'Function' ? value = () => {} : 0;
                return eval(`(${ value })`);
            }
            return null;
        };
        // 获取格式化的时间信息
        const getTime = (...sObj) => {
            let str, time, type;
            if (getType(sObj[0]) == 'Object') {
                str = sObj[0].str;
                time = sObj[0].time;
                type = sObj[0].type;
            } else {
                str = sObj[0];
                time = sObj[1];
                type = sObj[2];
            }
            str = checkValue({
                value: str,
                type: 'String',
                default: 'Y/M/D h:m:s'
            });
            time = checkValue({
                value: time,
                type: 'Int',
                min: 0,
                default: (new Date).getTime()
            });
            type = checkValue({
                value: type,
                type: 'Boolean',
                default: false
            });
            let state = 0;
            const arr = ['Y','M','D','h','m','s'],
            date = new Date(time * (type ? 1000 : 1));
            let newStr = '';
            for (const i in str) {
                if (state == 0) {
                    if (str[i] == '!') {
                        state = 1;
                    } else {
                        if (arr.includes(str[i])) {
                            let text = date[[
                                'getFullYear',
                                'getMonth',
                                'getDate',
                                'getHours',
                                'getMinutes',
                                'getSeconds'
                            ][arr.indexOf(str[i])]]();
                            arr.indexOf(str[i]) == 1 ? text++ : 0;
                            text < 10 ? newStr += '0' + text : newStr += text;
                        } else {
                            newStr += str[i];
                        }
                    }
                } else {
                    newStr += str[i];
                    state = 0;
                }
            }
            return newStr;
        };
        // 判断用户操作是否在页面外进行
        const isOut = (sObj) => {
            if (!sObj.e) {
                return;
            }
            const e = sObj.e,
            number = sObj.number ? sObj.number : 0,
            f = sObj.function,
            x = e.touches ? e.touches[number].clientX : e.clientX,
            y = e.touches ? e.touches[number].clientY : e.clientY;
            if (x <= 0 || x >= window.innerWidth || y <= 0 || y >= window.innerHeight) {
                f ? f() : 0;
                return true;
            }
            return false;
        };
        Object.defineProperties(this, {
            // 版本信息
            version: {
                get: () => '1.0.3'
            },
            // 作者信息
            author: {
                get: () => 'zdj0123'
            },
            // 通过对象生成元素
            addElementByObj: {
                get: () => addElementByObj
            },
            // 动态加载JavaScript文件
            loadScript: {
                get: () => loadScript
            },
            // 格式化字符串为首字母大写、其余小写
            formatStr: {
                get: () => formatStr
            },
            // 移除字符串的单位并返回数字类型
            strRemove: {
                get: () => strRemove
            },
            // 获取一个值的类型
            getType: {
                get: () => getType
            },
            // 验证一个值是否在范围内 返回符合条件的值
            checkValue: {
                get: () => checkValue
            },
            // 获取格式化的时间信息
            getTime: {
                get: () => getTime
            },
            // 判断用户操作是否在页面外进行
            isOut: {
                get: () => isOut
            }
        });
    }
}