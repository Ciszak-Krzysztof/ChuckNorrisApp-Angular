import { JokeService } from './joke.service';
import { HttpClient } from '@angular/common/http';
import { Joke } from '../models/Joke.model';
import { defer } from 'rxjs';

describe('JokeService testing', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let jokeService: JokeService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    jokeService = new JokeService(httpClientSpy);
  });

  it('should return random joke', (done: DoneFn) => {
    const expectedJoke: Joke = { id: 1, joke: 'test joke' };

    httpClientSpy.get.and.returnValue(asyncData(expectedJoke));

    jokeService.getRandomJoke().subscribe((joke) => {
      expect(joke).toEqual(expectedJoke);
      done();
    });
  });
});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
