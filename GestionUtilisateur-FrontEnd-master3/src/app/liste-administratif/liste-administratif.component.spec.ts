import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAdministratifComponent } from './liste-administratif.component';

describe('ListeAdministratifComponent', () => {
  let component: ListeAdministratifComponent;
  let fixture: ComponentFixture<ListeAdministratifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeAdministratifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAdministratifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
