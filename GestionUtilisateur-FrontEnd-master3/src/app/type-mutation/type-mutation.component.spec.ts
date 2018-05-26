import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMutationComponent } from './type-mutation.component';

describe('TypeMutationComponent', () => {
  let component: TypeMutationComponent;
  let fixture: ComponentFixture<TypeMutationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeMutationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
