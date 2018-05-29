import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEnseignantPermanentComponent } from './liste-enseignant-permanent.component';

describe('ListeEnseignantPermanentComponent', () => {
  let component: ListeEnseignantPermanentComponent;
  let fixture: ComponentFixture<ListeEnseignantPermanentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeEnseignantPermanentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEnseignantPermanentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
