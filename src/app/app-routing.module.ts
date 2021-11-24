import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouriteJokesComponent } from './components/favourite-jokes/favourite-jokes.component';
import { JokeComponent } from './components/joke/joke.component';

const routes: Routes = [
  { path: '', component: JokeComponent },
  { path: 'favourite', component: FavouriteJokesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
