import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var dagreD3: any;
declare var d3: any;

@Component({
  selector: 'lto-d3-diagram-viwer',
  templateUrl: './d3-diagram-viwer.component.html',
  styleUrls: ['./d3-diagram-viwer.component.scss']
})
export class D3DiagramViwerComponent implements OnInit {
  @ViewChild('svg') svgRef!: ElementRef<SVGElement>;
  @Input() scenario!: any;

  constructor() {}

  ngOnInit() {
    // Create a new directed graph
    const g = new dagreD3.graphlib.Graph().setGraph({});
    const width = 960;
    const height = 600;

    // States and transitions from RFC 793
    var states = [
      'CLOSED',
      'LISTEN',
      'SYN RCVD',
      'SYN SENT',
      'ESTAB',
      'FINWAIT-1',
      'CLOSE WAIT',
      'FINWAIT-2',
      'CLOSING',
      'LAST-ACK',
      'TIME WAIT'
    ];

    // Automatically label each of the nodes
    states.forEach(state => {
      g.setNode(state, { label: state });
    });

    // Set up the edges
    g.setEdge('CLOSED', 'LISTEN', { label: 'open' });
    g.setEdge('LISTEN', 'SYN RCVD', { label: 'rcv SYN' });
    g.setEdge('LISTEN', 'SYN SENT', { label: 'send' });
    g.setEdge('LISTEN', 'CLOSED', { label: 'close' });
    g.setEdge('SYN RCVD', 'FINWAIT-1', { label: 'close' });
    g.setEdge('SYN RCVD', 'ESTAB', { label: 'rcv ACK of SYN' });
    g.setEdge('SYN SENT', 'SYN RCVD', { label: 'rcv SYN' });
    g.setEdge('SYN SENT', 'ESTAB', { label: 'rcv SYN, ACK' });
    g.setEdge('SYN SENT', 'CLOSED', { label: 'close' });
    g.setEdge('ESTAB', 'FINWAIT-1', { label: 'close' });
    g.setEdge('ESTAB', 'CLOSE WAIT', { label: 'rcv FIN' });
    g.setEdge('FINWAIT-1', 'FINWAIT-2', { label: 'rcv ACK of FIN' });
    g.setEdge('FINWAIT-1', 'CLOSING', { label: 'rcv FIN' });
    g.setEdge('CLOSE WAIT', 'LAST-ACK', { label: 'close' });
    g.setEdge('FINWAIT-2', 'TIME WAIT', { label: 'rcv FIN' });
    g.setEdge('CLOSING', 'TIME WAIT', { label: 'rcv ACK of FIN' });
    g.setEdge('LAST-ACK', 'CLOSED', { label: 'rcv ACK of FIN' });
    g.setEdge('TIME WAIT', 'CLOSED', { label: 'timeout=2MSL' });

    // Set some general styles
    g.nodes().forEach((v: any) => {
      var node = g.node(v);
      node.rx = node.ry = 5;
    });

    // Add some custom colors based on state
    g.node('CLOSED').style = 'fill: #f77';
    g.node('ESTAB').style = 'fill: #7f7';

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
    var initialScale = 0.75;
    zoom.scaleExtent([0.1, 8]);
    // zoom.translateBy(svg, (svg.attr('width') - g.graph().width * initialScale) / 2, 0);
    zoom.scaleTo(svg, initialScale);
    svg.attr('height', g.graph().height * initialScale + 40);
  }
}
