import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnseignantPermanentComponent } from './edit-enseignant-permanent.component';

describe('EditEnseignantPermanentComponent', () => {
  let component: EditEnseignantPermanentComponent;
  let fixture: ComponentFixture<EditEnseignantPermanentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEnseignantPermanentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEnseignantPermanentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
