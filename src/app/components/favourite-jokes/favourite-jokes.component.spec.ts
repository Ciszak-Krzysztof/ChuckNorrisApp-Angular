import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteJokesComponent } from './favourite-jokes.component';
import * as fromApp from '../../store/app.reducer';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('FavouriteJokesComponent', () => {
  let component: FavouriteJokesComponent;
  let fixture: ComponentFixture<FavouriteJokesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavouriteJokesComponent],
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
    fixture = TestBed.createComponent(FavouriteJokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
