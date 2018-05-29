import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AGradeComponent } from './a-grade.component';

describe('AGradeComponent', () => {
  let component: AGradeComponent;
  let fixture: ComponentFixture<AGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
