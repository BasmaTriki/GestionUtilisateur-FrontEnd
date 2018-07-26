import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationVacationComponent } from './consultation-vacation.component';

describe('ConsultationVacationComponent', () => {
  let component: ConsultationVacationComponent;
  let fixture: ComponentFixture<ConsultationVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
