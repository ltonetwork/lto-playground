import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3DiagramViwerComponent } from './d3-diagram-viwer.component';

describe('D3DiagramViwerComponent', () => {
  let component: D3DiagramViwerComponent;
  let fixture: ComponentFixture<D3DiagramViwerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3DiagramViwerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3DiagramViwerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
