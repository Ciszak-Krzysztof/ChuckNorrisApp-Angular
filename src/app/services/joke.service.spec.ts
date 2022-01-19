import { JokeService } from './joke.service';
import { HttpClient } from '@angular/common/http';
import { Joke } from '../models/Joke.model';
import { TestBed } from '@angular/core/testing';
import { JokeResult } from '../models/JokeResult.model';
import { of } from 'rxjs';
import { SaveResult } from '../models/SaveJoke.model';

describe('JokeService testing', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let jokeService: JokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [jokeService] });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    jokeService = new JokeService(httpClientSpy);
  });

  it('should return random joke', (done: DoneFn) => {
    const expectedJoke: Joke = { id: 1, joke: 'test joke' };
    const mockedResponse: JokeResult = { type: 'string', value: expectedJoke };

    httpClientSpy.get.and.returnValue(of(mockedResponse));

    jokeService.getRandomJoke().subscribe((joke) => {
      expect(joke).toEqual(expectedJoke);
      done();
    });
  });

  it('should return categories array', (done: DoneFn) => {
    const expectedCategories: string[] = ['nerdy', 'exhibit'];
    const mockedResponse: any = { type: 'string', value: expectedCategories };

    httpClientSpy.get.and.returnValue(of(mockedResponse));

    jokeService.getCategories().subscribe((categories) => {
      expect(categories).toEqual(expectedCategories);
      done();
    });
  });

  it('should return joke', (done: DoneFn) => {
    const expectedJoke: Joke = { id: 1, joke: 'test joke' };
    const mockedResponse: JokeResult = { type: 'string', value: expectedJoke };
    const category = 'exhibit';
    const firstName = 'John';
    const lastName = 'Doe';

    httpClientSpy.get.and.returnValue(of(mockedResponse));

    jokeService.getJoke(category, firstName, lastName).subscribe((joke) => {
      expect(joke).toEqual(expectedJoke);
      done();
    });
  });

  it('should return many jokes', (done: DoneFn) => {
    const expectedJokes: Joke[] = [
      { id: 1, joke: 'test joke' },
      { id: 2, joke: 'test joke 2' },
    ];
    const mockedResponse: SaveResult = { type: 'string', value: expectedJokes };
    const category = 'exhibit';
    const firstName = 'John';
    const lastName = 'Doe';
    const jokesAmount = 2;

    httpClientSpy.get.and.returnValue(of(mockedResponse));

    jokeService
      .getManyJokes(category, firstName, lastName, jokesAmount)
      .subscribe((jokes) => {
        expect(jokes).toEqual(expectedJokes);
        done();
      });
  });
});
