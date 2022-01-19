import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { JokeComponent } from './joke.component';
import * as fromApp from '../../store/app.reducer';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';

describe('JokeComponent', () => {
  let component: JokeComponent;
  let fixture: ComponentFixture<JokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JokeComponent],
      imports: [
        StoreModule.forRoot(fromApp.appReducer),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
          defaultLanguage: 'en',
        }),
        HttpClientModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isFavouriteJoke', () => {
    component.isFavourite = false;
    expect(component.isFavourite).toBe(false);
    component.onToggleFavourite();
    expect(component.isFavourite).toBe(true);
    component.onToggleFavourite();
    expect(component.isFavourite).toBe(false);
  });

  it('should select category', () => {
    component.selectedCategory = 'category';
    component.selectCategory('nerdy');
    expect(component.selectedCategory).toBe('nerdy');
  });

  it('should dispatch getJoke action', () => {
    const storeSpy = spyOn(component.store$, 'dispatch').and.callThrough();
    component.fetchJoke();
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalled();
  });
});
