const expect = require('chai').expect;

describe('defaultCompare', () => {
  const defaultCompare = require('../heap/minHeap.js').defaultCompare;
  const a = 3, b = 4;

  it('should correctly compare two values', () => {
    expect(defaultCompare(a, b)).to.equal(-1);
    expect(defaultCompare(b, a)).to.equal(1);
    expect(defaultCompare(a, a)).to.equal(0);
  });
});
describe('HEAP METHODS', () => {
  const MinHeap = require('../heap/minHeap.js').MinHeap;
  let heap;

  before(() => {
    heap = new MinHeap();
  });
  describe('heapify', () => {
    it('should correctly maintain heap structure of already formed heap', () => {
      heap._heap = [1, 2, 3, 4];
      heap.heapify(0);

      expect(heap._heap).to.deep.equal([1, 2, 3, 4]);
    });

    it('should correctly update heap structure of altered heap', () => {
      heap._heap = [4, 1, 3, 2];
      heap.heapify(0);

      expect(heap._heap).to.deep.equal([1, 2, 3, 4]);
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
      heap._heap = [1, 2, 3, 4];

      expect(heap.extractMin()).to.equal(1);
      expect(heap._heap).to.deep.equal([2, 4, 3]);
    });
  });
  describe('decreaseKey', () => {
    it('should throw an error if the index is outside the bounds of the heap', () => {
      heap._heap = [10, 20, 30, 40];

      const handler = () => {
        heap.decreaseKey(4, 50);
      };
      expect(handler).to.throw(Error);
      expect(handler).to.throw('Index is outside the bounds of the heap!');
    });
    it('should throw an error if the decrease value is greater than the key', () => {
      heap._heap = [10, 20, 30, 40];

      const handler = () => {
        heap.decreaseKey(3, 50);
      };
      expect(handler).to.throw(Error);
      expect(handler).to.throw('Value is greater than key!');
    });
    it('should throw an error if the value matches the key', () => {
      heap._heap = [1, 2, 3, 4];

      const handler = () => {
        heap.decreaseKey(2, 3);
      };
      expect(handler).to.throw(Error);
      expect(handler).to.throw('Matching values!');
    });
    it('should correctly decrease the key of a particular index and update the heap',
      () => {

    });
  });
  describe('heapInsert', () => {
    it('should correctly insert a key into the heap and update the heap', () => {

    });
    it('should properly handle duplicate values within the heap', () => {

    });
  });
  after(() => {
    heap = null;
    console.log('heap test suite complete, heap = ', heap);
  });
});
