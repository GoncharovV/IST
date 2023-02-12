import { Calculator } from './calculator';

const expression = document.getElementById('expression')!;
const main = document.getElementById('main-line')!;

const calculator = new Calculator();

const clear = () => {
    calculator.clear();

    main.innerText = '';
    expression.innerText = '';
}

const calculate = () => {
    try {
        const result = calculator.calculate();

        const expressionText = main.innerText;

        main.innerText = result.toString();
        expression.innerText = expressionText;
    } catch (error: unknown) {
        const message = (error as Error).message

        if (message) {
            clear()

            main.innerText = message;
        }
    }
}



const withViewUpdate = (func: () => void) => {
    return () => {
        func();

        console.log(calculator.getExpression());

        main.innerText = calculator.getExpression().replaceAll('*', '×');
    }
}

const map = {
    num0: withViewUpdate(() => calculator.addDigit(0)),
    num1: withViewUpdate(() => calculator.addDigit(1)),
    num2: withViewUpdate(() => calculator.addDigit(2)),
    num3: withViewUpdate(() => calculator.addDigit(3)),
    num4: withViewUpdate(() => calculator.addDigit(4)),
    num5: withViewUpdate(() => calculator.addDigit(5)),
    num6: withViewUpdate(() => calculator.addDigit(6)),
    num7: withViewUpdate(() => calculator.addDigit(7)),
    num8: withViewUpdate(() => calculator.addDigit(8)),
    num9: withViewUpdate(() => calculator.addDigit(9)),
    plus: withViewUpdate(() => calculator.addOperator('+')),
    minus: withViewUpdate(() => calculator.addOperator('-')),
    divide: withViewUpdate(() => calculator.addOperator('/')),
    multiply: withViewUpdate(() => calculator.addOperator('*')),
    point: withViewUpdate(() => calculator.addPoint()),
    openingBrace: withViewUpdate(() => calculator.addOpenBrace()),
    closingBrace: withViewUpdate(() => calculator.addCloseBrace()),

    clear: () => clear(),
    calculate: () => calculate(),
}

for (const [id, handler] of Object.entries(map)) {
    document.getElementById(id)!.onclick = handler;
}


// ['(', '8', '+', '2', '*', '5', ')', '/', '(', '1', '+', '3', '*', '2', '-', '4', ')'].forEach(elem => {
//     this.expression.push(new Operand(elem))
// })
