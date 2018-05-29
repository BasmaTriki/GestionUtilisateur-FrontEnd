import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCongeComponent } from './historique-conge.component';

describe('HistoriqueCongeComponent', () => {
  let component: HistoriqueCongeComponent;
  let fixture: ComponentFixture<HistoriqueCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
