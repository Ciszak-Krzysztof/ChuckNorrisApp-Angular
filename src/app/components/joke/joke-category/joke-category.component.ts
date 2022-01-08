import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as JokeActions from '../../../store/joke.actions';
import { selectCategories } from 'src/app/store/joke.selectors';

@Component({
  selector: 'app-joke-category',
  templateUrl: './joke-category.component.html',
  styleUrls: ['./joke-category.component.css'],
})
export class JokeCategoryComponent implements OnInit, OnDestroy {
  private ngDestroyed$ = new Subject();
  @Output() selectedCategory = new EventEmitter<string>();

  public categories: string[] = [];

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.store$.dispatch(JokeActions.getCategories());
    this.store$
      .select(selectCategories)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  public onValueChanged(selected: string): void {
    this.selectedCategory.emit(selected);
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
