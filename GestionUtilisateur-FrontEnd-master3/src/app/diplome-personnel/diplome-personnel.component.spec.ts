import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomePersonnelComponent } from './diplome-personnel.component';

describe('DiplomePersonnelComponent', () => {
  let component: DiplomePersonnelComponent;
  let fixture: ComponentFixture<DiplomePersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomePersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
