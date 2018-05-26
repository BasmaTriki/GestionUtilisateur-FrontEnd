import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMutationComponent } from './edit-mutation.component';

describe('EditMutationComponent', () => {
  let component: EditMutationComponent;
  let fixture: ComponentFixture<EditMutationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMutationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
