import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelCongeComponent } from './personnel-conge.component';

describe('PersonnelCongeComponent', () => {
  let component: PersonnelCongeComponent;
  let fixture: ComponentFixture<PersonnelCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
