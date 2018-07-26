import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdministratifComponent } from './edit-administratif.component';

describe('EditAdministratifComponent', () => {
  let component: EditAdministratifComponent;
  let fixture: ComponentFixture<EditAdministratifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdministratifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdministratifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
