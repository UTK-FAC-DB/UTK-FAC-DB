import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordPopUpComponent } from './password-pop-up.component';

describe('PasswordPopUpComponent', () => {
  let component: PasswordPopUpComponent;
  let fixture: ComponentFixture<PasswordPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
