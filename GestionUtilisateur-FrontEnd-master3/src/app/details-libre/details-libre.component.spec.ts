import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLibreComponent } from './details-libre.component';

describe('DetailsLibreComponent', () => {
  let component: DetailsLibreComponent;
  let fixture: ComponentFixture<DetailsLibreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsLibreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsLibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
