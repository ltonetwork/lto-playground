import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { WaffleModule } from '@waffle/core';
import { AppStateStore } from './app.store';

import { AppRoutingModule } from './app-routing.module';

import { AppbarModule } from './components';

import { AppComponent } from './app.component';
import { SharedModule } from './shared';

import { ScenarioEditorModule } from './scenario-editor/scenario-editor.module';
import {
  LoadSchemaEffect,
  ShowFormDataEffect,
  DownloadJSONEffect
} from './scenario-editor/effects';
import { ScenarioEditorStore } from './scenario-editor/scenario-editor.store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    WaffleModule.forRoot(
      [AppStateStore, ScenarioEditorStore],
      [LoadSchemaEffect, ShowFormDataEffect, DownloadJSONEffect]
    ),
    SharedModule,
    ScenarioEditorModule,
    AppRoutingModule,
    AppbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
