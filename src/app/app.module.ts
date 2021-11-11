import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { JokeComponent } from './joke/joke.component';
import { JokeService } from './joke/joke.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, JokeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [JokeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
