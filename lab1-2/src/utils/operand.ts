export class Operand {
    public value = '';

    public constructor(
        initial: string = '',
    ) {
        this.value = initial;
    }

    public isNumber(): boolean {
        if (this.isEmpty()) {
            return false;
        }

        return !isNaN(Number(this.value));
    }

    public isOperator(): boolean {
        const operators = ['+', '-', '/', '*']

        return operators.includes(this.value);
    }

    public isMinus(): boolean {
        return this.value === '-';
    }

    public isEmptyOrNumber() {
        return this.isNumber() || this.value === '';
    }

    public hasPoint() {
        return this.value.includes('.');
    }

    public isNotEmpty() {
        return !this.isEmpty();
    }

    public isEmpty() {
        return this.value === '';
    }

    public finalize() {
        if (this.value[this.value.length - 1] === '.') {
            this.value += '0';
        }
    }

    public isBrace() {
        return this.value === '(' || this.value === ')';
    }

    public isOpeningBrace() {
        return this.value === '(';
    }

    public isClosingBrace() {
        return this.value === ')';
    }

    public get priority() {
        if (this.value === '*' || this.value === '/') {
            return 3;
        }

        if (this.value === '+' || this.value === '-') {
            return 2;
        }

        if (this.value === '(') {
            return 1;
        }

        throw new Error(this.value)
    }

}
