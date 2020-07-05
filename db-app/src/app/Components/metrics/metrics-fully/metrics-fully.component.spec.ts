import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsFullyComponent } from './metrics-fully.component';

describe('MetricsFullyComponent', () => {
  let component: MetricsFullyComponent;
  let fixture: ComponentFixture<MetricsFullyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsFullyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsFullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
