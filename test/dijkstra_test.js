const expect = require('chai').expect;

const graph = [
  undefined,
  [[3, 1], [4, 4]],
  [],
  [[2, 6], [4, 2]],
  [[2, 3]]
];

describe('DIJKSTRA MAIN FUNCTION', () => {
  describe('dijkstra', () => {
    const dijkstra = require('../dijkstra.js').dijkstra;

    it('should correctly run the dijkstra algorithm', () => {
      expect(dijkstra(graph)).to.eql([undefined, 0, 6, 1, 3]);
    });
  });
});
