import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportJsonComponent } from './import-json.component';

describe('ImportJsonComponent', () => {
  let component: ImportJsonComponent;
  let fixture: ComponentFixture<ImportJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
