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
  let leftIndex = this.left(index);
  let rightIndex = this.right(index);
  let smallest;

  if (this.compare(this._heap[leftIndex], this._heap[index]) < 0) {
    smallest = leftIndex;
  } else {
    smallest = index;
  }
  if (this.compare(this._heap[rightIndex], this._heap[smallest]) < 0) {
    smallest = rightIndex;
  }
  if (smallest !== index) {
    [this._heap[smallest], this._heap[index]]
      = [this._heap[index], this._heap[smallest]];
    this.heapify(smallest);
  }
}

module.exports = { defaultCompare, MinHeap };
