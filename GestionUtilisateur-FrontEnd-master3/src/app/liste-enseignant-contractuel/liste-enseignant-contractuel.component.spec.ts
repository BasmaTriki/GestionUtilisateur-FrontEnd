import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEnseignantContractuelComponent } from './liste-enseignant-contractuel.component';

describe('ListeEnseignantContractuelComponent', () => {
  let component: ListeEnseignantContractuelComponent;
  let fixture: ComponentFixture<ListeEnseignantContractuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeEnseignantContractuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEnseignantContractuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
