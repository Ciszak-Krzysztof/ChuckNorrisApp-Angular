import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Joke } from '../joke/joke.model';
import { FavouriteJokesService } from './favourite-jokes.service';

@Component({
  selector: 'app-favourite-jokes',
  templateUrl: './favourite-jokes.component.html',
  styleUrls: ['./favourite-jokes.component.css'],
})
export class FavouriteJokesComponent implements OnInit, OnDestroy {
  favouriteJokes: Joke[] = [];
  private subscription!: Subscription;

  constructor(private favouriteService: FavouriteJokesService) {}

  ngOnInit(): void {
    this.favouriteJokes = this.favouriteService.getFavouriteJokes();
    this.subscription = this.favouriteService.jokesChanged.subscribe(
      (jokes: Joke[]) => {
        this.favouriteJokes = jokes;
      }
    );
  }

  onDeleteJoke(index: number) {
    this.favouriteService.deleteFavouriteJoke(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
