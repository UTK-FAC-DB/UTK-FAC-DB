import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCremationComponent } from './inventory-cremation.component';

describe('InventoryCremationComponent', () => {
  let component: InventoryCremationComponent;
  let fixture: ComponentFixture<InventoryCremationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryCremationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCremationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
