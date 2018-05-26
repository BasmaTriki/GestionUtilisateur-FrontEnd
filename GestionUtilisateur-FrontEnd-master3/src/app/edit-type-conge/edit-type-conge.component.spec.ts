import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeCongeComponent } from './edit-type-conge.component';

describe('EditTypeCongeComponent', () => {
  let component: EditTypeCongeComponent;
  let fixture: ComponentFixture<EditTypeCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypeCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
