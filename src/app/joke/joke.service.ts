import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Joke } from './joke.model';
import { jokeResult } from './jokeResult.model';

@Injectable()
export class JokeService {
  baseUrl: string = 'http://api.icndb.com/';

  constructor(private httpClient: HttpClient) {}

  getRandomJoke(): Observable<Joke> {
    return this.httpClient
      .get<jokeResult>(this.baseUrl + 'jokes/random?escape=javascript')
      .pipe(map((result) => result.value));
  }

  getCategories(): Observable<String[]> {
    return this.httpClient
      .get<any>(this.baseUrl + 'categories')
      .pipe(map((result) => result.value));
  }

  getJoke(category: string, firstName: string, lastName: string) {
    if (category === '') {
      return this.httpClient
        .get<jokeResult>(
          `${this.baseUrl}jokes/random?firstName=${firstName}&lastName=${lastName}&escape=javascript`
        )
        .pipe(map((result) => result.value));
    } else {
      return this.httpClient
        .get<jokeResult>(
          `${this.baseUrl}jokes/random?firstName=${firstName}&lastName=${lastName}&limitTo=${category}&escape=javascript`
        )
        .pipe(map((result) => result.value));
    }
  }
}
