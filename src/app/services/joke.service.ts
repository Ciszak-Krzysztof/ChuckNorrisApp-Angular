import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Joke } from '../models/Joke.model';
import { API } from 'src/app/constants/api';
import { JokeResult } from '../models/JokeResult.model';
import { SaveResult } from '../models/SaveJoke.model';

@Injectable()
export class JokeService {
  constructor(private httpClient: HttpClient) {}

  getRandomJoke(): Observable<Joke> {
    return this.httpClient
      .get<JokeResult>(API.RANDOMJOKE)
      .pipe(map((result) => result.value));
  }

  getCategories(): Observable<String[]> {
    return this.httpClient
      .get<any>(API.CATEGORIES)
      .pipe(map((result) => result.value));
  }

  getJoke(
    category: string,
    firstName: string,
    lastName: string
  ): Observable<Joke> {
    let fetchURL = `${API.RANDOMJOKE}?firstName=${firstName}&lastName=${lastName}&escape=javascript`;
    fetchURL = category === '' ? fetchURL : `${fetchURL}&limitTo=${category}`;
    if (category === '') {
      return this.httpClient
        .get<JokeResult>(fetchURL)
        .pipe(map((result) => result.value));
    } else {
      return this.httpClient
        .get<JokeResult>(fetchURL)
        .pipe(map((result) => result.value));
    }
  }

  getManyJokes(
    category: string,
    firstName: string,
    lastName: string,
    jokesAmount: number
  ): Observable<Joke[]> {
    let fetchURL = `${API.RANDOMJOKE}/${jokesAmount}?firstName=${firstName}&lastName=${lastName}&escape=javascript`;
    fetchURL = category === '' ? fetchURL : `${fetchURL}&limitTo=${category}`;
    if (category === '') {
      return this.httpClient
        .get<SaveResult>(fetchURL)
        .pipe(map((result) => result.value));
    } else {
      return this.httpClient
        .get<SaveResult>(fetchURL)
        .pipe(map((result) => result.value));
    }
  }
}
