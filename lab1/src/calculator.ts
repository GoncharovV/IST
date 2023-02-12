import { Operand } from './operand';

export class Calculator {
    private expression: Operand[] = [new Operand()]

    public getExpression(): string {
        return this.expression
            .map(operand => operand.value)
            .join(' ')
            .replace('*', '×');
    }

    private get lastOperandIndex() {
        return this.expression.length - 1;
    }

    private get currentOperand(): Operand {
        return this.expression[this.lastOperandIndex];
    }

    public clear() {
        this.expression = [new Operand()];
    }

    private get openingBracesCount() {
        return this.expression.filter(operand => operand.value === '(').length;
    }

    private  get closingBracesCount() {
        return this.expression.filter(operand => operand.value === ')').length;
    }

    public addDigit(digit: number) {
        if (this.currentOperand.isEmptyOrNumber() || this.currentOperand.isMinus()) {
            if (this.currentOperand.value === '0') {
                this.currentOperand.value += '.';
            }

            this.currentOperand.value += digit.toString();
        }

        if (this.currentOperand.isOperator()) {
            this.expression.push(new Operand(digit.toString()))
        }

        if (this.currentOperand.isBrace()) {
            if (this.currentOperand.value === ')') {
                this.expression.push(new Operand('*'));
            }

            this.expression.push(new Operand(digit.toString()))
        }

    }

    private deleteLastOperand() {
        this.expression = this.expression.splice(0, this.expression.length - 1);
    }

    public addPoint() {
        if (this.currentOperand.isEmpty()) {
            this.currentOperand.value += '0.';
            return;
        }

        if (this.currentOperand.hasPoint() || this.currentOperand.isOperator()) {
            return;
        }

        if (this.currentOperand.isNumber()) {
            this.currentOperand.value += '.';
        }
    }

    public addOperator(operator: string) {
        if (this.currentOperand.isOperator()) {
            this.currentOperand.value = operator;
            return;
        }

        if (this.currentOperand.isNumber() || this.currentOperand.isEmpty() && operator === '-') {
            this.currentOperand.finalize();

            this.expression.push(new Operand(operator))
        }

        if (this.currentOperand.isBrace()) {
            if (this.currentOperand.isClosingBrace()) {
                this.expression.push(new Operand(operator))
                return;
            }

            if (this.currentOperand.isOpeningBrace() && operator !== '-') {
                return;
            } else if (operator === '-') {
                this.expression.push(new Operand('-'))
            }
        }
    }

    public addOpenBrace() {
        if (this.currentOperand.isEmpty()) {
            this.currentOperand.value = '(';
            return;
        }

        if (this.currentOperand.isNumber()) {
            this.currentOperand.finalize();

            this.expression.push(new Operand('*'));
            this.expression.push(new Operand('('))
        }

        if (this.currentOperand.isOperator()) {
            this.expression.push(new Operand('('))
        }
    }

    public addCloseBrace() {
        if (this.openingBracesCount === this.closingBracesCount) {
            return;
        }

        if (this.currentOperand.isOperator()) {
            this.deleteLastOperand();
        }

        if (this.currentOperand.isNumber()) {
            this.currentOperand.finalize();

            this.expression.push(new Operand(')'))
        }
    }

    public calculate() {
        if (this.expression.length < 3) {
            return;
        }

        if (this.currentOperand.isOperator()) {
            this.deleteLastOperand();
        }

        this.autoCloseBraces();

    }

    private autoCloseBraces() {
        const bracesDelta = this.openingBracesCount - this.closingBracesCount;

        for (let i = 0; i < bracesDelta; i++) {
            this.expression.push(new Operand(')'))
        }
    }


}
