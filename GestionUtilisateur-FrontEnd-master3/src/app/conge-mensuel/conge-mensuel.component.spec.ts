import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeMensuelComponent } from './conge-mensuel.component';

describe('CongeMensuelComponent', () => {
  let component: CongeMensuelComponent;
  let fixture: ComponentFixture<CongeMensuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongeMensuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
