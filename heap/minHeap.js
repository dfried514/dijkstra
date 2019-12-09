function MinHeap(compare = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (b < a) {
    return 1;
  }
  return 0;
}) {
  this.compare = compare;
  this._heap = [];
}

MinHeap.prototype.left = index =>  {

}

MinHeap.prototype.heapify = index => {

}
