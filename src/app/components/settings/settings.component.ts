import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import * as JokeActions from '../../store/joke.actions';
import { selectRating } from 'src/app/store/joke.selectors';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  private ngDestroyed$ = new Subject();
  public rating: number | undefined;

  constructor(private store$: Store, private dialog: MatDialog) {}

  ngOnInit() {
    this.store$
      .select(selectRating)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((rating) => (this.rating = rating));
  }

  openRatingDialog() {
    this.dialog.open(DialogComponent);
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}

// otwieranie dialogu po wciśnięciu buttona
// utworzyć prosty szablon wyboru oceny w dialogu, po naciśnięciu save zapisanie oceny, po cancel wyłączenie okna
// dodać zmianę ratingu w dialogu za pomocą store
