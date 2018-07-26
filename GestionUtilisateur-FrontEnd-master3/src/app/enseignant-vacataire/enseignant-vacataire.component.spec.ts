import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantVacataireComponent } from './enseignant-vacataire.component';

describe('EnseignantVacataireComponent', () => {
  let component: EnseignantVacataireComponent;
  let fixture: ComponentFixture<EnseignantVacataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnseignantVacataireComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnseignantVacataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
