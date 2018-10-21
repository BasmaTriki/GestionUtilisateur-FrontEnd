import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImportationComponent } from './modal-importation.component';

describe('ModalImportationComponent', () => {
  let component: ModalImportationComponent;
  let fixture: ComponentFixture<ModalImportationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImportationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
