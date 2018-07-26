import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVacationComponent } from './modal-vacation.component';

describe('ModalVacationComponent', () => {
  let component: ModalVacationComponent;
  let fixture: ComponentFixture<ModalVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
