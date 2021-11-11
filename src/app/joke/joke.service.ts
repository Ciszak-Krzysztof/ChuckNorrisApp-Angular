import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Joke } from './joke.model';
import { RequestResult } from './RequestResult.model';

@Injectable()
export class JokeService {
  baseUrl: string = 'http://api.icndb.com/jokes/';

  constructor(private httpClient: HttpClient) {}

  getRandomJoke(): Observable<Joke> {
    return this.httpClient
      .get<RequestResult>(this.baseUrl + 'random?escape=javascript')
      .pipe(map((result) => result.value));
  }
}
