import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMutationComponent } from './liste-mutation.component';

describe('ListeMutationComponent', () => {
  let component: ListeMutationComponent;
  let fixture: ComponentFixture<ListeMutationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeMutationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
