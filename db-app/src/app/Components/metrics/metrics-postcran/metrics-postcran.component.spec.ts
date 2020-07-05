import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsPostcranComponent } from './metrics-postcran.component';

describe('MetricsPostcranComponent', () => {
  let component: MetricsPostcranComponent;
  let fixture: ComponentFixture<MetricsPostcranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsPostcranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsPostcranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
