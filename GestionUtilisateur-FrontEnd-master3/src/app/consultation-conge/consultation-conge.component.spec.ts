import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationCongeComponent } from './consultation-conge.component';

describe('ConsultationCongeComponent', () => {
  let component: ConsultationCongeComponent;
  let fixture: ComponentFixture<ConsultationCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
