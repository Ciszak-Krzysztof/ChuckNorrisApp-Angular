import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material/dialog';
import { selectRating } from 'src/app/store/joke.selectors';
import { RatingModalComponent } from '../ratingModal/ratingModal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  public rating$: Observable<number> | undefined;

  constructor(private store$: Store, private ratingModal: MatDialog) {}

  ngOnInit() {
    this.rating$ = this.store$.select(selectRating);
  }

  openRatingDialog() {
    this.ratingModal.open(RatingModalComponent);
  }
}
