export default function two_crystal_balls(breaks: boolean[]): number {
    const jumpDist = Math.floor(Math.sqrt(breaks.length));
    let currentFloor = jumpDist;
    for (; currentFloor < breaks.length; currentFloor += jumpDist) {
        //check for breaks
        if (breaks[currentFloor]) {
            break;
        }
    }
    //jump back by a sqrt and linearly walk up
    currentFloor -= jumpDist;
    for (
        let j = 0;
        j <= jumpDist && currentFloor < breaks.length;
        ++j, ++currentFloor
    ) {
        if (breaks[currentFloor]) {
            return currentFloor;
        }
    }
    return -1;
}
``;
