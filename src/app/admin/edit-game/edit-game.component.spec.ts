import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGameComponent } from './edit-game.component';

describe('EditGameComponent', () => {
  let component: EditGameComponent;
  let fixture: ComponentFixture<EditGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditGameComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
