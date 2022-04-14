addValue: {
    get: () => function(value,code) {
        if (this.checkValue((value = String(value))) < 0) {
            if (code >= 0 && code <= this.number) {
                const newMsg = (addMsg)(value);
                let i = this.number - 1;
                while (i >= code) {
                    this.values[i + 1] = this.values[i--];
                }
                this.values[code] = value;
                code < this.number - 1 ? msgBox.insertBefore(newMsg, msg[code]) : msgBox.appendChild(newMsg);
                msg.splice(code, 0, newMsg);
                minMarginTop = maxMarginTop - (this.number - 1) * (e.line.height + msgHeight);
                code <= this.code ? this.code++ : 0;
                msgBox.style.marginTop = msgBox.style.marginTop = maxMarginTop - this.code * (e.line.height + msgHeight) + 'vh';
            } else {
                this.addValue(value, this.number);
            }
        }
    }
}