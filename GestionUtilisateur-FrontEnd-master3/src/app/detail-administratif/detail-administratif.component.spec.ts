import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAdministratifComponent } from './detail-administratif.component';

describe('DetailAdministratifComponent', () => {
  let component: DetailAdministratifComponent;
  let fixture: ComponentFixture<DetailAdministratifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAdministratifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAdministratifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
