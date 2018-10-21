import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantContractuelleComponent } from './enseignant-contractuelle.component';

describe('EnseignantContractuelleComponent', () => {
  let component: EnseignantContractuelleComponent;
  let fixture: ComponentFixture<EnseignantContractuelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnseignantContractuelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnseignantContractuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
