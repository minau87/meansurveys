import { AboutComponent } from '../about/about.component';
import { AnswerSurveyComponent } from '../answer-survey/answer-survey.component';
import { CreateSurveyComponent } from '../create-survey/create-survey.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { ProfileComponent } from '../profile/profile.component';
import { SurveyDetailComponent } from '../survey-detail/survey-detail.component';
import { SurveyListComponent } from '../survey-list/survey-list.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { RegisterComponent} from '../register/register.component';
import { LoginComponent } from '../login/login.component';

// Import the guards
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

export const appRoutes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: WelcomeComponent },
  { path: 'create-survey', component: CreateSurveyComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'surveys', component: SurveyListComponent, canActivate: [AuthGuard] },
  { path: 'survey/:id', component: SurveyDetailComponent, canActivate: [AuthGuard] },
  { path: 'participate/:id', component: AnswerSurveyComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  // { path: 'profile', component: ProfileComponent },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', component: NotfoundComponent}
];


