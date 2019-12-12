function defaultCompare(a, b) {
  if (a < b) {
    return -1;
  }
  if (b < a) {
    return 1;
  }
  return 0;
}
function MinHeap(compare = defaultCompare) {
  this.compare = compare;
  this._heap = [];
}
MinHeap.prototype.left = function(index) {
  return 1 + (2 * index);
}
MinHeap.prototype.right = function(index) {
  return 2 + (2 * index);
}
MinHeap.prototype.parent = function(index) {
  return Math.floor(index / 2);
}
MinHeap.prototype.heapify = function(index) {
  const leftIndex = this.left(index);
  const rightIndex = this.right(index);
  let smallest;

  if (this._heap[leftIndex]
      && this.compare(this._heap[leftIndex], this._heap[index]) < 0) {
    smallest = leftIndex;
  } else {
    smallest = index;
  }
  if (this._heap[rightIndex]
      && this.compare(this._heap[rightIndex], this._heap[smallest]) < 0) {
    smallest = rightIndex;
  }
  if (smallest !== index) {
    [this._heap[smallest], this._heap[index]]
      = [this._heap[index], this._heap[smallest]];
    this.heapify(smallest);
  }
}
MinHeap.prototype.extractMin = function() {
  if (this._heap.length === 0) {
    throw Error('Heap is empty!');
  }
  const min = this._heap[0];

  this._heap[0] = this._heap.pop();
  this.heapify(0);

  return min;
}
MinHeap.prototype.decreaseKey = function(index, key) {
  if (index < 0 || index >= this._heap.length) {
    throw Error('Index is outside the bounds of the heap!');
  }
  if (key > this._heap[index]) {
    throw Error('Value is greater than key!');
  }
  if (key === this._heap[index]) {
    throw Error('Matching values!');
  }
}
module.exports = { defaultCompare, MinHeap };
