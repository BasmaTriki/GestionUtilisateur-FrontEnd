import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfantsComponent } from './enfants.component';

describe('EnfantsComponent', () => {
  let component: EnfantsComponent;
  let fixture: ComponentFixture<EnfantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnfantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
