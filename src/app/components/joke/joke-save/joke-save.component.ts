import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { Joke } from 'src/app/models/Joke.model';
import { JokeComponent } from '../joke.component';
import * as JokeActions from '../../../store/joke.actions';

@Component({
  selector: 'app-joke-save',
  templateUrl: './joke-save.component.html',
  styleUrls: ['./joke-save.component.css'],
})
export class JokeSaveComponent implements OnDestroy {
  private ngDestroyed$ = new Subject();
  public jokesAmount = 0;
  public savedJokes: Joke[] = [];

  constructor(private store$: Store, private joke: JokeComponent) {}

  saveJokes(): void {
    this.joke.isLoading = true;
    if (this.joke.impersonateName.length !== 0) {
      this.joke.isChuck = false;
      this.joke.firstName = this.joke.impersonateName.split(' ')[0];
      this.joke.lastName = this.joke.impersonateName.split(' ')[1] ?? '';
    } else {
      this.joke.isChuck = true;
      this.joke.firstName = 'Chuck';
      this.joke.lastName = 'Norris';
    }
    this.store$.dispatch(
      JokeActions.getManyJokes({
        category: this.joke.selectedCategory,
        firstName: this.joke.firstName,
        lastName: this.joke.lastName,
        jokesAmount: this.jokesAmount,
      })
    );
  }

  onAddJokesAmount(): void {
    if (this.jokesAmount < 100) {
      this.jokesAmount++;
    }
  }

  onReduceJokesAmount(): void {
    if (this.jokesAmount > 0) {
      this.jokesAmount--;
    }
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
