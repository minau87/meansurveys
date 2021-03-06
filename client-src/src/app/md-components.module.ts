// Bundels all modules of the Angular Material Library

import { NgModule } from '@angular/core';

import 'hammerjs';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatSidenavModule,
  MatTooltipModule,
  MatGridListModule,
  MatStepperModule,
  MatCardModule,
  MatTabsModule,
  MatListModule,
  MatTableModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatProgressBarModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSliderModule,
  MatRadioModule
} from '@angular/material';

// Einbindung aller benötigter Material-Design-Komponenten
@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatSidenavModule,
    MatTooltipModule,
    MatGridListModule,
    MatStepperModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatProgressBarModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSliderModule,
    MatRadioModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatSidenavModule,
    MatTooltipModule,
    MatGridListModule,
    MatStepperModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatProgressBarModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSliderModule,
    MatRadioModule
  ],
  providers: []
})
export class MdComponentsModule { }
