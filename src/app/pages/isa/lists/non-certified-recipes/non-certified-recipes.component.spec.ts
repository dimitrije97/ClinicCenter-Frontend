import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonCertifiedRecipesComponent } from './non-certified-recipes.component';

describe('NonCertifiedRecipesComponent', () => {
  let component: NonCertifiedRecipesComponent;
  let fixture: ComponentFixture<NonCertifiedRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonCertifiedRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonCertifiedRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
