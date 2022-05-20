(() => {
    // Mocha脚本文件
    const script = document.querySelectorAll('mocha'),
    // 读取出的Mocha脚本内容
    text = [],
    // 翻译成的JavaScript脚本内容
    translate = [];
    // 已加载的脚本数量
    let loaded = 0;
    // 加载翻译出的JavaScript脚本
    const loadJavaScript = () => {
        const script = document.createElement('script');
        script.innerHTML += '(() => {';
        for (const i in translate) {
            script.innerHTML += translate[i];
        }
        script.innerHTML += '})()';
        document.body.appendChild(script);
    };
    // 将Mocha脚本翻译为JavaScript脚本
    const MochaToJavaScript = () => {
        for (const i in text) {
            while (text[i].includes('\r')) {
                text[i] = text[i].replace('\r', '');
            }
            // 分割字符串
            const str = text[i].split(`'`),
            // 翻译状态
            state = {
                str: 0
            };
            for (const i in str) {
                console.log(str[i]);
            }
            /*
            translate[i] = '';
            if (i) {
                translate[i] += '\n';
            }
            // 翻译状态
            const state = {
                string: 0,
                notes: 0,
                slash: 0
            };
            let character;
            for (const j in text[i]) {
                character = text[i][j];
                if (state.string) {

                } else {
                    if (character == '#') {
                        character = '//';
                    } if (character == '/') {

                    }
                    if (character == '\n') {
                        character = ';\n'
                    }
                }
                translate[i] += character;
            }
            */
        }
        loadJavaScript();
    };
    // 判断脚本是否已全部加载完成
    const isLoadCompleted = () => {
        if (loaded == script.length) {
            MochaToJavaScript();
        }
    };
    // 加载脚本文件
    for (let i = 0; i < script.length; i++) {
        const mocha = script[i],
        src = mocha.getAttribute('src');
        if (src) {
            const xhr = new XMLHttpRequest(),
            // 脚本加载错误时执行
            errorFunction = () => {
                console.warn(`一个Mocha脚本加载失败，脚本地址为${src}。`);
            };
            xhr.open('Get', src + (src[src.length - 1] == '*' ? '' : '.mc'));
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        text.push(xhr.responseText);
                    } else {
                        errorFunction();
                    }
                    isLoadCompleted(loaded++);
                }
            };
            xhr.send();
        } else {
            text.push(mocha.innerHTML);
            isLoadCompleted(loaded++);
        }
        mocha.parentElement.removeChild(mocha);
    }
})();