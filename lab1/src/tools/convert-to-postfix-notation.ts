import { Operand } from '../utils/operand';
import { Stack } from '../utils/stack';


export function convertToPostfixNotation(operands: Operand[]): Operand[] {

    const operations = new Stack<Operand>()

    const input = [...operands];

    const result: Operand[] = []

    while (input.length) {
        const item = input.shift()!;

        if (item.isNumber()) {
            result.push(item)
            continue;
        }

        if (item.isOperator()) {
            if (operations.isEmpty() || operations.pick().priority < item.priority) {
                operations.push(item);
            } else {
                while (operations.isNotEmpty() && operations.pick().priority >= item.priority) {
                    result.push(operations.pop()!);
                }

                if (operations.isEmpty() || operations.pick().priority < item.priority) {
                    operations.push(item);
                }
            }
        }

        if (item.isOpeningBrace()) {
            operations.push(item);
        }

        if (item.isClosingBrace()) {
            while(operations.isNotEmpty()) {
                const current = operations.pop()!;

                if (current.value === '(') {
                    break;
                } else {
                    result.push(current);
                }
            }
        }
    }

    while(operations.isNotEmpty()) {
        result.push(operations.pop()!);
    }

    return result;
}
