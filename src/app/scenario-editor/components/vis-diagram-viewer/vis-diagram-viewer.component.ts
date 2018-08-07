import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var vis: any;

@Component({
  selector: 'lto-vis-diagram-viewer',
  templateUrl: './vis-diagram-viewer.component.html',
  styleUrls: ['./vis-diagram-viewer.component.scss']
})
export class VisDiagramViewerComponent implements OnInit {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @Input() scenario!: any;

  constructor() {}

  ngOnInit() {
    // Our nodes are states
    const nodes: any = Object.keys(this.scenario.states).map(stateName => {
      return {
        id: stateName,
        label: stateName
      };
    });
    // Edges are transitions inside states
    const edges: any = Object.keys(this.scenario.states).reduce(
      (edges, stateName) => {
        // Go trough transitions and build edges
        const transitions: any[] = this.scenario.states[stateName].transitions;

        const stateEdges = transitions.map(transition => {
          return {
            from: stateName,
            to: transition.transition,
            label: transition.action
          };
        });

        return [...edges, ...stateEdges];
      },
      [] as any[]
    );

    // create a network
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {
      physics: false,
      layout: {
        hierarchical: {
          enabled: true,
          nodeSpacing: 200
        }
      }
    };
    var network = new vis.Network(this.container.nativeElement, data, options);
  }
}
