import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnseignantLibreComponent } from './edit-enseignant-libre.component';

describe('EditEnseignantLibreComponent', () => {
  let component: EditEnseignantLibreComponent;
  let fixture: ComponentFixture<EditEnseignantLibreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEnseignantLibreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEnseignantLibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
