import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiedRecipesComponent } from './certified-recipes.component';

describe('CertifiedRecipesComponent', () => {
  let component: CertifiedRecipesComponent;
  let fixture: ComponentFixture<CertifiedRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifiedRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifiedRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
