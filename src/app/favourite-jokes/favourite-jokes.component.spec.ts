import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteJokesComponent } from './favourite-jokes.component';

describe('FavouriteJokesComponent', () => {
  let component: FavouriteJokesComponent;
  let fixture: ComponentFixture<FavouriteJokesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteJokesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteJokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
