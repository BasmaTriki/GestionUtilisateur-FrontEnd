import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEnseignantVacataireComponent } from './liste-enseignant-vacataire.component';

describe('ListeEnseignantVacataireComponent', () => {
  let component: ListeEnseignantVacataireComponent;
  let fixture: ComponentFixture<ListeEnseignantVacataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeEnseignantVacataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEnseignantVacataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
