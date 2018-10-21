import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEtatComponent } from './liste-etat.component';

describe('ListeEtatComponent', () => {
  let component: ListeEtatComponent;
  let fixture: ComponentFixture<ListeEtatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeEtatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
