import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySubadultComponent } from './inventory-subadult.component';

describe('InventorySubadultComponent', () => {
  let component: InventorySubadultComponent;
  let fixture: ComponentFixture<InventorySubadultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorySubadultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorySubadultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
