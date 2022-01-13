import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { JokeCategoryComponent } from './joke-category.component';
import * as fromApp from '../../../store/app.reducer';
import { HttpLoaderFactory } from 'src/app/app.module';

describe('JokeCategoryComponent', () => {
  let component: JokeCategoryComponent;
  let fixture: ComponentFixture<JokeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JokeCategoryComponent],
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
    fixture = TestBed.createComponent(JokeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
