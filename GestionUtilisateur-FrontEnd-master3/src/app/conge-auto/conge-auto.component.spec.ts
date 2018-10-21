import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeAutoComponent } from './conge-auto.component';

describe('CongeAutoComponent', () => {
  let component: CongeAutoComponent;
  let fixture: ComponentFixture<CongeAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongeAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
