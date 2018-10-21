import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnseignantContractuelComponent } from './edit-enseignant-contractuel.component';

describe('EditEnseignantContractuelComponent', () => {
  let component: EditEnseignantContractuelComponent;
  let fixture: ComponentFixture<EditEnseignantContractuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEnseignantContractuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEnseignantContractuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
