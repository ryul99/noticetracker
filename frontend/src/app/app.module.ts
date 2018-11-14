import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SubmitTimeTableComponent } from './submit-time-table/submit-time-table.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { SingleLectureComponent } from './single-lecture/single-lecture.component';
import { AppRoutingModule } from './app-routing.module';
import { SiteRecommendationComponent } from './site-recommendation/site-recommendation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubmitTimeTableComponent,
    NewsfeedComponent,
    SingleLectureComponent,
    SiteRecommendationComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
