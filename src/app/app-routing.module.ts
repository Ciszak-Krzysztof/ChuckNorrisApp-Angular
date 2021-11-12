import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouriteJokesComponent } from './favourite-jokes/favourite-jokes.component';
import { JokeComponent } from './joke/joke.component';

const routes: Routes = [
  { path: '', component: JokeComponent },
  { path: 'favourite', component: FavouriteJokesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
