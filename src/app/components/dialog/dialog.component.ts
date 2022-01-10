import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import * as JokeActions from '../../store/joke.actions';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  ratings: number[] = [1, 2, 3, 4, 5];
  public rating = 0;

  constructor(private store$: Store, private dialog: MatDialog) {}

  setRating() {
    this.store$.dispatch(JokeActions.setRating({ rating: this.rating }));
    this.dialog.closeAll();
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
