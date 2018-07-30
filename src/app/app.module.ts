import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core';
import { AppRoutingModule } from './app-routing.module';

import { AppbarModule } from './components';

import { AppComponent } from './app.component';
import { SharedModule } from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, CoreModule, AppRoutingModule, AppbarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
