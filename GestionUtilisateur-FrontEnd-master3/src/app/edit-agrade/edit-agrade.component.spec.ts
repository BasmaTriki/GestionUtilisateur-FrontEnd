import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAgradeComponent } from './edit-agrade.component';

describe('EditAgradeComponent', () => {
  let component: EditAgradeComponent;
  let fixture: ComponentFixture<EditAgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
