// Import of Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

// Material Design Modules
import { MdComponentsModule } from './md-components.module';
import { WelcomeComponent } from './welcome/welcome.component';

// Import the routes
import { appRoutes } from './config/app.routes';

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
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    BrowserAnimationsModule,
    MdComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
