import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteAdministrativeComponent } from './poste-administrative.component';

describe('PosteAdministrativeComponent', () => {
  let component: PosteAdministrativeComponent;
  let fixture: ComponentFixture<PosteAdministrativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosteAdministrativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
