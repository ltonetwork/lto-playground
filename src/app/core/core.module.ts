import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { WaffleModule } from '@waffle/core';
import { AppStateStore } from './app.store';

@NgModule({
  imports: [HttpClientModule, WaffleModule.forRoot([AppStateStore])],
  declarations: []
})
export class CoreModule {}
