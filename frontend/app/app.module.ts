import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SubmitTimeTableComponent } from './submit-time-table/submit-time-table.component';
import { SiteComponent } from './site/site.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { SingleLectureComponent } from './single-lecture/single-lecture.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubmitTimeTableComponent,
    SiteComponent,
    NewsfeedComponent,
    SingleLectureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
