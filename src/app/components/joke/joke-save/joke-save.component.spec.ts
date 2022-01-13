import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { JokeSaveComponent } from './joke-save.component';
import * as fromApp from '../../../store/app.reducer';
import { JokeComponent } from '../joke.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

describe('JokeSaveComponent', () => {
  let component: JokeSaveComponent;
  let fixture: ComponentFixture<JokeSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JokeSaveComponent],
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
      providers: [JokeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
