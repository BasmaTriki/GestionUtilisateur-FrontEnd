import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEnseignantComponent } from './index-enseignant.component';

describe('IndexEnseignantComponent', () => {
  let component: IndexEnseignantComponent;
  let fixture: ComponentFixture<IndexEnseignantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexEnseignantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
