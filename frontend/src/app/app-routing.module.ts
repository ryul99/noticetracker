import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SubmitTimeTableComponent } from './submit-time-table/submit-time-table.component';
import { SiteRecomendationComponent } from './site-recomendation/site-recomendation.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'submit_time_table', component: SubmitTimeTableComponent },
  { path: 'newsfeed', component: NewsfeedComponent },
  { path: 'site_recomendation', component: SiteRecomendationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
