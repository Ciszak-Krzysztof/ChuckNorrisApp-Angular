import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-joke-image',
  templateUrl: './joke-image.component.html',
  styleUrls: ['./joke-image.component.css'],
})
export class JokeImageComponent {
  @Input() isChuck = true;
}
