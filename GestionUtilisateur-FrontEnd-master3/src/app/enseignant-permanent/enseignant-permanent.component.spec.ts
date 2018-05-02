import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantPermanentComponent } from './enseignant-permanent.component';

describe('EnseignantPermanentComponent', () => {
  let component: EnseignantPermanentComponent;
  let fixture: ComponentFixture<EnseignantPermanentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnseignantPermanentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnseignantPermanentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
