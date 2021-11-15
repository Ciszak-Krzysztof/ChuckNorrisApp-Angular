import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Joke } from '../models/joke.model';
import { baseURL } from 'src/constants/api';
import { JokeResult } from '../models/JokeResult.model';

@Injectable()
export class JokeService {
  constructor(private httpClient: HttpClient) {}

  getRandomJoke(): Observable<Joke> {
    return this.httpClient
      .get<JokeResult>(baseURL + 'jokes/random?escape=javascript')
      .pipe(map((result) => result.value));
  }

  getCategories(): Observable<String[]> {
    return this.httpClient
      .get<any>(baseURL + 'categories')
      .pipe(map((result) => result.value));
  }

  getJoke(
    category: string,
    firstName: string,
    lastName: string
  ): Observable<Joke> {
    if (category === '') {
      return this.httpClient
        .get<JokeResult>(
          `${baseURL}jokes/random?firstName=${firstName}&lastName=${lastName}&escape=javascript`
        )
        .pipe(map((result) => result.value));
    } else {
      return this.httpClient
        .get<JokeResult>(
          `${baseURL}jokes/random?firstName=${firstName}&lastName=${lastName}&limitTo=${category}&escape=javascript`
        )
        .pipe(map((result) => result.value));
    }
  }
}
