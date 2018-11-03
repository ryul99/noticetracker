import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SubmitTimeTableComponent } from './submit-time-table/submit-time-table.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { SingleLectureComponent } from './single-lecture/single-lecture.component';
import { AppRoutingModule } from './app-routing.module';
import { SiteRecomendationComponent } from './site-recomendation/site-recomendation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubmitTimeTableComponent,
    NewsfeedComponent,
    SingleLectureComponent,
    SiteRecomendationComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
