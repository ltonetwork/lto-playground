import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisDiagramViewerComponent } from './vis-diagram-viewer.component';

describe('VisDiagramViewerComponent', () => {
  let component: VisDiagramViewerComponent;
  let fixture: ComponentFixture<VisDiagramViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisDiagramViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisDiagramViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
