#!/usr/bin/env node

class Display {
    showPrompt(msg) { process.stdout.write(msg); }
    showResult(result) { console.log(String(result));}
    showExit() { console.log("→ プログラムを終了する");}
    showError(msg) { console.log(msg);}
}

class Operation {
    execute(a, b, op) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': 
                if (b === 0) throw new Error("0で割ることはできません");
                return a / b;
            default:
                throw new Error("未対応の演算子です");
        }
    }
}

class InputHandler {
    constructor(display, rl) {
        this.display = display;
        this.rl = rl;
    }
    async promptLine(message) {
        return new Promise(resolve => {
            this.display.showPrompt(message);
            this.rl.once("line", line => resolve(line.trim()));
        });
    }
    isEnd(token) {
        return token.toLowerCase() === 'end';
    }
    isNumeric(token) {
        return /^-?\d+(?:\.\d+)?$/.test(token);
    }

    async getValue() {
        while (true) {
            const token = await this.promptLine("数値または'end'を入力してください :");
            if (this.isEnd(token)) return {type: "end"};
            if (/^[+\-*/]$/.test(token)) {
                this.display.showError("数値または'end'を入力してください。");
                continue;
            }
            if (token === "" || !this.isNumeric(token)) {
                this.display.showError("数値または'end'を入力してください。");
                continue;
            }
            return {type: "number", value: Number(token)};
        }
    }

    async getOperator() {
        while (true) {
            const token = await this.promptLine("演算子(+ - * /)または'end'を入力してください :");
            if (this.isEnd(token)) return {type: "end"};
            if (/^[+\-*/]$/.test(token)) return {type: "operator", value: token};
            const num = Number(token);
            if (!Number.isNaN(num)) {
                this.display.showError("数値ではなく、演算子(+ - * /)または'end'を入力してください。");
                continue;
            }
            this.display.showError("未対応の入力です。演算子(+ - * /)、数値、または'end'を入力してください。");
        }
    }
}

class Calculator {
    constructor() {
        const readline = require("readline");
        this.rl = readline.createInterface({ input: process.stdin, output: process.stdout});
        this.display = new Display();
        this.input = new InputHandler(this.display, this.rl);
        this.operation = new Operation();

        this.running = true;
        this.lastResult = null;
    }

    async run() {
        let a = null, b = null, op = null;
        // 1つ目の値
        while (a === null && this.running) {
            const t = await this.input.getValue();
            if (t.type === "end") return this.exit();
            if (t.type === "number") a = t.value;
            else if (t.type === "operator") this.display.showError("先に数値を入力してください。");
        }
        // 2つ目の値
        while (b === null && this.running) {
            const t = await this.input.getValue();
            if (t.type === "end") return this.exit();
            if (t.type === "number") b = t.value;
            else if (t.type === "operator") {
                this.display.showError("2つ目の数値を先に入力してください。");
            }
        }
        // 演算子
        while (!op && this.running) {
            const t = await this.input.getOperator();
            if (t.type === "end") return this.exit();
            if (t.type === "operator") op = t.value;
            else if (t.type === "number") {
                // たまたま数値が先に来た場合の救済
                b = t.value;
            }
        }
        // 初回計算
        try {
            const result = this.calculate(a, b, op);
            this.display.showResult(result);
            this.lastResult = result;
        } catch (e) {
            this.display.showError(e.message);
        }

        while (this.running) {
            let nextVal = null;
            let nextOp = null;

            // 次の値
            while (nextVal === null && this.running) {
                const t = await this.input.getValue();
                if (t.type === "end") return this.exit();
                if (t.type === "number") nextVal = t.value;
                else if (t.type === "operator") {
                    this.display.showError("数値を先に入力してください。");
                }
            }

            // 演算子
            while (!nextOp && this.running) {
                const t = await this.input.getOperator();
                if (t.type === "end") return this.exit();
                if (t.type === "operator") nextOp = t.value;
                else if (t.type === "number") {
                    // たまたま数値が先に来た場合の救済
                    nextVal = t.value;
                }
            }

            // 計算
            try {
                const result = this.calculate(this.lastResult, nextVal, nextOp);
                this.display.showResult(result);
                this.lastResult = result;
            } catch (e) {
                this.display.showError(e.message);
            }
        }
    }

    calculate(a, b, op) {
        return this.operation.execute(a, b, op);
    }

    exit() {
        this.display.showExit();
        this.running = false;
        this.rl.close();
    }
}

(async () => {
    const app = new Calculator();
    await app.run();
})();