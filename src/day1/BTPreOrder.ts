export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}

function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    if (!curr) {
        return path;
    }
    // recurse
    // pre
    path.push(curr.value);

    // recurse
    walk(curr.left, path);
    walk(curr.right, path);

    // post
    return path;
}
// first visit node then do recursion (hence the name preorder); root at the start
