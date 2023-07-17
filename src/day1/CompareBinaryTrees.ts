export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    // base cases

    // check for structure
    if (a === null && b === null) {
        return true;
    }

    // check for structure
    if (a === null || b === null) {
        return false;
    }

    // check for value
    if (a.value !== b.value) {
        return false;
    }

    return compare(a.left, b.left) && compare(a.right, b.right);
}
