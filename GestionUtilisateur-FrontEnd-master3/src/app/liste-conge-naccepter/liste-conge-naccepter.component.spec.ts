import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCongeNaccepterComponent } from './liste-conge-naccepter.component';

describe('ListeCongeNaccepterComponent', () => {
  let component: ListeCongeNaccepterComponent;
  let fixture: ComponentFixture<ListeCongeNaccepterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeCongeNaccepterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCongeNaccepterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
