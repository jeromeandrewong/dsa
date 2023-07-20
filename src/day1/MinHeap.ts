export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data.push(value);
        this.heapifyUp(this.length);
        this.length++;
    }
    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        const out = this.data[0];
        this.length--;

        if (this.length === 0) {
            this.data = [];
            return out;
        }

        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }

    private heapifyDown(idx: number): void {
        const lIdx = this.getLeftIdx(idx);
        const rIdx = this.getRightIdx(idx);

        if (idx >= this.length || lIdx >= this.length) {
            return;
        }

        const lVal = this.data[lIdx];
        const rVal = this.data[rIdx];
        const v = this.data[idx];

        if (lVal > rVal && v > rVal) {
            this.data[idx] = rVal;
            this.data[rIdx] = v;
            this.heapifyDown(rIdx);
        } else if (lVal < rVal && v > lVal) {
            this.data[idx] = lVal;
            this.data[lIdx] = v;
            this.heapifyDown(lIdx);
        }
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }
        const parentIdx = this.getParentIdx(idx);
        const parentVal = this.data[parentIdx];
        const v = this.data[idx];

        if (parentVal > v) {
            this.data[idx] = parentVal;
            this.data[parentIdx] = v;
            this.heapifyUp(parentIdx);
        }
    }

    // retrieve parent idx from any idx
    private getParentIdx = (idx: number) => Math.floor((idx - 1) / 2);
    private getLeftIdx = (idx: number) => idx * 2 + 1;
    private getRightIdx = (idx: number) => idx * 2 + 2;
}
