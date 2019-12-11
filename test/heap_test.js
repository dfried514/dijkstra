const expect = require('chai').expect;

describe('defaultCompare', () => {
  const defaultCompare = require('../heap/minHeap.js').defaultCompare;

  it('should correctly compare two numbers', () => {
    const a = 3;
    const b = 4;

    expect(defaultCompare(a, b)).to.equal(-1);
    expect(defaultCompare(b, a)).to.equal(1);
    expect(defaultCompare(a, a)).to.equal(0);
  });
});

describe('heapify', () => {
  let MinHeap = require('../heap/minHeap.js').MinHeap;
  let heap = new MinHeap();

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
