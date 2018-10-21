import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeAdminComponent } from './conge-admin.component';

describe('CongeAdminComponent', () => {
  let component: CongeAdminComponent;
  let fixture: ComponentFixture<CongeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
