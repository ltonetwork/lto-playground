import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { HttpClientModule } from '@angular/common/http';
import { AppState } from './app.state';

import { AppRoutingModule } from './app-routing.module';

import { AppbarModule } from './components';

import { AppComponent } from './app.component';
import { SharedModule } from './shared';

import { ScenarioEditorModule } from './scenario-editor/scenario-editor.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([AppState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    SharedModule,
    ScenarioEditorModule,
    AppRoutingModule,
    AppbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
