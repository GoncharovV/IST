

export class HtmlViewVisualizer {

    public constructor(
        private readonly primaryField: HTMLElement,
        private readonly expressionField: HTMLElement,
    ) {}

    public clearView() {
        this.primaryField.innerText = '';
        this.expressionField.innerText = '';
    }

    public updatePrimaryField(expression: string) {
        this.primaryField.innerText = expression.replaceAll('*', '×');
    }

    public showResult(result: number) {
        const expressionText = this.primaryField.innerText;

        this.primaryField.innerText = result.toString();
        this.expressionField.innerText = expressionText;
    }

    public showError(message: string) {
        this.expressionField.innerText = '';
        this.primaryField.innerText = message;
    }

}
