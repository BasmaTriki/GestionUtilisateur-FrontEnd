import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeMutationComponent } from './edit-type-mutation.component';

describe('EditTypeMutationComponent', () => {
  let component: EditTypeMutationComponent;
  let fixture: ComponentFixture<EditTypeMutationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypeMutationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeMutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
