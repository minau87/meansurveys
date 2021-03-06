// Import of Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ngx-highlightjs
import { HighlightModule } from 'ngx-highlightjs';

// Component imports
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { AnswerSurveyComponent } from './answer-survey/answer-survey.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { NotfoundComponent } from './notfound/notfound.component';

// Service imports
import { SurveyService } from './services/survey.service';
import { AuthService } from './services/auth.service';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

// Material Design Modules
import { MdComponentsModule } from './md-components.module';
import { WelcomeComponent } from './welcome/welcome.component';

// Import the routes
import { appRoutes } from './config/app.routes';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

// Import the route guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AvatarUploadComponent } from './profile/avatar-upload/avatar-upload.component';
import { AddQuestionComponent } from './create-survey/add-question/add-question.component';

// @oauth/angular-jwt
export function tokenGetter() {
  // console.log('tokenGetter:', localStorage.getItem('id_token'));
  return localStorage.getItem('id_token');
}

// Highlightjs options
const hsjsOptions = {
  theme: 'agate'
};

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// Main application module. Bundles all the relevant components and makes them available.
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SurveyListComponent,
    SurveyDetailComponent,
    CreateSurveyComponent,
    AnswerSurveyComponent,
    ProfileComponent,
    AboutComponent,
    NotfoundComponent,
    WelcomeComponent,
    RegisterComponent,
    LoginComponent,
    AvatarUploadComponent,
    AddQuestionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    BrowserAnimationsModule,
    MdComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        authScheme: 'bearer'
      }
    }),
    HighlightModule.forRoot(hsjsOptions),
    ChartsModule
  ],
  providers: [
    SurveyService,
    AuthService,
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
