// zdjJs类
class zdjJs {
    constructor() {
        // 通过对象生成元素
        const addElementByOBj = (sObj) => {
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
                } else {
                    element.setAttribute(i, sObj[i]);
                }
            }
            sObj.container != null ? sObj.container.appendChild(element) : 0;
            return element;
        }
        // 验证一个值是否在范围内 返回符合条件的值
        const checkValue = (sObj) => {
            let def = sObj.default;
            if (def == null) {
                if (sObj.values == null) {
                    return null;
                }
                def = sObj.values[0];
            }
            const type = sObj.type != null ? sObj.type : (() => {
                return typeof def == 'object' ? (Array.isArray(def) ? 'array' : 'object') : typeof def;
            })();
            if (type == 'number') {
                const value = sObj.value != null ? +sObj.value : def;
                const min = sObj.min != null ? sObj.min : value,
                max = sObj.max != null ? sObj.max : value;
                return value < min ? min : (value > max ? max : value);
            } else if (type == 'string') {
                const value = sObj.value != null ? String(sObj.value) : def;
                const values = sObj.values;
                return values == null ? value : (values.includes(value) ? value : def);
            } else if (type == 'boolean') {
                return sObj.value != null ? !!sObj.value : def;
            } else if (type == 'object') {
                const value = sObj.value != null ? sObj.value : {};
                for (const i in def) {
                    def[i].value == null ? def[i].value = value[i] : 0;
                    value[i] = (def[i].value == null || def[i].value != null && def[i].value.nodeType == null) ? checkValue(def[i]) : def[i].value;
                }
                return {...value};
            } else if (type == 'array') {
                return [...sObj.value != null ? sObj.value : def];
            } else if (type == 'function') {
                return eval(`(${ sObj.value != null ? sObj.value : def })`);
            }
            return null;
        }
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
            addElementByOBj: {
                get: () => addElementByOBj
            },
            // 验证一个值是否在范围内 返回符合条件的值
            checkValue: {
                get: () => checkValue
            }
        });
    }
}