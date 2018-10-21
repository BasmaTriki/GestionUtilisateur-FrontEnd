import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MutationAdminComponent } from './mutation-admin.component';

describe('MutationAdminComponent', () => {
  let component: MutationAdminComponent;
  let fixture: ComponentFixture<MutationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MutationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
