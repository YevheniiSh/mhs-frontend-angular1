import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonPickerComponent } from './season-picker.component';

describe('SeasonPickerComponent', () => {
  let component: SeasonPickerComponent;
  let fixture: ComponentFixture<SeasonPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeasonPickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
