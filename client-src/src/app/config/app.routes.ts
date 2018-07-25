import { AboutComponent } from '../about/about.component';
import { AnswerSurveyComponent } from '../answer-survey/answer-survey.component';
import { CreateSurveyComponent } from '../create-survey/create-survey.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { ProfileComponent } from '../profile/profile.component';
import { SurveyDetailComponent } from '../survey-detail/survey-detail.component';
import { SurveyListComponent } from '../survey-list/survey-list.component';
import { WelcomeComponent } from '../welcome/welcome.component';

export const appRoutes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: WelcomeComponent },
  { path: 'create-survey', component: CreateSurveyComponent },
  { path: 'surveys', component: SurveyListComponent },
  { path: 'survey/:id', component: SurveyDetailComponent },
  { path: 'participate/:id', component: AnswerSurveyComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '**', component: NotfoundComponent}
];


