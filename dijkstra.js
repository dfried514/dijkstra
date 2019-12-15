const lineReader = require('line-reader');
const MinHeap = require('./heap/minHeap.js').MinHeap;
const MAX_EDGE_LENGTH = 1000000;

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
const graph = [
  undefined,
  [[3, 1], [4, 4]],
  [],
  [[2, 6], [4, 2]],
  [[2, 3]]
];
const heap = new MinHeap(graphCompare, graphMaxValue, graphSetValue);

const initializeHeap = graph => {
  heap.insert([1, 0]);
  heap._heapHandlers[0] = null;
  heap._heapHandlers[1] = 0;

  for (let i = 2; i < graph.length; i++) {
    heap.insert([i, MAX_EDGE_LENGTH]);
    heap._heapHandlers[i] = i - 1;
  }
};
const dijkstra = graph => {
  const output = [];
  initializeHeap(graph);

  while (heap._heap.length > 0) {
    let curVertex = heap.extractMin();
    output[curVertex[0]] = curVertex[1];
    let curEdges = graph[curVertex[0]];
    curEdges.forEach(edge => {
      if (heap._heapHandlers[edge[0]]) {
        heap.decreaseKey(heap._heapHandlers[edge[0]], edge[1] + curVertex[1]);
      }
    });
  }
  return output;
};
const app = () => {
  const graph = [];
  lineReader.eachLine('./data/dijkstra.txt', function(line, last) {
    let curLineArray = line.trim().split(' ')[0].split('\t');
    let curVertex = parseInt(curLineArray[0]);
    graph[curVertex] = [];

    for(let i = 1; i < curLineArray.length; i++) {
      let curEdgeArray = curLineArray[i].split(',');
      graph[curVertex].push(curEdgeArray.map(x => parseInt(x)));
    }
    if(last){
      console.log(dijkstra(graph));
    }
  });
};
app();

module.exports = { dijkstra };
