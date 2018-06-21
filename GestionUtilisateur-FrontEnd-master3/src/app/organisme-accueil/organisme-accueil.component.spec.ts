import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismeAccueilComponent } from './organisme-accueil.component';

describe('OrganismeAccueilComponent', () => {
  let component: OrganismeAccueilComponent;
  let fixture: ComponentFixture<OrganismeAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganismeAccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismeAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
