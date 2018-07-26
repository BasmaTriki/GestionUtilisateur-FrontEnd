import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterVacataireComponent } from './ajouter-vacataire.component';

describe('AjouterVacataireComponent', () => {
  let component: AjouterVacataireComponent;
  let fixture: ComponentFixture<AjouterVacataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterVacataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterVacataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
