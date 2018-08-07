import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';

declare var dagreD3: any;
declare var d3: any;

@Component({
  selector: 'lto-d3-diagram-viwer',
  templateUrl: './d3-diagram-viwer.component.html',
  styleUrls: ['./d3-diagram-viwer.component.scss']
})
export class D3DiagramViwerComponent implements OnInit, OnChanges {
  @ViewChild('svg') svgRef!: ElementRef<SVGElement>;
  @Input() scenario!: any;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (!this.scenario) {
      return;
    }
    // Create a new directed graph
    const g = new dagreD3.graphlib.Graph().setGraph({});
    const width = 960;
    const height = 600;

    Object.keys(this.scenario.states).forEach(stateName => {
      g.setNode(stateName, { label: stateName });
    });

    Object.keys(this.scenario.states).forEach(stateName => {
      // Go trough transitions and build edges
      const transitions: any[] = this.scenario.states[stateName].transitions;
      transitions.forEach(transition => {
        g.setEdge(stateName, transition.transition, { label: transition.action });
      });
    });

    // Set some general styles
    g.nodes().forEach((v: any) => {
      var node = g.node(v);
      node.rx = node.ry = 5;
    });

    // Add some custom colors based on state
    g.node(':initial').style = 'fill: #7f7';
    g.node(':failed').style = 'fill: #f77';
    g.node(':success').style = 'fill: #7f7';

    var svg = d3.select(this.svgRef.nativeElement),
      inner = svg.select('g');

    svg
      .attr('width', '100%')
      .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
      .attr('preserveAspectRatio', 'xMinYMin');

    // Set up zoom support
    var zoom = d3.zoom().on('zoom', () => {
      inner.attr('transform', d3.event.transform);
    });
    svg.call(zoom);

    // Create the renderer
    var render = new dagreD3.render();

    // Run the renderer. This is what draws the final graph.
    render(inner, g);

    // Center the graph
    var initialScale = 1;
    zoom.scaleExtent([0.1, 8]);
    zoom.scaleTo(svg, initialScale);
  }
}
