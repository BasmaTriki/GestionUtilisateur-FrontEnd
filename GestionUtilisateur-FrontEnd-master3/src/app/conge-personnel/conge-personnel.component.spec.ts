import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongePersonnelComponent } from './conge-personnel.component';

describe('CongePersonnelComponent', () => {
  let component: CongePersonnelComponent;
  let fixture: ComponentFixture<CongePersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongePersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
