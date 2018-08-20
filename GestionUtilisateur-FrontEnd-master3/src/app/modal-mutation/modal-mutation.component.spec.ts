import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMutationComponent } from './modal-mutation.component';

describe('ModalMutationComponent', () => {
  let component: ModalMutationComponent;
  let fixture: ComponentFixture<ModalMutationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMutationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
