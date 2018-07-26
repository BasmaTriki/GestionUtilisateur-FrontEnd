import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelHistoriqueComponent } from './personnel-historique.component';

describe('PersonnelHistoriqueComponent', () => {
  let component: PersonnelHistoriqueComponent;
  let fixture: ComponentFixture<PersonnelHistoriqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelHistoriqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
