import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCongeRattrapeComponent } from './liste-conge-rattrape.component';

describe('ListeCongeRattrapeComponent', () => {
  let component: ListeCongeRattrapeComponent;
  let fixture: ComponentFixture<ListeCongeRattrapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeCongeRattrapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCongeRattrapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
