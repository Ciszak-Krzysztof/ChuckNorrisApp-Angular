import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JokeService } from 'src/app/services/joke.service';

@Component({
  selector: 'app-joke-category',
  templateUrl: './joke-category.component.html',
  styleUrls: ['./joke-category.component.css'],
})
export class JokeCategoryComponent implements OnInit {
  @Output() selectedCategory = new EventEmitter<string>();

  public categories: String[] = [];

  constructor(private jokeService: JokeService) {}

  ngOnInit(): void {
    this.jokeService.getCategories().subscribe((categories: String[]) => {
      this.categories = categories;
    });
  }

  public onValueChanged(selected: string): void {
    this.selectedCategory.emit(selected);
  }
}
