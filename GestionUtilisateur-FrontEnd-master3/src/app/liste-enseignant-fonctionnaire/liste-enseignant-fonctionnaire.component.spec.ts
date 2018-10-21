import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEnseignantFonctionnaireComponent } from './liste-enseignant-fonctionnaire.component';

describe('ListeEnseignantFonctionnaireComponent', () => {
  let component: ListeEnseignantFonctionnaireComponent;
  let fixture: ComponentFixture<ListeEnseignantFonctionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeEnseignantFonctionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEnseignantFonctionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
