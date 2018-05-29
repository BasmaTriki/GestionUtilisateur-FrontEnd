import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPosteAdministrativeComponent } from './edit-poste-administrative.component';

describe('EditPosteAdministrativeComponent', () => {
  let component: EditPosteAdministrativeComponent;
  let fixture: ComponentFixture<EditPosteAdministrativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPosteAdministrativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPosteAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
