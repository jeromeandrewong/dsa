export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q: (BinaryNode<number> | null)[] = [head];

    while (q.length) {
        // remove from front
        const curr = q.shift() as BinaryNode<number> | undefined | null;
        if (!curr) {
            continue;
        }

        // search
        if (curr?.value === needle) {
            return true;
        }

        // push to back
        q.push(curr.left);
        q.push(curr.right);
    }
    return false;
}
