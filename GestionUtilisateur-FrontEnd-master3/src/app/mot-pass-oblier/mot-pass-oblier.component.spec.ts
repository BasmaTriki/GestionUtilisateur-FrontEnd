import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotPassOblierComponent } from './mot-pass-oblier.component';

describe('MotPassOblierComponent', () => {
  let component: MotPassOblierComponent;
  let fixture: ComponentFixture<MotPassOblierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotPassOblierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotPassOblierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
