function defaultMaxValue() {
  return Number.MAX_SAFE_INTEGER;
}
function defaultSetValue(index, key) {
  this._heap[index] = key;
}
function defaultCompare(a, b) {
  if (a < b) {
    return -1;
  }
  if (b < a) {
    return 1;
  }
  return 0;
}
function MinHeap(compare = defaultCompare, maxValue = defaultMaxValue,
  setValue = defaultSetValue) {
    this.compare = compare;
    this.maxValue = maxValue;
    this.setValue = setValue;
    this._heapHandlers = [];
    this._heap = [];
}
MinHeap.prototype.swap = function(a, b) {
  [this._heap[a], this._heap[b]] = [this._heap[b], this._heap[a]];

  if (this._heapHandlers.length === 0) {
    return;
  }
  const vertexA = this._heap[a][0];
  const vertexB = this._heap[b][0];

  this._heapHandlers[vertexA] = a;
  this._heapHandlers[vertexB] = b;
}
MinHeap.prototype.left = function(index) {
  return 1 + (2 * index);
}
MinHeap.prototype.right = function(index) {
  return 2 + (2 * index);
}
MinHeap.prototype.parent = function(index) {
  return Math.ceil(index / 2) - 1;
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
    this.swap(smallest, index);
    this.heapify(smallest);
  }
}
MinHeap.prototype.extractMin = function() {
  if (this._heap.length === 0) {
    throw Error('Heap is empty!');
  }
  if (Array.isArray(this._heap[0])) {
    this._heapHandlers[this._heap[0][0]] = null;
  }
  if (this._heap.length === 1) {
    return this._heap.pop();
  }
  const min = this._heap[0];

  this._heap[0] = this._heap.pop();
  if (Array.isArray(this._heap[0])) {
    this._heapHandlers[this._heap[0][0]] = 0;
  }
  this.heapify(0);

  return min;
}
MinHeap.prototype.decreaseKey = function(index, key) {
  if (index < 0 || index >= this._heap.length) {
    console.log('index', index, key);
    throw Error('Index is outside the bounds of the heap!');
  }
  if (this.compare(key, this._heap[index]) >= 0) {
    return;
  }
  this.setValue(index, key);

  while (index > 0
    && this.compare(this._heap[this.parent(index)], this._heap[index]) > 0) {
      let curParent = this.parent(index);

      this.swap(index, curParent);
      index = curParent;
  }
}
MinHeap.prototype.insert = function(key) {
  this._heap.push(this.maxValue(key));
  if (Array.isArray(key)) {
    this._heapHandlers[key[0]] = this._heap.length - 1;
  }
  this.decreaseKey(this._heap.length - 1, key);
}
module.exports = { defaultCompare, MinHeap };
