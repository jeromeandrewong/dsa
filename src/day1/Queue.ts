type QNode<T> = {
    value: T;
    next?: QNode<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: QNode<T>;
    private tail?: QNode<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        const node = { value: item } as QNode<T>;
        this.length++;
        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }
        // adding new tail and reassigning
        this.tail.next = node;
        this.tail = node;
    }
    deque(): T | undefined {
        // fifo, so deque removes and returns item from head
        if (!this.head) return undefined;
        this.length--;
        const head = this.head;
        this.head = this.head.next;

        //edge case when removing last item
        if (this.length === 0) {
            this.tail = undefined;
        }
        return head.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
