import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisDiagramViewerComponent } from './vis-diagram-viewer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VisDiagramViewerComponent],
  exports: [VisDiagramViewerComponent]
})
export class VisDiagramViewerModule {}
