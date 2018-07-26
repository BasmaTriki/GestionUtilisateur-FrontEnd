import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepriseCongeComponent } from './reprise-conge.component';

describe('RepriseCongeComponent', () => {
  let component: RepriseCongeComponent;
  let fixture: ComponentFixture<RepriseCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepriseCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepriseCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
