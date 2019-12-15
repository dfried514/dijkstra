const expect = require('chai').expect;

const graphCompare = (a, b) => {
  if (!Array.isArray(a)) {
    a = [0, a];
  }
  if (!Array.isArray(b)) {
    b = [0, b];
  }
  if (a[1] < b[1]) {
    return -1;
  }
  if (b[1] < a[1]) {
    return 1;
  }
  return 0;
};

const graphMaxValue = (key) => [key[0], Number.MAX_SAFE_INTEGER];

function graphSetValue (index, key) {
  if (Array.isArray(key)) {
    this._heap[index][1] = key[1];
  } else {
    this._heap[index][1] = key;
  }
};

describe('graphCompare', () => {
  const a = [3, 1];
  const b = [4, 4];

  it('should correctly compare two graph edge values', () => {
    expect(graphCompare(a, b)).to.equal(-1);
    expect(graphCompare(b, a)).to.equal(1);
    expect(graphCompare(a, a)).to.equal(0);
  });
});
describe('HEAP GRAPH METHODS', () => {
  const MinHeap = require('../heap/minHeap.js').MinHeap;
  let heap;

  before(() => {
    heap = new MinHeap(graphCompare, graphMaxValue, graphSetValue);
  });
  describe('swap', () => {
    beforeEach(() => {
      heap._heap = [[2, 1], [1, 2], [3, 3], [4, 4], [5, 5]];
      heap._heapHandlers = [null, 1, 0, 2, 3, 4];
    });
    it('should correctly swap two apart values within the heap', () => {
      heap.swap(1, 4);

      expect(heap._heap).to.eql([[2, 1], [5, 5], [3, 3], [4, 4], [1, 2]]);
      expect(heap._heapHandlers).to.eql([null, 4, 0, 2, 3, 1]);

    });
    it('should correctly swap two adjacent values within the heap', () => {
      heap.swap(2, 3);

      expect(heap._heap).to.eql([[2, 1], [1, 2], [4, 4], [3, 3], [5, 5]]);
      expect(heap._heapHandlers).to.eql([null, 1, 0, 3, 2, 4])
    });
    it('should correctly swap the same value within the heap', () => {
      heap.swap(2, 2);

      expect(heap._heap).to.eql([[2, 1], [1, 2], [3, 3], [4, 4], [5, 5]]);
      expect(heap._heapHandlers).to.eql([null, 1, 0, 2, 3, 4]);
    });
  });
  describe('heapify', () => {
    it('should correctly maintain heap structure of already formed heap', () => {
      heap._heap = [[3, 1], [4, 4], [2, 5], [1, 6]];
      heap._heapHandlers = [null, 3, 2, 0, 1];
      heap.heapify(0);

      expect(heap._heap).to.deep.equal([[3, 1], [4, 4], [2, 5], [1, 6]]);
      expect(heap._heapHandlers).to.eql([null, 3, 2, 0, 1]);
    });

    it('should correctly update heap structure of altered heap', () => {
      heap._heap = [[4, 4], [2, 1], [3, 3], [1, 2]];
      heap._heapHandlers = [null, 3, 1, 2, 0];
      heap.heapify(0);

      expect(heap._heap).to.deep.equal([[2, 1], [1, 2], [3, 3], [4, 4]]);
      expect(heap._heapHandlers).to.eql([null, 1, 0, 2, 3]);
    });
  });
  describe('extractMin', () => {
    it('should throw an error if the heap is empty', () => {
      heap._heap = [];

      const handler = () => {
        heap.extractMin();
      };
      expect(handler).to.throw(Error);
      expect(handler).to.throw('Heap is empty!');
    });
    it('should return min key and update the heap', () => {
      heap._heap = [[2, 1], [1, 2], [3, 3], [4, 4]];
      heap._heapHandlers = [null, 1, 0, 2, 3];

      expect(heap.extractMin()).to.eql([2, 1]);
      expect(heap._heap).to.deep.equal([[1, 2], [4, 4], [3, 3]]);
      expect(heap._heapHandlers).to.eql([null, 0, null, 2, 1]);
    });
    it('should return min key and empty heap when one key is in the heap', () => {
      heap._heap = [[2, 1]];
      heap._heapHandlers = [null, null, 0];

      expect(heap.extractMin()).to.eql([2, 1]);
      expect(heap._heap).to.be.empty;
      expect(heap._heapHandlers).to.eql([null, null, null]);
    });
  });
  describe('decreaseKey', () => {
    it('should throw an error if the index is outside the bounds of the heap', () => {
      heap._heap = [[4, 10], [3, 20], [2, 30], [1, 40]];
      heap._heapHandlers = [null, 3, 2, 1, 0];

      const handler = () => {
        heap.decreaseKey(4, 50);
      };
      expect(handler).to.throw(Error);
      expect(handler).to.throw('Index is outside the bounds of the heap!');
    });
    it('should not throw an error when decrease value is greater than key', () => {
      heap._heap = [[4, 10], [3, 20], [2, 30], [1, 40]];

      const handler = () => {
        heap.decreaseKey(3, 50);
      };
      expect(handler).to.not.throw();
    });
    it('should not throw an error if the value matches the key', () => {
      heap._heap = [[4, 10], [3, 20], [2, 30], [1, 40]];

      const handler = () => {
        heap.decreaseKey(2, 30);
      };
      expect(handler).to.not.throw();
    });
    it('should decrease the key of a particular index and update the heap', () => {
      heap._heap = [[4, 10], [3, 20], [2, 30], [1, 40]];
      heap._heapHandlers = [null, 3, 2, 1, 0];

      heap.decreaseKey(3, 15);

      expect(heap._heap).to.deep.equal([[4, 10], [1, 15], [2, 30], [3, 20]]);
      expect(heap._heapHandlers).to.eql([null, 1, 2, 3, 0]);
    });
  });
  describe('insert', () => {
    beforeEach(() => {
      heap._heap = [[4, 10], [3, 20], [2, 30], [1, 40]];
      heap._heapHandlers = [null, 3, 2, 1, 0];
    });
    it('should correctly insert a key into the heap and update the heap', () => {
      heap.insert([5, 15]);

      expect(heap._heap).to.deep.equal([[4, 10], [5, 15], [2, 30], [1, 40], [3, 20]]);
      expect(heap._heapHandlers).to.eql([null, 3, 2, 4, 0, 1]);
    });
    it('should properly handle duplicate values within the heap', () => {
      heap.insert([5, 10]);

      expect(heap._heap).to.deep.equal([[4, 10], [5, 10], [2, 30], [1, 40], [3, 20]]);
      expect(heap._heapHandlers).to.eql([null, 3, 2, 4, 0, 1]);
    });
  });
});
