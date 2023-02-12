import { Operand } from '../utils/operand';
import { Stack } from '../utils/stack';


export function calculatePostfixNotation(expression: Operand[]): number {
    const stack = new Stack<Operand>()
    const input = [...expression]

    while (input.length) {
        const item = input.shift()!;

        if (item.isNumber()) {
            stack.push(item);
        }

        if (item.isOperator()) {
            const second = Number(stack.pop()!.value);
            const first = Number(stack.pop()!.value);

            switch (item.value) {
                case '+':
                    stack.push(new Operand((first + second).toString()));
                    break;
                case '-':
                    stack.push(new Operand((first - second).toString()));
                    break;
                case '*':
                    stack.push(new Operand((first * second).toString()));
                    break;
                case '/':
                    if (second === 0) {
                        throw new Error('Ошибка!');
                    }

                    stack.push(new Operand((first / second).toString()));
                    break;
            }
        }
    }

    return Number(stack.pop()!.value);
}
