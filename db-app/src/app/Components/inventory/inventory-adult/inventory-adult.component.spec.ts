import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAdultComponent } from './inventory-adult.component';

describe('InventoryAdultComponent', () => {
  let component: InventoryAdultComponent;
  let fixture: ComponentFixture<InventoryAdultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryAdultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryAdultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
