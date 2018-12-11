import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SubmitTimeTableComponent } from './submit-time-table/submit-time-table.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { SiteRecommendationComponent } from './site-recommendation/site-recommendation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubmitTimeTableComponent,
    NewsfeedComponent,
    SiteRecommendationComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
