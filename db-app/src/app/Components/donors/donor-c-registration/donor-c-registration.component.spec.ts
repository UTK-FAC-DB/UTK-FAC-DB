import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorCRegistrationComponent } from './donor-c-registration.component';

describe('DonorCRegistrationComponent', () => {
  let component: DonorCRegistrationComponent;
  let fixture: ComponentFixture<DonorCRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorCRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorCRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
