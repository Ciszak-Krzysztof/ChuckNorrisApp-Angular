import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import * as JokeActions from '../../store/joke.actions';

@Component({
  selector: 'app-ratingModal',
  templateUrl: './ratingModal.component.html',
  styleUrls: ['./ratingModal.component.css'],
})
export class RatingModalComponent {
  ratings: number[] = [1, 2, 3, 4, 5];
  public rating = 0;

  constructor(
    private store$: Store,
    private dialogRef: MatDialogRef<RatingModalComponent>
  ) {}

  setRating() {
    this.store$.dispatch(JokeActions.setRating({ rating: this.rating }));
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
