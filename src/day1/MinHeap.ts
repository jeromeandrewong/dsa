export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    // insert bottom and heapify up until correct location
    insert(value: number): void {
        // add node to end of arr
        this.data.push(value);
        // heapify up from bottom to the correct location to insert
        this.heapifyUp(this.length);
        this.length++;
    }

    // deleting the min item out of the heap
    delete(): number {
        if (this.length === 0) return -1;

        const out = this.data[0];
        this.length--;
        if (this.length === 0) {
            this.data = [];
            return out;
        }

        // move lowest node to the top of heap
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }

    private heapifyDown = (idx: number): void => {
        const li = this.getLeftIdx(idx);
        const ri = this.getRightIdx(idx);

        if (idx > this.length || li > this.length) return;

        const lv = this.data[li];
        const rv = this.data[ri];
        const pv = this.data[idx];

        // logic to traverse to left or right child
        if (pv > lv && lv < rv) {
            // swap parent with lv
            this.data[idx] = lv;
            this.data[li] = pv;
            // recurse
            this.heapifyDown(li);
        }
        if (pv > rv && rv < lv) {
            // swap parent with rv
            this.data[idx] = rv;
            this.data[ri] = pv;
            // recurse
            this.heapifyDown(ri);
        }
    };

    private heapifyUp = (idx: number): void => {
        // base case
        if (idx === 0) return;

        const pIdx = this.getParentIdx(idx);
        const pVal = this.data[pIdx];
        const cVal = this.data[idx];

        // keep bubbling up until parent value is smaller than current value
        if (pVal > cVal) {
            // swap parent and child
            this.data[pIdx] = cVal;
            this.data[idx] = pVal;
            // recursion
            this.heapifyUp(pIdx);
        }
    };

    private getParentIdx = (idx: number): number => Math.floor((idx - 1) / 2);
    private getLeftIdx = (parentIdx: number): number => parentIdx * 2 + 1;
    private getRightIdx = (parentIdx: number): number => parentIdx * 2 + 2;
}
