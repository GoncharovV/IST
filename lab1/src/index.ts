import { Calculator } from './calculator';
import { HtmlViewVisualizer } from './html-view-visualizer';

const primaryField = document.getElementById('main-line')!;
const expressionField = document.getElementById('expression')!;

const calculator = new Calculator();
const visualizer = new HtmlViewVisualizer(primaryField, expressionField);

const withViewUpdate = (func: () => void) => () => {
        func();
        visualizer.updatePrimaryField(calculator.getExpression());
}

const calculate = () => {
    try {
        const result = calculator.calculate();

        visualizer.showResult(result);
    } catch (error: unknown) {
        const message = (error as Error).message

        if (message) {
            calculator.clear();
            visualizer.showError(message);
        }
    }
}

const clear = () => {
    calculator.clear();

    visualizer.clearView();
}

const numbersTable = {
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
}

const handlerByIdTable = {
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

const registerButtonsEventListeners = () => {
    for (const [id, handler] of Object.entries({ ...handlerByIdTable, ...numbersTable })) {
        document.getElementById(id)!.onclick = handler;
    }
}

const registerKeyboardEventListeners = () => {
    window.addEventListener('keypress', (event) => {
        const idKey = `num${event.key}` as keyof typeof numbersTable;

        if (Object.keys(numbersTable).includes(idKey)) {
            numbersTable[idKey]();
        }
    })
}

const registerThemeSwitcher = () => {
    const btn = document.getElementById('theme-switcher')!;

    btn.onclick = () => {
        document.querySelector('body')!.classList.toggle('dark')
    }
}

const main = () => {
    registerButtonsEventListeners();

    registerKeyboardEventListeners();

    registerThemeSwitcher();
}

main()








