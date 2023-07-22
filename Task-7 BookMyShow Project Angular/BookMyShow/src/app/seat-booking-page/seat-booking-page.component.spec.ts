import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatBookingPageComponent } from './seat-booking-page.component';

describe('SeatBookingPageComponent', () => {
  let component: SeatBookingPageComponent;
  let fixture: ComponentFixture<SeatBookingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeatBookingPageComponent]
    });
    fixture = TestBed.createComponent(SeatBookingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
