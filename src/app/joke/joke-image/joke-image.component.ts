import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-joke-image',
  templateUrl: './joke-image.component.html',
  styleUrls: ['./joke-image.component.css'],
})
export class JokeImageComponent implements OnInit {
  @Input() isChuck: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
