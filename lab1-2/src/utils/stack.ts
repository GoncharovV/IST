export class Stack<T> {
    private readonly items: T[] = [];

    public constructor(
        initial: T[] = []
    ) {
        this.items = initial;
    }

    public pop() {
        return this.items.pop()
    }

    public pick() {
        return this.items[this.items.length - 1];
    }

    public push(item: T) {
        this.items.push(item);
    }

    public isEmpty() {
        return !Boolean(this.items.length)
    }

    public isNotEmpty() {
        return Boolean(this.items.length)
    }

    public get length() {
        return this.items.length;
    }
}
