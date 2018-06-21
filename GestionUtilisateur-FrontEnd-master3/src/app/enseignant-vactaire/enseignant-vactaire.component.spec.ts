import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantVactaireComponent } from './enseignant-vactaire.component';

describe('EnseignantVactaireComponent', () => {
  let component: EnseignantVactaireComponent;
  let fixture: ComponentFixture<EnseignantVactaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnseignantVactaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnseignantVactaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
