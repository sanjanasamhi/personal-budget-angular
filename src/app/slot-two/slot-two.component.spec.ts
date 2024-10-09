import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotTwoComponent } from './slot-two.component';

describe('SlotTwoComponent', () => {
  let component: SlotTwoComponent;
  let fixture: ComponentFixture<SlotTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlotTwoComponent]
    });
    fixture = TestBed.createComponent(SlotTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
