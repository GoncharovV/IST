import { Calculator } from './calculator';

const expression = document.getElementById('expression')!;

const calculator = new Calculator();


const map = {
    num0: () => calculator.addDigit(0),
    num1: () => calculator.addDigit(1),
    num2: () => calculator.addDigit(2),
    num3: () => calculator.addDigit(3),
    num4: () => calculator.addDigit(4),
    num5: () => calculator.addDigit(5),
    num6: () => calculator.addDigit(6),
    num7: () => calculator.addDigit(7),
    num8: () => calculator.addDigit(8),
    num9: () => calculator.addDigit(9),
    plus: () => calculator.addOperator('+'),
    minus: () => calculator.addOperator('-'),
    divide: () => calculator.addOperator('/'),
    multiply: () => calculator.addOperator('*'),
    clear: () => calculator.clear(),
    point: () => calculator.addPoint(),
    openingBrace: () => calculator.addOpenBrace(),
    closingBrace: () => calculator.addCloseBrace(),
}

for (const [id, handler] of Object.entries(map)) {
    const extendedHandler = () => {
        handler();

        expression.innerText = calculator.getExpression()
    }

    document.getElementById(id)!.onclick = extendedHandler;
}
