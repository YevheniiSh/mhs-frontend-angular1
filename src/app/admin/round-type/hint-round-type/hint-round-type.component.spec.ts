import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HintRoundTypeComponent} from './hint-round-type.component';

describe('HintRoundTypeComponent', () => {
  let component: HintRoundTypeComponent;
  let fixture: ComponentFixture<HintRoundTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HintRoundTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HintRoundTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
