import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Joke } from '../models/Joke.model';

import { FavouriteJokesService } from '../services/favourite-jokes.service';

@Component({
  selector: 'app-favourite-jokes',
  templateUrl: './favourite-jokes.component.html',
  styleUrls: ['./favourite-jokes.component.css'],
})
export class FavouriteJokesComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public favouriteJokes: Joke[] = [];
  private subscription!: Subscription;

  constructor(private favouriteService: FavouriteJokesService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.favouriteJokes = this.favouriteService.getFavouriteJokes();
    this.subscription = this.favouriteService.jokesChanged.subscribe(
      (jokes: Joke[]) => {
        this.favouriteJokes = jokes;
      }
    );
    setTimeout(() => {
      this.isLoading = false;
    }, 250);
  }

  onDeleteJoke(index: number): void {
    this.favouriteService.deleteFavouriteJoke(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
