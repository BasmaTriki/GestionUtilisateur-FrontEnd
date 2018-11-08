import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFonctionnaireComponent } from './details-fonctionnaire.component';

describe('DetailsFonctionnaireComponent', () => {
  let component: DetailsFonctionnaireComponent;
  let fixture: ComponentFixture<DetailsFonctionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsFonctionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFonctionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
