export default function post_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}

// visit node after recursion, root at the end
// good for freeing up memory

function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    if (!curr) {
        return path;
    }
    // recurse
    // pre

    // recurse
    walk(curr.left, path);
    walk(curr.right, path);

    // post
    path.push(curr.value);
    return path;
}
