import React, { PureComponent } from 'react';

import Graph from '../src';
import wrapNode from '../src/NodeRenderer/NodeTypes/wrapNode';

// import Graph from '../dist/ReactGraph';

const SpecialNode = wrapNode(({ data }) =>
  <div>I am Special!<br />{data.label}</div>
);

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      elements: [
        { data: { id: '1', label: 'Tests', type: 'input' }, position: { x: 0, y: 0 } },
        { data: { id: '2', label: 'This is a node This is a node This is a node This is a node' }, position: { x: 100, y: 100 } },
        { data: { id: '3', label: 'This is a node' }, position: { x: 100, y: 200 }, style: { background: '#222', color: '#fff' } },
        { data: { id: '4', label: 'nody nodes', type: 'output' }, position: { x: 50, y: 300 } },
        { data: { id: '5', label: 'Another node', type: 'output' }, position: { x: 400, y: 300 } },
        { data: { id: '6', label: 'A label', type: 'special' }, position: { x: 400, y: 400 } },
        { data: { source: '1', target: '2' } },
        { data: { source: '2', target: '3' } },
        { data: { source: '3', target: '4' } },
        { data: { source: '3', target: '5' } },
        { data: { source: '5', target: '6' } }
      ]
    }
  }

  onLoad(graphInstance) {
    this.graphInstance = graphInstance;

    console.log('graph loaded:', this.graphInstance);
  }

  onChange(elements) {
    if (!this.graphInstance) {
      return false;
    }
    console.log('graph changed', elements);
  }

  onFitView() {
    if (!this.graphInstance) {
      return false;
    }
    this.graphInstance.fitView();
  }

  onAdd() {
    this.setState(prevState => ({
      ...prevState,
      elements: prevState.elements.concat({ data: { id: (prevState.elements.length + 1).toString(), label: 'added', type: 'input' }, position: { x: 50, y: 50 } })
    }))
  }

  render() {
    return (
      <Graph
        elements={this.state.elements}
        onNodeClick={node => console.log(node)}
        style={{ width: '100%', height: '100%' }}
        onLoad={graphInstance => this.onLoad(graphInstance)}
        onChange={(elements) => this.onChange(elements)}
        nodeTypes={{
          special: SpecialNode
        }}
      >
        <button
          type="button"
          style={{ position: 'absolute', right: '10px', bottom: '10px' }}
          onClick={() => this.onFitView()}
        >
          fit
        </button>
        <button
          type="button"
          style={{ position: 'absolute', bottom: '10px', left: '10px' }}
          onClick={() => this.onAdd()}
        >
          add
        </button>
      </Graph>
    );
  }
}

export default App;