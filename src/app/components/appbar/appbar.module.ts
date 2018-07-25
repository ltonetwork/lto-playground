import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material';
import { AppbarComponent } from './appbar.component';

@NgModule({
  imports: [CommonModule, MatToolbarModule],
  declarations: [AppbarComponent],
  exports: [AppbarComponent]
})
export class AppbarModule {}
