import { Component, OnInit } from '@angular/core';
import { Joke } from '../../models/Joke.model';

import { FavouriteJokesService } from '../../services/favourite-jokes.service';

@Component({
  selector: 'app-favourite-jokes',
  templateUrl: './favourite-jokes.component.html',
  styleUrls: ['./favourite-jokes.component.css'],
})
export class FavouriteJokesComponent implements OnInit {
  public isLoading: boolean = false;
  public favouriteJokes: Joke[] = [];

  constructor(private favouriteService: FavouriteJokesService) {}

  ngOnInit(): void {
    this.favouriteJokes = this.favouriteService.getFavouriteJokes();
  }

  onDeleteJoke(index: number): void {
    this.favouriteService.deleteFavouriteJoke(index);
  }
}
