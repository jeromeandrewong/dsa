type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

function createNode<V>(value: V): Node<V> {
    return {
        value,
    };
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;

    private lookUp: Map<K, Node<V>>;
    private reverseLookUp: Map<Node<V>, K>;

    constructor(private capacity: number) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookUp = new Map<K, Node<V>>();
        this.reverseLookUp = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        let node = this.lookUp.get(key);
        if (!node) {
            node = createNode(value);
            this.length++;
            this.prepend(node);
            this.trimCache();
            this.lookUp.set(key, node);
            this.reverseLookUp.set(node, key);
        } else {
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }

        // does it exist? use get()
        // if it does exist, update the value and move it to the front
        // if it does not exist, add it to the front
        //          - check if we are at capacity
        //          - if we are, remove the last item
    }
    get(key: K): V | undefined {
        // check cache for existence
        const node = this.lookUp.get(key);
        if (!node) return undefined;

        // update value we found and move it to the front
        this.detach(node);
        this.prepend(node);

        // return value found or undefined if does not exist
        return node.value;
    }
    // detach node
    private detach(node: Node<V>): void {
        if (node.prev) {
            // reassign prev node's next to node's next
            node.prev.next = node.next;
        }
        if (node.next) {
            // reassign next node's prev to node's prev
            node.next.prev = node.prev;
        }
        if (this.head === node) {
            this.head = this.head.next;
        }
        if (this.tail === node) {
            this.tail = this.tail.prev;
        }
        node.next = node.prev = undefined;
    }
    // add node to front
    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
    }

    private trimCache(): void {
        if (this.length <= this.capacity) return;
        else {
            const tail = this.tail as Node<V>;
            this.detach(this.tail as Node<V>);

            const key = this.reverseLookUp.get(tail) as K;
            this.lookUp.delete(key);
            this.reverseLookUp.delete(tail);
            this.length--;
        }
    }
}
