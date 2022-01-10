import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as JokeActions from '../../../store/joke.actions';
import { selectCategories } from 'src/app/store/joke.selectors';

@Component({
  selector: 'app-joke-category',
  templateUrl: './joke-category.component.html',
  styleUrls: ['./joke-category.component.css'],
})
export class JokeCategoryComponent implements OnInit {
  @Output() selectedCategory = new EventEmitter<string>();

  public categories$: Observable<string[]> | undefined;

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.store$.dispatch(JokeActions.getCategories());
    this.categories$ = this.store$.select(selectCategories);
  }

  onValueChanged(selected: string): void {
    this.selectedCategory.emit(selected);
  }
}
