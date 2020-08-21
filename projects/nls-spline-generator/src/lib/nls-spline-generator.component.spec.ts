import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlsSplineGeneratorComponent } from './nls-spline-generator.component';

describe('NlsSplineGeneratorComponent', () => {
  let component: NlsSplineGeneratorComponent;
  let fixture: ComponentFixture<NlsSplineGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlsSplineGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlsSplineGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
