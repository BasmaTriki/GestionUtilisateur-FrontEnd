import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCorpsComponent } from './edit-corps.component';

describe('EditCorpsComponent', () => {
  let component: EditCorpsComponent;
  let fixture: ComponentFixture<EditCorpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCorpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCorpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
