import { Component, Input } from '@angular/core';

@Component({
  selector: 'lto-static',
  templateUrl: './static.component.html'
})
export class StaticComponent {
  @Input() definition!: any;
}
