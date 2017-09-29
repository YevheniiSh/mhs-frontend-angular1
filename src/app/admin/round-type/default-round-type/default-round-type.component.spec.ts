import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultRoundTypeComponent} from './default-round-type.component';

describe('DefaultRoundTypeComponent', () => {
  let component: DefaultRoundTypeComponent;
  let fixture: ComponentFixture<DefaultRoundTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultRoundTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultRoundTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
