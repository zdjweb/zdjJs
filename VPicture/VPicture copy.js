// VPicture类
class VPicture {
    // 构造函数
    constructor(e) {
        // 容器
        let container = e.container;
        // 如果容器不存在则直接返回
        if (!container) {
            return;
        }
        // 创建一个zdjJs实例
        const z = new zdjJs;
        // 获取一个新的e
        const getE = () => {
            // 验证原有的e
            return e = z.checkValue({
                value: e,
                default: {
                    src: '',
                    background: '#C8C8FA'
                }
            });
        };
        e = getE();
        Object.defineProperties(this, {
            // 版本信息
            version: {
                get: () => '1.0.0'
            },
            // 作者信息
            author: {
                get: () => '2002-2003'
            },
            // 图片地址
            src: {
                get: () => picture.src,
                set(src) {
                    container.removeChild(picture);
                    picture = null;
                    setPicture.src = src;
                }
            },
            // 背景颜色
            background: {
                get: () => e.background,
                set(background) {
                    container.style.background = e.background = z.checkValue({
                        value: background,
                        default: '#C8C8FA'
                    });
                }
            }
        });
        // 更新容器
        container = z.addElementByObj({
            type: 'iframe',
            container,
            style: {
                width: '100%',
                height: '100%',
                border: 0
            }
        }).contentWindow;
        // 获取窗口
        const w = container;
    }
}