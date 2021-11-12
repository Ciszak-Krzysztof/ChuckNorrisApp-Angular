import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite-jokes',
  templateUrl: './favourite-jokes.component.html',
  styleUrls: ['./favourite-jokes.component.css'],
})
export class FavouriteJokesComponent implements OnInit {
  favouriteJokes: string[] = [
    'President Roosevelt once rode his horse 100 miles. Chuck Norris carried his the same distance in half the time.',
    "When Chuck Norris was denied an Egg McMuffin at McDonald's because it was 10:35, he roundhouse kicked the store so hard it became a Wendy's.",
    "Chuck Norris was what Willis was talkin' about.",
    'Chuck Norris causes the Windows Blue Screen of Death.',
  ];

  constructor() {}

  ngOnInit(): void {}
}
