import {CalculatorInterface} from "../types/Calculator.interface";

export default class Calculator {
        private actions: any;
        private result: number;

    constructor(actions: []) {
        this.actions = [];
        this.result = 0;
        if(Array.isArray(actions)) {
            this.add(actions);
        }
        else if (actions !== undefined) throw new Error("Input variable must be an Array, your value: "+actions);
    }

    clear() {
        this.actions.length = 0;
    }

    add(val: []) {
        if(Array.isArray(val)) {
            val.forEach((value) => this.add(value));
        } else {
            let isNum = Calculator.isNum,
                isOp = Calculator.isOperation,
                actions = this.actions,
                last = actions[actions.length- 1];



            if(actions.length === 0 && !isNum(val)) throw new Error("First action must be a number, you add: "+val);
            if(actions.length !== 0 && isNum(last) && !isOp(val)) throw new Error("After a number must be an operation symbol, you add: "+val);
            if(actions.length !== 0 && isOp(last) && !isNum(val)) throw new Error("After an operation symbol must be a number, you add: "+val);

            actions.push(val);
        }
    }

    calculate() {
        let actions = this.actions,
            str = actions.length > 0 ? actions.join(' ') : 0;
        console.log(actions)

        str = Calculator.isOperation(str[str.length-1]) ? str.substr(0,(str.length-2))  : str;  // Предотвращает ошибку в случае если последний элемент это знак, удаляя его

        // return 3 * 2
        let fn = new Function('return '+str+';'),
            res = fn();


        this.actions = [res];
        this.result = res;

        console.log(this.actions)
        console.log(this.result)

        return {result: res,
        color: !this.isOdd(res) ? "green" : "red"};
    }

    static isOperation(val: string) {
        return (''+val).match(/^[\+\-\*\/]$/) !== null;
    }

    static isNum(val: string) {
        return !isNaN(+val);
    }

    isOdd(num: number) { return num % 2;}
}