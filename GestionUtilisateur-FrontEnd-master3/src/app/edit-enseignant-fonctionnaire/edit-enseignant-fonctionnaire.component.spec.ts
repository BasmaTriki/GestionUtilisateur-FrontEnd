import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnseignantFonctionnaireComponent } from './edit-enseignant-fonctionnaire.component';

describe('EditEnseignantFonctionnaireComponent', () => {
  let component: EditEnseignantFonctionnaireComponent;
  let fixture: ComponentFixture<EditEnseignantFonctionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEnseignantFonctionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEnseignantFonctionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
