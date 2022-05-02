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
        // 格式化字符串为首字母大写、其余小写
        const formatStr = (str) => {
            let newStr = '';
            for (const i in str) {
                newStr += newStr.length > 0 ? str[i].toLowerCase() : str[i].toUpperCase();
            }
            return newStr;
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
            let type = typeArr.includes(sObj.type) ? sObj.type : this.getType(def);
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
                ['Infinity', 'NaN'].includes(this.getType(value)) ? value = 0 : 0;
                ['Infinity', 'NaN'].includes(this.getType(min)) ? min = 0 : 0;
                ['Infinity', 'NaN'].includes(this.getType(max)) ? max = 0 : 0;
                return value < min ? min : (value > max ? max : value);
            } else if (type == 'NaN') {
                return NaN;
            } else if (type == 'Infinity') {
                const value = sObj.value != null ? sObj.value : def;
                return this.getType(value) == 'Infinity' ? value : Infinity;
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
                this.getType(value) != 'Object' ? value = {} : 0;
                let obj = this.getType(def) == 'Object' ? def : {};
                for (const i in obj) {
                    this.getType(obj[i]) != 'Object' ? obj[i] = {default: obj[i]} : 0;
                    obj[i].value == null ? obj[i].value = value[i] : 0;
                    value[i] = checkValue(obj[i]);
                }
                return {...value};
            } else if (type == 'Array') {
                let value = sObj.value != null ? sObj.value : def;
                this.getType(value) != 'Array' ? value = [] : 0;
                return [...value];
            } else if (type == 'Element') {
                return sObj.value != null ? sObj.value : def;
            } else if (type == 'Null') {
                return null;
            } else if (type == 'Undefined') {
                return undefined;
            } else if (type == 'Function') {
                let value = sObj.value != null ? sObj.value : def;
                this.getType(value) != 'Function' ? value = () => {} : 0;
                return eval(`(${ value })`);
            }
            return null;
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
            // 格式化字符串为首字母大写、其余小写
            formatStr: {
                get: () => formatStr
            },
            // 获取一个值的类型
            getType: {
                get: () => getType
            },
            // 验证一个值是否在范围内 返回符合条件的值
            checkValue: {
                get: () => checkValue
            }
        });
    }
}