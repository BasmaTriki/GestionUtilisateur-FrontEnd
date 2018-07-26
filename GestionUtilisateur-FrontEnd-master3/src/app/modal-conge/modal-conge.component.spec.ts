import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCongeComponent } from './modal-conge.component';

describe('ModalCongeComponent', () => {
  let component: ModalCongeComponent;
  let fixture: ComponentFixture<ModalCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
